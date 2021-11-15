'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsrsasign = require('jsrsasign');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.
var nopLogger = {
  debug: function debug() {},
  info: function info() {},
  warn: function warn() {},
  error: function error() {}
};
var NONE = 0;
var ERROR = 1;
var WARN = 2;
var INFO = 3;
var DEBUG = 4;
var logger;
var level;
var Log = /*#__PURE__*/function () {
  function Log() {}

  Log.reset = function reset() {
    level = INFO;
    logger = nopLogger;
  };

  Log.debug = function debug() {
    if (level >= DEBUG) {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      logger.debug.apply(logger, Array.from(args));
    }
  };

  Log.info = function info() {
    if (level >= INFO) {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      logger.info.apply(logger, Array.from(args));
    }
  };

  Log.warn = function warn() {
    if (level >= WARN) {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      logger.warn.apply(logger, Array.from(args));
    }
  };

  Log.error = function error() {
    if (level >= ERROR) {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      logger.error.apply(logger, Array.from(args));
    }
  };

  _createClass(Log, null, [{
    key: "NONE",
    get: function get() {
      return NONE;
    }
  }, {
    key: "ERROR",
    get: function get() {
      return ERROR;
    }
  }, {
    key: "WARN",
    get: function get() {
      return WARN;
    }
  }, {
    key: "INFO",
    get: function get() {
      return INFO;
    }
  }, {
    key: "DEBUG",
    get: function get() {
      return DEBUG;
    }
  }, {
    key: "level",
    get: function get() {
      return level;
    },
    set: function set(value) {
      if (NONE <= value && value <= DEBUG) {
        level = value;
      } else {
        throw new Error("Invalid log level");
      }
    }
  }, {
    key: "logger",
    get: function get() {
      return logger;
    },
    set: function set(value) {
      logger = value;
    }
  }]);

  return Log;
}();
Log.reset();

var ClockService = /*#__PURE__*/function () {
  function ClockService() {}

  var _proto = ClockService.prototype;

  _proto.getEpochTime = function getEpochTime() {
    return Promise.resolve(Date.now() / 1000 | 0);
  };

  return ClockService;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.
var timer = {
  setInterval: /*#__PURE__*/function (_setInterval) {
    function setInterval(_x, _x2) {
      return _setInterval.apply(this, arguments);
    }

    setInterval.toString = function () {
      return _setInterval.toString();
    };

    return setInterval;
  }(function (cb, duration) {
    // @ts-ignore
    return setInterval(cb, duration);
  }),
  clearInterval: /*#__PURE__*/function (_clearInterval) {
    function clearInterval(_x3) {
      return _clearInterval.apply(this, arguments);
    }

    clearInterval.toString = function () {
      return _clearInterval.toString();
    };

    return clearInterval;
  }(function (handle) {
    return clearInterval(handle);
  })
};
/*TODO: port-TS
let testing = false;
let request: XMLHttpRequest | null = null;
*/

var Global = /*#__PURE__*/function () {
  function Global() {}

  _createClass(Global, null, [{
    key: "location",
    get:
    /*TODO: port-TS static _testing() {
        testing = true;
    }*/
    function get() {
      /*TODO: port-TS if (!testing) {
          return location;
      }*/
      return location;
    }
  }, {
    key: "localStorage",
    get: function get() {
      /*TODO: port-TS if (!testing && typeof window !== 'undefined') {
          return localStorage;
      }*/
      return localStorage;
    }
  }, {
    key: "sessionStorage",
    get: function get() {
      /*TODO: port-TS if (!testing && typeof window !== 'undefined') {
          return sessionStorage;
      }*/
      return sessionStorage;
    }
    /*TODO: port-TS
    static setXMLHttpRequest(newRequest: XMLHttpRequest) {
        request = newRequest;
    }
    */

  }, {
    key: "XMLHttpRequest",
    get: function get() {
      /*TODO: port-TS if (!testing && typeof window !== 'undefined') {
          return request || XMLHttpRequest;
      }*/
      return XMLHttpRequest;
    }
  }, {
    key: "timer",
    get: function get() {
      /*TODO: port-TS if (!testing) {
          return timer;
      }*/
      return timer;
    }
  }]);

  return Global;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var WebStorageStateStore = /*#__PURE__*/function () {
  function WebStorageStateStore(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$prefix = _ref.prefix,
        prefix = _ref$prefix === void 0 ? "oidc." : _ref$prefix,
        _ref$store = _ref.store,
        store = _ref$store === void 0 ? Global.localStorage : _ref$store;

    this._store = store;
    this._prefix = prefix;
  }

  var _proto = WebStorageStateStore.prototype;

  _proto.set = function set(key, value) {
    Log.debug("WebStorageStateStore.set", key);
    key = this._prefix + key;

    this._store.setItem(key, value);

    return Promise.resolve();
  };

  _proto.get = function get(key) {
    Log.debug("WebStorageStateStore.get", key);
    key = this._prefix + key;

    var item = this._store.getItem(key);

    return Promise.resolve(item);
  };

  _proto.remove = function remove(key) {
    Log.debug("WebStorageStateStore.remove", key);
    key = this._prefix + key;

    var item = this._store.getItem(key);

    this._store.removeItem(key);

    return Promise.resolve(item);
  };

  _proto.getAllKeys = function getAllKeys() {
    Log.debug("WebStorageStateStore.getAllKeys");
    var keys = [];

    for (var index = 0; index < this._store.length; index++) {
      var key = this._store.key(index);

      if (key && key.indexOf(this._prefix) === 0) {
        keys.push(key.substr(this._prefix.length));
      }
    }

    return Promise.resolve(keys);
  };

  return WebStorageStateStore;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var JsonService = /*#__PURE__*/function () {
  function JsonService(additionalContentTypes, XMLHttpRequestCtor, jwtHandler) {
    if (additionalContentTypes === void 0) {
      additionalContentTypes = null;
    }

    if (XMLHttpRequestCtor === void 0) {
      XMLHttpRequestCtor = Global.XMLHttpRequest;
    }

    if (jwtHandler === void 0) {
      jwtHandler = null;
    }

    if (additionalContentTypes && Array.isArray(additionalContentTypes)) {
      this._contentTypes = additionalContentTypes.slice();
    } else {
      this._contentTypes = [];
    }

    this._contentTypes.push('application/json');

    if (jwtHandler) {
      this._contentTypes.push('application/jwt');
    }

    this._XMLHttpRequest = XMLHttpRequestCtor;
    this._jwtHandler = jwtHandler;
  }

  var _proto = JsonService.prototype;

  _proto.getJson = function getJson(url, token) {
    var _this = this;

    if (!url) {
      Log.error("JsonService.getJson: No url passed");
      throw new Error("url");
    }

    Log.debug("JsonService.getJson, url: ", url);
    return new Promise(function (resolve, reject) {
      var req = new _this._XMLHttpRequest();
      req.open('GET', url);
      var allowedContentTypes = _this._contentTypes;
      var jwtHandler = _this._jwtHandler;

      req.onload = function () {
        Log.debug("JsonService.getJson: HTTP response received, status", req.status);

        if (req.status === 200) {
          var contentType = req.getResponseHeader("Content-Type");

          if (contentType) {
            var found = allowedContentTypes.find(function (item) {
              return contentType.startsWith(item);
            });

            if (found == "application/jwt") {
              jwtHandler(req).then(resolve, reject);
              return;
            }

            if (found) {
              try {
                resolve(JSON.parse(req.responseText));
                return;
              } catch (e) {
                Log.error("JsonService.getJson: Error parsing JSON response", e.message);
                reject(e);
                return;
              }
            }
          }

          reject(Error("Invalid response Content-Type: " + contentType + ", from URL: " + url));
        } else {
          reject(Error(req.statusText + " (" + req.status + ")"));
        }
      };

      req.onerror = function () {
        Log.error("JsonService.getJson: network error");
        reject(Error("Network Error"));
      };

      if (token) {
        Log.debug("JsonService.getJson: token passed, setting Authorization header");
        req.setRequestHeader("Authorization", "Bearer " + token);
      }

      req.send();
    });
  };

  _proto.postForm = function postForm(url, payload, basicAuth) {
    var _this2 = this;

    if (!url) {
      Log.error("JsonService.postForm: No url passed");
      throw new Error("url");
    }

    Log.debug("JsonService.postForm, url: ", url);
    return new Promise(function (resolve, reject) {
      var req = new _this2._XMLHttpRequest();
      req.open('POST', url);
      var allowedContentTypes = _this2._contentTypes;

      req.onload = function () {
        Log.debug("JsonService.postForm: HTTP response received, status", req.status);

        if (req.status === 200) {
          var contentType = req.getResponseHeader("Content-Type");

          if (contentType) {
            var found = allowedContentTypes.find(function (item) {
              return contentType.startsWith(item);
            });

            if (found) {
              try {
                resolve(JSON.parse(req.responseText));
                return;
              } catch (e) {
                Log.error("JsonService.postForm: Error parsing JSON response", e.message);
                reject(e);
                return;
              }
            }
          }

          reject(Error("Invalid response Content-Type: " + contentType + ", from URL: " + url));
          return;
        }

        if (req.status === 400) {
          var _contentType = req.getResponseHeader("Content-Type");

          if (_contentType) {
            var found = allowedContentTypes.find(function (item) {
              return _contentType.startsWith(item);
            });

            if (found) {
              try {
                var payload = JSON.parse(req.responseText);

                if (payload && payload.error) {
                  Log.error("JsonService.postForm: Error from server: ", payload.error);
                  reject(new Error(payload.error));
                  return;
                }
              } catch (e) {
                Log.error("JsonService.postForm: Error parsing JSON response", e.message);
                reject(e);
                return;
              }
            }
          }
        }

        reject(Error(req.statusText + " (" + req.status + ")"));
      };

      req.onerror = function () {
        Log.error("JsonService.postForm: network error");
        reject(Error("Network Error"));
      };

      var body = "";

      for (var key in payload) {
        var value = payload[key];

        if (value) {
          if (body.length > 0) {
            body += "&";
          }

          body += encodeURIComponent(key);
          body += "=";
          body += encodeURIComponent(value);
        }
      }

      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      if (basicAuth !== undefined) {
        req.setRequestHeader("Authorization", "Basic " + btoa(basicAuth));
      }

      req.send(body);
    });
  };

  return JsonService;
}();

var OidcMetadataUrlPath = '.well-known/openid-configuration';
var MetadataService = /*#__PURE__*/function () {
  function MetadataService(settings, JsonServiceCtor) {
    if (JsonServiceCtor === void 0) {
      JsonServiceCtor = JsonService;
    }

    if (!settings) {
      Log.error("MetadataService: No settings passed to MetadataService");
      throw new Error("settings");
    }

    this._settings = settings;
    this._jsonService = new JsonServiceCtor(['application/jwk-set+json']);
    this._metadataUrl = undefined;
  }

  var _proto = MetadataService.prototype;

  _proto.resetSigningKeys = function resetSigningKeys() {
    this._settings.signingKeys = undefined;
  };

  _proto.getMetadata = function getMetadata() {
    var _this = this;

    if (this._settings.metadata) {
      Log.debug("MetadataService.getMetadata: Returning metadata from settings");
      return Promise.resolve(this._settings.metadata);
    }

    if (!this.metadataUrl) {
      Log.error("MetadataService.getMetadata: No authority or metadataUrl configured on settings");
      return Promise.reject(new Error("No authority or metadataUrl configured on settings"));
    }

    Log.debug("MetadataService.getMetadata: getting metadata from", this.metadataUrl);
    return this._jsonService.getJson(this.metadataUrl).then(function (metadata) {
      Log.debug("MetadataService.getMetadata: json received");
      var seed = _this._settings.metadataSeed || {};
      _this._settings.metadata = Object.assign({}, seed, metadata);
      return _this._settings.metadata;
    });
  };

  _proto.getIssuer = function getIssuer() {
    return this._getMetadataProperty("issuer");
  };

  _proto.getAuthorizationEndpoint = function getAuthorizationEndpoint() {
    return this._getMetadataProperty("authorization_endpoint");
  };

  _proto.getUserInfoEndpoint = function getUserInfoEndpoint() {
    return this._getMetadataProperty("userinfo_endpoint");
  };

  _proto.getTokenEndpoint = function getTokenEndpoint(optional) {
    if (optional === void 0) {
      optional = true;
    }

    return this._getMetadataProperty("token_endpoint", optional);
  };

  _proto.getCheckSessionIframe = function getCheckSessionIframe() {
    return this._getMetadataProperty("check_session_iframe", true);
  };

  _proto.getEndSessionEndpoint = function getEndSessionEndpoint() {
    return this._getMetadataProperty("end_session_endpoint", true);
  };

  _proto.getRevocationEndpoint = function getRevocationEndpoint() {
    return this._getMetadataProperty("revocation_endpoint", true);
  };

  _proto.getKeysEndpoint = function getKeysEndpoint(optional) {
    if (optional === void 0) {
      optional = true;
    }

    return this._getMetadataProperty("jwks_uri", optional);
  };

  _proto._getMetadataProperty = function _getMetadataProperty(name, optional) {
    if (optional === void 0) {
      optional = false;
    }

    Log.debug("MetadataService.getMetadataProperty for: " + name);
    return this.getMetadata().then(function (metadata) {
      Log.debug("MetadataService.getMetadataProperty: metadata recieved");

      if (metadata[name] === undefined) {
        if (optional === true) {
          Log.warn("MetadataService.getMetadataProperty: Metadata does not contain optional property " + name);
          return undefined;
        } else {
          Log.error("MetadataService.getMetadataProperty: Metadata does not contain property " + name);
          throw new Error("Metadata does not contain property " + name);
        }
      }

      return metadata[name];
    });
  };

  _proto.getSigningKeys = function getSigningKeys() {
    var _this2 = this;

    if (this._settings.signingKeys) {
      Log.debug("MetadataService.getSigningKeys: Returning signingKeys from settings");
      return Promise.resolve(this._settings.signingKeys);
    }

    return this.getKeysEndpoint(false).then(function (jwks_uri) {
      Log.debug("MetadataService.getSigningKeys: jwks_uri received", jwks_uri);
      return _this2._jsonService.getJson(jwks_uri).then(function (keySet) {
        Log.debug("MetadataService.getSigningKeys: key set received", keySet);

        if (!keySet.keys) {
          Log.error("MetadataService.getSigningKeys: Missing keys on keyset");
          throw new Error("Missing keys on keyset");
        }

        _this2._settings.signingKeys = keySet.keys;
        return _this2._settings.signingKeys;
      });
    });
  };

  _createClass(MetadataService, [{
    key: "metadataUrl",
    get: function get() {
      if (!this._metadataUrl) {
        if (this._settings.metadataUrl) {
          this._metadataUrl = this._settings.metadataUrl;
        } else {
          this._metadataUrl = this._settings.authority;

          if (this._metadataUrl && this._metadataUrl.indexOf(OidcMetadataUrlPath) < 0) {
            if (this._metadataUrl[this._metadataUrl.length - 1] !== '/') {
              this._metadataUrl += '/';
            }

            this._metadataUrl += OidcMetadataUrlPath;
          }
        }
      }

      return this._metadataUrl || "";
    }
  }]);

  return MetadataService;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var AllowedSigningAlgs = ["RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512"];
var JoseUtil = /*#__PURE__*/function () {
  function JoseUtil() {}

  JoseUtil.parseJwt = function parseJwt(jwt) {
    Log.debug("JoseUtil.parseJwt");

    try {
      var token = jsrsasign.KJUR.jws.JWS.parse(jwt);
      return {
        header: token.headerObj,
        payload: token.payloadObj
      };
    } catch (e) {
      Log.error(e);
      return null;
    }
  };

  JoseUtil.validateJwt = function validateJwt(jwt, key, issuer, audience, clockSkew, now, timeInsensitive) {
    if (timeInsensitive === void 0) {
      timeInsensitive = false;
    }

    Log.debug("JoseUtil.validateJwt");

    try {
      if (key.kty === "RSA") {
        if (key.e && key.n) {
          key = jsrsasign.KEYUTIL.getKey(key);
        } else if (key.x5c && key.x5c.length) {
          var hex = jsrsasign.b64tohex(key.x5c[0]);
          key = jsrsasign.X509.getPublicKeyFromCertHex(hex);
        } else {
          Log.error("JoseUtil.validateJwt: RSA key missing key material", key);
          return Promise.reject(new Error("RSA key missing key material"));
        }
      } else if (key.kty === "EC") {
        if (key.crv && key.x && key.y) {
          key = jsrsasign.KEYUTIL.getKey(key);
        } else {
          Log.error("JoseUtil.validateJwt: EC key missing key material", key);
          return Promise.reject(new Error("EC key missing key material"));
        }
      } else {
        Log.error("JoseUtil.validateJwt: Unsupported key type", key && key.kty);
        return Promise.reject(new Error("Unsupported key type: " + key && key.kty));
      }

      return JoseUtil._validateJwt(jwt, key, issuer, audience, clockSkew, now, timeInsensitive);
    } catch (e) {
      Log.error(e && e.message || e);
      return Promise.reject("JWT validation failed");
    }
  };

  JoseUtil.validateJwtAttributes = function validateJwtAttributes(jwt, issuer, audience, clockSkew, now, timeInsensitive) {
    if (timeInsensitive === void 0) {
      timeInsensitive = false;
    }

    if (!clockSkew) {
      clockSkew = 0;
    }

    if (!now) {
      now = Math.floor(Date.now() / 1000);
    }

    var parsedJwt = JoseUtil.parseJwt(jwt);

    if (!parsedJwt || !parsedJwt.payload) {
      return Promise.reject(new Error("Failed to parse token"));
    }

    var payload = parsedJwt.payload;

    if (!payload.iss) {
      Log.error("JoseUtil._validateJwt: issuer was not provided");
      return Promise.reject(new Error("issuer was not provided"));
    }

    if (payload.iss !== issuer) {
      Log.error("JoseUtil._validateJwt: Invalid issuer in token", payload.iss);
      return Promise.reject(new Error("Invalid issuer in token: " + payload.iss));
    }

    if (!payload.aud) {
      Log.error("JoseUtil._validateJwt: aud was not provided");
      return Promise.reject(new Error("aud was not provided"));
    }

    var validAudience = payload.aud === audience || Array.isArray(payload.aud) && payload.aud.indexOf(audience) >= 0;

    if (!validAudience) {
      Log.error("JoseUtil._validateJwt: Invalid audience in token", payload.aud);
      return Promise.reject(new Error("Invalid audience in token: " + payload.aud));
    }

    if (payload.azp && payload.azp !== audience) {
      Log.error("JoseUtil._validateJwt: Invalid azp in token", payload.azp);
      return Promise.reject(new Error("Invalid azp in token: " + payload.azp));
    }

    if (!timeInsensitive) {
      var lowerNow = now + clockSkew;
      var upperNow = now - clockSkew;

      if (!payload.iat) {
        Log.error("JoseUtil._validateJwt: iat was not provided");
        return Promise.reject(new Error("iat was not provided"));
      }

      if (lowerNow < payload.iat) {
        Log.error("JoseUtil._validateJwt: iat is in the future", payload.iat);
        return Promise.reject(new Error("iat is in the future: " + payload.iat));
      }

      if (payload.nbf && lowerNow < payload.nbf) {
        Log.error("JoseUtil._validateJwt: nbf is in the future", payload.nbf);
        return Promise.reject(new Error("nbf is in the future: " + payload.nbf));
      }

      if (!payload.exp) {
        Log.error("JoseUtil._validateJwt: exp was not provided");
        return Promise.reject(new Error("exp was not provided"));
      }

      if (payload.exp < upperNow) {
        Log.error("JoseUtil._validateJwt: exp is in the past", payload.exp);
        return Promise.reject(new Error("exp is in the past:" + payload.exp));
      }
    }

    return Promise.resolve(payload);
  };

  JoseUtil._validateJwt = function _validateJwt(jwt, key, issuer, audience, clockSkew, now, timeInsensitive) {
    if (timeInsensitive === void 0) {
      timeInsensitive = false;
    }

    return JoseUtil.validateJwtAttributes(jwt, issuer, audience, clockSkew, now, timeInsensitive).then(function (payload) {
      try {
        if (!jsrsasign.KJUR.jws.JWS.verify(jwt, key, AllowedSigningAlgs)) {
          Log.error("JoseUtil._validateJwt: signature validation failed");
          return Promise.reject(new Error("signature validation failed"));
        }

        return payload;
      } catch (e) {
        Log.error(e && e.message || e);
        return Promise.reject(new Error("signature validation failed"));
      }
    });
  };

  JoseUtil.hashString = function hashString(value, alg) {
    try {
      return jsrsasign.KJUR.crypto.Util.hashString(value, alg);
    } catch (e) {
      Log.error(e);
      throw e;
    }
  };

  JoseUtil.hexToBase64Url = function hexToBase64Url(value) {
    try {
      return jsrsasign.hextob64u(value);
    } catch (e) {
      Log.error(e);
      throw e;
    }
  };

  return JoseUtil;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var UserInfoService = /*#__PURE__*/function () {
  function UserInfoService(settings, JsonServiceCtor, MetadataServiceCtor) {
    if (JsonServiceCtor === void 0) {
      JsonServiceCtor = JsonService;
    }

    if (MetadataServiceCtor === void 0) {
      MetadataServiceCtor = MetadataService;
    }

    if (!settings) {
      Log.error("UserInfoService.ctor: No settings passed");
      throw new Error("settings");
    }

    this._settings = settings;
    this._jsonService = new JsonServiceCtor(undefined, undefined, this._getClaimsFromJwt.bind(this));
    this._metadataService = new MetadataServiceCtor(this._settings);
  }

  var _proto = UserInfoService.prototype;

  _proto.getClaims = function getClaims(token) {
    var _this = this;

    if (!token) {
      Log.error("UserInfoService.getClaims: No token passed");
      return Promise.reject(new Error("A token is required"));
    }

    return this._metadataService.getUserInfoEndpoint().then(function (url) {
      Log.debug("UserInfoService.getClaims: received userinfo url", url);
      return _this._jsonService.getJson(url, token).then(function (claims) {
        Log.debug("UserInfoService.getClaims: claims received", claims);
        return claims;
      });
    });
  };

  _proto._getClaimsFromJwt = function _getClaimsFromJwt(req) {
    var _this2 = this;

    try {
      var jwt = JoseUtil.parseJwt(req.responseText);

      if (!jwt || !jwt.header || !jwt.payload) {
        Log.error("UserInfoService._getClaimsFromJwt: Failed to parse JWT", jwt);
        return Promise.reject(new Error("Failed to parse id_token"));
      }

      var header = jwt.header;
      var payload = jwt.payload;
      var issuerPromise;

      switch (this._settings.userInfoJwtIssuer) {
        case 'OP':
          issuerPromise = this._metadataService.getIssuer();
          break;

        case 'ANY':
          issuerPromise = Promise.resolve(payload.iss);
          break;

        default:
          issuerPromise = Promise.resolve(this._settings.userInfoJwtIssuer);
          break;
      }

      return issuerPromise.then(function (issuer) {
        Log.debug("UserInfoService._getClaimsFromJwt: Received issuer:" + issuer);
        return _this2._metadataService.getSigningKeys().then(function (keys) {
          if (!keys) {
            Log.error("UserInfoService._getClaimsFromJwt: No signing keys from metadata");
            return Promise.reject(new Error("No signing keys from metadata"));
          }

          Log.debug("UserInfoService._getClaimsFromJwt: Received signing keys");
          var key;

          if (!header.kid) {
            keys = _this2._filterByAlg(keys, jwt.header.alg);

            if (keys.length > 1) {
              Log.error("UserInfoService._getClaimsFromJwt: No kid found in id_token and more than one key found in metadata");
              return Promise.reject(new Error("No kid found in id_token and more than one key found in metadata"));
            } else {
              // kid is mandatory only when there are multiple keys in the referenced JWK Set document
              // see http://openid.net/specs/openid-connect-core-1_0.html#Signing
              key = keys[0];
            }
          } else {
            key = keys.filter(function (key) {
              return key.kid === header.kid;
            })[0];
          }

          if (!key) {
            Log.error("UserInfoService._getClaimsFromJwt: No key matching kid or alg found in signing keys");
            return Promise.reject(new Error("No key matching kid or alg found in signing keys"));
          }

          var audience = _this2._settings.client_id;
          var clockSkewInSeconds = _this2._settings.clockSkew;
          Log.debug("UserInfoService._getClaimsFromJwt: Validaing JWT; using clock skew (in seconds) of: ", clockSkewInSeconds);
          return JoseUtil.validateJwt(req.responseText, key, issuer, audience, clockSkewInSeconds, undefined, true).then(function () {
            Log.debug("UserInfoService._getClaimsFromJwt: JWT validation successful");
            return payload;
          });
        });
      });
    } catch (e) {
      Log.error("UserInfoService._getClaimsFromJwt: Error parsing JWT response", e.message);
      return Promise.reject(e);
    }
  };

  _proto._filterByAlg = function _filterByAlg(keys, alg) {
    var kty = null;

    if (alg.startsWith("RS")) {
      kty = "RSA";
    } else if (alg.startsWith("PS")) {
      kty = "PS";
    } else if (alg.startsWith("ES")) {
      kty = "EC";
    } else {
      Log.debug("UserInfoService._filterByAlg: alg not supported: ", alg);
      return [];
    }

    Log.debug("UserInfoService._filterByAlg: Looking for keys that match kty: ", kty);
    keys = keys.filter(function (key) {
      return key.kty === kty;
    });
    Log.debug("UserInfoService._filterByAlg: Number of keys that match kty: ", kty, keys.length);
    return keys;
  };

  return UserInfoService;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var TokenClient = /*#__PURE__*/function () {
  function TokenClient(settings, JsonServiceCtor, MetadataServiceCtor) {
    if (JsonServiceCtor === void 0) {
      JsonServiceCtor = JsonService;
    }

    if (MetadataServiceCtor === void 0) {
      MetadataServiceCtor = MetadataService;
    }

    if (!settings) {
      Log.error("TokenClient.ctor: No settings passed");
      throw new Error("settings");
    }

    this._settings = settings;
    this._jsonService = new JsonServiceCtor();
    this._metadataService = new MetadataServiceCtor(this._settings);
  }

  var _proto = TokenClient.prototype;

  _proto.exchangeCode = function exchangeCode(args) {
    var _this = this;

    if (args === void 0) {
      args = {};
    }

    args = Object.assign({}, args);
    args.grant_type = args.grant_type || "authorization_code";
    args.client_id = args.client_id || this._settings.client_id;
    args.client_secret = args.client_secret || this._settings.client_secret;
    args.redirect_uri = args.redirect_uri || this._settings.redirect_uri;
    var basicAuth = undefined;
    var client_authentication = args._client_authentication || this._settings.client_authentication;
    delete args._client_authentication;

    if (!args.code) {
      Log.error("TokenClient.exchangeCode: No code passed");
      return Promise.reject(new Error("A code is required"));
    }

    if (!args.redirect_uri) {
      Log.error("TokenClient.exchangeCode: No redirect_uri passed");
      return Promise.reject(new Error("A redirect_uri is required"));
    }

    if (!args.code_verifier) {
      Log.error("TokenClient.exchangeCode: No code_verifier passed");
      return Promise.reject(new Error("A code_verifier is required"));
    }

    if (!args.client_id) {
      Log.error("TokenClient.exchangeCode: No client_id passed");
      return Promise.reject(new Error("A client_id is required"));
    }

    if (!args.client_secret && client_authentication == "client_secret_basic") {
      Log.error("TokenClient.exchangeCode: No client_secret passed");
      return Promise.reject(new Error("A client_secret is required"));
    } // Sending the client credentials using the Basic Auth method


    if (client_authentication == "client_secret_basic") {
      basicAuth = args.client_id + ':' + args.client_secret;
      delete args.client_id;
      delete args.client_secret;
    }

    return this._metadataService.getTokenEndpoint(false).then(function (url) {
      Log.debug("TokenClient.exchangeCode: Received token endpoint");
      return _this._jsonService.postForm(url, args, basicAuth).then(function (response) {
        Log.debug("TokenClient.exchangeCode: response received");
        return response;
      });
    });
  };

  _proto.exchangeRefreshToken = function exchangeRefreshToken(args) {
    var _this2 = this;

    if (args === void 0) {
      args = {};
    }

    args = Object.assign({}, args);
    args.grant_type = args.grant_type || "refresh_token";
    args.client_id = args.client_id || this._settings.client_id;
    args.client_secret = args.client_secret || this._settings.client_secret;
    var basicAuth = undefined;
    var client_authentication = args._client_authentication || this._settings.client_authentication;
    delete args._client_authentication;

    if (!args.refresh_token) {
      Log.error("TokenClient.exchangeRefreshToken: No refresh_token passed");
      return Promise.reject(new Error("A refresh_token is required"));
    }

    if (!args.client_id) {
      Log.error("TokenClient.exchangeRefreshToken: No client_id passed");
      return Promise.reject(new Error("A client_id is required"));
    } // Sending the client credentials using the Basic Auth method


    if (client_authentication == "client_secret_basic") {
      basicAuth = args.client_id + ':' + args.client_secret;
      delete args.client_id;
      delete args.client_secret;
    }

    return this._metadataService.getTokenEndpoint(false).then(function (url) {
      Log.debug("TokenClient.exchangeRefreshToken: Received token endpoint");
      return _this2._jsonService.postForm(url, args, basicAuth).then(function (response) {
        Log.debug("TokenClient.exchangeRefreshToken: response received");
        return response;
      });
    });
  };

  return TokenClient;
}();

var ErrorResponse = /*#__PURE__*/function (_Error) {
  _inheritsLoose(ErrorResponse, _Error);

  function ErrorResponse(_ref) {
    var _this;

    var error = _ref.error,
        error_description = _ref.error_description,
        error_uri = _ref.error_uri,
        state = _ref.state,
        session_state = _ref.session_state;

    if (!error) {
      Log.error("No error passed to ErrorResponse");
      throw new Error("error");
    }

    _this = _Error.call(this, error_description || error) || this;
    _this.name = "ErrorResponse";
    _this.error = error;
    _this.error_description = error_description;
    _this.error_uri = error_uri;
    _this.state = state;
    _this.session_state = session_state;
    return _this;
  }

  return ErrorResponse;
}( /*#__PURE__*/_wrapNativeSuper(Error));

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var ProtocolClaims = ["nonce", "at_hash", "iat", "nbf", "exp", "aud", "iss", "c_hash"];
var ResponseValidator = /*#__PURE__*/function () {
  function ResponseValidator(settings, MetadataServiceCtor, UserInfoServiceCtor, TokenClientCtor) {
    if (MetadataServiceCtor === void 0) {
      MetadataServiceCtor = MetadataService;
    }

    if (UserInfoServiceCtor === void 0) {
      UserInfoServiceCtor = UserInfoService;
    }

    if (TokenClientCtor === void 0) {
      TokenClientCtor = TokenClient;
    }

    if (!settings) {
      Log.error("ResponseValidator.ctor: No settings passed to ResponseValidator");
      throw new Error("settings");
    }

    this._settings = settings;
    this._metadataService = new MetadataServiceCtor(this._settings);
    this._userInfoService = new UserInfoServiceCtor(this._settings);
    this._tokenClient = new TokenClientCtor(this._settings);
  }

  var _proto = ResponseValidator.prototype;

  _proto.validateSigninResponse = function validateSigninResponse(state, response) {
    var _this = this;

    Log.debug("ResponseValidator.validateSigninResponse");
    return this._processSigninParams(state, response).then(function (response) {
      Log.debug("ResponseValidator.validateSigninResponse: state processed");
      return _this._validateTokens(state, response).then(function (response) {
        Log.debug("ResponseValidator.validateSigninResponse: tokens validated");
        return _this._processClaims(state, response).then(function (response) {
          Log.debug("ResponseValidator.validateSigninResponse: claims processed");
          return response;
        });
      });
    });
  };

  _proto.validateSignoutResponse = function validateSignoutResponse(state, response) {
    if (state.id !== response.state) {
      Log.error("ResponseValidator.validateSignoutResponse: State does not match");
      return Promise.reject(new Error("State does not match"));
    } // now that we know the state matches, take the stored data
    // and set it into the response so callers can get their state
    // this is important for both success & error outcomes


    Log.debug("ResponseValidator.validateSignoutResponse: state validated");
    response.state = state.data;

    if (response.error) {
      Log.warn("ResponseValidator.validateSignoutResponse: Response was error", response.error);
      return Promise.reject(new ErrorResponse(response));
    }

    return Promise.resolve(response);
  };

  _proto._processSigninParams = function _processSigninParams(state, response) {
    if (state.id !== response.state) {
      Log.error("ResponseValidator._processSigninParams: State does not match");
      return Promise.reject(new Error("State does not match"));
    }

    if (!state.client_id) {
      Log.error("ResponseValidator._processSigninParams: No client_id on state");
      return Promise.reject(new Error("No client_id on state"));
    }

    if (!state.authority) {
      Log.error("ResponseValidator._processSigninParams: No authority on state");
      return Promise.reject(new Error("No authority on state"));
    } // this allows the authority to be loaded from the signin state


    if (!this._settings.authority) {
      this._settings.authority = state.authority;
    } // ensure we're using the correct authority if the authority is not loaded from signin state
    else if (this._settings.authority && this._settings.authority !== state.authority) {
        Log.error("ResponseValidator._processSigninParams: authority mismatch on settings vs. signin state");
        return Promise.reject(new Error("authority mismatch on settings vs. signin state"));
      } // this allows the client_id to be loaded from the signin state


    if (!this._settings.client_id) {
      this._settings.client_id = state.client_id;
    } // ensure we're using the correct client_id if the client_id is not loaded from signin state
    else if (this._settings.client_id && this._settings.client_id !== state.client_id) {
        Log.error("ResponseValidator._processSigninParams: client_id mismatch on settings vs. signin state");
        return Promise.reject(new Error("client_id mismatch on settings vs. signin state"));
      } // now that we know the state matches, take the stored data
    // and set it into the response so callers can get their state
    // this is important for both success & error outcomes


    Log.debug("ResponseValidator._processSigninParams: state validated");
    response.state = state.data;

    if (response.error) {
      Log.warn("ResponseValidator._processSigninParams: Response was error", response.error);
      return Promise.reject(new ErrorResponse(response));
    }

    if (state.nonce && !response.id_token) {
      Log.error("ResponseValidator._processSigninParams: Expecting id_token in response");
      return Promise.reject(new Error("No id_token in response"));
    }

    if (!state.nonce && response.id_token) {
      Log.error("ResponseValidator._processSigninParams: Not expecting id_token in response");
      return Promise.reject(new Error("Unexpected id_token in response"));
    }

    if (state.code_verifier && !response.code) {
      Log.error("ResponseValidator._processSigninParams: Expecting code in response");
      return Promise.reject(new Error("No code in response"));
    }

    if (!state.code_verifier && response.code) {
      Log.error("ResponseValidator._processSigninParams: Not expecting code in response");
      return Promise.reject(new Error("Unexpected code in response"));
    }

    if (!response.scope) {
      // if there's no scope on the response, then assume all scopes granted (per-spec) and copy over scopes from original request
      response.scope = state.scope;
    }

    return Promise.resolve(response);
  };

  _proto._processClaims = function _processClaims(state, response) {
    var _this2 = this;

    if (response.isOpenIdConnect) {
      Log.debug("ResponseValidator._processClaims: response is OIDC, processing claims");
      response.profile = this._filterProtocolClaims(response.profile);

      if (state.skipUserInfo !== true && this._settings.loadUserInfo && response.access_token) {
        Log.debug("ResponseValidator._processClaims: loading user info");
        return this._userInfoService.getClaims(response.access_token).then(function (claims) {
          Log.debug("ResponseValidator._processClaims: user info claims received from user info endpoint");

          if (claims.sub !== response.profile.sub) {
            Log.error("ResponseValidator._processClaims: sub from user info endpoint does not match sub in id_token");
            return Promise.reject(new Error("sub from user info endpoint does not match sub in id_token"));
          }

          response.profile = _this2._mergeClaims(response.profile, claims);
          Log.debug("ResponseValidator._processClaims: user info claims received, updated profile:", response.profile);
          return response;
        });
      } else {
        Log.debug("ResponseValidator._processClaims: not loading user info");
      }
    } else {
      Log.debug("ResponseValidator._processClaims: response is not OIDC, not processing claims");
    }

    return Promise.resolve(response);
  };

  _proto._mergeClaims = function _mergeClaims(claims1, claims2) {
    var result = Object.assign({}, claims1);

    for (var name in claims2) {
      var values = claims2[name];

      if (!Array.isArray(values)) {
        values = [values];
      }

      for (var i = 0; i < values.length; i++) {
        var value = values[i];

        if (!result[name]) {
          result[name] = value;
        } else if (Array.isArray(result[name])) {
          if (result[name].indexOf(value) < 0) {
            result[name].push(value);
          }
        } else if (result[name] !== value) {
          if (typeof value === 'object' && this._settings.mergeClaims) {
            result[name] = this._mergeClaims(result[name], value);
          } else {
            result[name] = [result[name], value];
          }
        }
      }
    }

    return result;
  };

  _proto._filterProtocolClaims = function _filterProtocolClaims(claims) {
    Log.debug("ResponseValidator._filterProtocolClaims, incoming claims:", claims);
    var result = Object.assign({}, claims);

    if (this._settings.filterProtocolClaims) {
      ProtocolClaims.forEach(function (type) {
        delete result[type];
      });
      Log.debug("ResponseValidator._filterProtocolClaims: protocol claims filtered", result);
    } else {
      Log.debug("ResponseValidator._filterProtocolClaims: protocol claims not filtered");
    }

    return result;
  };

  _proto._validateTokens = function _validateTokens(state, response) {
    if (response.code) {
      Log.debug("ResponseValidator._validateTokens: Validating code");
      return this._processCode(state, response);
    }

    if (response.id_token) {
      if (response.access_token) {
        Log.debug("ResponseValidator._validateTokens: Validating id_token and access_token");
        return this._validateIdTokenAndAccessToken(state, response);
      }

      Log.debug("ResponseValidator._validateTokens: Validating id_token");
      return this._validateIdToken(state, response);
    }

    Log.debug("ResponseValidator._validateTokens: No code to process or id_token to validate");
    return Promise.resolve(response);
  };

  _proto._processCode = function _processCode(state, response) {
    var _this3 = this;

    var request = {
      client_id: state.client_id,
      client_secret: state.client_secret,
      code: response.code,
      redirect_uri: state.redirect_uri,
      code_verifier: state.code_verifier
    };

    if (state.extraTokenParams && typeof state.extraTokenParams === 'object') {
      Object.assign(request, state.extraTokenParams);
    }

    return this._tokenClient.exchangeCode(request).then(function (tokenResponse) {
      // merge
      response.error = tokenResponse.error || response.error;
      response.error_description = tokenResponse.error_description || response.error_description;
      response.error_uri = tokenResponse.error_uri || response.error_uri;
      response.id_token = tokenResponse.id_token || response.id_token;
      response.session_state = tokenResponse.session_state || response.session_state;
      response.access_token = tokenResponse.access_token || response.access_token;
      response.token_type = tokenResponse.token_type || response.token_type;
      response.scope = tokenResponse.scope || response.scope;
      response.expires_in = parseInt(tokenResponse.expires_in) || response.expires_in;

      if (response.id_token) {
        Log.debug("ResponseValidator._processCode: token response successful, processing id_token");
        return _this3._validateIdTokenAttributes(state, response);
      } else {
        Log.debug("ResponseValidator._processCode: token response successful, returning response");
      }

      return response;
    });
  };

  _proto._validateIdTokenAttributes = function _validateIdTokenAttributes(state, response) {
    var _this4 = this;

    return this._metadataService.getIssuer().then(function (issuer) {
      var audience = state.client_id;
      var clockSkewInSeconds = _this4._settings.clockSkew;
      Log.debug("ResponseValidator._validateIdTokenAttributes: Validaing JWT attributes; using clock skew (in seconds) of: ", clockSkewInSeconds);
      return _this4._settings.getEpochTime().then(function (now) {
        return JoseUtil.validateJwtAttributes(response.id_token, issuer, audience, clockSkewInSeconds, now).then(function (payload) {
          if (state.nonce && state.nonce !== payload.nonce) {
            Log.error("ResponseValidator._validateIdTokenAttributes: Invalid nonce in id_token");
            return Promise.reject(new Error("Invalid nonce in id_token"));
          }

          if (!payload.sub) {
            Log.error("ResponseValidator._validateIdTokenAttributes: No sub present in id_token");
            return Promise.reject(new Error("No sub present in id_token"));
          }

          response.profile = payload;
          return response;
        });
      });
    });
  };

  _proto._validateIdTokenAndAccessToken = function _validateIdTokenAndAccessToken(state, response) {
    var _this5 = this;

    return this._validateIdToken(state, response).then(function (response) {
      return _this5._validateAccessToken(response);
    });
  };

  _proto._getSigningKeyForJwt = function _getSigningKeyForJwt(jwt) {
    var _this6 = this;

    return this._metadataService.getSigningKeys().then(function (keys) {
      var kid = jwt.header.kid;

      if (!keys) {
        Log.error("ResponseValidator._validateIdToken: No signing keys from metadata");
        return Promise.reject(new Error("No signing keys from metadata"));
      }

      Log.debug("ResponseValidator._validateIdToken: Received signing keys");
      var key;

      if (!kid) {
        keys = _this6._filterByAlg(keys, jwt.header.alg);

        if (keys.length > 1) {
          Log.error("ResponseValidator._validateIdToken: No kid found in id_token and more than one key found in metadata");
          return Promise.reject(new Error("No kid found in id_token and more than one key found in metadata"));
        } else {
          // kid is mandatory only when there are multiple keys in the referenced JWK Set document
          // see http://openid.net/specs/openid-connect-core-1_0.html#Signing
          key = keys[0];
        }
      } else {
        key = keys.filter(function (key) {
          return key.kid === kid;
        })[0];
      }

      return Promise.resolve(key);
    });
  };

  _proto._getSigningKeyForJwtWithSingleRetry = function _getSigningKeyForJwtWithSingleRetry(jwt) {
    var _this7 = this;

    return this._getSigningKeyForJwt(jwt).then(function (key) {
      // Refreshing signingKeys if no suitable verification key is present for given jwt header.
      if (!key) {
        // set to undefined, to trigger network call to jwks_uri.
        _this7._metadataService.resetSigningKeys();

        return _this7._getSigningKeyForJwt(jwt);
      } else {
        return Promise.resolve(key);
      }
    });
  };

  _proto._validateIdToken = function _validateIdToken(state, response) {
    var _this8 = this;

    if (!state.nonce) {
      Log.error("ResponseValidator._validateIdToken: No nonce on state");
      return Promise.reject(new Error("No nonce on state"));
    }

    var jwt = JoseUtil.parseJwt(response.id_token);

    if (!jwt || !jwt.header || !jwt.payload) {
      Log.error("ResponseValidator._validateIdToken: Failed to parse id_token", jwt);
      return Promise.reject(new Error("Failed to parse id_token"));
    }

    var payload = jwt.payload;

    if (state.nonce !== payload.nonce) {
      Log.error("ResponseValidator._validateIdToken: Invalid nonce in id_token");
      return Promise.reject(new Error("Invalid nonce in id_token"));
    }

    return this._metadataService.getIssuer().then(function (issuer) {
      Log.debug("ResponseValidator._validateIdToken: Received issuer");
      return _this8._getSigningKeyForJwtWithSingleRetry(jwt).then(function (key) {
        if (!key) {
          Log.error("ResponseValidator._validateIdToken: No key matching kid or alg found in signing keys");
          return Promise.reject(new Error("No key matching kid or alg found in signing keys"));
        }

        var audience = state.client_id;
        var clockSkewInSeconds = _this8._settings.clockSkew;
        Log.debug("ResponseValidator._validateIdToken: Validaing JWT; using clock skew (in seconds) of: ", clockSkewInSeconds);
        return JoseUtil.validateJwt(response.id_token, key, issuer, audience, clockSkewInSeconds).then(function () {
          Log.debug("ResponseValidator._validateIdToken: JWT validation successful");

          if (!payload.sub) {
            Log.error("ResponseValidator._validateIdToken: No sub present in id_token");
            return Promise.reject(new Error("No sub present in id_token"));
          }

          response.profile = payload;
          return response;
        });
      });
    });
  };

  _proto._filterByAlg = function _filterByAlg(keys, alg) {
    var kty = null;

    if (alg.startsWith("RS")) {
      kty = "RSA";
    } else if (alg.startsWith("PS")) {
      kty = "PS";
    } else if (alg.startsWith("ES")) {
      kty = "EC";
    } else {
      Log.debug("ResponseValidator._filterByAlg: alg not supported: ", alg);
      return [];
    }

    Log.debug("ResponseValidator._filterByAlg: Looking for keys that match kty: ", kty);
    keys = keys.filter(function (key) {
      return key.kty === kty;
    });
    Log.debug("ResponseValidator._filterByAlg: Number of keys that match kty: ", kty, keys.length);
    return keys;
  };

  _proto._validateAccessToken = function _validateAccessToken(response) {
    if (!response.profile) {
      Log.error("ResponseValidator._validateAccessToken: No profile loaded from id_token");
      return Promise.reject(new Error("No profile loaded from id_token"));
    }

    if (!response.profile.at_hash) {
      Log.error("ResponseValidator._validateAccessToken: No at_hash in id_token");
      return Promise.reject(new Error("No at_hash in id_token"));
    }

    if (!response.id_token) {
      Log.error("ResponseValidator._validateAccessToken: No id_token");
      return Promise.reject(new Error("No id_token"));
    }

    var jwt = JoseUtil.parseJwt(response.id_token);

    if (!jwt || !jwt.header) {
      Log.error("ResponseValidator._validateAccessToken: Failed to parse id_token", jwt);
      return Promise.reject(new Error("Failed to parse id_token"));
    }

    var hashAlg = jwt.header.alg;

    if (!hashAlg || hashAlg.length !== 5) {
      Log.error("ResponseValidator._validateAccessToken: Unsupported alg:", hashAlg);
      return Promise.reject(new Error("Unsupported alg: " + hashAlg));
    }

    var hashBitsString = hashAlg.substr(2, 3);

    if (!hashBitsString) {
      Log.error("ResponseValidator._validateAccessToken: Unsupported alg:", hashAlg, hashBitsString);
      return Promise.reject(new Error("Unsupported alg: " + hashAlg));
    }

    var hashBits = parseInt(hashBitsString);

    if (hashBits !== 256 && hashBits !== 384 && hashBits !== 512) {
      Log.error("ResponseValidator._validateAccessToken: Unsupported alg:", hashAlg, hashBits);
      return Promise.reject(new Error("Unsupported alg: " + hashAlg));
    }

    var sha = "sha" + hashBits;
    var hash = JoseUtil.hashString(response.access_token, sha);

    if (!hash) {
      Log.error("ResponseValidator._validateAccessToken: access_token hash failed:", sha);
      return Promise.reject(new Error("Failed to validate at_hash"));
    }

    var left = hash.substr(0, hash.length / 2);
    var left_b64u = JoseUtil.hexToBase64Url(left);

    if (left_b64u !== response.profile.at_hash) {
      Log.error("ResponseValidator._validateAccessToken: Failed to validate at_hash", left_b64u, response.profile.at_hash);
      return Promise.reject(new Error("Failed to validate at_hash"));
    }

    Log.debug("ResponseValidator._validateAccessToken: success");
    return Promise.resolve(response);
  };

  return ResponseValidator;
}();

var OidcMetadataUrlPath$1 = '.well-known/openid-configuration';
var DefaultResponseType = "id_token";
var DefaultScope = "openid";
var DefaultClientAuthentication = "client_secret_post"; // The default value must be client_secret_basic, as explained in https://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication

var DefaultStaleStateAge = 60 * 15; // seconds

var DefaultClockSkewInSeconds = 60 * 5;
var OidcClientSettingsStore = /*#__PURE__*/function () {
  function OidcClientSettingsStore(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        authority = _ref.authority,
        metadataUrl = _ref.metadataUrl,
        metadata = _ref.metadata,
        signingKeys = _ref.signingKeys,
        metadataSeed = _ref.metadataSeed,
        _ref$client_id = _ref.client_id,
        client_id = _ref$client_id === void 0 ? "" : _ref$client_id,
        client_secret = _ref.client_secret,
        _ref$response_type = _ref.response_type,
        response_type = _ref$response_type === void 0 ? DefaultResponseType : _ref$response_type,
        _ref$scope = _ref.scope,
        scope = _ref$scope === void 0 ? DefaultScope : _ref$scope,
        redirect_uri = _ref.redirect_uri,
        post_logout_redirect_uri = _ref.post_logout_redirect_uri,
        _ref$client_authentic = _ref.client_authentication,
        client_authentication = _ref$client_authentic === void 0 ? DefaultClientAuthentication : _ref$client_authentic,
        prompt = _ref.prompt,
        display = _ref.display,
        max_age = _ref.max_age,
        ui_locales = _ref.ui_locales,
        acr_values = _ref.acr_values,
        resource = _ref.resource,
        response_mode = _ref.response_mode,
        _ref$filterProtocolCl = _ref.filterProtocolClaims,
        filterProtocolClaims = _ref$filterProtocolCl === void 0 ? true : _ref$filterProtocolCl,
        _ref$loadUserInfo = _ref.loadUserInfo,
        loadUserInfo = _ref$loadUserInfo === void 0 ? true : _ref$loadUserInfo,
        _ref$staleStateAge = _ref.staleStateAge,
        staleStateAge = _ref$staleStateAge === void 0 ? DefaultStaleStateAge : _ref$staleStateAge,
        _ref$clockSkew = _ref.clockSkew,
        clockSkew = _ref$clockSkew === void 0 ? DefaultClockSkewInSeconds : _ref$clockSkew,
        _ref$clockService = _ref.clockService,
        clockService = _ref$clockService === void 0 ? new ClockService() : _ref$clockService,
        _ref$userInfoJwtIssue = _ref.userInfoJwtIssuer,
        userInfoJwtIssuer = _ref$userInfoJwtIssue === void 0 ? 'OP' : _ref$userInfoJwtIssue,
        _ref$mergeClaims = _ref.mergeClaims,
        mergeClaims = _ref$mergeClaims === void 0 ? false : _ref$mergeClaims,
        _ref$stateStore = _ref.stateStore,
        stateStore = _ref$stateStore === void 0 ? new WebStorageStateStore() : _ref$stateStore,
        _ref$ResponseValidato = _ref.ResponseValidatorCtor,
        ResponseValidatorCtor = _ref$ResponseValidato === void 0 ? ResponseValidator : _ref$ResponseValidato,
        _ref$MetadataServiceC = _ref.MetadataServiceCtor,
        MetadataServiceCtor = _ref$MetadataServiceC === void 0 ? MetadataService : _ref$MetadataServiceC,
        _ref$extraQueryParams = _ref.extraQueryParams,
        extraQueryParams = _ref$extraQueryParams === void 0 ? {} : _ref$extraQueryParams,
        _ref$extraTokenParams = _ref.extraTokenParams,
        extraTokenParams = _ref$extraTokenParams === void 0 ? {} : _ref$extraTokenParams;

    this._authority = authority;
    this._metadataUrl = metadataUrl;
    this._metadata = metadata;
    this._metadataSeed = metadataSeed;
    this._signingKeys = signingKeys;
    this._client_id = client_id;
    this._client_secret = client_secret;
    this._response_type = response_type;
    this._scope = scope;
    this._redirect_uri = redirect_uri;
    this._post_logout_redirect_uri = post_logout_redirect_uri;
    this._client_authentication = client_authentication;
    this._prompt = prompt;
    this._display = display;
    this._max_age = max_age;
    this._ui_locales = ui_locales;
    this._acr_values = acr_values;
    this._resource = resource;
    this._response_mode = response_mode;
    this._filterProtocolClaims = !!filterProtocolClaims;
    this._loadUserInfo = !!loadUserInfo;
    this._staleStateAge = staleStateAge;
    this._clockSkew = clockSkew;
    this._clockService = clockService;
    this._userInfoJwtIssuer = userInfoJwtIssuer;
    this._mergeClaims = !!mergeClaims;
    this._stateStore = stateStore;
    this._validator = new ResponseValidatorCtor(this);
    this._metadataService = new MetadataServiceCtor(this);
    this._extraQueryParams = typeof extraQueryParams === 'object' ? extraQueryParams : {};
    this._extraTokenParams = typeof extraTokenParams === 'object' ? extraTokenParams : {};
  } // client config


  var _proto = OidcClientSettingsStore.prototype;

  // get the time
  _proto.getEpochTime = function getEpochTime() {
    return this._clockService.getEpochTime();
  };

  _createClass(OidcClientSettingsStore, [{
    key: "client_id",
    get: function get() {
      return this._client_id;
    },
    set: function set(value) {
      if (!this._client_id) {
        // one-time set only
        this._client_id = value;
      } else {
        Log.error("OidcClientSettings.set_client_id: client_id has already been assigned.");
        throw new Error("client_id has already been assigned.");
      }
    }
  }, {
    key: "client_secret",
    get: function get() {
      return this._client_secret;
    }
  }, {
    key: "response_type",
    get: function get() {
      return this._response_type;
    }
  }, {
    key: "scope",
    get: function get() {
      return this._scope;
    }
  }, {
    key: "redirect_uri",
    get: function get() {
      return this._redirect_uri;
    }
  }, {
    key: "post_logout_redirect_uri",
    get: function get() {
      return this._post_logout_redirect_uri;
    }
  }, {
    key: "client_authentication",
    get: function get() {
      return this._client_authentication;
    } // optional protocol params

  }, {
    key: "prompt",
    get: function get() {
      return this._prompt;
    }
  }, {
    key: "display",
    get: function get() {
      return this._display;
    }
  }, {
    key: "max_age",
    get: function get() {
      return this._max_age;
    }
  }, {
    key: "ui_locales",
    get: function get() {
      return this._ui_locales;
    }
  }, {
    key: "acr_values",
    get: function get() {
      return this._acr_values;
    }
  }, {
    key: "resource",
    get: function get() {
      return this._resource;
    }
  }, {
    key: "response_mode",
    get: function get() {
      return this._response_mode;
    } // metadata

  }, {
    key: "authority",
    get: function get() {
      return this._authority;
    },
    set: function set(value) {
      if (!this._authority) {
        // one-time set only
        this._authority = value;
      } else {
        Log.error("OidcClientSettings.set_authority: authority has already been assigned.");
        throw new Error("authority has already been assigned.");
      }
    }
  }, {
    key: "metadataUrl",
    get: function get() {
      if (!this._metadataUrl) {
        this._metadataUrl = this.authority;

        if (this._metadataUrl && this._metadataUrl.indexOf(OidcMetadataUrlPath$1) < 0) {
          if (this._metadataUrl[this._metadataUrl.length - 1] !== '/') {
            this._metadataUrl += '/';
          }

          this._metadataUrl += OidcMetadataUrlPath$1;
        }
      }

      return this._metadataUrl;
    } // settable/cachable metadata values

  }, {
    key: "metadata",
    get: function get() {
      return this._metadata;
    },
    set: function set(value) {
      this._metadata = value;
    }
  }, {
    key: "metadataSeed",
    get: function get() {
      return this._metadataSeed;
    },
    set: function set(value) {
      this._metadataSeed = value;
    }
  }, {
    key: "signingKeys",
    get: function get() {
      return this._signingKeys;
    },
    set: function set(value) {
      this._signingKeys = value;
    } // behavior flags

  }, {
    key: "filterProtocolClaims",
    get: function get() {
      return this._filterProtocolClaims;
    }
  }, {
    key: "loadUserInfo",
    get: function get() {
      return this._loadUserInfo;
    }
  }, {
    key: "staleStateAge",
    get: function get() {
      return this._staleStateAge;
    }
  }, {
    key: "clockSkew",
    get: function get() {
      return this._clockSkew;
    }
  }, {
    key: "userInfoJwtIssuer",
    get: function get() {
      return this._userInfoJwtIssuer;
    }
  }, {
    key: "mergeClaims",
    get: function get() {
      return this._mergeClaims;
    }
  }, {
    key: "stateStore",
    get: function get() {
      return this._stateStore;
    }
  }, {
    key: "validator",
    get: function get() {
      return this._validator;
    }
  }, {
    key: "metadataService",
    get: function get() {
      return this._metadataService;
    } // extra query params

  }, {
    key: "extraQueryParams",
    get: function get() {
      return this._extraQueryParams;
    },
    set: function set(value) {
      if (typeof value === 'object') {
        this._extraQueryParams = value;
      } else {
        this._extraQueryParams = {};
      }
    } // extra token params

  }, {
    key: "extraTokenParams",
    get: function get() {
      return this._extraTokenParams;
    },
    set: function set(value) {
      if (typeof value === 'object') {
        this._extraTokenParams = value;
      } else {
        this._extraTokenParams = {};
      }
    }
  }]);

  return OidcClientSettingsStore;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var UrlUtility = /*#__PURE__*/function () {
  function UrlUtility() {}

  UrlUtility.addQueryParam = function addQueryParam(url, name, value) {
    if (url.indexOf('?') < 0) {
      url += "?";
    }

    if (url[url.length - 1] !== "?") {
      url += "&";
    }

    url += encodeURIComponent(name);
    url += "=";
    url += encodeURIComponent(value);
    return url;
  };

  UrlUtility.parseUrlFragment = function parseUrlFragment(value, delimiter, global) {
    if (delimiter === void 0) {
      delimiter = "#";
    }

    if (global === void 0) {
      global = Global;
    }

    if (typeof value !== 'string') {
      value = global.location.href;
    }

    var idx = value.lastIndexOf(delimiter);

    if (idx >= 0) {
      value = value.substr(idx + 1);
    }

    if (delimiter === "?") {
      // if we're doing query, then strip off hash fragment before we parse
      idx = value.indexOf('#');

      if (idx >= 0) {
        value = value.substr(0, idx);
      }
    }

    var params = {};
    var regex = /([^&=]+)=([^&]*)/g,
        m;
    var counter = 0;

    while (m = regex.exec(value)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2].replace(/\+/g, ' '));

      if (counter++ > 50) {
        Log.error("UrlUtility.parseUrlFragment: response exceeded expected number of parameters", value);
        return {
          error: "Response exceeded expected number of parameters"
        };
      }
    }

    return params;
  };

  return UrlUtility;
}();

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

/**
 * Generates RFC4122 version 4 guid ()
 */
// @ts-ignore
var crypto = typeof window !== 'undefined' ? window.crypto || window.msCrypto : undefined;

function _cryptoUuidv4() {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  });
}

function _uuidv4() {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ Math.random() * 16 >> c / 4).toString(16);
  });
}

function random() {
  var hasRandomValues = crypto && crypto.hasOwnProperty("getRandomValues");
  var uuid = hasRandomValues ? _cryptoUuidv4 : _uuidv4;
  return uuid().replace(/-/g, '');
}

var State = /*#__PURE__*/function () {
  function State(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        id = _ref.id,
        data = _ref.data,
        created = _ref.created,
        request_type = _ref.request_type;

    this._id = id || random();
    this._data = data;

    if (typeof created === 'number' && created > 0) {
      this._created = created;
    } else {
      this._created = Math.floor(Date.now() / 1000);
    }

    this._request_type = request_type;
  }

  var _proto = State.prototype;

  _proto.toStorageString = function toStorageString() {
    Log.debug("State.toStorageString");
    return JSON.stringify({
      id: this.id,
      data: this.data,
      created: this.created,
      request_type: this.request_type
    });
  };

  State.fromStorageString = function fromStorageString(storageString) {
    Log.debug("State.fromStorageString");
    return new State(JSON.parse(storageString));
  };

  State.clearStaleState = function clearStaleState(storage, age) {
    var cutoff = Date.now() / 1000 - age;
    return storage.getAllKeys().then( /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(keys) {
        var promises, _loop, i, p;

        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                Log.debug("State.clearStaleState: got keys", keys);
                promises = [];

                _loop = function _loop(i) {
                  var key = keys[i];
                  p = storage.get(key).then(function (item) {
                    var remove = false;

                    if (item) {
                      try {
                        var state = State.fromStorageString(item);
                        Log.debug("State.clearStaleState: got item from key: ", key, state.created);

                        if (state.created <= cutoff) {
                          remove = true;
                        }
                      } catch (e) {
                        Log.error("State.clearStaleState: Error parsing state for key", key, e.message);
                        remove = true;
                      }
                    } else {
                      Log.debug("State.clearStaleState: no item in storage for key: ", key);
                      remove = true;
                    }

                    if (remove) {
                      Log.debug("State.clearStaleState: removed item for key: ", key);
                      storage.remove(key);
                    }
                  });
                  promises.push(p);
                };

                for (i = 0; i < keys.length; i++) {
                  _loop(i);
                }

                Log.debug("State.clearStaleState: waiting on promise count:", promises.length);
                _context.next = 7;
                return Promise.all(promises);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
  };

  _createClass(State, [{
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "data",
    get: function get() {
      return this._data;
    }
  }, {
    key: "created",
    get: function get() {
      return this._created;
    }
  }, {
    key: "request_type",
    get: function get() {
      return this._request_type;
    }
  }]);

  return State;
}();

var SigninState = /*#__PURE__*/function (_State) {
  _inheritsLoose(SigninState, _State);

  function SigninState(_temp) {
    var _this;

    var _ref = _temp === void 0 ? {} : _temp,
        nonce = _ref.nonce,
        authority = _ref.authority,
        client_id = _ref.client_id,
        redirect_uri = _ref.redirect_uri,
        code_verifier = _ref.code_verifier,
        response_mode = _ref.response_mode,
        client_secret = _ref.client_secret,
        scope = _ref.scope,
        extraTokenParams = _ref.extraTokenParams,
        skipUserInfo = _ref.skipUserInfo;

    _this = _State.call(this, arguments[0]) || this;

    if (nonce === true) {
      _this._nonce = random();
    } else if (nonce) {
      _this._nonce = nonce;
    }

    if (code_verifier === true) {
      // random() produces 32 length
      _this._code_verifier = random() + random() + random();
    } else if (code_verifier) {
      _this._code_verifier = code_verifier;
    }

    if (_this.code_verifier) {
      var hash = JoseUtil.hashString(_this.code_verifier, "SHA256");
      _this._code_challenge = JoseUtil.hexToBase64Url(hash);
    }

    _this._redirect_uri = redirect_uri;
    _this._authority = authority;
    _this._client_id = client_id;
    _this._response_mode = response_mode;
    _this._client_secret = client_secret;
    _this._scope = scope;
    _this._extraTokenParams = extraTokenParams;
    _this._skipUserInfo = skipUserInfo;
    return _this;
  }

  var _proto = SigninState.prototype;

  _proto.toStorageString = function toStorageString() {
    Log.debug("SigninState.toStorageString");
    return JSON.stringify({
      id: this.id,
      data: this.data,
      created: this.created,
      request_type: this.request_type,
      nonce: this.nonce,
      code_verifier: this.code_verifier,
      redirect_uri: this.redirect_uri,
      authority: this.authority,
      client_id: this.client_id,
      response_mode: this.response_mode,
      client_secret: this.client_secret,
      scope: this.scope,
      extraTokenParams: this.extraTokenParams,
      skipUserInfo: this.skipUserInfo
    });
  };

  SigninState.fromStorageString = function fromStorageString(storageString) {
    Log.debug("SigninState.fromStorageString");
    var data = JSON.parse(storageString);
    return new SigninState(data);
  };

  _createClass(SigninState, [{
    key: "nonce",
    get: function get() {
      return this._nonce;
    }
  }, {
    key: "authority",
    get: function get() {
      return this._authority;
    }
  }, {
    key: "client_id",
    get: function get() {
      return this._client_id;
    }
  }, {
    key: "redirect_uri",
    get: function get() {
      return this._redirect_uri;
    }
  }, {
    key: "code_verifier",
    get: function get() {
      return this._code_verifier;
    }
  }, {
    key: "code_challenge",
    get: function get() {
      return this._code_challenge;
    }
  }, {
    key: "response_mode",
    get: function get() {
      return this._response_mode;
    }
  }, {
    key: "client_secret",
    get: function get() {
      return this._client_secret;
    }
  }, {
    key: "scope",
    get: function get() {
      return this._scope;
    }
  }, {
    key: "extraTokenParams",
    get: function get() {
      return this._extraTokenParams;
    }
  }, {
    key: "skipUserInfo",
    get: function get() {
      return this._skipUserInfo;
    }
  }]);

  return SigninState;
}(State);

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var SigninRequest = /*#__PURE__*/function () {
  function SigninRequest(_ref) {
    var url = _ref.url,
        client_id = _ref.client_id,
        redirect_uri = _ref.redirect_uri,
        response_type = _ref.response_type,
        scope = _ref.scope,
        authority = _ref.authority,
        data = _ref.data,
        prompt = _ref.prompt,
        display = _ref.display,
        max_age = _ref.max_age,
        ui_locales = _ref.ui_locales,
        id_token_hint = _ref.id_token_hint,
        login_hint = _ref.login_hint,
        acr_values = _ref.acr_values,
        resource = _ref.resource,
        response_mode = _ref.response_mode,
        request = _ref.request,
        request_uri = _ref.request_uri,
        extraQueryParams = _ref.extraQueryParams,
        request_type = _ref.request_type,
        client_secret = _ref.client_secret,
        extraTokenParams = _ref.extraTokenParams,
        skipUserInfo = _ref.skipUserInfo;

    if (!url) {
      Log.error("SigninRequest.ctor: No url passed");
      throw new Error("url");
    }

    if (!client_id) {
      Log.error("SigninRequest.ctor: No client_id passed");
      throw new Error("client_id");
    }

    if (!redirect_uri) {
      Log.error("SigninRequest.ctor: No redirect_uri passed");
      throw new Error("redirect_uri");
    }

    if (!response_type) {
      Log.error("SigninRequest.ctor: No response_type passed");
      throw new Error("response_type");
    }

    if (!scope) {
      Log.error("SigninRequest.ctor: No scope passed");
      throw new Error("scope");
    }

    if (!authority) {
      Log.error("SigninRequest.ctor: No authority passed");
      throw new Error("authority");
    }

    var oidc = SigninRequest.isOidc(response_type);
    var code = SigninRequest.isCode(response_type);

    if (!response_mode) {
      response_mode = SigninRequest.isCode(response_type) ? "query" : null;
    }

    this.state = new SigninState({
      nonce: oidc,
      data: data,
      client_id: client_id,
      authority: authority,
      redirect_uri: redirect_uri,
      code_verifier: code,
      request_type: request_type,
      response_mode: response_mode,
      client_secret: client_secret,
      scope: scope,
      extraTokenParams: extraTokenParams,
      skipUserInfo: skipUserInfo
    });
    url = UrlUtility.addQueryParam(url, "client_id", client_id);
    url = UrlUtility.addQueryParam(url, "redirect_uri", redirect_uri);
    url = UrlUtility.addQueryParam(url, "response_type", response_type);
    url = UrlUtility.addQueryParam(url, "scope", scope);
    url = UrlUtility.addQueryParam(url, "state", this.state.id);

    if (oidc) {
      url = UrlUtility.addQueryParam(url, "nonce", this.state.nonce);
    }

    if (code) {
      url = UrlUtility.addQueryParam(url, "code_challenge", this.state.code_challenge);
      url = UrlUtility.addQueryParam(url, "code_challenge_method", "S256");
    }

    var optional = {
      prompt: prompt,
      display: display,
      max_age: max_age,
      ui_locales: ui_locales,
      id_token_hint: id_token_hint,
      login_hint: login_hint,
      acr_values: acr_values,
      resource: resource,
      request: request,
      request_uri: request_uri,
      response_mode: response_mode
    };

    for (var key in optional) {
      if (optional[key]) {
        url = UrlUtility.addQueryParam(url, key, optional[key]);
      }
    }

    for (var _key in extraQueryParams) {
      url = UrlUtility.addQueryParam(url, _key, extraQueryParams[_key]);
    }

    this.url = url;
  }

  SigninRequest.isOidc = function isOidc(response_type) {
    var result = response_type.split(/\s+/g).filter(function (item) {
      return item === "id_token";
    });
    return !!result[0];
  };

  SigninRequest.isOAuth = function isOAuth(response_type) {
    var result = response_type.split(/\s+/g).filter(function (item) {
      return item === "token";
    });
    return !!result[0];
  };

  SigninRequest.isCode = function isCode(response_type) {
    var result = response_type.split(/\s+/g).filter(function (item) {
      return item === "code";
    });
    return !!result[0];
  };

  return SigninRequest;
}();

var OidcScope = "openid";
var SigninResponse = /*#__PURE__*/function () {
  function SigninResponse(url, delimiter) {
    if (delimiter === void 0) {
      delimiter = "#";
    }

    var values = UrlUtility.parseUrlFragment(url, delimiter);
    this.error = values.error;
    this.error_description = values.error_description;
    this.error_uri = values.error_uri;
    this.code = values.code;
    this.state = values.state;
    this.id_token = values.id_token;
    this.session_state = values.session_state;
    this.access_token = values.access_token;
    this.token_type = values.token_type;
    this.scope = values.scope;
    this.expires_in = parseInt(values.expires_in);
    this.profile = undefined;
  }

  _createClass(SigninResponse, [{
    key: "expires_in",
    get: function get() {
      if (this.expires_at) {
        var now = Math.floor(Date.now() / 1000);
        return this.expires_at - now;
      }

      return undefined;
    },
    set: function set(value) {
      if (typeof value === 'number' && value > 0) {
        var expires_in = Math.floor(value);
        var now = Math.floor(Date.now() / 1000);
        this.expires_at = now + expires_in;
      }
    }
  }, {
    key: "expired",
    get: function get() {
      var expires_in = this.expires_in;

      if (expires_in !== undefined) {
        return expires_in <= 0;
      }

      return undefined;
    }
  }, {
    key: "scopes",
    get: function get() {
      return (this.scope || "").split(" ");
    }
  }, {
    key: "isOpenIdConnect",
    get: function get() {
      return this.scopes.indexOf(OidcScope) >= 0 || !!this.id_token;
    }
  }]);

  return SigninResponse;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var SignoutRequest = function SignoutRequest(_ref) {
  var url = _ref.url,
      id_token_hint = _ref.id_token_hint,
      post_logout_redirect_uri = _ref.post_logout_redirect_uri,
      data = _ref.data,
      extraQueryParams = _ref.extraQueryParams,
      request_type = _ref.request_type;

  if (!url) {
    Log.error("SignoutRequest.ctor: No url passed");
    throw new Error("url");
  }

  if (id_token_hint) {
    url = UrlUtility.addQueryParam(url, "id_token_hint", id_token_hint);
  }

  if (post_logout_redirect_uri) {
    url = UrlUtility.addQueryParam(url, "post_logout_redirect_uri", post_logout_redirect_uri);

    if (data) {
      this.state = new State({
        data: data,
        request_type: request_type
      });
      url = UrlUtility.addQueryParam(url, "state", this.state.id);
    }
  }

  for (var key in extraQueryParams) {
    url = UrlUtility.addQueryParam(url, key, extraQueryParams[key]);
  }

  this.url = url;
};

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var SignoutResponse = function SignoutResponse(url) {
  var values = UrlUtility.parseUrlFragment(url, "?");
  this.error = values.error;
  this.error_description = values.error_description;
  this.error_uri = values.error_uri;
  this.state = values.state;
};

var OidcClient = /*#__PURE__*/function () {
  function OidcClient(settings) {
    if (settings === void 0) {
      settings = {};
    }

    this._settings = new OidcClientSettingsStore(settings);
  }

  var _proto = OidcClient.prototype;

  _proto.createSigninRequest = function createSigninRequest(_temp, stateStore) {
    var _this = this;

    var _ref = _temp === void 0 ? {} : _temp,
        response_type = _ref.response_type,
        scope = _ref.scope,
        redirect_uri = _ref.redirect_uri,
        data = _ref.data,
        state = _ref.state,
        prompt = _ref.prompt,
        display = _ref.display,
        max_age = _ref.max_age,
        ui_locales = _ref.ui_locales,
        id_token_hint = _ref.id_token_hint,
        login_hint = _ref.login_hint,
        acr_values = _ref.acr_values,
        resource = _ref.resource,
        request = _ref.request,
        request_uri = _ref.request_uri,
        response_mode = _ref.response_mode,
        extraQueryParams = _ref.extraQueryParams,
        extraTokenParams = _ref.extraTokenParams,
        request_type = _ref.request_type,
        skipUserInfo = _ref.skipUserInfo;

    Log.debug("OidcClient.createSigninRequest");
    var client_id = this._settings.client_id;
    response_type = response_type || this._settings.response_type;
    scope = scope || this._settings.scope;
    redirect_uri = redirect_uri || this._settings.redirect_uri; // id_token_hint, login_hint aren't allowed on _settings

    prompt = prompt || this._settings.prompt;
    display = display || this._settings.display;
    max_age = max_age || this._settings.max_age;
    ui_locales = ui_locales || this._settings.ui_locales;
    acr_values = acr_values || this._settings.acr_values;
    resource = resource || this._settings.resource;
    response_mode = response_mode || this._settings.response_mode;
    extraQueryParams = extraQueryParams || this._settings.extraQueryParams;
    extraTokenParams = extraTokenParams || this._settings.extraTokenParams;
    var authority = this._settings.authority;

    if (SigninRequest.isCode(response_type) && response_type !== "code") {
      return Promise.reject(new Error("OpenID Connect hybrid flow is not supported"));
    }

    return this._metadataService.getAuthorizationEndpoint().then(function (url) {
      Log.debug("OidcClient.createSigninRequest: Received authorization endpoint", url);
      var signinRequest = new SigninRequest({
        url: url,
        client_id: client_id,
        redirect_uri: redirect_uri,
        response_type: response_type,
        scope: scope,
        data: data || state,
        authority: authority,
        prompt: prompt,
        display: display,
        max_age: max_age,
        ui_locales: ui_locales,
        id_token_hint: id_token_hint,
        login_hint: login_hint,
        acr_values: acr_values,
        resource: resource,
        request: request,
        request_uri: request_uri,
        extraQueryParams: extraQueryParams,
        extraTokenParams: extraTokenParams,
        request_type: request_type,
        response_mode: response_mode,
        client_secret: _this._settings.client_secret,
        skipUserInfo: skipUserInfo
      });
      var signinState = signinRequest.state;
      stateStore = stateStore || _this._stateStore;
      return stateStore.set(signinState.id, signinState.toStorageString()).then(function () {
        return signinRequest;
      });
    });
  };

  _proto.readSigninResponseState = function readSigninResponseState(url, stateStore, removeState) {
    if (stateStore === void 0) {
      stateStore = null;
    }

    if (removeState === void 0) {
      removeState = false;
    }

    Log.debug("OidcClient.readSigninResponseState");
    var useQuery = this._settings.response_mode === "query" || !this._settings.response_mode && this._settings.response_type && SigninRequest.isCode(this._settings.response_type);
    var delimiter = useQuery ? "?" : "#";
    var response = new SigninResponse(url, delimiter);

    if (!response.state) {
      Log.error("OidcClient.readSigninResponseState: No state in response");
      return Promise.reject(new Error("No state in response"));
    }

    stateStore = stateStore || this._stateStore;
    var stateApi = removeState ? stateStore.remove.bind(stateStore) : stateStore.get.bind(stateStore);
    return stateApi(response.state).then(function (storedStateString) {
      if (!storedStateString) {
        Log.error("OidcClient.readSigninResponseState: No matching state found in storage");
        throw new Error("No matching state found in storage");
      }

      var state = SigninState.fromStorageString(storedStateString);
      return {
        state: state,
        response: response
      };
    });
  };

  _proto.processSigninResponse = function processSigninResponse(url, stateStore) {
    var _this2 = this;

    if (stateStore === void 0) {
      stateStore = null;
    }

    Log.debug("OidcClient.processSigninResponse");
    return this.readSigninResponseState(url, stateStore, true).then(function (_ref2) {
      var state = _ref2.state,
          response = _ref2.response;
      Log.debug("OidcClient.processSigninResponse: Received state from storage; validating response");
      return _this2._validator.validateSigninResponse(state, response);
    });
  };

  _proto.createSignoutRequest = function createSignoutRequest(_temp2, stateStore) {
    var _this3 = this;

    var _ref3 = _temp2 === void 0 ? {} : _temp2,
        id_token_hint = _ref3.id_token_hint,
        data = _ref3.data,
        state = _ref3.state,
        post_logout_redirect_uri = _ref3.post_logout_redirect_uri,
        extraQueryParams = _ref3.extraQueryParams,
        request_type = _ref3.request_type;

    if (stateStore === void 0) {
      stateStore = null;
    }

    Log.debug("OidcClient.createSignoutRequest");
    post_logout_redirect_uri = post_logout_redirect_uri || this._settings.post_logout_redirect_uri;
    extraQueryParams = extraQueryParams || this._settings.extraQueryParams;
    return this._metadataService.getEndSessionEndpoint().then(function (url) {
      if (!url) {
        Log.error("OidcClient.createSignoutRequest: No end session endpoint url returned");
        throw new Error("no end session endpoint");
      }

      Log.debug("OidcClient.createSignoutRequest: Received end session endpoint", url);
      var request = new SignoutRequest({
        url: url,
        id_token_hint: id_token_hint,
        post_logout_redirect_uri: post_logout_redirect_uri,
        data: data || state,
        extraQueryParams: extraQueryParams,
        request_type: request_type
      });
      var signoutState = request.state;

      if (signoutState) {
        Log.debug("OidcClient.createSignoutRequest: Signout request has state to persist");
        stateStore = stateStore || _this3._stateStore;
        stateStore.set(signoutState.id, signoutState.toStorageString());
      }

      return request;
    });
  };

  _proto.readSignoutResponseState = function readSignoutResponseState(url, stateStore, removeState) {
    if (stateStore === void 0) {
      stateStore = null;
    }

    if (removeState === void 0) {
      removeState = false;
    }

    Log.debug("OidcClient.readSignoutResponseState");
    var response = new SignoutResponse(url);

    if (!response.state) {
      Log.debug("OidcClient.readSignoutResponseState: No state in response");

      if (response.error) {
        Log.warn("OidcClient.readSignoutResponseState: Response was error: ", response.error);
        return Promise.reject(new ErrorResponse(response));
      }

      return Promise.resolve({
        state: undefined,
        response: response
      });
    }

    var stateKey = response.state;
    stateStore = stateStore || this._stateStore;
    var stateApi = removeState ? stateStore.remove.bind(stateStore) : stateStore.get.bind(stateStore);
    return stateApi(stateKey).then(function (storedStateString) {
      if (!storedStateString) {
        Log.error("OidcClient.readSignoutResponseState: No matching state found in storage");
        throw new Error("No matching state found in storage");
      }

      var state = State.fromStorageString(storedStateString);
      return {
        state: state,
        response: response
      };
    });
  };

  _proto.processSignoutResponse = function processSignoutResponse(url, stateStore) {
    var _this4 = this;

    if (stateStore === void 0) {
      stateStore = null;
    }

    Log.debug("OidcClient.processSignoutResponse");
    return this.readSignoutResponseState(url, stateStore, true).then(function (_ref4) {
      var state = _ref4.state,
          response = _ref4.response;

      if (state) {
        Log.debug("OidcClient.processSignoutResponse: Received state from storage; validating response");
        return _this4._validator.validateSignoutResponse(state, response);
      } else {
        Log.debug("OidcClient.processSignoutResponse: No state from storage; skipping validating response");
        return response;
      }
    });
  };

  _proto.clearStaleState = function clearStaleState(stateStore) {
    if (stateStore === void 0) {
      stateStore = null;
    }

    Log.debug("OidcClient.clearStaleState");
    stateStore = stateStore || this._stateStore;
    return State.clearStaleState(stateStore, this.settings.staleStateAge);
  };

  _createClass(OidcClient, [{
    key: "_stateStore",
    get: function get() {
      return this.settings.stateStore;
    }
  }, {
    key: "_validator",
    get: function get() {
      return this.settings.validator;
    }
  }, {
    key: "_metadataService",
    get: function get() {
      return this.settings.metadataService;
    }
  }, {
    key: "settings",
    get: function get() {
      return this._settings;
    }
  }, {
    key: "metadataService",
    get: function get() {
      return this._metadataService;
    }
  }]);

  return OidcClient;
}();

var InMemoryWebStorage = /*#__PURE__*/function () {
  function InMemoryWebStorage() {
    this._data = {};
  }

  var _proto = InMemoryWebStorage.prototype;

  _proto.clear = function clear() {
    Log.debug("InMemoryWebStorage.clear");
    this._data = {};
  };

  _proto.getItem = function getItem(key) {
    Log.debug("InMemoryWebStorage.getItem", key);
    return this._data[key];
  };

  _proto.setItem = function setItem(key, value) {
    Log.debug("InMemoryWebStorage.setItem", key);
    this._data[key] = value;
  };

  _proto.removeItem = function removeItem(key) {
    Log.debug("InMemoryWebStorage.removeItem", key);
    delete this._data[key];
  };

  _proto.key = function key(index) {
    return Object.getOwnPropertyNames(this._data)[index];
  };

  _createClass(InMemoryWebStorage, [{
    key: "length",
    get: function get() {
      return Object.getOwnPropertyNames(this._data).length;
    }
  }]);

  return InMemoryWebStorage;
}();

var RedirectNavigator = /*#__PURE__*/function () {
  function RedirectNavigator() {}

  var _proto = RedirectNavigator.prototype;

  _proto.prepare = function prepare(_params) {
    return Promise.resolve(this);
  };

  _proto.navigate = function navigate(params) {
    if (!params || !params.url) {
      Log.error("RedirectNavigator.navigate: No url provided");
      return Promise.reject(new Error("No url provided"));
    }

    if (params.useReplaceToNavigate) {
      window.location.replace(params.url);
    } else {
      window.location = params.url;
    }

    return Promise.resolve();
  };

  _proto.close = function close() {};

  _createClass(RedirectNavigator, [{
    key: "url",
    get: function get() {
      return window.location.href;
    }
  }]);

  return RedirectNavigator;
}();

var CheckForPopupClosedInterval = 500;
var DefaultPopupFeatures = 'location=no,toolbar=no,width=500,height=500,left=100,top=100;'; //const DefaultPopupFeatures = 'location=no,toolbar=no,width=500,height=500,left=100,top=100;resizable=yes';

var DefaultPopupTarget = "_blank";
var PopupWindow = /*#__PURE__*/function () {
  function PopupWindow(params) {
    var _this = this;

    this._promise = new Promise(function (resolve, reject) {
      _this._resolve = resolve;
      _this._reject = reject;
    });
    var target = params.popupWindowTarget || DefaultPopupTarget;
    var features = params.popupWindowFeatures || DefaultPopupFeatures;
    this._popup = window.open('', target, features);
    this._checkForPopupClosedTimer = null;

    if (this._popup) {
      Log.debug("PopupWindow.ctor: popup successfully created");
      this._checkForPopupClosedTimer = window.setInterval(this._checkForPopupClosed.bind(this), CheckForPopupClosedInterval);
    }
  }

  var _proto = PopupWindow.prototype;

  _proto.navigate = function navigate(params) {
    if (!this._popup) {
      this._error("PopupWindow.navigate: Error opening popup window");
    } else if (!params || !params.url) {
      this._error("PopupWindow.navigate: no url provided");

      this._error("No url provided");
    } else {
      Log.debug("PopupWindow.navigate: Setting URL in popup");
      this._id = params.id;

      if (this._id) {
        // @ts-ignore
        window["popupCallback_" + params.id] = this._callback.bind(this);
      }

      this._popup.focus();

      this._popup.window.location = params.url;
    }

    return this.promise;
  };

  _proto._success = function _success(data) {
    Log.debug("PopupWindow.callback: Successful response from popup window");

    this._cleanup();

    this._resolve(data);
  };

  _proto._error = function _error(message) {
    Log.error("PopupWindow.error: ", message);

    this._cleanup();

    this._reject(new Error(message));
  };

  _proto.close = function close() {
    this._cleanup(false);
  };

  _proto._cleanup = function _cleanup(keepOpen) {
    Log.debug("PopupWindow.cleanup");
    window.clearInterval(this._checkForPopupClosedTimer);
    this._checkForPopupClosedTimer = null; // @ts-ignore

    delete window["popupCallback_" + this._id];

    if (this._popup && !keepOpen) {
      this._popup.close();
    }

    this._popup = null;
  };

  _proto._checkForPopupClosed = function _checkForPopupClosed() {
    if (!this._popup || this._popup.closed) {
      this._error("Popup window closed");
    }
  };

  _proto._callback = function _callback(url, keepOpen) {
    this._cleanup(keepOpen);

    if (url) {
      Log.debug("PopupWindow.callback success");

      this._success({
        url: url
      });
    } else {
      Log.debug("PopupWindow.callback: Invalid response from popup");

      this._error("Invalid response from popup");
    }
  };

  PopupWindow.notifyOpener = function notifyOpener(url, keepOpen, delimiter) {
    if (window.opener) {
      url = url || window.location.href;

      if (url) {
        var data = UrlUtility.parseUrlFragment(url, delimiter);

        if (data.state) {
          var name = "popupCallback_" + data.state; // @ts-ignore

          var callback = window.opener[name];

          if (callback) {
            Log.debug("PopupWindow.notifyOpener: passing url message to opener");
            callback(url, keepOpen);
          } else {
            Log.warn("PopupWindow.notifyOpener: no matching callback found on opener");
          }
        } else {
          Log.warn("PopupWindow.notifyOpener: no state found in response url");
        }
      }
    } else {
      Log.warn("PopupWindow.notifyOpener: no window.opener. Can't complete notification.");
    }
  };

  _createClass(PopupWindow, [{
    key: "promise",
    get: function get() {
      return this._promise;
    }
  }]);

  return PopupWindow;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var PopupNavigator = /*#__PURE__*/function () {
  function PopupNavigator() {}

  var _proto = PopupNavigator.prototype;

  _proto.prepare = function prepare(params) {
    var popup = new PopupWindow(params);
    return Promise.resolve(popup);
  };

  _proto.callback = function callback(url, keepOpen, delimiter) {
    Log.debug("PopupNavigator.callback");

    try {
      PopupWindow.notifyOpener(url, keepOpen, delimiter);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return PopupNavigator;
}();

var DefaultTimeout = 10000;
var IFrameWindow = /*#__PURE__*/function () {
  function IFrameWindow(_params) {
    var _this = this;

    this._promise = new Promise(function (resolve, reject) {
      _this._resolve = resolve;
      _this._reject = reject;
    });
    this._boundMessageEvent = this._message.bind(this);
    window.addEventListener("message", this._boundMessageEvent, false);
    this._frame = window.document.createElement("iframe"); // shotgun approach

    this._frame.style.visibility = "hidden";
    this._frame.style.position = "absolute";
    this._frame.width = "0";
    this._frame.height = "0";
    window.document.body.appendChild(this._frame);
    this._timer = null;
  }

  var _proto = IFrameWindow.prototype;

  _proto.navigate = function navigate(params) {
    if (!params || !params.url) {
      this._error("No url provided");
    } else {
      var timeout = params.silentRequestTimeout || DefaultTimeout;
      Log.debug("IFrameWindow.navigate: Using timeout of:", timeout);
      this._timer = window.setTimeout(this._timeout.bind(this), timeout);
      this._frame.src = params.url;
    }

    return this.promise;
  };

  _proto._success = function _success(data) {
    this._cleanup();

    Log.debug("IFrameWindow: Successful response from frame window");

    this._resolve(data);
  };

  _proto._error = function _error(message) {
    this._cleanup();

    Log.error(message);

    this._reject(new Error(message));
  };

  _proto.close = function close() {
    this._cleanup();
  };

  _proto._cleanup = function _cleanup() {
    if (this._frame) {
      Log.debug("IFrameWindow: cleanup");
      window.removeEventListener("message", this._boundMessageEvent, false);
      window.clearTimeout(this._timer);
      window.document.body.removeChild(this._frame);
      this._timer = null;
      this._frame = null;
      this._boundMessageEvent = null;
    }
  };

  _proto._timeout = function _timeout() {
    Log.debug("IFrameWindow.timeout");

    this._error("Frame window timed out");
  };

  _proto._message = function _message(e) {
    Log.debug("IFrameWindow.message");

    if (this._timer && this._frame && e.origin === this._origin && e.source === this._frame.contentWindow && typeof e.data === 'string' && (e.data.startsWith('http://') || e.data.startsWith('https://'))) {
      var url = e.data;

      if (url) {
        this._success({
          url: url
        });
      } else {
        this._error("Invalid response from frame");
      }
    }
  };

  IFrameWindow.notifyParent = function notifyParent(url) {
    Log.debug("IFrameWindow.notifyParent");
    url = url || window.location.href;

    if (url) {
      Log.debug("IFrameWindow.notifyParent: posting url message to parent");
      window.parent.postMessage(url, location.protocol + "//" + location.host);
    }
  };

  _createClass(IFrameWindow, [{
    key: "promise",
    get: function get() {
      return this._promise;
    }
  }, {
    key: "_origin",
    get: function get() {
      return location.protocol + "//" + location.host;
    }
  }]);

  return IFrameWindow;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var IFrameNavigator = /*#__PURE__*/function () {
  function IFrameNavigator() {}

  var _proto = IFrameNavigator.prototype;

  _proto.prepare = function prepare(params) {
    var frame = new IFrameWindow(params);
    return Promise.resolve(frame);
  };

  _proto.callback = function callback(url) {
    Log.debug("IFrameNavigator.callback");

    try {
      IFrameWindow.notifyParent(url);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return IFrameNavigator;
}();

var DefaultAccessTokenExpiringNotificationTime = 60;
var DefaultCheckSessionInterval = 2000;
var UserManagerSettingsStore = /*#__PURE__*/function (_OidcClientSettingsSt) {
  _inheritsLoose(UserManagerSettingsStore, _OidcClientSettingsSt);

  function UserManagerSettingsStore(_temp) {
    var _this;

    var _ref = _temp === void 0 ? {} : _temp,
        popup_redirect_uri = _ref.popup_redirect_uri,
        popup_post_logout_redirect_uri = _ref.popup_post_logout_redirect_uri,
        popupWindowFeatures = _ref.popupWindowFeatures,
        popupWindowTarget = _ref.popupWindowTarget,
        silent_redirect_uri = _ref.silent_redirect_uri,
        silentRequestTimeout = _ref.silentRequestTimeout,
        _ref$automaticSilentR = _ref.automaticSilentRenew,
        automaticSilentRenew = _ref$automaticSilentR === void 0 ? false : _ref$automaticSilentR,
        _ref$validateSubOnSil = _ref.validateSubOnSilentRenew,
        validateSubOnSilentRenew = _ref$validateSubOnSil === void 0 ? false : _ref$validateSubOnSil,
        _ref$includeIdTokenIn = _ref.includeIdTokenInSilentRenew,
        includeIdTokenInSilentRenew = _ref$includeIdTokenIn === void 0 ? true : _ref$includeIdTokenIn,
        _ref$monitorSession = _ref.monitorSession,
        monitorSession = _ref$monitorSession === void 0 ? true : _ref$monitorSession,
        _ref$monitorAnonymous = _ref.monitorAnonymousSession,
        monitorAnonymousSession = _ref$monitorAnonymous === void 0 ? false : _ref$monitorAnonymous,
        _ref$checkSessionInte = _ref.checkSessionInterval,
        checkSessionInterval = _ref$checkSessionInte === void 0 ? DefaultCheckSessionInterval : _ref$checkSessionInte,
        _ref$stopCheckSession = _ref.stopCheckSessionOnError,
        stopCheckSessionOnError = _ref$stopCheckSession === void 0 ? true : _ref$stopCheckSession,
        query_status_response_type = _ref.query_status_response_type,
        _ref$revokeAccessToke = _ref.revokeAccessTokenOnSignout,
        revokeAccessTokenOnSignout = _ref$revokeAccessToke === void 0 ? false : _ref$revokeAccessToke,
        _ref$accessTokenExpir = _ref.accessTokenExpiringNotificationTime,
        accessTokenExpiringNotificationTime = _ref$accessTokenExpir === void 0 ? DefaultAccessTokenExpiringNotificationTime : _ref$accessTokenExpir,
        _ref$redirectNavigato = _ref.redirectNavigator,
        redirectNavigator = _ref$redirectNavigato === void 0 ? new RedirectNavigator() : _ref$redirectNavigato,
        _ref$popupNavigator = _ref.popupNavigator,
        popupNavigator = _ref$popupNavigator === void 0 ? new PopupNavigator() : _ref$popupNavigator,
        _ref$iframeNavigator = _ref.iframeNavigator,
        iframeNavigator = _ref$iframeNavigator === void 0 ? new IFrameNavigator() : _ref$iframeNavigator,
        _ref$userStore = _ref.userStore,
        userStore = _ref$userStore === void 0 ? new WebStorageStateStore({
      store: Global.sessionStorage
    }) : _ref$userStore;

    _this = _OidcClientSettingsSt.call(this, arguments[0]) || this;
    _this._popup_redirect_uri = popup_redirect_uri;
    _this._popup_post_logout_redirect_uri = popup_post_logout_redirect_uri;
    _this._popupWindowFeatures = popupWindowFeatures;
    _this._popupWindowTarget = popupWindowTarget;
    _this._silent_redirect_uri = silent_redirect_uri;
    _this._silentRequestTimeout = silentRequestTimeout;
    _this._automaticSilentRenew = automaticSilentRenew;
    _this._validateSubOnSilentRenew = validateSubOnSilentRenew;
    _this._includeIdTokenInSilentRenew = includeIdTokenInSilentRenew;
    _this._accessTokenExpiringNotificationTime = accessTokenExpiringNotificationTime;
    _this._monitorSession = monitorSession;
    _this._monitorAnonymousSession = monitorAnonymousSession;
    _this._checkSessionInterval = checkSessionInterval;
    _this._stopCheckSessionOnError = stopCheckSessionOnError;

    if (query_status_response_type) {
      _this._query_status_response_type = query_status_response_type;
    } else if (arguments[0] && arguments[0].response_type) {
      _this._query_status_response_type = SigninRequest.isOidc(arguments[0].response_type) ? "id_token" : "code";
    } else {
      _this._query_status_response_type = "id_token";
    }

    _this._revokeAccessTokenOnSignout = revokeAccessTokenOnSignout;
    _this._redirectNavigator = redirectNavigator;
    _this._popupNavigator = popupNavigator;
    _this._iframeNavigator = iframeNavigator;
    _this._userStore = userStore;
    return _this;
  }

  _createClass(UserManagerSettingsStore, [{
    key: "popup_redirect_uri",
    get: function get() {
      return this._popup_redirect_uri;
    }
  }, {
    key: "popup_post_logout_redirect_uri",
    get: function get() {
      return this._popup_post_logout_redirect_uri;
    }
  }, {
    key: "popupWindowFeatures",
    get: function get() {
      return this._popupWindowFeatures;
    }
  }, {
    key: "popupWindowTarget",
    get: function get() {
      return this._popupWindowTarget;
    }
  }, {
    key: "silent_redirect_uri",
    get: function get() {
      return this._silent_redirect_uri;
    }
  }, {
    key: "silentRequestTimeout",
    get: function get() {
      return this._silentRequestTimeout;
    }
  }, {
    key: "automaticSilentRenew",
    get: function get() {
      return this._automaticSilentRenew;
    }
  }, {
    key: "validateSubOnSilentRenew",
    get: function get() {
      return this._validateSubOnSilentRenew;
    }
  }, {
    key: "includeIdTokenInSilentRenew",
    get: function get() {
      return this._includeIdTokenInSilentRenew;
    }
  }, {
    key: "accessTokenExpiringNotificationTime",
    get: function get() {
      return this._accessTokenExpiringNotificationTime;
    }
  }, {
    key: "monitorSession",
    get: function get() {
      return this._monitorSession;
    }
  }, {
    key: "monitorAnonymousSession",
    get: function get() {
      return this._monitorAnonymousSession;
    }
  }, {
    key: "checkSessionInterval",
    get: function get() {
      return this._checkSessionInterval;
    }
  }, {
    key: "stopCheckSessionOnError",
    get: function get() {
      return this._stopCheckSessionOnError;
    }
  }, {
    key: "query_status_response_type",
    get: function get() {
      return this._query_status_response_type;
    }
  }, {
    key: "revokeAccessTokenOnSignout",
    get: function get() {
      return this._revokeAccessTokenOnSignout;
    }
  }, {
    key: "redirectNavigator",
    get: function get() {
      return this._redirectNavigator;
    }
  }, {
    key: "popupNavigator",
    get: function get() {
      return this._popupNavigator;
    }
  }, {
    key: "iframeNavigator",
    get: function get() {
      return this._iframeNavigator;
    }
  }, {
    key: "userStore",
    get: function get() {
      return this._userStore;
    }
  }]);

  return UserManagerSettingsStore;
}(OidcClientSettingsStore);

var User = /*#__PURE__*/function () {
  function User(_ref) {
    var id_token = _ref.id_token,
        session_state = _ref.session_state,
        access_token = _ref.access_token,
        refresh_token = _ref.refresh_token,
        token_type = _ref.token_type,
        scope = _ref.scope,
        profile = _ref.profile,
        expires_at = _ref.expires_at,
        state = _ref.state;
    this.id_token = id_token;
    this.session_state = session_state;
    this.access_token = access_token;
    this.refresh_token = refresh_token;
    this.token_type = token_type;
    this.scope = scope;
    this.profile = profile;
    this.state = state;
    this.expires_at = expires_at;
  }

  var _proto = User.prototype;

  _proto.toStorageString = function toStorageString() {
    Log.debug("User.toStorageString");
    return JSON.stringify({
      id_token: this.id_token,
      session_state: this.session_state,
      access_token: this.access_token,
      refresh_token: this.refresh_token,
      token_type: this.token_type,
      scope: this.scope,
      profile: this.profile,
      expires_at: this.expires_at
    });
  };

  User.fromStorageString = function fromStorageString(storageString) {
    Log.debug("User.fromStorageString");
    return new User(JSON.parse(storageString));
  };

  _createClass(User, [{
    key: "expires_in",
    get: function get() {
      if (this.expires_at) {
        var now = Math.floor(Date.now() / 1000);
        return this.expires_at - now;
      }

      return undefined;
    },
    set: function set(value) {
      if (typeof value === 'number' && value > 0) {
        var expires_in = Math.floor(value);
        var now = Math.floor(Date.now() / 1000);
        this.expires_at = now + expires_in;
      }
    }
  }, {
    key: "expired",
    get: function get() {
      var expires_in = this.expires_in;

      if (expires_in !== undefined) {
        return expires_in <= 0;
      }

      return undefined;
    }
  }, {
    key: "scopes",
    get: function get() {
      return (this.scope || "").split(" ");
    }
  }]);

  return User;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var Event = /*#__PURE__*/function () {
  function Event(name) {
    this._name = name;
    this._callbacks = [];
  }

  var _proto = Event.prototype;

  _proto.addHandler = function addHandler(cb) {
    this._callbacks.push(cb);
  };

  _proto.removeHandler = function removeHandler(cb) {
    var idx = this._callbacks.findIndex(function (item) {
      return item === cb;
    });

    if (idx >= 0) {
      this._callbacks.splice(idx, 1);
    }
  };

  _proto.raise = function raise() {
    Log.debug("Event: Raising event: " + this._name);

    for (var i = 0; i < this._callbacks.length; i++) {
      var _this$_callbacks;

      (_this$_callbacks = this._callbacks)[i].apply(_this$_callbacks, arguments);
    }
  };

  return Event;
}();

var TimerDuration = 5; // seconds

var Timer = /*#__PURE__*/function (_Event) {
  _inheritsLoose(Timer, _Event);

  function Timer(name, timer, nowFunc) {
    var _this;

    if (timer === void 0) {
      timer = Global.timer;
    }

    _this = _Event.call(this, name) || this;
    _this._timer = timer;

    if (nowFunc) {
      _this._nowFunc = nowFunc;
    } else {
      _this._nowFunc = function () {
        return Math.floor(Date.now() / 1000);
      };
    }

    _this._timerHandle = null;
    _this._expiration = 0;
    return _this;
  }

  var _proto = Timer.prototype;

  _proto.init = function init(duration) {
    if (duration <= 0) {
      duration = 1;
    }

    duration = Math.floor(duration);
    var expiration = this.now + duration;

    if (this.expiration === expiration && this._timerHandle) {
      // no need to reinitialize to same expiration, so bail out
      Log.debug("Timer.init timer " + this._name + " skipping initialization since already initialized for expiration:", this.expiration);
      return;
    }

    this.cancel();
    Log.debug("Timer.init timer " + this._name + " for duration:", duration);
    this._expiration = expiration; // we're using a fairly short timer and then checking the expiration in the
    // callback to handle scenarios where the browser device sleeps, and then
    // the timers end up getting delayed.

    var timerDuration = TimerDuration;

    if (duration < timerDuration) {
      timerDuration = duration;
    }

    this._timerHandle = this._timer.setInterval(this._callback.bind(this), timerDuration * 1000);
  };

  _proto.cancel = function cancel() {
    if (this._timerHandle) {
      Log.debug("Timer.cancel: ", this._name);

      this._timer.clearInterval(this._timerHandle);

      this._timerHandle = null;
    }
  };

  _proto._callback = function _callback() {
    var diff = this._expiration - this.now;
    Log.debug("Timer.callback; " + this._name + " timer expires in:", diff);

    if (this._expiration <= this.now) {
      this.cancel();

      _Event.prototype.raise.call(this);
    }
  };

  _createClass(Timer, [{
    key: "now",
    get: function get() {
      return this._nowFunc();
    }
  }, {
    key: "expiration",
    get: function get() {
      return this._expiration;
    }
  }]);

  return Timer;
}(Event);

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var DefaultAccessTokenExpiringNotificationTime$1 = 60; // seconds

var AccessTokenEvents = /*#__PURE__*/function () {
  function AccessTokenEvents(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$accessTokenExpir = _ref.accessTokenExpiringNotificationTime,
        accessTokenExpiringNotificationTime = _ref$accessTokenExpir === void 0 ? DefaultAccessTokenExpiringNotificationTime$1 : _ref$accessTokenExpir,
        _ref$accessTokenExpir2 = _ref.accessTokenExpiringTimer,
        accessTokenExpiringTimer = _ref$accessTokenExpir2 === void 0 ? new Timer("Access token expiring") : _ref$accessTokenExpir2,
        _ref$accessTokenExpir3 = _ref.accessTokenExpiredTimer,
        accessTokenExpiredTimer = _ref$accessTokenExpir3 === void 0 ? new Timer("Access token expired") : _ref$accessTokenExpir3;

    this._accessTokenExpiringNotificationTime = accessTokenExpiringNotificationTime;
    this._accessTokenExpiring = accessTokenExpiringTimer;
    this._accessTokenExpired = accessTokenExpiredTimer;
  }

  var _proto = AccessTokenEvents.prototype;

  _proto.load = function load(container) {
    // only register events if there's an access token and it has an expiration
    if (container.access_token && container.expires_in !== undefined) {
      var duration = container.expires_in;
      Log.debug("AccessTokenEvents.load: access token present, remaining duration:", duration);

      if (duration > 0) {
        // only register expiring if we still have time
        var expiring = duration - this._accessTokenExpiringNotificationTime;

        if (expiring <= 0) {
          expiring = 1;
        }

        Log.debug("AccessTokenEvents.load: registering expiring timer in:", expiring);

        this._accessTokenExpiring.init(expiring);
      } else {
        Log.debug("AccessTokenEvents.load: canceling existing expiring timer becase we're past expiration.");

        this._accessTokenExpiring.cancel();
      } // if it's negative, it will still fire


      var expired = duration + 1;
      Log.debug("AccessTokenEvents.load: registering expired timer in:", expired);

      this._accessTokenExpired.init(expired);
    } else {
      this._accessTokenExpiring.cancel();

      this._accessTokenExpired.cancel();
    }
  };

  _proto.unload = function unload() {
    Log.debug("AccessTokenEvents.unload: canceling existing access token timers");

    this._accessTokenExpiring.cancel();

    this._accessTokenExpired.cancel();
  };

  _proto.addAccessTokenExpiring = function addAccessTokenExpiring(cb) {
    this._accessTokenExpiring.addHandler(cb);
  };

  _proto.removeAccessTokenExpiring = function removeAccessTokenExpiring(cb) {
    this._accessTokenExpiring.removeHandler(cb);
  };

  _proto.addAccessTokenExpired = function addAccessTokenExpired(cb) {
    this._accessTokenExpired.addHandler(cb);
  };

  _proto.removeAccessTokenExpired = function removeAccessTokenExpired(cb) {
    this._accessTokenExpired.removeHandler(cb);
  };

  return AccessTokenEvents;
}();

var UserManagerEvents = /*#__PURE__*/function (_AccessTokenEvents) {
  _inheritsLoose(UserManagerEvents, _AccessTokenEvents);

  function UserManagerEvents(settings) {
    var _this;

    _this = _AccessTokenEvents.call(this, settings) || this;
    _this._userLoaded = new Event("User loaded");
    _this._userUnloaded = new Event("User unloaded");
    _this._silentRenewError = new Event("Silent renew error");
    _this._userSignedIn = new Event("User signed in");
    _this._userSignedOut = new Event("User signed out");
    _this._userSessionChanged = new Event("User session changed");
    return _this;
  }

  var _proto = UserManagerEvents.prototype;

  _proto.load = function load(user, raiseEvent) {
    if (raiseEvent === void 0) {
      raiseEvent = true;
    }

    Log.debug("UserManagerEvents.load");

    _AccessTokenEvents.prototype.load.call(this, user);

    if (raiseEvent) {
      this._userLoaded.raise(user);
    }
  };

  _proto.unload = function unload() {
    Log.debug("UserManagerEvents.unload");

    _AccessTokenEvents.prototype.unload.call(this);

    this._userUnloaded.raise();
  };

  _proto.addUserLoaded = function addUserLoaded(cb) {
    this._userLoaded.addHandler(cb);
  };

  _proto.removeUserLoaded = function removeUserLoaded(cb) {
    this._userLoaded.removeHandler(cb);
  };

  _proto.addUserUnloaded = function addUserUnloaded(cb) {
    this._userUnloaded.addHandler(cb);
  };

  _proto.removeUserUnloaded = function removeUserUnloaded(cb) {
    this._userUnloaded.removeHandler(cb);
  };

  _proto.addSilentRenewError = function addSilentRenewError(cb) {
    this._silentRenewError.addHandler(cb);
  };

  _proto.removeSilentRenewError = function removeSilentRenewError(cb) {
    this._silentRenewError.removeHandler(cb);
  };

  _proto._raiseSilentRenewError = function _raiseSilentRenewError(e) {
    Log.debug("UserManagerEvents._raiseSilentRenewError", e.message);

    this._silentRenewError.raise(e);
  };

  _proto.addUserSignedIn = function addUserSignedIn(cb) {
    this._userSignedIn.addHandler(cb);
  };

  _proto.removeUserSignedIn = function removeUserSignedIn(cb) {
    this._userSignedIn.removeHandler(cb);
  };

  _proto._raiseUserSignedIn = function _raiseUserSignedIn() {
    Log.debug("UserManagerEvents._raiseUserSignedIn");

    this._userSignedIn.raise();
  };

  _proto.addUserSignedOut = function addUserSignedOut(cb) {
    this._userSignedOut.addHandler(cb);
  };

  _proto.removeUserSignedOut = function removeUserSignedOut(cb) {
    this._userSignedOut.removeHandler(cb);
  };

  _proto._raiseUserSignedOut = function _raiseUserSignedOut() {
    Log.debug("UserManagerEvents._raiseUserSignedOut");

    this._userSignedOut.raise();
  };

  _proto.addUserSessionChanged = function addUserSessionChanged(cb) {
    this._userSessionChanged.addHandler(cb);
  };

  _proto.removeUserSessionChanged = function removeUserSessionChanged(cb) {
    this._userSessionChanged.removeHandler(cb);
  };

  _proto._raiseUserSessionChanged = function _raiseUserSessionChanged() {
    Log.debug("UserManagerEvents._raiseUserSessionChanged");

    this._userSessionChanged.raise();
  };

  return UserManagerEvents;
}(AccessTokenEvents);

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var SilentRenewService = /*#__PURE__*/function () {
  function SilentRenewService(userManager) {
    this._userManager = userManager;
  }

  var _proto = SilentRenewService.prototype;

  _proto.start = function start() {
    if (!this._callback) {
      this._callback = this._tokenExpiring.bind(this);

      this._userManager.events.addAccessTokenExpiring(this._callback); // this will trigger loading of the user so the expiring events can be initialized


      this._userManager.getUser().then(function (_user) {// deliberate nop
      })["catch"](function (err) {
        // catch to suppress errors since we're in a ctor
        Log.error("SilentRenewService.start: Error from getUser:", err.message);
      });
    }
  };

  _proto.stop = function stop() {
    if (this._callback) {
      this._userManager.events.removeAccessTokenExpiring(this._callback);

      delete this._callback;
    }
  };

  _proto._tokenExpiring = function _tokenExpiring() {
    var _this = this;

    this._userManager.signinSilent().then(function (_user) {
      Log.debug("SilentRenewService._tokenExpiring: Silent token renewal successful");
    }, function (err) {
      Log.error("SilentRenewService._tokenExpiring: Error from signinSilent:", err.message);

      _this._userManager.events._raiseSilentRenewError(err);
    });
  };

  return SilentRenewService;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var DefaultInterval = 2000;
var CheckSessionIFrame = /*#__PURE__*/function () {
  function CheckSessionIFrame(callback, client_id, url, interval, stopOnError) {
    this._callback = callback;
    this._client_id = client_id;
    this._interval = interval || DefaultInterval;
    this._stopOnError = stopOnError || true;
    var idx = url.indexOf("/", url.indexOf("//") + 2);
    this._frame_origin = url.substr(0, idx);
    this._frame = window.document.createElement("iframe"); // shotgun approach

    this._frame.style.visibility = "hidden";
    this._frame.style.position = "absolute";
    this._frame.style.display = "none";
    this._frame.width = "0";
    this._frame.height = "0";
    this._frame.src = url;
    this._boundMessageEvent = null;
    this._timer = null;
  }

  var _proto = CheckSessionIFrame.prototype;

  _proto.load = function load() {
    var _this = this;

    return new Promise(function (resolve) {
      _this._frame.onload = function () {
        resolve();
      };

      window.document.body.appendChild(_this._frame);
      _this._boundMessageEvent = _this._message.bind(_this);
      window.addEventListener("message", _this._boundMessageEvent, false);
    });
  };

  _proto._message = function _message(e) {
    if (e.origin === this._frame_origin && e.source === this._frame.contentWindow) {
      if (e.data === "error") {
        Log.error("CheckSessionIFrame: error message from check session op iframe");

        if (this._stopOnError) {
          this.stop();
        }
      } else if (e.data === "changed") {
        Log.debug("CheckSessionIFrame: changed message from check session op iframe");
        this.stop();

        this._callback();
      } else {
        Log.debug("CheckSessionIFrame: " + e.data + " message from check session op iframe");
      }
    }
  };

  _proto.start = function start(session_state) {
    var _this2 = this;

    if (this._session_state !== session_state) {
      Log.debug("CheckSessionIFrame.start");
      this.stop();
      this._session_state = session_state;

      var send = function send() {
        _this2._frame.contentWindow && _this2._frame.contentWindow.postMessage(_this2._client_id + " " + _this2._session_state, _this2._frame_origin);
      }; // trigger now


      send(); // and setup timer

      this._timer = window.setInterval(send, this._interval);
    }
  };

  _proto.stop = function stop() {
    this._session_state = null;

    if (this._timer) {
      Log.debug("CheckSessionIFrame.stop");
      window.clearInterval(this._timer);
      this._timer = null;
    }
  };

  return CheckSessionIFrame;
}();

var SessionMonitor = /*#__PURE__*/function () {
  function SessionMonitor(userManager, CheckSessionIFrameCtor, timer) {
    var _this = this;

    if (CheckSessionIFrameCtor === void 0) {
      CheckSessionIFrameCtor = CheckSessionIFrame;
    }

    if (timer === void 0) {
      timer = Global.timer;
    }

    if (!userManager) {
      Log.error("SessionMonitor.ctor: No user manager passed to SessionMonitor");
      throw new Error("userManager");
    }

    this._userManager = userManager;
    this._CheckSessionIFrameCtor = CheckSessionIFrameCtor;
    this._timer = timer;

    this._userManager.events.addUserLoaded(this._start.bind(this));

    this._userManager.events.addUserUnloaded(this._stop.bind(this));

    Promise.resolve(this._userManager.getUser().then(function (user) {
      // doing this manually here since calling getUser
      // doesn't trigger load event.
      if (user) {
        _this._start(user);
      } else if (_this._settings.monitorAnonymousSession) {
        _this._userManager.querySessionStatus().then(function (session) {
          var tmpUser = {
            session_state: session.session_state,
            profile: session.sub && session.sid ? {
              sub: session.sub,
              sid: session.sid
            } : null
          };

          _this._start(tmpUser);
        })["catch"](function (err) {
          // catch to suppress errors since we're in a ctor
          Log.error("SessionMonitor ctor: error from querySessionStatus:", err.message);
        });
      }
    })["catch"](function (err) {
      // catch to suppress errors since we're in a ctor
      Log.error("SessionMonitor ctor: error from getUser:", err.message);
    }));
  }

  var _proto = SessionMonitor.prototype;

  _proto._start = function _start(user) {
    var _this2 = this;

    var session_state = user.session_state;

    if (session_state) {
      if (user.profile) {
        this._sub = user.profile.sub;
        this._sid = user.profile.sid;
        Log.debug("SessionMonitor._start: session_state:", session_state, ", sub:", this._sub);
      } else {
        this._sub = undefined;
        this._sid = undefined;
        Log.debug("SessionMonitor._start: session_state:", session_state, ", anonymous user");
      }

      if (!this._checkSessionIFrame) {
        this._metadataService.getCheckSessionIframe().then(function (url) {
          if (url) {
            Log.debug("SessionMonitor._start: Initializing check session iframe");
            var client_id = _this2._client_id;
            var interval = _this2._checkSessionInterval;
            var stopOnError = _this2._stopCheckSessionOnError;
            _this2._checkSessionIFrame = new _this2._CheckSessionIFrameCtor(_this2._callback.bind(_this2), client_id, url, interval, stopOnError);

            _this2._checkSessionIFrame.load().then(function () {
              _this2._checkSessionIFrame && _this2._checkSessionIFrame.start(session_state);
            });
          } else {
            Log.warn("SessionMonitor._start: No check session iframe found in the metadata");
          }
        })["catch"](function (err) {
          // catch to suppress errors since we're in non-promise callback
          Log.error("SessionMonitor._start: Error from getCheckSessionIframe:", err.message);
        });
      } else {
        this._checkSessionIFrame.start(session_state);
      }
    }
  };

  _proto._stop = function _stop() {
    var _this3 = this;

    this._sub = undefined;
    this._sid = undefined;

    if (this._checkSessionIFrame) {
      Log.debug("SessionMonitor._stop");

      this._checkSessionIFrame.stop();
    }

    if (this._settings.monitorAnonymousSession) {
      // using a timer to delay re-initialization to avoid race conditions during signout
      var timerHandle = this._timer.setInterval(function () {
        _this3._timer.clearInterval(timerHandle);

        _this3._userManager.querySessionStatus().then(function (session) {
          var tmpUser = {
            session_state: session.session_state,
            profile: session.sub && session.sid ? {
              sub: session.sub,
              sid: session.sid
            } : null
          };

          _this3._start(tmpUser);
        })["catch"](function (err) {
          // catch to suppress errors since we're in a callback
          Log.error("SessionMonitor: error from querySessionStatus:", err.message);
        });
      }, 1000);
    }
  };

  _proto._callback = function _callback() {
    var _this4 = this;

    this._userManager.querySessionStatus().then(function (session) {
      var raiseEvent = true;

      if (session && _this4._checkSessionIFrame) {
        if (session.sub === _this4._sub) {
          raiseEvent = false;

          _this4._checkSessionIFrame.start(session.session_state);

          if (session.sid === _this4._sid) {
            Log.debug("SessionMonitor._callback: Same sub still logged in at OP, restarting check session iframe; session_state:", session.session_state);
          } else {
            Log.debug("SessionMonitor._callback: Same sub still logged in at OP, session state has changed, restarting check session iframe; session_state:", session.session_state);

            _this4._userManager.events._raiseUserSessionChanged();
          }
        } else {
          Log.debug("SessionMonitor._callback: Different subject signed into OP:", session.sub);
        }
      } else {
        Log.debug("SessionMonitor._callback: Subject no longer signed into OP");
      }

      if (raiseEvent) {
        if (_this4._sub) {
          Log.debug("SessionMonitor._callback: SessionMonitor._callback; raising signed out event");

          _this4._userManager.events._raiseUserSignedOut();
        } else {
          Log.debug("SessionMonitor._callback: SessionMonitor._callback; raising signed in event");

          _this4._userManager.events._raiseUserSignedIn();
        }
      }
    })["catch"](function (err) {
      if (_this4._sub) {
        Log.debug("SessionMonitor._callback: Error calling queryCurrentSigninSession; raising signed out event", err.message);

        _this4._userManager.events._raiseUserSignedOut();
      }
    });
  };

  _createClass(SessionMonitor, [{
    key: "_settings",
    get: function get() {
      return this._userManager.settings;
    }
  }, {
    key: "_metadataService",
    get: function get() {
      return this._userManager.metadataService;
    }
  }, {
    key: "_client_id",
    get: function get() {
      return this._settings.client_id;
    }
  }, {
    key: "_checkSessionInterval",
    get: function get() {
      return this._settings.checkSessionInterval;
    }
  }, {
    key: "_stopCheckSessionOnError",
    get: function get() {
      return this._settings.stopCheckSessionOnError;
    }
  }]);

  return SessionMonitor;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var AccessTokenTypeHint = "access_token";
var RefreshTokenTypeHint = "refresh_token";
var TokenRevocationClient = /*#__PURE__*/function () {
  function TokenRevocationClient(settings, XMLHttpRequestCtor, MetadataServiceCtor) {
    if (XMLHttpRequestCtor === void 0) {
      XMLHttpRequestCtor = Global.XMLHttpRequest;
    }

    if (MetadataServiceCtor === void 0) {
      MetadataServiceCtor = MetadataService;
    }

    if (!settings) {
      Log.error("TokenRevocationClient.ctor: No settings provided");
      throw new Error("No settings provided.");
    }

    this._settings = settings;
    this._XMLHttpRequestCtor = XMLHttpRequestCtor;
    this._metadataService = new MetadataServiceCtor(this._settings);
  }

  var _proto = TokenRevocationClient.prototype;

  _proto.revoke = function revoke(token, required, type) {
    var _this = this;

    if (type === void 0) {
      type = "access_token";
    }

    if (!token) {
      Log.error("TokenRevocationClient.revoke: No token provided");
      throw new Error("No token provided.");
    }

    if (type !== AccessTokenTypeHint && type != RefreshTokenTypeHint) {
      Log.error("TokenRevocationClient.revoke: Invalid token type");
      throw new Error("Invalid token type.");
    }

    return this._metadataService.getRevocationEndpoint().then(function (url) {
      if (!url) {
        if (required) {
          Log.error("TokenRevocationClient.revoke: Revocation not supported");
          throw new Error("Revocation not supported");
        } // not required, so don't error and just return


        return;
      }

      Log.debug("TokenRevocationClient.revoke: Revoking " + type);
      var client_id = _this._settings.client_id;
      var client_secret = _this._settings.client_secret;
      return _this._revoke(url, client_id, client_secret, token, type);
    });
  };

  _proto._revoke = function _revoke(url, client_id, client_secret, token, type) {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      var xhr = new _this2._XMLHttpRequestCtor();
      xhr.open("POST", url);

      xhr.onload = function () {
        Log.debug("TokenRevocationClient.revoke: HTTP response received, status", xhr.status);

        if (xhr.status === 200) {
          resolve();
        } else {
          reject(Error(xhr.statusText + " (" + xhr.status + ")"));
        }
      };

      xhr.onerror = function () {
        Log.debug("TokenRevocationClient.revoke: Network Error.");
        reject("Network Error");
      };

      var body = "client_id=" + encodeURIComponent(client_id);

      if (client_secret) {
        body += "&client_secret=" + encodeURIComponent(client_secret);
      }

      body += "&token_type_hint=" + encodeURIComponent(type);
      body += "&token=" + encodeURIComponent(token);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(body);
    });
  };

  return TokenRevocationClient;
}();

var UserManager = /*#__PURE__*/function (_OidcClient) {
  _inheritsLoose(UserManager, _OidcClient);

  function UserManager(settings, SilentRenewServiceCtor, SessionMonitorCtor, TokenRevocationClientCtor, TokenClientCtor) {
    var _this;

    if (settings === void 0) {
      settings = {};
    }

    if (SilentRenewServiceCtor === void 0) {
      SilentRenewServiceCtor = SilentRenewService;
    }

    if (SessionMonitorCtor === void 0) {
      SessionMonitorCtor = SessionMonitor;
    }

    if (TokenRevocationClientCtor === void 0) {
      TokenRevocationClientCtor = TokenRevocationClient;
    }

    if (TokenClientCtor === void 0) {
      TokenClientCtor = TokenClient;
    }

    _this = _OidcClient.call(this, settings) || this;
    _this._settings = new UserManagerSettingsStore(settings);
    _this._events = new UserManagerEvents(_this._settings);
    _this._silentRenewService = new SilentRenewServiceCtor(_assertThisInitialized(_this)); // order is important for the following properties; these services depend upon the events.

    if (_this.settings.automaticSilentRenew) {
      Log.debug("UserManager.ctor: automaticSilentRenew is configured, setting up silent renew");

      _this.startSilentRenew();
    }

    _this._sessionMonitor = null;

    if (_this.settings.monitorSession) {
      Log.debug("UserManager.ctor: monitorSession is configured, setting up session monitor");
      _this._sessionMonitor = new SessionMonitorCtor(_assertThisInitialized(_this));
    }

    _this._tokenRevocationClient = new TokenRevocationClientCtor(_this._settings);
    _this._tokenClient = new TokenClientCtor(_this._settings);
    return _this;
  }

  var _proto = UserManager.prototype;

  _proto.getUser = function getUser() {
    var _this2 = this;

    return this._loadUser().then(function (user) {
      if (user) {
        Log.info("UserManager.getUser: user loaded");

        _this2._events.load(user, false);

        return user;
      } else {
        Log.info("UserManager.getUser: user not found in storage");
        return null;
      }
    });
  };

  _proto.removeUser = function removeUser() {
    var _this3 = this;

    return this.storeUser(null).then(function () {
      Log.info("UserManager.removeUser: user removed from storage");

      _this3._events.unload();
    });
  };

  _proto.signinRedirect = function signinRedirect(args) {
    if (args === void 0) {
      args = {};
    }

    args = Object.assign({}, args);
    args.request_type = "si:r";
    var navParams = {
      useReplaceToNavigate: args.useReplaceToNavigate
    };
    return this._signinStart(args, this._redirectNavigator, navParams).then(function () {
      Log.info("UserManager.signinRedirect: successful");
    });
  };

  _proto.signinRedirectCallback = function signinRedirectCallback(url) {
    return this._signinEnd(url || this._redirectNavigator.url).then(function (user) {
      if (user.profile && user.profile.sub) {
        Log.info("UserManager.signinRedirectCallback: successful, signed in sub: ", user.profile.sub);
      } else {
        Log.info("UserManager.signinRedirectCallback: no sub");
      }

      return user;
    });
  };

  _proto.signinPopup = function signinPopup(args) {
    if (args === void 0) {
      args = {};
    }

    args = Object.assign({}, args);
    args.request_type = "si:p";
    var url = args.redirect_uri || this.settings.popup_redirect_uri || this.settings.redirect_uri;

    if (!url) {
      Log.error("UserManager.signinPopup: No popup_redirect_uri or redirect_uri configured");
      return Promise.reject(new Error("No popup_redirect_uri or redirect_uri configured"));
    }

    args.redirect_uri = url;
    args.display = "popup";
    return this._signin(args, this._popupNavigator, {
      startUrl: url,
      popupWindowFeatures: args.popupWindowFeatures || this.settings.popupWindowFeatures,
      popupWindowTarget: args.popupWindowTarget || this.settings.popupWindowTarget
    }).then(function (user) {
      if (user) {
        if (user.profile && user.profile.sub) {
          Log.info("UserManager.signinPopup: signinPopup successful, signed in sub: ", user.profile.sub);
        } else {
          Log.info("UserManager.signinPopup: no sub");
        }
      }

      return user;
    });
  };

  _proto.signinPopupCallback = function signinPopupCallback(url) {
    return this._signinCallback(url, this._popupNavigator).then(function (user) {
      if (user) {
        if (user.profile && user.profile.sub) {
          Log.info("UserManager.signinPopupCallback: successful, signed in sub: ", user.profile.sub);
        } else {
          Log.info("UserManager.signinPopupCallback: no sub");
        }
      }

      return user;
    })["catch"](function (err) {
      Log.error("UserManager.signinPopupCallback error: " + err && err.message);
      return null;
    });
  };

  _proto.signinSilent = function signinSilent(args) {
    var _this4 = this;

    if (args === void 0) {
      args = {};
    }

    args = Object.assign({}, args); // first determine if we have a refresh token, or need to use iframe

    return this._loadUser().then(function (user) {
      if (user && user.refresh_token) {
        args.refresh_token = user.refresh_token;
        return _this4._useRefreshToken(args);
      } else {
        args.request_type = "si:s";
        args.id_token_hint = args.id_token_hint || _this4.settings.includeIdTokenInSilentRenew && user && user.id_token;

        if (user && _this4._settings.validateSubOnSilentRenew) {
          Log.debug("UserManager.signinSilent, subject prior to silent renew: ", user.profile.sub);
          args.current_sub = user.profile.sub;
        }

        return _this4._signinSilentIframe(args);
      }
    });
  };

  _proto._useRefreshToken = function _useRefreshToken(args) {
    var _this5 = this;

    if (args === void 0) {
      args = {};
    }

    return this._tokenClient.exchangeRefreshToken(args).then(function (result) {
      if (!result) {
        Log.error("UserManager._useRefreshToken: No response returned from token endpoint");
        return Promise.reject("No response returned from token endpoint");
      }

      if (!result.access_token) {
        Log.error("UserManager._useRefreshToken: No access token returned from token endpoint");
        return Promise.reject("No access token returned from token endpoint");
      }

      return _this5._loadUser().then(function (user) {
        if (user) {
          var idTokenValidation = Promise.resolve();

          if (result.id_token) {
            idTokenValidation = _this5._validateIdTokenFromTokenRefreshToken(user.profile, result.id_token);
          }

          return idTokenValidation.then(function () {
            Log.debug("UserManager._useRefreshToken: refresh token response success");
            user.id_token = result.id_token || user.id_token;
            user.access_token = result.access_token || user.access_token;
            user.refresh_token =
            /* TODO: port-TS result.refresh_token ||*/
            user.refresh_token;
            user.expires_in = result.expires_in;
            return _this5.storeUser(user).then(function () {
              _this5._events.load(user);

              return user;
            });
          });
        } else {
          return null;
        }
      });
    });
  };

  _proto._validateIdTokenFromTokenRefreshToken = function _validateIdTokenFromTokenRefreshToken(profile, id_token) {
    var _this6 = this;

    return this._metadataService.getIssuer().then(function (issuer) {
      return _this6.settings.getEpochTime().then(function (now) {
        return JoseUtil.validateJwtAttributes(id_token, issuer, _this6._settings.client_id, _this6._settings.clockSkew, now).then(function (payload) {
          if (!payload) {
            Log.error("UserManager._validateIdTokenFromTokenRefreshToken: Failed to validate id_token");
            return Promise.reject(new Error("Failed to validate id_token"));
          }

          if (payload.sub !== profile.sub) {
            Log.error("UserManager._validateIdTokenFromTokenRefreshToken: sub in id_token does not match current sub");
            return Promise.reject(new Error("sub in id_token does not match current sub"));
          }

          if (payload.auth_time && payload.auth_time !== profile.auth_time) {
            Log.error("UserManager._validateIdTokenFromTokenRefreshToken: auth_time in id_token does not match original auth_time");
            return Promise.reject(new Error("auth_time in id_token does not match original auth_time"));
          }

          if (payload.azp && payload.azp !== profile.azp) {
            Log.error("UserManager._validateIdTokenFromTokenRefreshToken: azp in id_token does not match original azp");
            return Promise.reject(new Error("azp in id_token does not match original azp"));
          }

          if (!payload.azp && profile.azp) {
            Log.error("UserManager._validateIdTokenFromTokenRefreshToken: azp not in id_token, but present in original id_token");
            return Promise.reject(new Error("azp not in id_token, but present in original id_token"));
          }

          return Promise.resolve();
        });
      });
    });
  };

  _proto._signinSilentIframe = function _signinSilentIframe(args) {
    if (args === void 0) {
      args = {};
    }

    var url = args.redirect_uri || this.settings.silent_redirect_uri || this.settings.redirect_uri;

    if (!url) {
      Log.error("UserManager.signinSilent: No silent_redirect_uri configured");
      return Promise.reject(new Error("No silent_redirect_uri configured"));
    }

    args.redirect_uri = url;
    args.prompt = args.prompt || "none";
    return this._signin(args, this._iframeNavigator, {
      startUrl: url,
      silentRequestTimeout: args.silentRequestTimeout || this.settings.silentRequestTimeout
    }).then(function (user) {
      if (user) {
        if (user.profile && user.profile.sub) {
          Log.info("UserManager.signinSilent: successful, signed in sub: ", user.profile.sub);
        } else {
          Log.info("UserManager.signinSilent: no sub");
        }
      }

      return user;
    });
  };

  _proto.signinSilentCallback = function signinSilentCallback(url) {
    return this._signinCallback(url, this._iframeNavigator).then(function (user) {
      if (user) {
        if (user.profile && user.profile.sub) {
          Log.info("UserManager.signinSilentCallback: successful, signed in sub: ", user.profile.sub);
        } else {
          Log.info("UserManager.signinSilentCallback: no sub");
        }
      }

      return user;
    });
  };

  _proto.signinCallback = function signinCallback(url) {
    var _this7 = this;

    return this.readSigninResponseState(url).then(function (_ref) {
      var state = _ref.state;

      if (state.request_type === "si:r") {
        return _this7.signinRedirectCallback(url);
      }

      if (state.request_type === "si:p") {
        return _this7.signinPopupCallback(url);
      }

      if (state.request_type === "si:s") {
        return _this7.signinSilentCallback(url);
      }

      return Promise.reject(new Error("invalid response_type in state"));
    });
  };

  _proto.signoutCallback = function signoutCallback(url, keepOpen) {
    var _this8 = this;

    if (keepOpen === void 0) {
      keepOpen = false;
    }

    // @ts-ignore
    return this.readSignoutResponseState(url).then(function (_ref2) {
      var state = _ref2.state,
          response = _ref2.response;

      if (state) {
        if (state.request_type === "so:r") {
          return _this8.signoutRedirectCallback(url);
        }

        if (state.request_type === "so:p") {
          return _this8.signoutPopupCallback(url, keepOpen);
        }

        return Promise.reject(new Error("invalid response_type in state"));
      }

      return response;
    });
  };

  _proto.querySessionStatus = function querySessionStatus(args) {
    var _this9 = this;

    if (args === void 0) {
      args = {};
    }

    args = Object.assign({}, args);
    args.request_type = "si:s"; // this acts like a signin silent

    var url = args.redirect_uri || this.settings.silent_redirect_uri || this.settings.redirect_uri;

    if (!url) {
      Log.error("UserManager.querySessionStatus: No silent_redirect_uri configured");
      return Promise.reject(new Error("No silent_redirect_uri configured"));
    }

    args.redirect_uri = url;
    args.prompt = "none";
    args.response_type = args.response_type || this.settings.query_status_response_type;
    args.scope = args.scope || "openid";
    args.skipUserInfo = true;
    return this._signinStart(args, this._iframeNavigator, {
      startUrl: url,
      silentRequestTimeout: args.silentRequestTimeout || this.settings.silentRequestTimeout
    }).then(function (navResponse) {
      return _this9.processSigninResponse(navResponse.url).then(function (signinResponse) {
        Log.debug("UserManager.querySessionStatus: got signin response");

        if (signinResponse.session_state && signinResponse.profile.sub) {
          Log.info("UserManager.querySessionStatus: querySessionStatus success for sub: ", signinResponse.profile.sub);
          return {
            session_state: signinResponse.session_state,
            sub: signinResponse.profile.sub,
            sid: signinResponse.profile.sid
          };
        } else {
          Log.info("querySessionStatus successful, user not authenticated");
          return null;
        }
      })["catch"](function (err) {
        if (err.session_state && _this9.settings.monitorAnonymousSession) {
          if (err.message == "login_required" || err.message == "consent_required" || err.message == "interaction_required" || err.message == "account_selection_required") {
            Log.info("UserManager.querySessionStatus: querySessionStatus success for anonymous user");
            return {
              session_state: err.session_state
            };
          }
        }

        throw err;
      });
    });
  };

  _proto._signin = function _signin(args, navigator, navigatorParams) {
    var _this10 = this;

    if (navigatorParams === void 0) {
      navigatorParams = {};
    }

    return this._signinStart(args, navigator, navigatorParams).then(function (navResponse) {
      return _this10._signinEnd(navResponse.url, args);
    });
  };

  _proto._signinStart = function _signinStart(args, navigator, navigatorParams) {
    var _this11 = this;

    if (navigatorParams === void 0) {
      navigatorParams = {};
    }

    return navigator.prepare(navigatorParams).then(function (handle) {
      Log.debug("UserManager._signinStart: got navigator window handle");
      return _this11.createSigninRequest(args).then(function (signinRequest) {
        Log.debug("UserManager._signinStart: got signin request");
        navigatorParams.url = signinRequest.url;
        navigatorParams.id = signinRequest.state.id;
        return handle.navigate(navigatorParams);
      })["catch"](function (err) {
        Log.debug("UserManager._signinStart: Error after preparing navigator, closing navigator window");
        handle.close();
        throw err;
      });
    });
  };

  _proto._signinEnd = function _signinEnd(url, args) {
    var _this12 = this;

    if (args === void 0) {
      args = {};
    }

    return this.processSigninResponse(url).then(function (signinResponse) {
      Log.debug("UserManager._signinEnd: got signin response");
      var user = new User(signinResponse);

      if (args.current_sub) {
        if (args.current_sub !== user.profile.sub) {
          Log.debug("UserManager._signinEnd: current user does not match user returned from signin. sub from signin: ", user.profile.sub);
          return Promise.reject(new Error("login_required"));
        } else {
          Log.debug("UserManager._signinEnd: current user matches user returned from signin");
        }
      }

      return _this12.storeUser(user).then(function () {
        Log.debug("UserManager._signinEnd: user stored");

        _this12._events.load(user);

        return user;
      });
    });
  };

  _proto._signinCallback = function _signinCallback(url, navigator) {
    Log.debug("UserManager._signinCallback");
    var useQuery = this._settings.response_mode === "query" || !this._settings.response_mode && SigninRequest.isCode(this._settings.response_type);
    var delimiter = useQuery ? "?" : "#"; // @ts-ignore

    return navigator.callback(url, undefined, delimiter);
  };

  _proto.signoutRedirect = function signoutRedirect(args) {
    if (args === void 0) {
      args = {};
    }

    args = Object.assign({}, args);
    args.request_type = "so:r";
    var postLogoutRedirectUri = args.post_logout_redirect_uri || this.settings.post_logout_redirect_uri;

    if (postLogoutRedirectUri) {
      args.post_logout_redirect_uri = postLogoutRedirectUri;
    }

    var navParams = {
      useReplaceToNavigate: args.useReplaceToNavigate
    };
    return this._signoutStart(args, this._redirectNavigator, navParams).then(function () {
      Log.info("UserManager.signoutRedirect: successful");
    });
  };

  _proto.signoutRedirectCallback = function signoutRedirectCallback(url) {
    return this._signoutEnd(url || this._redirectNavigator.url).then(function (response) {
      Log.info("UserManager.signoutRedirectCallback: successful");
      return response;
    });
  };

  _proto.signoutPopup = function signoutPopup(args) {
    if (args === void 0) {
      args = {};
    }

    args = Object.assign({}, args);
    args.request_type = "so:p";
    var url = args.post_logout_redirect_uri || this.settings.popup_post_logout_redirect_uri || this.settings.post_logout_redirect_uri;
    args.post_logout_redirect_uri = url;
    args.display = "popup";

    if (args.post_logout_redirect_uri) {
      // we're putting a dummy entry in here because we
      // need a unique id from the state for notification
      // to the parent window, which is necessary if we
      // plan to return back to the client after signout
      // and so we can close the popup after signout
      args.state = args.state || {};
    }

    return this._signout(args, this._popupNavigator, {
      startUrl: url,
      popupWindowFeatures: args.popupWindowFeatures || this.settings.popupWindowFeatures,
      popupWindowTarget: args.popupWindowTarget || this.settings.popupWindowTarget
    }).then(function () {
      Log.info("UserManager.signoutPopup: successful");
    });
  };

  _proto.signoutPopupCallback = function signoutPopupCallback(url, keepOpen) {
    if (typeof keepOpen === 'undefined' && typeof url === 'boolean') {
      keepOpen = url;
      url = null;
    }

    var delimiter = '?';
    return this._popupNavigator.callback(url, keepOpen, delimiter).then(function () {
      Log.info("UserManager.signoutPopupCallback: successful");
    });
  };

  _proto._signout = function _signout(args, navigator, navigatorParams) {
    var _this13 = this;

    if (navigatorParams === void 0) {
      navigatorParams = {};
    }

    return this._signoutStart(args, navigator, navigatorParams).then(function (navResponse) {
      return _this13._signoutEnd(navResponse.url);
    });
  };

  _proto._signoutStart = function _signoutStart(args, navigator, navigatorParams) {
    var _this14 = this;

    if (args === void 0) {
      args = {};
    }

    if (navigatorParams === void 0) {
      navigatorParams = {};
    }

    return navigator.prepare(navigatorParams).then(function (handle) {
      Log.debug("UserManager._signoutStart: got navigator window handle");
      return _this14._loadUser().then(function (user) {
        Log.debug("UserManager._signoutStart: loaded current user from storage");
        var revokePromise = _this14._settings.revokeAccessTokenOnSignout ? _this14._revokeInternal(user) : Promise.resolve(true);
        return revokePromise.then(function () {
          var id_token = args.id_token_hint || user && user.id_token;

          if (id_token) {
            Log.debug("UserManager._signoutStart: Setting id_token into signout request");
            args.id_token_hint = id_token;
          }

          return _this14.removeUser().then(function () {
            Log.debug("UserManager._signoutStart: user removed, creating signout request");
            return _this14.createSignoutRequest(args).then(function (signoutRequest) {
              Log.debug("UserManager._signoutStart: got signout request");
              navigatorParams.url = signoutRequest.url;

              if (signoutRequest.state) {
                navigatorParams.id = signoutRequest.state.id;
              }

              return handle.navigate(navigatorParams);
            });
          });
        });
      })["catch"](function (err) {
        Log.debug("UserManager._signoutStart: Error after preparing navigator, closing navigator window");
        handle.close();
        throw err;
      });
    });
  };

  _proto._signoutEnd = function _signoutEnd(url) {
    return this.processSignoutResponse(url).then(function (signoutResponse) {
      Log.debug("UserManager._signoutEnd: got signout response");
      return signoutResponse;
    });
  };

  _proto.revokeAccessToken = function revokeAccessToken() {
    var _this15 = this;

    return this._loadUser().then(function (user) {
      return _this15._revokeInternal(user, true).then(function (success) {
        if (success && user) {
          Log.debug("UserManager.revokeAccessToken: removing token properties from user and re-storing");
          user.access_token = "";
          user.refresh_token = "";
          user.expires_at = 0;
          user.token_type = "";

          _this15.storeUser(user).then(function () {
            Log.debug("UserManager.revokeAccessToken: user stored");

            _this15._events.load(user);
          });
        }
      });
    }).then(function () {
      Log.info("UserManager.revokeAccessToken: access token revoked successfully");
    });
  };

  _proto._revokeInternal = function _revokeInternal(user, required) {
    var _this16 = this;

    if (required === void 0) {
      required = false;
    }

    if (user) {
      var access_token = user.access_token;
      var refresh_token = user.refresh_token;
      return this._revokeAccessTokenInternal(access_token, required).then(function (atSuccess) {
        return _this16._revokeRefreshTokenInternal(refresh_token, required).then(function (rtSuccess) {
          if (!atSuccess && !rtSuccess) {
            Log.debug("UserManager.revokeAccessToken: no need to revoke due to no token(s), or JWT format");
          }

          return atSuccess || rtSuccess;
        });
      });
    }

    return Promise.resolve(false);
  };

  _proto._revokeAccessTokenInternal = function _revokeAccessTokenInternal(access_token, required) {
    // check for JWT vs. reference token
    if (!access_token || access_token.indexOf('.') >= 0) {
      return Promise.resolve(false);
    }

    return this._tokenRevocationClient.revoke(access_token, required).then(function () {
      return true;
    });
  };

  _proto._revokeRefreshTokenInternal = function _revokeRefreshTokenInternal(refresh_token, required) {
    if (!refresh_token) {
      return Promise.resolve(false);
    }

    return this._tokenRevocationClient.revoke(refresh_token, required, "refresh_token").then(function () {
      return true;
    });
  };

  _proto.startSilentRenew = function startSilentRenew() {
    this._silentRenewService.start();
  };

  _proto.stopSilentRenew = function stopSilentRenew() {
    this._silentRenewService.stop();
  };

  _proto._loadUser = function _loadUser() {
    return this._userStore.get(this._userStoreKey).then(function (storageString) {
      if (storageString) {
        Log.debug("UserManager._loadUser: user storageString loaded");
        return User.fromStorageString(storageString);
      }

      Log.debug("UserManager._loadUser: no user storageString");
      return null;
    });
  };

  _proto.storeUser = function storeUser(user) {
    if (user) {
      Log.debug("UserManager.storeUser: storing user");
      var storageString = user.toStorageString();
      return this._userStore.set(this._userStoreKey, storageString);
    } else {
      Log.debug("storeUser.storeUser: removing user");
      return this._userStore.remove(this._userStoreKey);
    }
  };

  _createClass(UserManager, [{
    key: "settings",
    get: function get() {
      return this._settings;
    }
  }, {
    key: "_redirectNavigator",
    get: function get() {
      return this.settings.redirectNavigator;
    }
  }, {
    key: "_popupNavigator",
    get: function get() {
      return this.settings.popupNavigator;
    }
  }, {
    key: "_iframeNavigator",
    get: function get() {
      return this.settings.iframeNavigator;
    }
  }, {
    key: "_userStore",
    get: function get() {
      return this.settings.userStore;
    }
  }, {
    key: "events",
    get: function get() {
      return this._events;
    }
  }, {
    key: "_userStoreKey",
    get: function get() {
      return "user:" + this.settings.authority + ":" + this.settings.client_id;
    }
  }]);

  return UserManager;
}(OidcClient);

var DefaultPopupFeatures$1 = 'location=no,toolbar=no,zoom=no';
var DefaultPopupTarget$1 = "_blank";
var CordovaPopupWindow = /*#__PURE__*/function () {
  function CordovaPopupWindow(params) {
    var _this = this;

    this._promise = new Promise(function (resolve, reject) {
      _this._resolve = resolve;
      _this._reject = reject;
    });
    this.features = params.popupWindowFeatures || DefaultPopupFeatures$1;
    this.target = params.popupWindowTarget || DefaultPopupTarget$1;
    this.redirect_uri = params.startUrl;
    Log.debug("CordovaPopupWindow.ctor: redirect_uri: " + this.redirect_uri);
  }

  var _proto = CordovaPopupWindow.prototype;

  _proto._isInAppBrowserInstalled = function _isInAppBrowserInstalled(cordovaMetadata) {
    return ["cordova-plugin-inappbrowser", "cordova-plugin-inappbrowser.inappbrowser", "org.apache.cordova.inappbrowser"].some(function (name) {
      return cordovaMetadata.hasOwnProperty(name);
    });
  };

  _proto.navigate = function navigate(params) {
    if (!params || !params.url) {
      this._error("No url provided");
    } else {
      // @ts-ignore
      if (!window.cordova) {
        this._error("cordova is undefined");

        return this.promise;
      } // @ts-ignore


      var cordovaMetadata = window.cordova.require("cordova/plugin_list").metadata;

      if (this._isInAppBrowserInstalled(cordovaMetadata) === false) {
        this._error("InAppBrowser plugin not found");

        return this.promise;
      } // @ts-ignore


      this._popup = cordova.InAppBrowser.open(params.url, this.target, this.features);

      if (this._popup) {
        Log.debug("CordovaPopupWindow.navigate: popup successfully created");
        this._exitCallbackEvent = this._exitCallback.bind(this);
        this._loadStartCallbackEvent = this._loadStartCallback.bind(this);

        this._popup.addEventListener("exit", this._exitCallbackEvent, false);

        this._popup.addEventListener("loadstart", this._loadStartCallbackEvent, false);
      } else {
        this._error("Error opening popup window");
      }
    }

    return this.promise;
  };

  _proto._loadStartCallback = function _loadStartCallback(event) {
    if (event.url.indexOf(this.redirect_uri) === 0) {
      this._success({
        url: event.url
      });
    }
  };

  _proto._exitCallback = function _exitCallback(message) {
    this._error(message);
  };

  _proto._success = function _success(data) {
    this._cleanup();

    Log.debug("CordovaPopupWindow: Successful response from cordova popup window");

    this._resolve(data);
  };

  _proto._error = function _error(message) {
    this._cleanup();

    Log.error(message);

    this._reject(new Error(message));
  };

  _proto.close = function close() {
    this._cleanup();
  };

  _proto._cleanup = function _cleanup() {
    if (this._popup) {
      Log.debug("CordovaPopupWindow: cleaning up popup");

      this._popup.removeEventListener("exit", this._exitCallbackEvent, false);

      this._popup.removeEventListener("loadstart", this._loadStartCallbackEvent, false);

      this._popup.close();
    }

    this._popup = null;
  };

  _createClass(CordovaPopupWindow, [{
    key: "promise",
    get: function get() {
      return this._promise;
    }
  }]);

  return CordovaPopupWindow;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var CordovaPopupNavigator = /*#__PURE__*/function () {
  function CordovaPopupNavigator() {}

  var _proto = CordovaPopupNavigator.prototype;

  _proto.prepare = function prepare(params) {
    var popup = new CordovaPopupWindow(params);
    return Promise.resolve(popup);
  };

  return CordovaPopupNavigator;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var CordovaIFrameNavigator = /*#__PURE__*/function () {
  function CordovaIFrameNavigator() {}

  var _proto = CordovaIFrameNavigator.prototype;

  _proto.prepare = function prepare(params) {
    params.popupWindowFeatures = 'hidden=yes';
    var popup = new CordovaPopupWindow(params);
    return Promise.resolve(popup);
  };

  return CordovaIFrameNavigator;
}();

var Version = "1.11.5";

exports.AccessTokenEvents = AccessTokenEvents;
exports.CheckSessionIFrame = CheckSessionIFrame;
exports.CordovaIFrameNavigator = CordovaIFrameNavigator;
exports.CordovaPopupNavigator = CordovaPopupNavigator;
exports.Global = Global;
exports.InMemoryWebStorage = InMemoryWebStorage;
exports.Log = Log;
exports.MetadataService = MetadataService;
exports.OidcClient = OidcClient;
exports.SessionMonitor = SessionMonitor;
exports.TokenRevocationClient = TokenRevocationClient;
exports.User = User;
exports.UserManager = UserManager;
exports.Version = Version;
exports.WebStorageStateStore = WebStorageStateStore;
//# sourceMappingURL=oidc-client-ts.cjs.development.js.map
