/**
 * QCObjects  2.4
 * ________________
 *
 * Author: Jean Machuca <correojean@gmail.com>
 *
 * Cross Browser Javascript Framework for MVC Patterns
 * QuickCorp/QCObjects is licensed under the
 * GNU Lesser General Public License v3.0
 * [LICENSE] (https://github.com/QuickCorp/QCObjects/blob/master/LICENSE.txt)
 *
 * Permissions of this copyleft license are conditioned on making available
 * complete source code of licensed works and modifications under the same
 * license or the GNU GPLv3. Copyright and license notices must be preserved.
 * Contributors provide an express grant of patent rights. However, a larger
 * work using the licensed work through interfaces provided by the licensed
 * work may be distributed under different terms and without source code for
 * the larger work.
 *
 * Copyright (C) 2015 Jean Machuca,<correojean@gmail.com>
 *
 * Everyone is permitted to copy and distribute verbatim copies of this
 * license document, but changing it is not allowed.
 */
/*eslint no-unused-vars: "off"*/
/*eslint no-redeclare: "off"*/
/*eslint no-empty: "off"*/
/*eslint strict: "off"*/
/*eslint no-mixed-operators: "off"*/
(function (_top) {
  "use strict";
  var global = _top;
  _top.global = global;

  var _protected_code_ = function (_) {
    var __oldtoString = (typeof _.prototype !== "undefined") ? (_.prototype.toString) : (function () {
      return "";
    });
    if (typeof _.prototype !== "undefined") {
      _.prototype.toString = function () {
        var _protected_symbols = ["ComplexStorageCache",
          "css",
          "append",
          "attachIn",
          "debug",
          "info",
          "warn",
          "QC_Append",
          "set",
          "get",
          "done",
          "componentDone",
          "_new_",
          "__new__",
          "Class",
          "ClassFactory",
          "New",
          "Export",
          "Package",
          "Import",
          "subelements",
          "componentLoader",
          "buildComponents",
          "Controller",
          "View",
          "VO",
          "Service",
          "serviceLoader",
          "JSONService",
          "ConfigService",
          "SourceJS",
          "SourceCSS",
          "ArrayList",
          "ArrayCollection",
          "Effect",
          "Timer",
          "sum",
          "avg",
          "table",
          "max",
          "min",
          "range",
          "matrix",
          "matrix2d",
          "matrix3d",
          "unique",
          "uniqueId",
          "shortCode",
          "NamespaceRef"
        ];
        var _ret_;
        if (_protected_symbols.includes(this.name)) {
          _ret_ = this.name + "{ [QCObjects native code] }";
        } else {
          _ret_ = __oldtoString.call(this);
        }
        return _ret_;
      };
    }
  };
  (_protected_code_)(Function);
  var _methods_ = function (_) {
    var _m = [];
    for (var i in _) {
      if ((typeof _[i]).toLowerCase() === "function") {
        _m.push(_[i]);
      }
    }
    return _m;
  };

  String.prototype.__mAll__ = function (regex) {
    // This is an alternative to old browsers that dont support String.prototype.matchAll
    // https://github.com/tc39/proposal-string-matchall
    var matches = [];
    this.replace(regex, function () {
      var match = Array.prototype.slice.call(arguments, 0, -2);
      match.input = arguments[arguments.length - 1];
      match.index = arguments[arguments.length - 2];
      matches.push(match);
    });
    return matches;
  };
  if (typeof String.prototype.matchAll === "undefined") {
    String.prototype.matchAll = String.prototype.__mAll__;
  }
  var isDeno = (typeof window !== "undefined" && "Deno" in window);
  var isBrowser = (typeof window !== "undefined" && typeof window.self !== "undefined" && window === window.self) && !isDeno;
  var _DOMCreateElement = function (elementName) {
    var _ret_;
    if (isBrowser) {
      _ret_ = document.createElement(elementName);
    } else {
      _ret_ = {};
    }
    return _ret_;
  };

  if (!isBrowser) {
    const fs = require("fs");
  }

  var _DataStringify = function (data) {
    var getCircularReplacer = function () {
      var seen = new WeakSet();
      var _level = 0;
      return function (key, value) {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            _level += 1;
            return (_level <= 3) ? (_LegacyCopy(value)) : (null);
          }
          seen.add(value);
        }
        return value;
      };
    };
    return JSON.stringify(data, getCircularReplacer());
  };

  if (isBrowser) {
    var _subelements = function subelements(selector) {
      return [...this.querySelectorAll(selector)];
    };
    Element.prototype.subelements = _subelements;
    HTMLDocument.prototype.subelements = _subelements;
    HTMLElement.prototype.subelements = _subelements;
    if (typeof ShadowRoot !== "undefined") {
      ShadowRoot.prototype.subelements = _subelements;
    }
  }
  if (isBrowser) {
    try {
      _top = (typeof window.top !== "undefined") ? (window.top) : (window);
      _top["_allowed_"] = true;
    } catch (e) {
      try {
        _top = document;
        _top["_allowed_"] = true;
      } catch (e2) {
        try {
          _top = global;
          _top["_allowed_"] = true;
        } catch (e3) {
          _top = {};
          _top["_allowed_"] = true;
        }
      }
    }
  } else if (typeof global !== "undefined") {
    _top = global;
  }
  var _domain_, _basePath_;
  _basePath_ = (
    function () {
      var _basePath = "";
      if (isBrowser) {
        var baseURI = _top.document.baseURI.split("?")[0].split("/");
        baseURI.pop();
        _basePath = baseURI.join("/") + "/";
      } else {
        var process;
        try {
          process = require("process");
        } catch (e) {
          // not a process module
        }
        if (typeof process !== "undefined") {
          _basePath = `${process.cwd()}/`;
        } else {
          _basePath = "";
        }
      }
      return _basePath;
    }
  )();
  if (isBrowser) {
    /**
     * Polyfilling Promise
     */
    if (!("Promise" in _top)) {
      _top.Promise = function (_f) {
        var _p = {
          then() {},
          catch () {},
          _then(response) {
            this.then.call(_p, response);
          },
          _catch(response) {
            this.catch.call(_p, response);
          }
        };
        _f.call(_p, _p._then, _p._catch);
        return _p;
      };
    }
    if (typeof _top.console === "undefined") {
      _top.console = function () {};
      _top.console.prototype.log = function (message) {};
    }

    _domain_ = (
      function () {
        return (typeof document !== "undefined" && document.domain !== "") ? (document.domain) : ("localhost");
      }
    )();

    var _secretKey = (
      function () {
        var __secretKey = _top[(![] + [])[((+!+[]) + (+!+[]))] + (typeof ![])[(+!+[])] + (typeof [])[((+!+[]) + (+!+[])) * ((+!+[]) + (+!+[]))] + (![] + [])[(+!+[])] + (!![] + [])[(+[])] + ([] + [] + [][
          []
        ])[(+[+!+[] + [+[]]]) / ((+!+[]) + (+!+[]))] + (typeof ![])[(+!+[])] + ([] + [] + [][
          []
        ])[(+!+[])]]["h" + (typeof ![])[(+!+[])] + (![] + [])[(+!+[] + ((+!+[]) + (+!+[])))] + (!![] + [])[(+[])]].toLowerCase();
        return __secretKey;
      }
    )();
    var is_phonegap = (
      function () {
        return (typeof cordova !== "undefined") ? (true) : (false);
      }
    )();

  } else {
    // This is only for code integrity purpose using non-browser implementations
    // like using node.js
    var _secretKey = "secret";
    _domain_ = "localhost";
  }

  _top._asyncLoad = [];
  var asyncLoad = function (callback, args) {
    var asyncCallback = {
      "func": callback,
      "args": args,
      "dispatch"() {
        this.func.apply(null, this.args);
      }
    };
    _top._asyncLoad.push(asyncCallback);
    return asyncCallback;
  };

  if (isBrowser) {
    var _fireAsyncLoad = function () {
      if (document.readyState === "complete") {
        _top._asyncLoad.map(function (fc) {
          fc.dispatch.call(fc);
        });
      }
    };
    document.onreadystatechange = _fireAsyncLoad;
  } else if (typeof _top.global !== "undefined") {
    _top.global._fireAsyncLoad = function () {
      _top._asyncLoad.map(function (fc) {
        fc.dispatch.call(fc);
      });
    };
  }

  _top.asyncLoad = asyncLoad;
  var Logger = function () {
    return {
      debugEnabled: true,
      infoEnabled: true,
      warnEnabled: true,
      debug(message) {
        if (this.debugEnabled) {
          console.log("\x1b[35m%s\x1b[0m", "[DEBUG] " + message);
        }
      },
      info(message) {
        var color;
        if (this.infoEnabled) {
          if (isBrowser) {
            color = "\x1b[103m%s\x1b[0m";
          } else {
            color = "\x1b[33m%s\x1b[0m";
          }
          console.info(color, "[INFO] " + message);
        }
      },
      warn(message) {
        if (this.warnEnabled) {
          console.warn("\x1b[31m%s\x1b[0m", "[WARN] " + message);
        }
      }
    };
  };
  var logger = new Logger();
  logger.debugEnabled = false;
  logger.infoEnabled = true;
  _top.logger = logger;
  var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode(e) {
      var t = "";
      var n, r, i, s, o, u, a;
      var f = 0;
      e = Base64._utf8_encode(e);
      while (f < e.length) {
        n = e.charCodeAt(f++);
        r = e.charCodeAt(f++);
        i = e.charCodeAt(f++);
        s = n >> 2;
        o = (n & 3) << 4 | r >> 4;
        u = (r & 15) << 2 | i >> 6;
        a = i & 63;
        if (isNaN(r)) {
          u = a = 64;
        } else if (isNaN(i)) {
          a = 64;
        }
        t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
      }
      return t;
    },
    decode(e) {
      var t = "";
      var n, r, i;
      var s, o, u, a;
      var f = 0;
      e = e.replace(/[^A-Za-z0-9+/=]/g, "");
      while (f < e.length) {
        s = this._keyStr.indexOf(e.charAt(f++));
        o = this._keyStr.indexOf(e.charAt(f++));
        u = this._keyStr.indexOf(e.charAt(f++));
        a = this._keyStr.indexOf(e.charAt(f++));
        n = s << 2 | o >> 4;
        r = (o & 15) << 4 | u >> 2;
        i = (u & 3) << 6 | a;
        t = t + String.fromCharCode(n);
        if (u !== 64) {
          t = t + String.fromCharCode(r);
        }
        if (a !== 64) {
          t = t + String.fromCharCode(i);
        }
      }
      t = Base64._utf8_decode(t);
      return t;
    },
    _utf8_encode(e) {
      e = e.replace(/rn/g, "n");
      var t = "";
      for (var n = 0; n < e.length; n++) {
        var r = e.charCodeAt(n);
        if (r < 128) {
          t += String.fromCharCode(r);
        } else if (r > 127 && r < 2048) {
          t += String.fromCharCode(r >> 6 | 192);
          t += String.fromCharCode(r & 63 | 128);
        } else {
          t += String.fromCharCode(r >> 12 | 224);
          t += String.fromCharCode(r >> 6 & 63 | 128);
          t += String.fromCharCode(r & 63 | 128);
        }
      }
      return t;
    },
    _utf8_decode(e) {
      var t = "";
      var n = 0;
      var r = 0;
      var c1 = 0;
      var c2 = 0;
      var c3;
      while (n < e.length) {
        r = e.charCodeAt(n);
        if (r < 128) {
          t += String.fromCharCode(r);
          n++;
        } else if (r > 191 && r < 224) {
          c2 = e.charCodeAt(n + 1);
          t += String.fromCharCode((r & 31) << 6 | c2 & 63);
          n += 2;
        } else {
          c2 = e.charCodeAt(n + 1);
          c3 = e.charCodeAt(n + 2);
          t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
          n += 3;
        }
      }
      return t;
    }
  };
  var waitUntil = function (func, exp) {
    var _waitUntil = function (func, exp) {
      var maxWaitCycles = 2000;
      var _w = 0;
      var _t = setInterval(function () {
        if (exp.call()) {
          clearInterval(_t);
          func.call();
          logger.debug("Ejecuting " + func.name + " after wait");
        } else {
          if (_w < maxWaitCycles) {
            _w += 1;
            logger.debug("WAIT UNTIL " + func.name + " is true, " + _w.toString() + " cycles");
          } else {
            logger.debug("Max execution time for " + func.name + " expression until true");
            clearInterval(_t);
          }
        }
      }, 1);
    };
    setTimeout(function () {
      _waitUntil(func, exp);
    }, 1);
  };
  if (typeof localStorage === "undefined") {
    /* Polyfill for localStorage */
    var localStorage = {
      getItem(name) {
        return (Object.hasOwnProperty.call(this, name)) ? (this[name]) : (null);
      },
      setItem(name, value) {
        this[name] = value;
      },
      removeItem(name) {
        delete this[name];
      }
    };
    /* end Polyfill for localStorage */
  }
  var ComplexStorageCache = function (params) {
    var object, load, alternate;
    object = params.index;
    if (typeof object !== "undefined") {
      load = params.load;
      alternate = params.alternate;
      var cachedObjectID = this.getID(object);
      var cachedResponse = localStorage.getItem(cachedObjectID);
      if (this.isEmpty(cachedResponse)) {
        var cachedNewResponse = load.call(null, {
          "cachedObjectID": cachedObjectID,
          "cachedResponse": cachedResponse,
          "cache": this
        });
        this.save(object, cachedNewResponse);
        logger.debug("RESPONSE OF {{cachedObjectID}} CACHED".replace("{{cachedObjectID}}", cachedObjectID));
      } else {
        var alternateResponse = alternate.call(null, {
          "cachedObjectID": cachedObjectID,
          "cachedResponse": cachedResponse,
          "cache": this
        });
        logger.debug("RESPONSE OF {{cachedObjectID}} IS ALREADY CACHED ".replace("{{cachedObjectID}}", cachedObjectID));
      }

    } else {
      throw new Error("ComplexStorageCache: index is undefined");
    }
    return this;
  };
  ComplexStorageCache.prototype.getItem = function (cachedObjectID) {
    var retrievedObject = localStorage.getItem(cachedObjectID);
    if (!this.isEmpty(retrievedObject)) {
      return JSON.parse(retrievedObject);
    } else {
      return null;
    }
  };
  ComplexStorageCache.prototype.setItem = function (cachedObjectID, value) {
    localStorage.setItem(cachedObjectID, _DataStringify(value));
  };
  ComplexStorageCache.prototype.isEmpty = function (object) {
    var r = false;
    switch (true) {
      case (typeof object === "undefined"):
      case (typeof object === "string" && object === ""):
      case (typeof object === "string" && object === "undefined"):
      case (typeof object === "number" && object === 0):
      case (object === null):
        r = true;
        break;
      default:
        r = false;
    }
    return r;
  };
  ComplexStorageCache.prototype.getID = function (object) {
    var cachedObjectID;
    if (typeof object !== "undefined") {
      cachedObjectID = "cachedObject_" + Base64.encode(_DataStringify(object).replace(/\{|\}|,/g, "_"));
    }
    return cachedObjectID;
  };
  ComplexStorageCache.prototype.save = function (object, cachedNewResponse) {
    var cachedObjectID = this.getID(object);
    logger.debug("CACHING THE RESPONSE OF {{cachedObjectID}} ".replace("{{cachedObjectID}}", cachedObjectID));
    this.setItem(cachedObjectID, cachedNewResponse);
  };
  ComplexStorageCache.prototype.getCached = function (object) {
    var cachedObjectID = this.getID(object);
    return this.getItem(cachedObjectID);
  };
  ComplexStorageCache.prototype.clear = function () {
    Object.keys(localStorage).filter(function (k) {
      return k.startsWith("cachedObject_");
    }).map(function (c) {
      localStorage.removeItem(c);
    });
  };

  /**
   *  Detecting passive events feature
   *
   * https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
   **/

  // Test via a getter in the options object to see if the passive property is accessed
  if (isBrowser) {
    var supportsPassive = false;
    try {
      var opts = Object.defineProperty({}, "passive", {
        get() {
          supportsPassive = true;
          return supportsPassive;
        }
      });
      window.addEventListener("testPassive", null, opts);
      window.removeEventListener("testPassive", null, opts);
    } catch (e) {}
    var captureFalse = function () {
      return (supportsPassive) ? ({
        passive: true
      }) : (false);
    };

    // Use our detect's results. passive applied if supported, capture will be false either way.
    //elem.addEventListener('touchstart', fn, captureFalse);

  }


  /**
   * Basic Type of all elements
   */
  if (isBrowser) {
    Element.prototype.find = function (tag) {
      var _oo = [];
      var _tags = document.subelements(tag);
      _tags.map(function (_tt, _t) {
        if ((typeof _tags[_t] !== "undefined") && _tags[_t].parentNode.tagName === this.parentNode.tagName) {
          _oo.push(_Cast(_tt, (new Object())));
        }
      });
      return _oo;
    };
  }

  /**
   * Primary instance ID of all objects
   */
  var __instanceID;
  // Adaptation of Production steps of ECMA-262, Edition 5, 15.2.3.5
  // Reference: http://es5.github.io/#x15.2.3.5
  var _Object_Create = (function () {

    // make a safe reference to Object.prototype.hasOwnProperty
    var hasOwn = Object.prototype.hasOwnProperty;

    return function (O) {
      // 1. If Type(O) is not Object or Null throw a TypeError exception.
      if (typeof O !== "object") {
        throw TypeError("Object prototype may only be an Object or null. The type is " + typeof (O));
      }

      // 2. Let obj be the result of creating a new object as if by the
      //		expression new Object() where Object is the standard built-in
      //		constructor with that name
      // 3. Set the [[Prototype]] internal property of obj to O.
      var QCObjects = function () {};
      QCObjects.prototype = O;
      var obj = new QCObjects();

      // Let's not keep a stray reference to O...

      // 4. If the argument Properties is present and not undefined, add
      //		own properties to obj as if by calling the standard built-in
      //		function Object.defineProperties with arguments obj and
      //		Properties.
      if (arguments.length > 1) {
        // Object.defineProperties does ToObject on its first argument.
        var Properties = Object(arguments[1]);
        for (var prop in Properties) {
          if (hasOwn.call(Properties, prop)) {
            obj[prop] = Properties[prop];
          }
        }
      }

      // 5. Return obj
      return obj;
    };
  })();

  // Object.assign Polyfilling
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
  if (typeof Object.assign !== "function") {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) { // .length of function is 2
        "use strict";
        if (target === null) { // TypeError if undefined or null
          throw new TypeError("Cannot convert undefined or null to object");
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource !== null) { // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  }

  var __is_raw_class__ = function (o_c) {
    return (typeof o_c === "function" && o_c.toString().startsWith("class")) ? (true) : (false);
  };

  var _LegacyCopy = function (obj) {
    var _value_;
    switch (true) {
      case typeof obj === "string":
        _value_ = obj;
        break;
      case typeof obj === "number":
        _value_ = obj;
        break;
      case typeof obj === "object":
        _value_ = Object.assign({}, obj);
        break;
      case typeof obj === "function":
        _value_ = obj.bind({});
        break;
      case __is_raw_class__(obj):
        _value_ = class extends obj {};
        break;
      default:
        break;
    }
    return _value_;
  };


  var _QC_CLASSES = {};
  var _QC_PACKAGES = {};
  var _QC_PACKAGES_IMPORTED = [];
  var _QC_READY_LISTENERS = [];

  /**
   * Returns the object or function name
   *
   * @param Object or function
   */
  var ObjectName = function (o) {
    var ret = "";
    if (typeof o === "function" && Object.hasOwnProperty.call(o, "name") && o.name !== "") {
      ret = o.name;
    } else if (typeof o !== "undefined" && typeof o.constructor === "function" && o.constructor.name !== "") {
      ret = o.constructor.name;
    } else if (typeof o !== "undefined" && typeof o.constructor === "object") {
      ret = o.constructor.toString().replace(/\[(.*?)\]/g, "$1").split(" ").slice(1).join("");
    }
    return ret;
  };

  /**
   * Casts an object to another object class type
   *
   * @param {Object} obj_source
   * @param {Object} obj_dest
   */
  var _Cast = function (obj_source, obj_dest) {
    for (var v in obj_source) {
      if (typeof obj_source[v] !== "undefined") {
        try {
          obj_dest[v] = obj_source[v];
        } catch (e) {

        }
      }
    }
    return obj_dest;
  };

  /**
   * Casts an object to another object class type. Only properties
   *
   * @param {Object} obj_source
   * @param {Object} obj_dest
   */
  var _CastProps = function (obj_source, obj_dest) {
    for (var v in obj_source) {
      if (typeof obj_source[v] !== "undefined" && typeof obj_source[v] !== "function") {
        try {
          obj_dest[v] = obj_source[v];
        } catch (e) {
          // DO NOTHING
        }
      } else if (typeof obj_source[v] === "function") {
        try {
          obj_dest[v] = obj_source[v].bind(obj_dest);
        } catch (e) {
          logger.warn(e);
        }
      }
    }
    return obj_dest;
  };

  /**
   * Internal use to determine the forbidden names for classes
   * Reserved words
   *
   * @param {String} name
   * @param {Object} type
   * @param {Object} definition
   */
  var __is__forbidden_name__ = function () {
    return (["__proto__", "prototype", "Object", "Map", "defineProperty", "indexOf", "toString", "__instanceID"].indexOf(arguments[0]) !== -1) ? (true) : (false);
  };

  /**
   * Determine the type of the Object for any QCObjects Object
   *
   * @param {Object} object
   */
  var __getType__ = function __getType__(o_c) {
    var _ret_ = "";
    switch (true) {
      case typeof o_c === "object" &&
      (!!o_c.constructor &&
      !!o_c.constructor.name)  
      && o_c.constructor.name !== "":
        _ret_ = o_c.constructor.name;
        break;
      case (!!o_c && !!o_c.__classType) && o_c.__classType !== "":
        _ret_ = o_c.__classType;
        break;
      case (!!o_c && !!o_c.__definition) && (!!o_c.__definition.__classType) && o_c.__definition.__classType !== "":
        _ret_ = o_c.__definition.__classType;
        break;
      case typeof o_c === "function" && !!o_c.name:
        _ret_ = o_c.name;
        break;
      default:
        _ret_ = ObjectName(o_c);
        break;
    }
    return _ret_;
  };

  /**
   * Returns if a class or object is from a determinated type
   * @param {Object} object
   * @param {String} typeName
   */
  var is_a = function is_a(obj, typeName) {
    return (typeof obj !== "undefined" && obj !== null &&
      (((isQCObjects_Class(obj) || isQCObjects_Object(obj)) && (obj.hierarchy().includes(typeName))) ||
        __getType__(obj) === typeName ||
        ObjectName(obj) === typeName ||
        typeof obj === typeName)) ? (true) : (false);
  };


  var __make_global__ = function (f) {
    if (typeof f !== "undefined") {
      if (isBrowser) {
        try {
          _top[f.name] = f;
          window[f.name] = f;
        } catch (e) {}
      } else if (typeof global !== "undefined") {
        if (!Object.hasOwnProperty.call(global, f.name)) {
          global[f.name] = f;
        }
      }
    }

  };

  var __register_class__ = function (_class_, __namespace) {
    var name = _class_.name || __getType__(_class_);
    _class_.__definition.__classType = name;
    if (typeof __namespace !== "undefined"){
      _class_.__definition.__namespace = __namespace;
    }
    _QC_CLASSES[name] = _class_;
    _top[name] = _QC_CLASSES[name];
    return _top[name];
  };

  var RegisterClass = function (_class_, __namespace) {
    return __register_class__(_class_, __namespace);
  };
  __make_global__(RegisterClass);

  /**
   * Creates new object class  of another object
   *
   * @param {String} name
   * @param {Object} type
   * @param {Object} definition
   */
  var Class = function () {
    var _types_ = {};
    var name, type, definition;

    switch (arguments.length) {
      case 0:
        return class {};
      case 1:
        name = arguments[0];
        type = class {};
        definition = {};
        break;
      case 2:
        name = arguments[0];
        type = class {};
        definition = arguments[1];
        break;
      case 3:
        name = arguments[0];
        type = arguments[1];
        definition = arguments[2];
        break;
      default:
        break;
    }

    if (typeof type !== "function") {
      throw new Error("Class type must be a function or class");
    }

    if (__is__forbidden_name__.call(this, name)) {
      throw new Error(`${name} is not an allowed word in the name of a class`);
    }

    if (typeof type["__definition"] !== "undefined") {
      definition["__definition"] = Object.assign(_LegacyCopy(type.__definition), type);
    }

    _types_[type.name] = type;

    if (typeof definition === "undefined" || definition === null) {
      definition = {};
    } else {
      definition = _LegacyCopy(definition);
    }

    /* hack to prevent duplicate __instanceID */
    if (typeof definition["__instanceID"] !== "undefined") {
      delete definition["__instanceID"];
    }

    _QC_CLASSES[name] = class extends _types_[type.name] {
      __classType = name;
      __definition = {
        ...definition
      };

      static hierarchy(__class__) {
        var __classType = function (o_c) {
          return (Object.hasOwnProperty.call(o_c, "__classType")) ? (o_c.__classType) : (__getType__.call(__class__, o_c));
        };
        var __hierarchy__proto__ = (c) => {
          return (typeof c !== "undefined" && typeof c.__proto__ !== "undefined" && c.__proto__ !== null) ? (((__classType(c) !== "") ? ([__classType(c)]) : ([])).concat(__hierarchy__proto__(c.__proto__))) : ([]);
        };

        if (typeof __class__ === "undefined" || __class__ === null) {
          __class__ = this;
        }
        var __hierarchy = [];
        __hierarchy.push(__classType(__class__));
        __hierarchy = __hierarchy.concat(__hierarchy__proto__(__class__.__proto__));
        return __hierarchy;
      }

      constructor() {
        var _o_;
        if (arguments.length > 0) {
          _o_ = {
            ...arguments[0]
          };
        } else {
          _o_ = {};
        }
        super(_o_);
  
        let self = this;
        __instanceID = (typeof __instanceID === "undefined" || __instanceID === null) ? (0) : (__instanceID + 1);
        if (!self.__instanceID) {
          Object.defineProperty(self, "__instanceID", {
            value: __instanceID,
            writable: false
          });
        }

        if (typeof self.__definition !== "undefined") {
          Object.keys(self.__definition).filter(function (k) {
            return isNaN(k) && !["name", "__instanceID", "__classType", "__definition"].includes(k);
          }).forEach(function (key) {
            if (typeof self.__definition[key] === "function") {
              self[key] = self.__definition[key].bind(self);
            } else {
              self[key] = self.__definition[key];
            }
          });
        }
        _methods_(_QC_CLASSES[self.__classType]).map(function (m) {
          self[m.name] = m.bind(self);
        });
        _methods_(self.__definition).map(function (m) {
          self[m.name] = m.bind(self);
        });

        if (typeof self.__definition === "undefined" || (!Object.hasOwnProperty.call(self.__definition, "body")) || typeof self.__definition.body === "undefined") {
          try {
            if (isBrowser) {
              self["body"] = _DOMCreateElement(self.__definition.__classType);
            } else {
              self["body"] = {};
            }
          } catch (e) {
            self["body"] = {};
          }
        } else if (Object.hasOwnProperty.call(self.__definition, "body")) {
          self["body"] = self.__definition.body;
        }

        try {
          if (typeof self.__new__ === "function") {
            self.__new__.call(self, _o_);
          } else if (typeof super.__new__ === "function") {
            self.__new__ = super.__new__.bind(self);
            self.__new__.call(self, _o_);
          }
          if (typeof self === "object" && Object.hasOwnProperty.call(self, "_new_") && typeof self._new_.isCalled === "undefined") {
            try {
              self._new_.call(self, _o_);
              self._new_.isCalled = true;
            } catch (e) {
              logger.warn(`${self.__classType}._new_() failed with error: ${e}`);
            }
          }
        } catch (e) {
          logger.warn(e);
        }
      }

      __new__(_o_) {
        _CastProps(_o_, this);
      }
      _new_() {}

      getClass() {
        return Object.getPrototypeOf(this.constructor);
      }

      css(_css) {
        if (typeof this["body"] !== "undefined" && this["body"]["style"] !== "undefined") {
          logger.debug("body style");
          this["body"]["style"] = _Cast(_css, this["body"]["style"]);
        }
        return this["body"]["style"];
      }

      hierarchy() {
        var __instance__ = this;
        return this.getClass().hierarchy(__instance__);
      }


      append(child) {
        logger.debug("append: start");
        if (is_a(child, "Component")) {
          logger.debug("append: child is a Component");
          logger.debug(`appending the body of ${child.name}`);
        }
        var child = (arguments.length > 0) ? (arguments[0]) : (this["body"]);
        if (typeof this["body"] !== "undefined") {
          logger.debug("append element");
          if (arguments.lenght > 0) {
            logger.debug("append to element");
            this["body"].append(child);
            if (typeof this["childs"] === "undefined") {
              this["childs"] = [];
            }
            this["childs"].push(child);
          } else {
            if (isBrowser) {
              logger.debug("append to body");
              document.body.append(child);
            }
          }
        }
      }

      attachIn(tag) {
        if (isBrowser) {
          var tags = document.subelements(tag);
          for (var i = 0, j = tags.length; i < j; i++) {
            tags[i].append(this);
          }
        } else {
          throw new Error("attachIn not yet implemented for non browser platforms");
        }
      }

    };

    // remove the keys from definition that exist in the prototype

    _QC_CLASSES[name] = _CastProps(definition, _QC_CLASSES[name]);
    _QC_CLASSES[name]["__definition"] = definition;
    _QC_CLASSES[name]["__definition"]["__classType"] = name;
    _QC_CLASSES[name]["__definition"]["__new__"] = function __new__(_o_) {
      _CastProps(_o_, this);
    };

    _top[name] = _QC_CLASSES[name];

    return _top[name];
  };

  Class.prototype.toString = function () {
    return "Class(name, type, definition) { [QCObjects native code] }";
  };

  /**
   * Returns the QCObjects Class Factory of a given ClassName
   *
   * @param {String} name
   */

  var ClassFactory = function (className) {
    var _classFactory;
    if (className !== null && className.indexOf(".") > -1) {
      var packageName = className.split(".").slice(0, className.split(".").length - 1).join(".");
      var _className = className.split(".").slice(-1).join("");
      var _package = Package(packageName);
      var packageClasses = (typeof _package !== "undefined") ? (_package.filter(classFactory => {
        return isQCObjects_Class(classFactory) &&
          (classFactory.__definition.__classType === _className || (typeof classFactory === "function" && !!classFactory.name) ) ;
      }).reverse()) : ([]);
      if (packageClasses.length > 0) {
        _classFactory = packageClasses[0];
      } else {
        throw Error (`Class ${className} not found.`);
      }
    } else if (className !== null && Object.hasOwnProperty.call(_QC_CLASSES, className)) {
      _classFactory = _QC_CLASSES[className];
    }
    return _classFactory;
  };

  if (isBrowser) {
    Element.prototype.append = function QC_Append(child) {
      if (isQCObjects_Object(child) || typeof child.body !== "undefined") {
        this.appendChild(child.body);
      } else {
        this.appendChild(child);
      }
    };

    /**
     * A replacement for direct using of innerHTML
     * use: [element].render('content') where 'content' is the string corresponding
     * to the DOM to insert in the element
     **/
    Element.prototype.render = function QC_Render(content) {
      var _self = this;
      var _appendVDOM = function (_self, content) {
        if (typeof document.implementation.createHTMLDocument !== "undefined") {
          var doc = document.implementation.createHTMLDocument("");
          doc.innerHTML = content;
          doc.body.subelements("*").map(function (element) {
            return _self.append(element);
          });
        }
      };
      if (typeof this.innerHTML !== "undefined") {
        try {
          this.innerHTML += content;
        } catch (e) {
          _appendVDOM(_self, content);
        }
      } else {
        _appendVDOM(_self, content);
      }
    };
  }

  /**
   * Returns a method from a superior QCObjects Class
   * It is useful for Class Inheritance in the _new_ and __new__ method constructors
   * @example _super_('MySuperClass','MySuperMethod').call(this,params) #where this is the current instance and params are method parameters
   *
   * @param {String} className
   * @param {String} classMethodName
   * @param {Object} params
   */
  var _super_ = function (className, classMethodName, params) {
    return ClassFactory(className)[classMethodName];
  };
  _super_.prototype.toString = function () {
    return "_super_(className,classMethodName,params) { [QCObjects native code] }";
  };

  /**
   * Creates an object from a Class definition
   *
   * @param {QC_Object} o
   * @param {Object} args
   */

  var New = function (__class__, args) {
    args = (arguments.length > 1) ? (args) : ({});
    return (typeof __class__ === "undefined") ? (new Object()) : (new __class__(args));
  };

  New.prototype.toString = function () {
    return "New(QCObjectsClassName, args) { [QCObjects native code] }";
  };


  var Export = function (f) {
    return __make_global__(f);
  };
  Export.prototype.toString = function () {
    return "Export(function or symbol) { [QCObjects native code] }";
  };

  if (!isBrowser) {
    var findPackageNodePath = function (packagename) {
      const fs = require("fs");
      var sdkPath = null;
      try {
        var sdkPaths = [
          `${_top.CONFIG.get("projectPath")}${_top.CONFIG.get("relativeImportPath")}`,
          `${_top.CONFIG.get("basePath")}${_top.CONFIG.get("relativeImportPath")}`,
          `${_top.CONFIG.get("projectPath")}`,
          `${_top.CONFIG.get("basePath")}`,
          `${_top.CONFIG.get("relativeImportPath")}`,
          `${process.cwd()}${_top.CONFIG.get("relativeImportPath")}`,
          `${process.cwd()}/node_modules/` + packagename,
          `${process.cwd()}/node_modules`,
          `${process.cwd()}`,
          "node_modules",
          "./",
          ""
        ].concat(module.paths);
        sdkPaths = sdkPaths.filter(p => {
          return fs.existsSync(p + "/" + packagename);
        });
        if (sdkPaths.length > 0) {
          sdkPath = sdkPaths[0];
          logger.info(packagename + " is Installed.");
        } else {
          //          logger.debug(packagename + ' is not in a standard path.');
        }
      } catch (e) {
        // do nothing
        console.log(e);
      }
      return sdkPath;
    };
    Export(findPackageNodePath);
  }

  Class("_Crypt", Object, {
    last_string: "",
    last_key: "",
    construct: false,
    _new_(o) {
      var string = o["string"];
      var key = (o.hasOwnProperty.call(o, "key")) ? (o["key"]) : (null);
      this.__new__(o);
      key = (key === null) ? (this.__instanceID) : (key);
      this.last_key = key;
      this.last_string = string;
      this.construct = true;
    },
    _encrypt() {
      var string = this.string;
      var key = this.key;
      var result = "";
      var char;
      var keychar;
      for (var i = 0; i < string.length; i++) {
        char = string.substr(i, 1);
        keychar = key.substr((i % key.length) - 1, 1);
        char = String.fromCharCode(char.charCodeAt(0) + keychar.charCodeAt(0));
        result += char;
      }
      this.last_string = Base64.encode(result);
      return this.last_string;
    },
    _decrypt() {
      var string = this.string;
      var key = this.key;
      var result = "";
      var char;
      var keychar;
      string = Base64.decode(string);
      for (var i = 0; i < string.length; i++) {
        char = string.substr(i, 1);
        keychar = key.substr((i % key.length) - 1, 1);
        char = String.fromCharCode(char.charCodeAt(0) - keychar.charCodeAt(0));
        result += char;
      }

      this.last_string = result;
      return this.last_string;
    },
    encrypt(string, key) {
      var crypt = New(ClassFactory("_Crypt"), {
        string: string,
        key: (key !== "") ? (key) : ("12345678ABC")
      });
      return crypt._encrypt();
    },
    decrypt(string, key) {
      var crypt = New(ClassFactory("_Crypt"), {
        string: string,
        key: (key !== "") ? (key) : ("12345678ABC")
      });
      return crypt._decrypt();
    }
  });

  var _CryptObject = function (o) {
    return ClassFactory("_Crypt").encrypt(_DataStringify(o), _secretKey);
  };
  var _DecryptObject = function (s) {
    return (s === "") ? ({}) : (JSON.parse(ClassFactory("_Crypt").decrypt(s, _secretKey)));
  };

  var shortCode = function () {
    var length = 1000;
    var code1 = ClassFactory("_Crypt").encrypt((Math.random() * length).toString().replace(".", ""), (new Date()).getTime().toString());
    var code2 = ClassFactory("_Crypt").encrypt((Math.random() * length).toString().replace(".", ""), (new Date((new Date()).getTime() - 1000 * 1000)).getTime().toString());
    var shortCode = code2.list().map((o1, index) => {
      return code1.list()[index] === o1 ? null : o1;
    }).filter(c => c !== null).join("");
    return shortCode;
  };
  var uniqueId = shortCode;

  Class("Processor", {
    processors: {
      "config"(arg) {
        return _top.CONFIG.get(arg, "");
      },
      "ENV"(arg) {
        return (typeof process !== "undefined") ? (process.env[arg]) : ("");
      },
      "global"(arg) {
        return (typeof global !== "undefined") ? (global[arg]) : ("");
      }
    },
    setProcessor(_proc_) {
      if (typeof _proc_ === "function" && _proc_.name !== "") {
        this.processors[_proc_.name] = _proc_;
      }
    },
    execute(processorName, args) {
      let processorHandler = this;
      return processorHandler.processors[processorName].apply(processorHandler, args.split(","));
    },
    process(template) {
      if (typeof template === "string") {
        let processorHandler = this;
        Object.keys(processorHandler.processors).map(function (funcName) {
          [...template.matchAll(new RegExp("\\$" + funcName + "\\((.*)\\).*", "g"))].map(
            function (procesorMatch) {
              var match0 = `$${funcName}(${procesorMatch[1]})`;
              template = template.replace(match0, processorHandler.execute.call(processorHandler, funcName, procesorMatch[1]));
            }
          );
        });
      }
      return template;
    },
    processObject(obj) {
      let __instance__ = this;
      if (typeof obj === "object") {
        Object.keys(obj).map(
          function (_k) {
            if (typeof obj[_k] === "object" && !obj[_k].hasOwnProperty.call(obj[_k], "call")) {
              obj[_k] = __instance__.processObject(obj[_k]);
            } else if (typeof obj[_k] === "string") {
              obj[_k] = __instance__.process(obj[_k]);
            }
          }
        );
      } else if (typeof obj === "string") {
        obj = __instance__.process(obj);
      }
      return obj;
    }
  });

  class ConfigSettings {
    static _instance = null;
    static _CONFIG_ENC = null;
    static get instance() {

      if (this._instance === null) {
        var _config_settings = new ConfigSettings();
        _config_settings._CONFIG = {
          "relativeImportPath": "",
          "remoteImportsPath": "",
          "remoteSDKPath": "https://sdk.qcobjects.dev/v2.4/",
          "asynchronousImportsLoad": false,
          "removePackageScriptAfterLoading": true,
          "componentsBasePath": "",
          "delayForReady": 0,
          "preserveComponentBodyTag": false,
          "overrideComponentTag": false,
          "useConfigService": false,
          "routingWay": "hash",
          "useSDK": true,
          "useLocalSDK": false,
          "basePath": _basePath_
        };
        _config_settings._CONFIG_ENC = null;
        this._instance = _config_settings;
      }

      return this._instance;
    }

    static set instance(value) {
      this._instance = value;
    }
  }
  _QC_CLASSES["ConfigSettings"] = ConfigSettings;

  Class("CONFIG", Object, {

    get _CONFIG_ENC() {
      return ClassFactory("ConfigSettings").instance._CONFIG_ENC;
    },

    get _CONFIG() {
      return ClassFactory("ConfigSettings").instance._CONFIG;
    },

    set(name, value) {
      logger.debug(`CONFIG.set  ${name}: ${value}`);
      // hack to force update basePath from CONFIG
      if (name === "basePath") {
        _basePath_ = value;
      }
      var _conf;
      try {
        _conf = (
          function (config) {
            if (config._CONFIG_ENC === null) {
              config._CONFIG_ENC = ClassFactory("_Crypt").encrypt(_DataStringify({}), _secretKey);
            }
            var _protectedEnc = config._CONFIG_ENC.valueOf();
            var _protectedConf = config._CONFIG.valueOf();
            return _CastProps(_protectedConf, _DecryptObject(_protectedEnc));
          }
        )(ClassFactory("ConfigSettings").instance);
      } catch (e) {
        _conf = {};
        console.error(e);
        logger.debug("failed to encrypt config");
      }

      _conf[name] = value;
      ClassFactory("ConfigSettings").instance._CONFIG_ENC = _CryptObject(_conf);
      if (Object.hasOwnProperty.call(ClassFactory("ConfigSettings").instance, "_CONFIG") && Object.hasOwnProperty.call(ClassFactory("ConfigSettings").instance._CONFIG, name)) {
        ClassFactory("ConfigSettings").instance._CONFIG[name] = value;
      }
    },
    get(name, _default) {
      var _value;
      try {
        var _conf = (
          function (config) {
            if (config._CONFIG_ENC === null) {
              config._CONFIG_ENC = ClassFactory("_Crypt").encrypt(_DataStringify({}), _secretKey);
            }
            var _protectedEnc = config._CONFIG_ENC.valueOf();
            var _protectedConf = config._CONFIG.valueOf();
            return _CastProps(_protectedConf, _DecryptObject(_protectedEnc));
          }
        )(ClassFactory("ConfigSettings").instance);
        if (typeof _conf[name] !== "undefined") {
          _value = _conf[name];
        } else if (typeof _default !== "undefined") {
          _value = _default;
        }
      } catch (e) {
        console.error(e);
        logger.debug("Something wrong when trying to get CONFIG values");
        logger.debug("No config value for: " + name);
        _value = _default;
      }
      return ClassFactory("Processor").processObject.call(ClassFactory("Processor"), _value);
    }
  });

  Export(waitUntil);
  Export(_super_);
  Export(ComplexStorageCache);
  Export(ClassFactory);
  Export(_DOMCreateElement);
  Export(shortCode);
  Export(__getType__);
  Export(is_a);

  var isQCObjects_Object = function (_) {
    return (typeof _ === "object" &&
      Object.hasOwnProperty.call(_, "__classType") &&
      (!!_.__instanceID) &&
      Object.hasOwnProperty.call(_, "__definition") &&
      typeof _.__definition !== "undefined"
    ) ? (true) : (false);
  };

  var isQCObjects_Class = function (_) {
    return (typeof _ === "function" &&
      (!_.__instanceID) &&
      (!!_.__definition) &&
      typeof _.__definition !== "undefined" &&
      !!_.__definition.__classType
    ) ? (true) : (false);
  };

  /**
   * Defines a package for Class classification
   *
   * @param {Object} namespace
   * @param {Object} classes
   */
  var Package = function (namespace, classes) {
    if (_QC_PACKAGES.hasOwnProperty.call(_QC_PACKAGES, namespace) &&
      typeof _QC_PACKAGES[namespace] !== "undefined" &&
      _QC_PACKAGES[namespace].hasOwnProperty.call(_QC_PACKAGES[namespace], "length") &&
      _QC_PACKAGES[namespace].length > 0 &&
      typeof classes !== "undefined" &&
      classes.hasOwnProperty.call(classes, "length") &&
      classes.length > 0
    ) {
      classes.filter(
        function (_c1) {
          return isQCObjects_Class(_c1);
        }
      ).map(function (_class_) {
        _class_.__definition.__namespace = namespace;
      });
      _QC_PACKAGES[namespace] = _QC_PACKAGES[namespace].concat(classes);
    } else if (typeof classes !== "undefined") {
      if (typeof classes === "object" && classes.hasOwnProperty.call(classes, "length")) {
        classes.filter(
          function (_c1) {
            return isQCObjects_Class(_c1);
          }
        ).map(function (_class_) {
          _class_.__definition.__namespace = namespace;
        });
      } else if (isQCObjects_Class(classes)) {
        classes.__definition.__namespace = namespace;
      }
      _QC_PACKAGES[namespace] = classes;
    }
    if (Object.hasOwnProperty.call(_QC_PACKAGES, namespace)) {
      _QC_PACKAGES[namespace].map(function (_class_) {
        __register_class__(_class_, namespace);
      });
    }
    return (Object.hasOwnProperty.call(_QC_PACKAGES, namespace)) ? (_QC_PACKAGES[namespace]) : (undefined);
  };
  Package.prototype.toString = function () {
    return "Package(namespace, classes) { [QCObjects native code] }";
  };

  /**
   * Declare Namespace
   *
   * @param {String} packageName
   * @param {Object} package
   */
  var NamespaceRef = function (namespace) {
    let packageInstance = Package(namespace);
    let classes = packageInstance.filter(c => isQCObjects_Class(c)).map(c => {
      return {
        [c.__definition.__classType]: c
      };
    }).reduce((a, b) => Object.assign(a, b));
    return namespace.split(".").map(c => {
      return {
        [c]: classes
      };
    }).reverse().reduce((a, b) => {
      b[Object.keys(b)] = a;
      return b;
    });
  };


  /**
   * Imports a script with the package nomenclature
   *
   * @param {Object} packagename
   * @param {Object} ready
   * @param {Boolean} external
   */
  var Import = function () {
    var packagename;
    var ready = function () {};
    var external = false;
    if (arguments.length < 1) {
      return;
    } else if (arguments.length === 1) {
      packagename = arguments[0];
    } else if (arguments.length === 2) {
      packagename = arguments[0];
      ready = arguments[1];
    } else if (arguments.length > 2) {
      packagename = arguments[0];
      ready = arguments[1];
      external = arguments[2];
      logger.debug("[Import] Setting external=" + external.toString() + " resource to import: " + packagename);
    }
    if (external) {
      logger.debug("[Import] Registering external resource to import: " + packagename);
    } else {
      logger.debug("[Import] Registering local resource to import: " + packagename);
    }
    var _promise_import_;
    if (isBrowser) {
      _promise_import_ = new Promise(function (resolve, reject) {

        var allPackagesImported = function () {
          var ret = false;
          var cp = 0;
          for (var p in _QC_PACKAGES) {
            cp++;
          }
          if (cp < _QC_PACKAGES_IMPORTED.length) {
            ret = false;
          } else {
            ret = true;
          }
          return ret;
        };

        var readyImported = function (e) {
          _QC_PACKAGES_IMPORTED.push(ready);
          if (allPackagesImported()) {
            _QC_PACKAGES_IMPORTED.map(function (_imported_) {
              _QC_READY_LISTENERS.push(_imported_);
            });
          }
          if (isBrowser && _top.CONFIG.get("removePackageScriptAfterLoading")) {
            e.target.remove();
          }
          resolve.call(_promise_import_, {
            "_imported_": e.target,
            "_package_name_": packagename
          });
        };

        if (!_QC_PACKAGES.hasOwnProperty.call(_QC_PACKAGES, packagename)) {
          var s1 = _DOMCreateElement("script");
          s1.type = _top.CONFIG.get("sourceType", "text/javascript");
          s1.async = (_top.CONFIG.get("asynchronousImportsLoad")) ? (true) : (false);
          s1.onreadystatechange = function () {
            if (s1.readyState === "complete") {
              readyImported.call();
            }
          };
          s1.onload = readyImported;
          s1.onerror = function (e) {
            reject.call(_promise_import_, {
              "_imported_": s1,
              "_package_name_": packagename
            });
          };
          s1.src = (external) ? (_top.CONFIG.get("remoteImportsPath") + packagename + ".js") : (_basePath_ + _top.CONFIG.get("relativeImportPath") + packagename + ".js");
          document.getElementsByTagName("head")[0].appendChild(s1);
        }
      });
      _promise_import_.catch(function () {
        logger.debug("Import: Error loading a package ");
      });

    } else {
      // support to be used in a nodejs environment
      _promise_import_ = new Promise(function (resolve, reject) {
        try {
          var standardNodePath = findPackageNodePath(packagename);
          var packageAbsoluteName = "";
          if (standardNodePath !== null) {
            packageAbsoluteName = standardNodePath + "/" + packagename;
          } else {
            var jsNodePath = findPackageNodePath(packagename + ".js");
            if (jsNodePath !== null) {
              packageAbsoluteName = jsNodePath + "/" + packagename + ".js";
            } else {
              packageAbsoluteName = _basePath_ + _top.CONFIG.get("relativeImportPath") + packagename;
            }
          }
          try {
            resolve.call(_promise_import_, {
              "_imported_": require(`${packageAbsoluteName}`),
              "_package_name_": packagename
            });
          } catch (e) {
            reject.call(_promise_import_, {
              "_imported_": null,
              "_package_name_": packagename,
              "error": e
            });
          }
        } catch (e) {
          reject.call(_promise_import_, {
            "_imported_": null,
            "_package_name_": packagename,
            "error": e
          });
        }
      }).catch(function (e) {
        // something wrong importing a package
        logger.debug("Something happened when importing " + packagename);
        console.warn(e);
      });
    }
    _promise_import_.catch(function (e) {
      logger.warn(_DataStringify(e));
    });
    return _promise_import_;
  };
  Import.prototype.toString = function () {
    return "Import(packagename,ready,external) { [QCObjects native code] }";
  };

  if (isBrowser) {
    /**
     * Adds a Cast functionality to every Element of DOM
     */
    Element.prototype.Cast = function QC_Object(_o) {
      _o.__definition.body = this;
      var _o = New(_o);
      return _o;
    };
  }

  Class("TagElements", Array, {
    show() {
      this.map(function (element) {
        return element.style.opacity = 1;
      });
    },
    hide() {
      this.map(function (element) {
        return element.style.opacity = 0;
      });
    },
    effect() {
      var effectArguments = [...arguments].slice(1);
      var effectClass = arguments[0];
      if ((typeof effectClass).toLowerCase() === "string") {
        effectClass = ClassFactory(effectClass);
      }
      this.map(function (element) {
        return effectClass.apply.apply(effectClass, [element].concat(effectArguments));
      });
    },
    findElements(elementName) {
      var _o = New(ClassFactory("TagElements"));
      if (isBrowser) {
        for (var _k in this) {
          if (typeof _k === "number" && typeof this[_k] !== "function" && this[_k].hasOwnProperty.call(this[_k], "subelements")) {
            _o.push(this[_k].subelements(elementName));
          }
        }
      } else {
        // not yet implemented.
      }
      return _o;
    }
  });

  /**
   * Gets the element of DOM found by tag name
   *
   * @param {Object} tagname
   * @param {Object} innerHTML
   */
  var Tag = function (tagname, innerHTML) {
    var _o = New(ClassFactory("TagElements"));
    if (isBrowser) {
      var o = document.subelements(tagname);
      var addedKeys = [];
      for (var _i = 0; _i < o.length; _i++) {
        if (typeof innerHTML !== "undefined" && o[_i].hasOwnProperty.call(o[_i], "innerHTML")) {
          o[_i].innerHTML = innerHTML;
        }
        if (addedKeys.indexOf(_i) < 0) {
          _o.push(o[_i]);
          addedKeys.push(_i);
        }
      }
    } else {
      // not yet implemented.
    }
    return _o;
  };

  /**
   * Defines a Custom Ready listener
   */
  function Ready(e) {
    if (isBrowser) {
      _QC_READY_LISTENERS.push(e.bind(window));
    } else if (typeof global !== "undefined") {
      _QC_READY_LISTENERS.push(e.bind(global));
    }
  }
  var ready = Ready; // case insensitive ready option

  /**
   * Default Ready event function for window. Executes all micro ready events of Import calls
   *
   * @param {Object} e
   */
  var _Ready = function (e) {
    var _execReady = function () {
      _QC_READY_LISTENERS.map(function (_ready_listener_, _r) {
        if (typeof _ready_listener_ === "function") {
          _ready_listener_.call();
          delete _QC_READY_LISTENERS[_r];
        }
      });
    };
    if (_top.CONFIG.get("delayForReady") > 0) {
      if (isBrowser) {
        setTimeout(_execReady.bind(window), _top.CONFIG.get("delayForReady"));
      } else if (typeof global !== "undefined") {
        setTimeout(_execReady.bind(global), _top.CONFIG.get("delayForReady"));
      }
    } else {
      _execReady.call(_top);
    }
  };

  if (isBrowser) {
    window.onload = _Ready;
    if (is_phonegap) {
      document.addEventListener("deviceready", _Ready, captureFalse);
    }
  } else {
    global.onload = _Ready;
  }
  Class("InheritClass", class {}, {});

  /**
   * Dynamic Data Objects Class
   * Usage:
   * Class('TestDDO',{
   *    data: {},
   *    _new_ (){
   *        this.ddo = New(DDO,{
   *            instance:this,
   *            name:'data',
   *            value:{},
   *            fget (value){
   *                logger.debug('returned value '+ value );
   *            }
   *            })
   *    }
   * });
   *
   */
  class DDO extends ClassFactory("InheritClass") {
    constructor({
      instance,
      name,
      fget,
      fset,
      value
    }) {
      super({
        instance,
        name,
        fget,
        fset,
        value
      });
      this._new_({
        instance,
        name,
        fget,
        fset,
        value
      });

    }

    _new_({
      instance,
      name,
      fget,
      fset,
      value
    }) {
      var ddoInstance = this;
      var name = (typeof name === "undefined") ? (ObjectName(ddoInstance)) : (name);

      Object.defineProperty(instance, name, {
        set(val) {
          let _value = val;
          logger.debug("value changed " + name);
          var ret;
          if (typeof fset !== "undefined" && typeof fset === "function") {
            ret = fset(_value);
          } else {
            ret = _value;
          }
          instance["_" + name] = ret;
          return;
        },
        get() {
          let _value = instance["_" + name];
          logger.debug("returning value " + name);
          var is_ddo = function (v) {
            if (typeof v === "object" && Object.hasOwnProperty.call(v, "value")) {
              return v.value;
            }
            return v;
          };
          var ret;
          if (typeof fget !== "undefined" && typeof fget === "function") {
            ret = fget(is_ddo(_value));
          } else {
            ret = is_ddo(_value);
          }
          return ret;
        }
      });
    }

  }
  Export(DDO);

  Class("DefaultTemplateHandler", Object, {
    template: "",
    assign(data) {
      var templateInstance = this;
      if (typeof templateInstance.component === "undefined") {
        throw new Error("DefaultTemplateHandler.assign: component is undefined");
      }
      if (typeof templateInstance.component.processorHandler === "undefined") {
        throw new Error("DefaultTemplateHandler.assign: component.processorHandler is undefined");
      }
      var processorHandler = templateInstance.component.processorHandler;
      var parsedAssignmentText = (typeof templateInstance.template !== "undefined") ? (templateInstance.template) : ("");
      if (typeof data === "object") {
        [...Object.keys(data)].map(function (k) {
          var _value = data[k];
          if (typeof _value === "string" || typeof _value === "number" || (!isNaN(_value))) {
            try {
              _value = ClassFactory("Processor").processObject.call(processorHandler, _value);
              parsedAssignmentText = parsedAssignmentText.replace((new RegExp(`{{${k}}}`, "g")), _value);
            } catch (e) {
              logger.warn(e);
            }
          }
        });
      } else {
        logger.debug(`${templateInstance.component.name}.data is not an object`);
      }
      parsedAssignmentText = ClassFactory("Processor").processObject.call(processorHandler, parsedAssignmentText);
      return parsedAssignmentText;
    }
  });

  var __routing_params__ = function (routing, routingPath) {
    let standardRoutingPath = routing.path.replace(/{(.*?)}/g, "(?<$1>.*)"); //allowing {param}
    return {
      ...[...routingPath.matchAll((new RegExp(standardRoutingPath, "g")))][0]["groups"]
    };
  };

  var __valid_routings__ = function (routings, routingPath) {
    return routings.filter(function (routing) {
      var standardRoutingPath = routing.path.replace(/{(.*?)}/g, "(?<$1>.*)");
      return (new RegExp(standardRoutingPath, "g")).test(routingPath);
    }).reverse();
  };
  var __valid_routing_way__ = function (validRoutingWays, routingWay) {
    return validRoutingWays.includes(routingWay);
  };

  _top.__oldpopstate = _top.onpopstate;
  _top._bindroute_ = function () {
    {
      if (isBrowser) {
        if (!_top._bindroute_.__assigned) {
          document.addEventListener("componentsloaded", function (e) {
            e.stopImmediatePropagation();
            e.stopPropagation();
            if (!_top._bindroute_.__assigned) {

              _top.onpopstate = function (e) {
                e.stopImmediatePropagation();
                e.stopPropagation();
                ClassFactory("Component").route();
                if (typeof e.target.__oldpopstate !== "undefined" && typeof e.target.__oldpopstate === "function") {
                  e.target.__oldpopstate.call(e.target, e);
                }
              };
              Tag("a").map(function (a) {
                a.oldclick = a.onclick;
                a.onclick = function (e) {
                  var _ret_ = true;
                  if (!_top.global.get("routingPaths")) {
                    _top.global.set("routingPaths", []);
                  }
                  var routingWay = _top.CONFIG.get("routingWay");
                  var routingPath = e.target[routingWay];
                  if (_top.global.get("routingPaths").includes(routingPath) &&
                    e.target[routingWay] !== document.location[routingWay] &&
                    e.target.href !== document.location.href
                  ) {
                    logger.debug("A ROUTING WAS FOUND: " + routingPath);
                    window.history.pushState({
                      href: e.target.href
                    }, e.target.href, e.target.href);
                    ClassFactory("Component").route();
                    _ret_ = false;
                  } else {
                    logger.debug("NO ROUTING FOUND FOR: " + routingPath);
                  }
                  if (typeof e.target.oldclick !== "undefined" && typeof e.target.oldclick === "function") {
                    e.target.oldclick.call(e.target, e);
                  }
                  return _ret_;
                };
                return null;
              });


              _top._bindroute_.__assigned = true;
              Object.freeze(_top._bindroute_);
            }
          }, captureFalse);
        }
      } else {
        // not yet implemented.
      }
    }
  };

  Package("com.qcobjects", [
    class Component extends ClassFactory("InheritClass") {
      validRoutingWays= ["pathname", "hash", "search"];
      basePath= _basePath_;
      domain= _domain_;
      templateHandler= "DefaultTemplateHandler";
      processorHandler= null;
      routingWay= null;
      routingNodes= [];
      routings= [];
      routingPath= "";
      _componentHelpers= [];
      splashScreenComponent=undefined;

      constructor ({
        templateURI= "",
        template,
        tplsource= "default",
        url= "",
        name= "",
        method= "GET",
        data= {},
        reload= false,
        shadowed= false,
        cached= true,
        _body=_DOMCreateElement("div"),
        __promise__= null,
        __shadowRoot,
        body,
        shadowRoot,
        splashScreenComponent,
      }){
        super(...arguments);
        var self = this;
  
        if (typeof self.name === "undefined") {
          logger.warn("A name is not defined for " + __getType__(self));
        }
  
        self.routingWay = _top.CONFIG.get("routingWay");
  
        self.processorHandler = New(ClassFactory("Processor"), {
          component: self
        });
  
        if (typeof self.__new__ === "function") {
          self.__new__.call(self, self);
        }

        self._generateRoutingPaths(self.body)
        .then(function (){
          self._reroute_()
          .then(function () {
            return self.rebuild()
              .then(function () {
                logger.info(`Component._new_ The component ${self.name} was built successfully!`);
              }).catch(function (standardResponse) {
                logger.warn(`Component._new_ Something went wrong building the component ${self.name}`);
                console.error(standardResponse);
              });
          });
        });

      }
  
      set body(value) {
        var self = this;
        self._body = value;
      }
  
      get body() {
        var self= this;
        return self._body;
      }
  
      set cacheIndex(value) {
        // readonly
        logger.debug("[cacheIndex] This property is readonly");
      }
  
      get cacheIndex() {
        var self= this;
        var __routing_path__ = _DataStringify(self.routingPath);
        return Base64.encode(self.name + __routing_path__);
      }
  
      set parsedAssignmentText(value) {
        // readonly
        logger.debug("[parsedAssignmentText] This property is readonly");
      }
  
      get parsedAssignmentText() {
        var self= this;
        self._parsedAssignmentText = self.parseTemplate(self.template);
        if (typeof self._parsedAssignmentText === "undefined"){
          throw Error (`[Component][${this.name}][parsedAssignmentText] Could not generate content!`);
        }
        return self._parsedAssignmentText;
      }
  
  
      set shadowRoot(value) {
        var self= this;
        if (typeof self.__shadowRoot == "undefined") {
          self.__shadowRoot = value;
        } else {
          logger.debug("[shadowRoot] This property can only be assigned once!");
        }
      }

      get shadowRoot() {
        var self= this;
        return self.__shadowRoot;
      }
  
  
      set routingSelected(value){
        logger.debug("[routingSelected] This is a read-only property of the component");
      }
  
      get routingSelected (){
        var self= this;
        return __valid_routings__(self.routings, self.routingPath);
      }
  
      set routingParams (value){
        logger.debug("[routingParams] This is a read-only property of the component");
      }
  
      get routingParams (){
        var component = this;
        return [{}].concat(component.routingSelected.map(function (routing) {
          return __routing_params__(routing, component.routingPath);
        })).reduce(function (accumulator, colData, index) {
          return Object.assign(accumulator, colData);
        });
      }
  
      done(standardResponse) {
        var _ret_;
        if (typeof standardResponse !== "undefined"){
          var {request, component} = standardResponse;
          _ret_ = Promise.resolve({request, component});
        }
        return _ret_;
      }
      
      fail(standardResponse) {
        var _ret_;
        if (typeof standardResponse !== "undefined"){
          var {error, component} = standardResponse;
          _ret_ = Promise.resolve({error, component});
        }
        return _ret_;
      }
  
      set(name, value) {
        this[name] = value;
      }
  
      get(name) {
        return this[name];
      }
  
      feedComponent() {
        var _component_ = this;
        logger.debug(`[Component][${this.name}][feedComponent] start feeding component...`);
        var _feedComponent_InBrowser = function (_component_) {
          if (typeof _component_.container === "undefined" && typeof _component_.body === "undefined") {
            logger.warn("COMPONENT {{NAME}} has an undefined container and body".replace("{{NAME}}", _component_.name));
            return;
          }
          var container = (typeof _component_.container === "undefined" || _component_.container === null) ? (_component_.body) : (_component_.container);
          var parsedAssignmentText = _component_.parsedAssignmentText;
          _component_.innerHTML = parsedAssignmentText;
          if (_component_.shadowed) {
            logger.debug("COMPONENT {{NAME}} is shadowed".replace("{{NAME}}", _component_.name));
            logger.debug("Preparing slots for Shadowed COMPONENT {{NAME}}".replace("{{NAME}}", _component_.name));
            var tmp_shadowContainer = _DOMCreateElement("div");
            container.subelements("[slot]").map(
              function (c) {
                if (c.parentElement === container) {
                  tmp_shadowContainer.appendChild(c);
                }
              });
            logger.debug("Creating shadowedContainer for COMPONENT {{NAME}}".replace("{{NAME}}", _component_.name));
            var shadowContainer = _DOMCreateElement("div");
            shadowContainer.classList.add("shadowHost");
            try {
              _component_.shadowRoot = shadowContainer.attachShadow({
                mode: "open"
              });
            } catch (e) {
              try {
                logger.debug("Shadowed COMPONENT {{NAME}} is repeated".replace("{{NAME}}", _component_.name));
                _component_.shadowRoot = shadowContainer.shadowRoot;
              } catch (e) {
                logger.warn("Shadowed COMPONENT {{NAME}} is not allowed on this browser".replace("{{NAME}}", _component_.name));
              }
            }
            if (typeof _component_.shadowRoot !== "undefined" && _component_.shadowRoot !== null) {
              if (_component_.reload) {
                logger.debug("FORCED RELOADING OF CONTAINER FOR Shadowed COMPONENT {{NAME}}".replace("{{NAME}}", _component_.name));
                shadowContainer.shadowRoot.innerHTML = _component_.innerHTML;
              } else {
                tmp_shadowContainer.innerHTML = _component_.parseTemplate(tmp_shadowContainer.innerHTML);
                logger.debug("ADDING Shadowed COMPONENT {{NAME}} ".replace("{{NAME}}", _component_.name));
                shadowContainer.shadowRoot.innerHTML += _component_.innerHTML;
              }
              logger.debug("ADDING Slots to Shadowed COMPONENT {{NAME}} ".replace("{{NAME}}", _component_.name));
              shadowContainer.innerHTML += tmp_shadowContainer.innerHTML;
              logger.debug("APPENDING Shadowed COMPONENT {{NAME}} to Container ".replace("{{NAME}}", _component_.name));
              if (container.subelements(".shadowHost") < 1) {
                container.appendChild(shadowContainer);
              } else {
                logger.debug("Shadowed Container for COMPONENT {{NAME}} is already present in the tree ".replace("{{NAME}}", _component_.name));
                container.removeChild(container.subelements(".shadowHost").pop());
                container.appendChild(shadowContainer);
              }
            } else {
              logger.warn("Shadowed COMPONENT {{NAME}} is bad configured".replace("{{NAME}}", _component_.name));
            }
          } else {
            if (_component_.reload) {
              logger.debug("FORCED RELOADING OF CONTAINER FOR COMPONENT {{NAME}}".replace("{{NAME}}", _component_.name));
              container.innerHTML = _component_.innerHTML;
            } else if (container && _component_) {
              logger.debug("ADDING COMPONENT {{NAME}} ".replace("{{NAME}}", _component_.name));
              container.innerHTML += _component_.innerHTML;
            } else {
              logger.warn("COMPONENT {{NAME}} is not added to the DOM".replace("{{NAME}}", _component_.name));
            }
          }
  
        };
  
        var _feedComponent_InNode = function (_component_) {
          var parsedAssignmentText = _component_.parsedAssignmentText;
          _component_.innerHTML = parsedAssignmentText;
        };
  
        var _ret_;
        if (!is_a(_component_, "Component")) {
          logger.warn("Trying to feed a non component object");
          return;
        }
        if (isBrowser) {
          _ret_ = _feedComponent_InBrowser(_component_);
        } else {
          _ret_ = _feedComponent_InNode(_component_);
        }
        return _ret_;
      }
  
      rebuild() {
        var _component = this;
        var _promise = new Promise(function (resolve, reject) {
          if (typeof _component === "undefined" || _component === null) {
            reject("Component is undefined");
          }
          if (isQCObjects_Object(_component) && is_a(_component, "Component")) {
            switch (true) {
              case (_component.get("tplsource") === "none"):
                logger.debug("Component " + _component.name + " has specified template-source=none, so no template load was done");
                var standardResponse = {
                  request: null,
                  component: _component
                };
                if (typeof _component.done === "function") {
                  _component.done.call(_component, standardResponse);
                }
                resolve.call(_promise, standardResponse);
                break;
              case (_component.get("tplsource") === "inline"):
                logger.debug("Component " + _component.name + " has specified template-source=inline, so it is assumed that template is already declared");
                _component.feedComponent();
                var standardResponse = {
                  request: null,
                  component: _component
                };
                if (typeof _component.done === "function") {
                  _component.done.call(_component, standardResponse);
                }
                resolve.call(_promise, standardResponse);
                break;
              case (_component.get("tplsource") === "default" &&
                _component.get("templateURI") !== ""):
                _component.set("url", _component.get("basePath") + _component.get("templateURI"));
                componentLoader(_component, false).then(
                  function (standardResponse) {
                    resolve.call(_promise, standardResponse);
                  },
                  function (standardResponse) {
                    reject.call(_promise, standardResponse);
                  });
                break;
              case (_component.get("tplsource") === "external" &&
                _component.get("templateURI") !== ""):
                _component.set("url", _component.get("templateURI"));
                componentLoader(_component, false).then(
                  function (standardResponse) {
                    resolve.call(_promise, standardResponse);
                  },
                  function (standardResponse) {
                    reject.call(_promise, standardResponse);
                  });
                break;
              case _component.get("tplsource") === "default" && _component.get("templateURI", "") === "":
                logger.debug(`Component ${_component.name} template-source is ${_component.get("tplsource")} and no templateURI is present`);
                reject.call(_promise, `Component ${_component.name} template-source is ${_component.get("tplsource")} and no templateURI is present`);
                break;
              default:
                logger.debug("Component " + _component.name + " will not be rebuilt because no templateURI is present");
                reject.call(_promise, {
                  request: null,
                  component: _component
                });
                break;
            }
  
          }
        });
        return _promise;
      }
  
      Cast(oClass) {
        /* Cast method for components has been deprecated. Don't use this method, it is available only for compatibility purposes */
        let o = _methods_(oClass).map(m => m.name.replace(/bound /g, "")).map(m => {
          return {
            [m]: oClass[m].bind(this)
          };
        }).reduce((c, p) => Object.assign(c, p), {});
        return _Cast(this, o);
      }
  
      static route() {
        var componentClass = this;
        var _route_promise_;
        var isValidInstance = ((!!componentClass.__instanceID) &&
          Object.hasOwnProperty.call(componentClass, "subcomponents")) ? (true) : (false);
        var __route__ = function (componentList) {
          var _componentNames_ = [];
          var _promises_ = componentList.filter(function (rc) {
            return typeof rc !== "undefined";
          }).map(function (rc) {
            if (typeof rc.name !== "undefined") {
              _componentNames_.push(rc.name);
            } else {
              throw new Error(__getType__(rc) + " does not have a name");
            }
            return new Promise(function (resolve, reject) {
              var _promise_;
              if (typeof rc !== "undefined" && !!rc._reroute_) {
                _promise_ = rc._reroute_()
                  .then(function () {
                    rc.body.innerHTML = "";
                    rc.innerHTML = "";
                    return rc.rebuild();
                  })
                  .then(function (_rc_) {
                    if (Object.hasOwnProperty.call(_rc_, "subcomponents") &&
                      typeof _rc_.subcomponents !== "undefined" &&
                      _rc_.subcomponents.length > 0
                    ) {
                      logger.debug("LOOKING FOR ROUTINGS IN SUBCOMPONENTS FOR: " + _rc_.name);
                      return __route__.call(_rc_, _rc_.subcomponents);
                    } else {
                      resolve(_rc_);
                    }
                  });
              } else if (typeof rc !== "undefined") {
                reject("Component " + rc.name + " is not an instance of Component");
              }
              return _promise_;
            });
          });
          return Promise.all(_promises_)
            .then(function () {
              logger.debug("ROUTING COMPLETED FOR " + _componentNames_.join(", "));
            }).catch(function (err) {
              logger.warn("ROUTING FAILED FOR " + _componentNames_.join(", ") + ": " + err);
            });
        };
        if (isValidInstance || Object.hasOwnProperty.call(global, "componentsStack")) {
          if (isValidInstance && is_a(componentClass, "Component")) {
            logger.debug("loading routings for instance " + componentClass.name);
          }
          _route_promise_ = __route__.call(componentClass, (isValidInstance) ? (componentClass.subcomponents) : (global.componentsStack));
        } else {
          logger.debug("An undetermined result expected if load routings. So will not be loaded this time.");
        }
      }
  
      fullscreen() {
        if (isBrowser) {
          var elem = this.body;
          if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.mozRequestFullScreen) {
            /* Firefox */
            elem.mozRequestFullScreen();
          } else if (elem.webkitRequestFullscreen) {
            /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) {
            /* IE/Edge */
            elem.msRequestFullscreen();
          }
        } else {
          // not yet implemented.
        }
      }
  
      closefullscreen() {
        if (isBrowser) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          // noy yet implemented.
        }
      }
  
      _generateRoutingPaths(componentBody) {
        var component = this;
        return new Promise(function (resolve, reject){
          if (isBrowser) {
            if (__valid_routing_way__(component.validRoutingWays, component.routingWay)) {
              if (typeof componentBody !== "undefined") {
                component.innerHTML = componentBody.innerHTML;
                component.routingNodes = componentBody.subelements("routing");
                component.routings = [];
                component.routingNodes.map(function (routingNode, r) {
                  var attributeNames = routingNode.getAttributeNames();
                  var routing = {};
                  attributeNames.map(function (attributeName, a) {
                    routing[attributeNames[a]] = routingNode.getAttribute(attributeNames[a]);
                  });
                  component.routings.push(routing);
                  if (!_top.global.get("routingPaths")) {
                    _top.global.set("routingPaths", []);
                  }
                  if (!_top.global.get("routingPaths").includes(routing.path)) {
                    _top.global.get("routingPaths").push(routing.path);
                  }
                });
              }
            }
          } else {
            // not yet implemented.
          }
          resolve();
  
        });
      }
  
      parseTemplate(template) {
        var _self = this;
        var _parsedAssignmentText;
        var value = template;
        if (Object.hasOwnProperty.call(_self, "templateHandler")) {
          var templateHandlerName = _self.templateHandler;
          logger.debug(`[Component][${this.name}][parseTemplate] Attempting to use ${templateHandlerName} ...`);
          var templateHandlerClass = ClassFactory(templateHandlerName);
          var templateInstance = New(templateHandlerClass, {
            component: _self,
            template: value
          });
          var selfData = _self.data;
          if (Object.hasOwnProperty.call(_self, "assignRoutingParams") && _self.assignRoutingParams) {
            try {
              selfData = Object.assign(selfData, _self.routingParams);
            } catch (e) {
              logger.debug("[parseTemplate] it was not possible to assign the routing params to the template");
            }
          }
          _parsedAssignmentText = templateInstance.assign(selfData);
        } else {
          logger.debug(`[Component][${this.name}][parseTemplate] No value for templateHandler. Using raw content...`);
          _parsedAssignmentText = value;
        }
        return _parsedAssignmentText;
      }
  
      _reroute_() {
        /* This method set the selected routing and makes the switch to the templateURI */
        var rc = this;
        return new Promise(function (resolve, reject) {
          if (isBrowser) {
            if (__valid_routing_way__(rc.validRoutingWays, rc.routingWay)) {
              rc.routingPath = document.location[rc.routingWay];
              rc.routingSelected.map(function (routing, r) {
                var componentURI = ComponentURI({
                  "COMPONENTS_BASE_PATH": _top.CONFIG.get("componentsBasePath"),
                  "COMPONENT_NAME": routing.name.toString(),
                  "TPLEXTENSION": (Object.hasOwnProperty.call(routing, "tplextension")) ? (routing.tplextension) : (rc.tplextension),
                  "TPL_SOURCE": "default" /* here is always default in order to get the right uri */
                });
                rc.templateURI = componentURI;
              });
              if (rc.routingSelected.length > 0) {
                rc.template = "";
                rc.body.innerHTML = "";
              }
            }
          }
          resolve(rc);
  
        });
      }
  
      lazyLoadImages() {
        if (isBrowser) {
          var component = this;
          var _componentRoot = (component.shadowed) ? (component.shadowRoot) : (component.body);
          var _imgLazyLoaded = [..._componentRoot.subelements("img[lazy-src]")];
          var _lazyLoadImages = function (image) {
            image.setAttribute("src", image.getAttribute("lazy-src"));
            image.onload = () => {
              image.removeAttribute("lazy-src");
            };
          };
          if ("IntersectionObserver" in window) {
            var observer = new IntersectionObserver((items, observer) => {
              items.forEach((item) => {
                if (item.isIntersecting) {
                  _lazyLoadImages(item.target);
                  observer.unobserve(item.target);
                }
              });
            });
            _imgLazyLoaded.map(function (img) {
              return observer.observe(img);
            });
          } else {
            _imgLazyLoaded.map(_lazyLoadImages);
          }
  
        } else {
          // not yet implemented
        }
        return null;
      }
  
      applyTransitionEffect(effectClassName) {
        var _Effect = ClassFactory(effectClassName);
        if (typeof _Effect !== "undefined" && is_a(_Effect, "TransitionEffect")) {
          this.effect = New(_Effect, {
            component: this
          });
          this.effect.apply(this.effect.defaultParams);
        } else {
          logger.debug(`${__getType__(_Effect)} is not a TransitionEffect`);
        }
      }
  
      applyObserveTransitionEffect(effectClassName) {
        if (isBrowser) {
          var component = this;
          var _componentRoot = (component.shadowed) ? (component.shadowRoot) : (component.body);
          var _applyEffect_ = function (element) {
            component.applyTransitionEffect(effectClassName);
          };
          if ("IntersectionObserver" in window) {
            var observer = new IntersectionObserver((items, observer) => {
              items.forEach((item) => {
                if (item.isIntersecting) {
                  _applyEffect_(item.target);
                  observer.unobserve(item.target);
                }
              });
            });
            observer.observe(_componentRoot);
          } else {
            _applyEffect_(_componentRoot);
          }
        } else {
          // not yet implemented
        }
        return null;
      }
  
      scrollIntoHash() {
        if (isBrowser) {
          var component = this;
          if (document.location.hash !== "") {
            var _componentRoot = (component.shadowed) ? (component.shadowRoot) : (component.body);
            _componentRoot.subelements(document.location.hash).map(
              function (element) {
                if (typeof element.scrollIntoView === "function") {
                  element.scrollIntoView(
                    _top.CONFIG.get("scrollIntoHash", {
                      behavior: "auto",
                      block: "top",
                      inline: "top"
                    })
                  );
                }
              }
            );
          }
        } else {
          // not yet implemented
        }
      }
  
      i18n_translate() {
        if (isBrowser) {
          if (_top.CONFIG.get("use_i18n")) {
            var component = this;
            var _componentRoot = (component.shadowed) ? (component.shadowRoot) : (component.body);
            var lang1 = _top.CONFIG.get("lang", "en");
            var lang2 = navigator.language.slice(0, 2);
            var i18n = _top.global.get("i18n");
            if ((lang1 !== lang2) && (typeof i18n === "object" && Object.hasOwnProperty.call(i18n, "messages"))) {
              var callback_i18n = function () {
                var component = this;
                return new Promise(function (resolve, reject) {
                  var messages = i18n.messages.filter(function (message) {
                    return Object.hasOwnProperty.call(message, lang1) && Object.hasOwnProperty.call(message, lang2);
                  });
                  _componentRoot.subelements("ul,li,h1,h2,h3,a,b,p,input,textarea,summary,details,option,component")
                    .map(function (element) {
                      messages.map(function (message) {
                        var _innerHTML = element.innerHTML;
                        _innerHTML = _innerHTML.replace(new RegExp(`${message[lang1]}`, "g"), message[lang2]);
                        element.innerHTML = _innerHTML;
                        return null;
                      });
                      return element;
                    });
                  resolve();
                });
              };
              callback_i18n.call(component).then(function () {
                logger.debug("i18n loaded for component: " + component.name);
              });
  
            }
          }
        } else {
          // not yet implemented
        }
      }
  
      addComponentHelper(componentHelper) {
        var component = this;
        component._componentHelpers.push(componentHelper);
      }
  
      runComponentHelpers() {
        if (isBrowser) {
          var component = this;
          var __component_helpers__ = [];
          /*
           * BEGIN use i18n translation
           */
          __component_helpers__.push(component.i18n_translate.bind(component));
          /*
           * END use i18n translation
           */
  
          /*
           * BEGIN component scrollIntoHash
           */
          __component_helpers__.push(component.scrollIntoHash.bind(component));
          /*
           * END component scrollIntoHash
           */
  
          /*
           * BEGIN component images lazy-load
           */
  
          __component_helpers__.push(component.lazyLoadImages.bind(component));
  
          /*
           * END component images lazy-load
           */
  
          __component_helpers__ = __component_helpers__.concat(component._componentHelpers);
  
          __component_helpers__.map(
            function (_component_helper_) {
              logger.debug(`Executing ${_component_helper_.name} as component helper for ${component.name}...`);
              _component_helper_();
            }
          );
  
        } else {
          // not yet implemented
        }
  
      }
      
    }
  
  ]);

  _top._bindroute_.__assigned = false;

  (_methods_)(ClassFactory("Component")).map(function (__c__) {
    (_protected_code_)(__c__);
  });

  Package("com.qcobjects.controllers", [
    class Controller extends ClassFactory("InheritClass") {
      constructor ({
        component= null,
        dependencies = []        
      }){
        super (...arguments);
        if (typeof this.component === "undefined" || this.component === "null"){
          throw Error (`${__getType__(this)} must be called with a component`);
        }
      }

      routingSelectedAttr(attrName) {
        return this.component.routingSelected.map(function (r) {
          return r[attrName];
        }).filter(function (v) {
          return v;
        }).pop();
      }

      isTouchable() {
        return ("ontouchstart" in window) ||
          (navigator.MaxTouchPoints > 0) ||
          (navigator.msMaxTouchPoints > 0);
      }

      onpress(subelementSelector, handler) {
        try {
          if (this.isTouchable()) {
            this.component.body.subelements(subelementSelector)[0].addEventListener("touchstart", handler, {
              passive: true
            });
          } else {
            this.component.body.subelements(subelementSelector)[0].addEventListener("click", handler, {
              passive: true
            });
          }
        } catch (e) {
          logger.debug("No button to assign press event");
        }
      }

      createRoutingController() {
        var controller = this;
        var component = controller.component;
        var controllerName = controller.routingSelectedAttr("controllerclass");
        if (typeof controllerName !== "undefined") {
          var _Controller = ClassFactory(controllerName);
          if (typeof _Controller !== "undefined") {
            component.routingController = New(_Controller, {
              component: component
            }); // Initializes the main controller for the component
            if (Object.hasOwnProperty.call(component.routingController, "done") && typeof component.routingController.done === "function") {
              component.routingController.done.call(component.routingController);
            }
          }
        }
      }

      done(){}  
    }
  ]);

  Package("com.qcobjects.views",[
    class View extends ClassFactory("InheritClass") {
      constructor ({component = undefined, dependencies = []}){
        super(...arguments);
        if (typeof this.component === "undefined" || this.component === "null"){
          throw Error (`${__getType__(this)} must be called with a component`);
        }

      }
    }
  ]);

  Package("com.qcobjects.api", [
    class Service extends ClassFactory("InheritClass") {
      kind= "rest";
      /* it can be rest, mockup, local */
      domain= _domain_;
      basePath= _basePath_;
      url= "";
      method= "GET";
      data= {};
      reload= false;
      cached= false;

      constructor () {
        super(...arguments);
      }

      set(name, value) {
        this[name] = value;
      }

      get(name) {
        return this[name];
      }
  
    }

  ]);

  Package("com.qcobjects.api.services", [
    class JSONService extends ClassFactory("Service") {
      method= "GET";
      cached= false;
      headers= {
        "Content-Type": "application/json",
        "charset": "utf-8"
      };
      JSONresponse= null;
      done(result) {
        logger.debug("***** RECEIVED RESPONSE:");
        logger.debug(result.service.template);
        this.JSONresponse = JSON.parse(result.service.template);
      }
  
      constructor (){
        super(...arguments);
      }

    }
  ]);

  Package("com.qcobjects.api.config", [
    class ConfigService extends ClassFactory("JSONService"){
      method= "GET";
      cached= false;
      configFileName= "config.json";
      headers= {
        "Content-Type": "application/json",
        "charset": "utf-8"
      };
      JSONresponse= null;
      done(result) {
        logger.debug("***** CONFIG LOADED:");
        logger.debug(result.service.template);
        this.JSONresponse = JSON.parse(result.service.template);
        if (Object.hasOwnProperty.call(this.JSONresponse, "__encoded__")) {
          this.JSONresponse = JSON.parse(ClassFactory("_Crypt").decrypt(this.JSONresponse.__encoded__, _secretKey));
        }
        for (var k in this.JSONresponse) {
          _top.CONFIG.set(k, this.JSONresponse[k]);
        }
        this.configLoaded.call(this);
      }
      fail(result) {
        this.configLoaded.call(this);
      }

      constructor (){
        super(...arguments);
        this.set("url", this.get("basePath") + this.get("configFileName"));
      }
    }
  ]);

  Package("com.qcobjects.valueObjects", [
    class VO extends ClassFactory("InheritClass") {
      constructor (){
        super(...arguments);
      }
    }
  ]);

  /**
   * Returns a standarized uri for a component
   * @example
   * templateURI = ComponentURI({'COMPONENTS_BASE_PATH':'','COMPONENT_NAME':'','TPLEXTENSION':'','TPL_SOURCE':''})
   * @author: Jean Machuca <correojean@gmail.com>
   * @param params an object with the params to build the uri path
   */
  var ComponentURI = function (params) {
    var templateURI = "";
    if (params["TPL_SOURCE"] === "default") {
      templateURI = "{{COMPONENTS_BASE_PATH}}{{COMPONENT_NAME}}.{{TPLEXTENSION}}";
      for (var k in params) {
        var param = params[k];
        templateURI = templateURI.replace("{{" + k + "}}", params[k]);
      }
    }
    return templateURI;
  };

  /**
   * Loads a simple component from a template
   *
   * @author: Jean Machuca <correojean@gmail.com>
   * @param component a Component object
   */
  var componentLoader = function (component, _async) {
    var __promise__;
    var _componentLoaderInBrowser = function (component, _async) {
      __promise__ = new Promise(function (resolve, reject) {
        var _promise = component.__promise__;
        var container = (Object.hasOwnProperty.call(component, "container") && typeof component.container !== "undefined" && component.container !== null) ? (component.container) : (component.body);
        if (container !== null) {
          var _feedComponent_ = function (component) {
            component.feedComponent();
            var standardResponse = {
              "request": xhr,
              "component": component
            };
            resolve.call(_promise, standardResponse);
          };
          logger.debug("LOADING COMPONENT DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(component.data)).replace("{{URL}}", component.url));

          var _componentLoaded = function () {
            var successStatus = (is_file) ? (0) : (200);
            if (xhr.status === successStatus) {
              var response = xhr.responseText;
              logger.debug("Data received {{DATA}}".replace("{{DATA}}", _DataStringify(response)));
              logger.debug("CREATING COMPONENT {{NAME}}".replace("{{NAME}}", component.name));
              component.template = response;
              if (component.cached && (typeof cache !== "undefined")) {
                cache.save(component.name, component.template);
              }
              _feedComponent_.call(this, component);
            } else {
              var standardResponse = {
                "request": xhr,
                "component": component
              };
              reject.call(_promise, standardResponse);

            }
          };
          if (typeof component.template === "string" && component.template !== "") {
            // component already has a template it does not need to be reloaded
            _feedComponent_.call(this, component);
          } else {
            var is_file = (component.url.startsWith("file:")) ? (true) : (false);
            var xhr = new XMLHttpRequest();
            if (!is_file) {
              try {
                logger.debug("Calling the url of component in async mode.");
                xhr.open(component.method, component.url, true);
              } catch (e) {
                logger.debug("Last try has failed... The component cannot be loaded.");
              }
            } else {
              if ("fetch" in _top) {
                logger.debug("I can use fetch...");
                logger.debug("It is a file to be loaded, so I will try to use fetch");
                var _p = fetch(component.url).then(response => {
                  logger.debug("I got a response from fetch, so I'll feed the component");
                  response.text().then(text => {
                    component.template = text;
                    _feedComponent_.call(this, component);
                  });
                });
              }
            }
            if (!is_phonegap && !is_file) {
              xhr.setRequestHeader("Content-Type", "text/html");
            }
            if (!is_file) {
              xhr.onload = _componentLoaded;
            }
            var _directLoad = function (is_file) {
              is_file = (typeof is_file === "undefined" || !is_file) ? (false) : (true);
              logger.debug("SENDING THE NORMAL REQUEST  ");
              if (is_file) {
                if (!("fetch" in _top)) {
                  logger.debug("I have to try to load the file using xhr...  ");
                  xhr.send(null);
                  if (xhr.status === XMLHttpRequest.DONE) {
                    _componentLoaded.call(this);
                  }
                }
              } else {
                logger.debug("Trying to send the data to the component...  ");
                xhr.send(_DataStringify(component.data));
              }
            };

            if (component.cached && (!is_file)) {
              logger.debug("USING CACHE FOR COMPONENT: " + component.name);
              var cache = new ComplexStorageCache({
                index: component.cacheIndex,
                load(cacheController) {
                  _directLoad.call(this, is_file);
                },
                alternate(cacheController) {
                  if (component.method === "GET") {
                    component.template = cacheController.cache.getCached(component.cacheIndex);
                    _feedComponent_.call(this, component);
                  } else {
                    _directLoad.call(this, is_file);
                  }
                  return;
                }
              });
              global.lastCache = cache;
            } else {
              logger.debug("NOT USING CACHE FOR COMPONENT: " + component.name);
              _directLoad.call(this, is_file);
            }

          }
        } else {
          logger.debug("CONTAINER DOESNT EXIST");
        }
      });
      __promise__.then(function (standardResponse) {
        var _ret_;
        if (typeof component.done === "function") {
          _ret_ = component.done.call(component, standardResponse);
        }
        return Promise.resolve(_ret_);
      }, function (standardResponse) {
        var _ret_;
        if (typeof component.fail === "function") {
          _ret_ = component.fail.call(component, standardResponse);
        }
        return Promise.reject(_ret_);
      }).catch(function (e) {
        logger.debug("Something wrong loading the component");
      });
      return __promise__;
    };
    var _componentLoaderInNode = function (component, _async) {
      __promise__ = new Promise(function (resolve, reject) {
        var _promise = __promise__;
        var _feedComponent_ = function (component) {
          component.feedComponent();
          var standardResponse = {
            "request": null,
            "component": component
          };
          resolve.call(_promise, standardResponse);
        };
        logger.debug("LOADING COMPONENT DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(component.data)).replace("{{URL}}", component.url));

        var _componentLoaded = function (err, responseText) {
          if (!err) {
            var response = responseText.toString();
            logger.debug("Data received {{DATA}}".replace("{{DATA}}", _DataStringify(response)));
            logger.debug("CREATING COMPONENT {{NAME}}".replace("{{NAME}}", component.name));
            component.template = response;
            if (component.cached && (typeof cache !== "undefined")) {
              cache.save(component.name, component.template);
            }
            _feedComponent_.call(this, component);
          } else {
            var standardResponse = {
              "request": null,
              "component": component
            };
            reject.call(_promise, standardResponse);
          }
        };
        if (typeof component.template === "string" && component.template !== "") {
          // component already has a template it does not need to be reloaded
          _feedComponent_.call(this, component);
        } else {
          logger.debug("Loading the component as a local file in server...");
          var _directLoad = function (is_file) {
            const fs = require("fs");
            logger.debug("SENDING THE NORMAL REQUEST  ");
            fs.readFile(component.url, _componentLoaded);
          };

          if (component.cached) {
            logger.debug("USING CACHE FOR COMPONENT: " + component.name);
            var cache = new ComplexStorageCache({
              index: component.cacheIndex,
              load(cacheController) {
                _directLoad.call(this);
              },
              alternate(cacheController) {
                if (component.method === "GET") {
                  component.template = cacheController.cache.getCached(component.cacheIndex);
                  _feedComponent_.call(this, component);
                } else {
                  _directLoad.call(this);
                }
                return;
              }
            });
            global.lastCache = cache;
          } else {
            logger.debug("NOT USING CACHE FOR COMPONENT: " + component.name);
            _directLoad.call(this);
          }

        }
      });
      component.__promise__.then(function (standardResponse) {
        var _ret_;
        if (typeof component.done === "function") {
          _ret_ = component.done.call(component, standardResponse);
        }
        return Promise.resolve(_ret_);
      }, function (standardResponse) {
        var _ret_;
        if (typeof component.fail === "function") {
          _ret_ = component.fail.call(component, standardResponse);
        }
        return Promise.reject(_ret_);
      }).catch(function (e) {
        logger.debug("Something wrong loading the component");
      });
      return component.__promise__;
    };

    var _ret_;
    if (isBrowser) {
      if (typeof _async !== "undefined" && _async) {
        _ret_ = asyncLoad(_componentLoaderInBrowser, arguments);
      } else {
        _ret_ = _componentLoaderInBrowser(component, _async);
      }
    } else {
      _ret_ = _componentLoaderInNode(component, _async);
    }
    return _ret_;
  };

  /**
   * Loads a simple component from a template
   *
   * @author: Jean Machuca <correojean@gmail.com>
   * @param service a Service object
   */
  var serviceLoader = function (service, _async) {
    var _serviceLoaderInBrowser = function (service, _async) {
      var _promise = new Promise(
        function (resolve, reject) {

          logger.debug("LOADING SERVICE DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(service.data)).replace("{{URL}}", service.url));
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = service.withCredentials;
          var xhrasync = true; // always async because xhr sync is deprecated
          xhr.open(service.method, service.url, xhrasync);
          for (var header in service.headers) {
            try {
              if (typeof service.headers[header] !== "function") {
                xhr.setRequestHeader(header, service.headers[header]);
              }
            } catch (e) {
              logger.debug("Something went wrong when assign the header " + header);
            }
          }
          xhr.onload = function () {
            if (xhr.status === 200) {
              var response = xhr.responseText;
              logger.debug("Data received {{DATA}}".replace("{{DATA}}", _DataStringify(response)));
              logger.debug("CREATING SERVICE {{NAME}}".replace("{{NAME}}", service.name));
              service.template = response;
              if (service.cached && (typeof cache !== "undefined")) {
                cache.save(service.name, service.template);
              }
              if (typeof service.done === "function") {
                var standardResponse = {
                  "request": xhr,
                  "service": service
                };
                service.done.call(service, standardResponse);
                resolve.call(_promise, standardResponse);
              }
            } else {
              if (typeof service.fail === "function") {
                var standardResponse = {
                  "request": xhr,
                  "service": service
                };
                service.fail.call(service, standardResponse);
                reject.call(_promise, standardResponse);
              }
            }
          };

          var _directLoad = function () {
            logger.debug("SENDING THE NORMAL REQUEST  ");
            try {
              xhr.send(_DataStringify(service.data));
            } catch (e) {
              logger.debug("SOMETHING WRONG WITH REQUEST  ");
              reject.call(_promise, {
                request: xhr,
                service: service
              });
            }
          };

          if (service.cached) {
            var cache = new ComplexStorageCache({
              index: service.data,
              load(cacheController) {
                _directLoad.call(this);
              },
              alternate(cacheController) {
                if (service.method === "GET") {
                  service.template = cacheController.cache.getCached(service.name);
                  if (typeof service.done === "function") {
                    var standardResponse = {
                      "request": xhr,
                      "service": service
                    };
                    service.done.call(service, standardResponse);
                    resolve.call(_promise, standardResponse);
                  }
                } else {
                  _directLoad.call(this);
                }
                return;
              }
            });
            global.lastCache = cache;
          } else {
            _directLoad.call(this);
          }

          return xhr;
        }
      );
      return _promise;
    };

    var _serviceLoaderInNode = function (service, _async) {
      var _promise = new Promise(
        function (resolve, reject) {
          if (typeof URL === "undefined") {
            global.URL = require("url").URL;
            let URL = global.URL;
          }
          var serviceURL = new URL(service.url);
          var req;
          service.useHTTP2 = Object.hasOwnProperty.call(service, "useHTTP2") && service.useHTTP2;


          var captureEvents = function (req) {
            logger.debug("LOADING SERVICE DATA (non-browser) {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(service.data)).replace("{{URL}}", service.url));
            var dataXML;
            var standardResponse = {
              "http2Client": client,
              "request": req,
              "service": service,
              "responseHeaders": null
            };

            if (typeof service.data === "object" && service.data !== null) {
              if (service.useHTTP2) {
                try {
                  logger.debug("Sending data...");
                  let buffer = new Buffer(_DataStringify(service.data));
                  req.write(buffer);
                } catch (e) {
                  logger.debug("It was not possible to send any data");
                }
              }
            }

            dataXML = "";
            req.on("response", (responseHeaders, flags) => {
              logger.debug("receiving response...");
              standardResponse.responseHeaders = responseHeaders;
              /*
              for (const name in responseHeaders) {
                logger.debug(`${name}: ${responseHeaders[name]}`);
              }
              */
              dataXML = "";
            });
            req.on("data", (chunk) => {
              logger.debug("receiving data...");
              // do something with the data
              dataXML += "" + chunk.toString();
              service.template = dataXML;
            });
            if (service.useHTTP2) {
              req.resume();
            }
            req.on("end", () => {
              logger.debug("ending call...");
              service.template = dataXML;
              if (Object.hasOwnProperty.call(service, "useHTTP2") && service.useHTTP2) {
                client.destroy();
              } else {
                req.destroy();
              }
              service.done.call(service, standardResponse);
              resolve.call(_promise, standardResponse);
            });
            if (service.useHTTP2) {
              req.end();
            }

          };

          try {
            var requestOptions;
            if (service.useHTTP2) {
              logger.debug("using http2");
              var http2 = require("http2");
              var client = http2.connect(serviceURL.origin);
              requestOptions = Object.assign({
                ":method": service.method,
                ":path": serviceURL.pathname
              }, service.options);
              requestOptions = Object.assign(requestOptions, service.headers);
              req = client.request(requestOptions);
              req.setEncoding("utf8");
              captureEvents(req);
            } else {
              if (serviceURL.protocol === "http:") {
                var http = require("http");
                var request = http.request;
                requestOptions = Object.assign({
                  "url": service.url,
                  headers: service.headers
                }, service.options);
                var req = request(service.url);
                captureEvents(req);
              } else if (serviceURL.protocol === "https:") {
                var https = require("https");
                requestOptions = Object.assign({
                  hostname: serviceURL.hostname,
                  port: serviceURL.port,
                  path: serviceURL.pathname,
                  method: service.method,
                  headers: service.headers
                }, service.options);
                var _req_ = https.request(requestOptions, function (req) {
                  captureEvents(req);
                });
                _req_.end();
              } else {
                var e = "Protocol not supported: " + serviceURL.protocol;
                logger.debug(e);
                throw new Error(e);
              }
            }


          } catch (e) {
            logger.debug(e);
            service.fail.call(service, e);
            reject.call(_promise, e);

          }
        }).catch(function (e) {
        console.log(e);
        logger.debug("Something happened when trying to call the service: " + service.name);
        service.fail.call(service, e);
      });
      return _promise;

    };

    var _serviceLoaderMockup = function (service, _async) {
      var _promise = new Promise(
        function (resolve, reject) {
          logger.debug(`Calling mockup service ${service.name} ...`);
          var standardResponse = {
            "request": null,
            "service": service,
            "responseHeaders": service.responseHeaders
          };
          if (typeof service.mockup === "function") {
            service.mockup.call(service, standardResponse);
          } else {
            service.done.call(service, standardResponse);
          }
          resolve.call(_promise, standardResponse);
        });
      return _promise;
    };
    var _serviceLoaderLocal = function (service, _async) {
      var _promise = new Promise(
        function (resolve, reject) {
          logger.debug(`Calling local service ${service.name} ...`);
          var standardResponse = {
            "request": null,
            "service": service,
            "responseHeaders": service.responseHeaders
          };
          if (typeof service.local === "function") {
            service.local.call(service, standardResponse);
          } else {
            service.done.call(service, standardResponse);
          }
          resolve.call(_promise, standardResponse);
        });
      return _promise;
    };

    var _ret_;
    switch (service.kind) {
      case "rest":
        if (isBrowser) {
          if (typeof _async !== "undefined" && _async) {
            _ret_ = asyncLoad(_serviceLoaderInBrowser, arguments);
          } else {
            _ret_ = _serviceLoaderInBrowser(service, _async);
          }
        } else {
          _ret_ = _serviceLoaderInNode(service, _async);
        }
        break;
      case "mockup":
        _ret_ = _serviceLoaderMockup(service, _async);
        break;
      case "local":
        _ret_ = _serviceLoaderLocal(service, _async);
        break;
      default:
        logger.debug(`The value of the kind property of the service ${service.name} is not valid`);
        break;
    }
    return _ret_;
  };
  Export(serviceLoader);
  Export(componentLoader);
  Export(ComponentURI);
  Export(ObjectName);
  Export(_DataStringify);
  Export(isQCObjects_Class);
  Export(isQCObjects_Object);
  Export(NamespaceRef);


  if (isBrowser) {

    Element.prototype.buildComponents = function (rebuildObjects = false) {
      var tagFilter = (!rebuildObjects) ? ("component:not([loaded])") : ("component");
      var d = this;
      var _buildComponent = function (components, __parent__) {
        var componentsBuiltWith = components.map(function (_component_, _c) {
          _component_ = components[_c];
          var data = {};
          var attributenames = components[_c].getAttributeNames().filter(function (a) {
            return a.startsWith("data-");
          }).map(function (a) {
            return a.split("-")[1];
          });
          attributenames.map(function (_attribute_name_) {
            data[_attribute_name_] = components[_c].getAttribute("data-" + _attribute_name_);
          });
          var componentDone = function () {
            var _component_ = this;
            if (typeof _component_ === "undefined") {
              throw new Error("componentDone() has lost its context");
            }
            if (typeof _component_.body === "undefined") {
              throw new Error("The component has no body");
            }
            var viewName = _component_.body.getAttribute("viewClass");
            var _View = ClassFactory(viewName);
            if (typeof _View !== "undefined") {
              _component_.view = New(_View, {
                component: _component_
              }); // Initializes the main view for the component
              if (Object.hasOwnProperty.call(_component_.view, "done") && typeof _component_.view.done === "function") {
                _component_.view.done.call(_component_.view);
              }
            }
            var controllerName = _component_.body.getAttribute("controllerClass");
            if (!controllerName) {
              controllerName = "Controller";
            }
            var _Controller = ClassFactory(controllerName);
            if (typeof _Controller !== "undefined") {
              _component_.controller = New(_Controller, {
                component: _component_
              }); // Initializes the main controller for the component
              if (typeof _component_.controller.done === "function") {
                _component_.controller.done.call(_component_.controller);
              } else {
                logger.debug(`${controllerName} does not have a done() method.`);
              }
              if (typeof _component_.controller.createRoutingController === "function") {
                _component_.controller.createRoutingController.call(_component_.controller);
              } else {
                logger.debug(`${controllerName} does not have a createRoutingController() method.`);
              }
            }
            var effectClassName = _component_.body.getAttribute("effectClass");
            var applyEffectTo = _component_.body.getAttribute("apply-effect-to");
            applyEffectTo = (applyEffectTo !== null) ? (applyEffectTo) : ("load");
            if (effectClassName !== null && applyEffectTo === "observe") {
              _component_.applyObserveTransitionEffect(effectClassName);
            } else if (effectClassName !== null && applyEffectTo === "load") {
              _component_.applyTransitionEffect(effectClassName);
            }
            if (_component_.shadowed && (typeof _component_.shadowRoot !== "undefined")) {
              _component_.subcomponents = _buildComponent(_component_.shadowRoot.subelements(tagFilter), _component_);
            } else {
              _component_.subcomponents = _buildComponent(_component_.body.subelements(tagFilter), _component_);
            }

            if (_top.CONFIG.get("overrideComponentTag")) {
              _component_.body.outerHTML = this.body.innerHTML;
            }
            _component_.body.setAttribute("loaded", true);

            logger.debug(`Trying to run component helpers for ${_component_.name}...`);
            try {
              _component_.runComponentHelpers();
              logger.debug(`Component helpers for ${_component_.name} executed.`);
            } catch (e){
              logger.debug(`Component helpers for ${_component_.name} could not be executed.`);
              throw Error(e);
            }

            if ((Tag("component[loaded=true]").length * 100 / Tag("component").length) >= 100) {
              d.dispatchEvent(new CustomEvent("componentsloaded", {
                detail: {
                  lastComponent: _component_
                }
              }));
            }
          };

          var __shadowed_not_set = (components[_c].getAttribute("shadowed") === null) ? (true) : (false);
          var __tplsource_attr_not_set = (components[_c].getAttribute("template-source") === null) ? (true) : (false);
          var shadowed = (components[_c].getAttribute("shadowed") === "true") ? (true) : (false);
          var __cached_not_set = (components[_c].getAttribute("cached") === null) ? (true) : (false);
          var cached = (components[_c].getAttribute("cached") === "true") ? (true) : (false);
          var tplextension = (typeof _top.CONFIG.get("tplextension") !== "undefined") ? (_top.CONFIG.get("tplextension")) : ("html");
          tplextension = (components[_c].getAttribute("tplextension") !== null) ? (components[_c].getAttribute("tplextension")) : (tplextension);
          var _componentName = components[_c].getAttribute("name");
          var _componentClassName = (components[_c].getAttribute("componentClass") !== null) ? (components[_c].getAttribute("componentClass")) : ("Component");
          var _serviceClassName = (components[_c].getAttribute("serviceClass") !== null) ? (components[_c].getAttribute("serviceClass")) : (null);
          /* __enable_service_class__ = true by default */
          var __enable_service_class__ = (
            (Object.hasOwnProperty.call(components[_c], "enableServiceClass") && components[_c].enableServiceClass) ||
            (!Object.hasOwnProperty.call(components[_c], "enableServiceClass"))
          ) ? (true) : (false);
          var _response_to_data_ = (components[_c].getAttribute("response-to") !== null && components[_c].getAttribute("response-to") === "data") ? (true) : (false);
          var _response_to_template_ = (components[_c].getAttribute("response-to") !== null && components[_c].getAttribute("response-to") === "template") ? (true) : (false);
          let __componentClassName = (_top.CONFIG.get("preserveComponentBodyTag")) ? (
            (_componentName !== null) ? ("com.qcobjects.components." + _componentName + ".ComponentBody") : ("com.qcobjects.components.ComponentBody")
          ) : (_componentClassName);
          _componentName = (_componentName !== null) ? (_componentName) : (
            (ClassFactory(__componentClassName) &&
              typeof ClassFactory(__componentClassName).name !== "undefined"
            ) ? (
              ClassFactory(__componentClassName).name
            ) : ("")
          );
          var __classDefinition = ClassFactory(__componentClassName);
          var __tplsource_prop_set = (__componentClassName !== "Component" && ((typeof __classDefinition !== "undefined" && typeof __classDefinition.tplsource === "string") && __classDefinition.tplsource !== "")) ? (true) : (false);
          var tplsource = (__tplsource_attr_not_set && __tplsource_prop_set) ? (__classDefinition.tplsource) : ((__tplsource_attr_not_set) ? ("default") : (components[_c].getAttribute("template-source")));
          logger.debug(`template source for  ${_componentName} is ${tplsource} `);
          logger.debug(`type for ${_componentName} is ${__getType__(__classDefinition)} `);

          var componentURI;
          componentURI = ComponentURI({
            "COMPONENTS_BASE_PATH": _top.CONFIG.get("componentsBasePath"),
            "COMPONENT_NAME": _componentName,
            "TPLEXTENSION": tplextension,
            "TPL_SOURCE": tplsource
          });
          if (_top.CONFIG.get("preserveComponentBodyTag")) {
            Package((_componentName !== "") ? ("com.qcobjects.components." + _componentName + "") : ("com.qcobjects.components"), [
              Class("ComponentBody", ClassFactory("Component"), {
                name: _componentName,
                tplsource: tplsource,
                tplextension: tplextension,
                reload: true
              })
            ]);
          }

          var __serviceClass;
          if (__enable_service_class__ && _serviceClassName !== null) {
            __serviceClass = ClassFactory(_serviceClassName);
          }
          if (!_response_to_data_ && __classDefinition && Object.hasOwnProperty.call(__classDefinition, "responseTo")) {
            _response_to_data_ = (__classDefinition.responseTo === "data") ? (true) : (false);
          } else if (!_response_to_data_ && Object.hasOwnProperty.call(ClassFactory("Component"), "responseTo")) {
            _response_to_data_ = (ClassFactory("Component").responseTo === "data") ? (true) : (false);
          }
          if (!_response_to_template_ && __classDefinition && Object.hasOwnProperty.call(__classDefinition, "responseTo")) {
            _response_to_template_ = (__classDefinition.responseTo === "template") ? (true) : (false);
          } else if (!_response_to_template_ && Object.hasOwnProperty.call(ClassFactory("Component"), "responseTo")) {
            _response_to_template_ = (ClassFactory("Component").responseTo === "template") ? (true) : (false);
          }

          var __create_component_instance_ = function (data, serviceResponse) {
            var __shadowed = (__shadowed_not_set) ? ((__classDefinition && __classDefinition.shadowed) || ClassFactory("Component").shadowed) : (shadowed);
            var __definition = {
              __parent__: __parent__,
              name: _componentName,
              data: data,
              cached: (__cached_not_set) ? (ClassFactory("Component").cached) : (cached),
              shadowed: __shadowed,
              tplextension: tplextension,
              body: (_top.CONFIG.get("preserveComponentBodyTag")) ? (_DOMCreateElement("componentBody")) : (components[_c]),
              templateURI: componentURI,
              tplsource: tplsource,
              subcomponents: []
            };
            if (_response_to_template_) {
              __definition.template = serviceResponse;
            }
            if (typeof _componentName === "undefined" || _componentName === "" || _componentName === null) {
              /* this allows to use the original property defined
              in the component definition if it is not present in the tag */
              delete __definition.name;
            }
            if (componentURI === "") {
              /* this allows to use the original property defined
              in the component definition if it is not present in the tag */
              delete __definition.templateURI;
            }
            var newComponent = New(__classDefinition, __definition);

            if (_top.CONFIG.get("preserveComponentBodyTag")) {
              components[_c].append(newComponent);
            }
            newComponent.done = componentDone;
            return newComponent;
          };
          var newComponent;
          if (typeof __serviceClass !== "undefined" &&
            (typeof __enable_service_class__ !== "undefined" &&
              __enable_service_class__ === true) &&
            (_response_to_data_ || _response_to_template_)
          ) {
            logger.info("Loading service " + _serviceClassName);
            var serviceInstance = New(__serviceClass, {
              data: data
            });
            serviceLoader(serviceInstance).then(function ({
              request,
              service
            }) {
              var serviceResponse = service.template;
              if (_response_to_data_) {
                if (typeof data === "object" && typeof serviceResponse === "object") {
                  data = Object.assign(data, serviceResponse);
                } else {
                  data = serviceResponse;
                }
              }
              newComponent = __create_component_instance_.call(this, data, serviceResponse);
              newComponent.serviceInstance = serviceInstance;
              newComponent.serviceData = data;
            }).catch(function (e) {
              logger.debug("Something went wroing while trying to load the service " + _serviceClassName);
            });
          } else {
            newComponent = __create_component_instance_.call(this, data, null);
          }
          return newComponent;
        });
        return componentsBuiltWith;
      };
      var components = d.subelements(tagFilter);
      return _buildComponent(components, null);
    };
    HTMLDocument.prototype.buildComponents = Element.prototype.buildComponents;
    HTMLElement.prototype.buildComponents = Element.prototype.buildComponents;
    var _ComponentWidget_ = class extends HTMLElement {
      constructor() {
        super(...arguments);
        const componentWidget = this;
        const componentName = componentWidget.nodeName.toLowerCase();
        const componentBody = _DOMCreateElement("component");
        const __enabled__atributes__ = ["cached", "splashscreen", "response-to", "shadowed", "componentClass", "controllerClass", "viewClass", "serviceClass", "effectClass", "tplextension", "template-source", "data"];
        componentBody.setAttribute("name", componentName);

        if (!componentWidget.hasAttribute("shadowed")) {
          componentBody.setAttribute("shadowed", "true");
        }
        __enabled__atributes__.map(function (attributeName) {
          if (componentWidget.hasAttribute(attributeName)) {
            componentBody.setAttribute(attributeName, componentWidget.getAttribute(attributeName));
            componentWidget.removeAttribute(attributeName);
          }
        });
        var data_attributenames = componentWidget.getAttributeNames().filter(function (a) {
          return a.startsWith("data-");
        }).map(function (a) {
          return a.split("-")[1];
        });
        data_attributenames.map(function (_attribute_name_) {
          componentBody.setAttribute("data-" + _attribute_name_, componentWidget.getAttribute("data-" + _attribute_name_));
          componentWidget.removeAttribute("data-" + _attribute_name_);
        });
        [...componentWidget.children].map(function (element) {
          componentBody.appendChild(element.cloneNode(true));
          element.remove();
        });

        componentWidget.append(componentBody);
      }
    };
    Export(_ComponentWidget_);
    var RegisterWidget = function (widgetName) {
      customElements.define(widgetName, class extends _ComponentWidget_ {});
    };
    var RegisterWidgets = function () {
      var widgetList = [...arguments];
      widgetList.filter(function (widgetName) {
        return typeof widgetName === "string";
      }).map(function (widgetName) {
        RegisterWidget(widgetName);
      });
    };
    (_protected_code_)(RegisterWidget);
    (_protected_code_)(RegisterWidgets);
    Export(RegisterWidget);
    Export(RegisterWidgets);

  } else {
    // not yet implemented.
  }

  if (!isBrowser) {

    Package("com.qcobjects.api", [
      class BackendMicroservice extends ClassFactory("InheritClass") {

        constructor ({
          domain= _domain_,
          basePath= _basePath_,
          body= null,
          stream= null,
          request= null
        }){
          super(...arguments);
  
          var o = this;
  
          logger.debug("Executing BackendMicroservice ");
          let microservice = this;
          microservice.body = null;
          this.cors();
          microservice.stream = stream;
          stream.on("data", (data) => {
            // data from POST, GET
            var requestMethod = request.method.toLowerCase();
            var supportedMethods = {
              "post": microservice.post,
            };
            if (Object.hasOwnProperty.call(supportedMethods, requestMethod)) {
              supportedMethods[requestMethod].call(microservice, data);
            }
          });
  
          // data from POST, GET
          var requestMethod = request.method.toLowerCase();
          var supportedMethods = {
            "get": microservice.get,
            "head": microservice.head,
            "put": microservice.put,
            "delete": microservice.delete,
            "connect": microservice.connect,
            "options": microservice.options,
            "trace": microservice.trace,
            "patch": microservice.patch
          };
          if (Object.hasOwnProperty.call(supportedMethods, requestMethod)) {
            supportedMethods[requestMethod].call(microservice);
          }
          
          
        }
  
        cors() {
          if (this.route.cors) {
            let {
              allow_origins,
              allow_credentials,
              allow_methods,
              allow_headers
            } = this.route.cors;
            var microservice = this;
            if (typeof microservice.headers !== "object") {
              microservice.headers = {};
            }
            if (typeof allow_origins !== "undefined") {
              // an example of allow_origins is ['https://example.com','http://www.example.com']
              if (allow_origins === "*" || (typeof microservice.request.headers.origin === "undefined") || [...allow_origins].indexOf(microservice.request.headers.origin) !== -1) {
                // for compatibility with all browsers allways return a wildcard when the origin is allowed
                microservice.headers["Access-Control-Allow-Origin"] = "*";
              } else {
                logger.debug("Origin is not allowed: " + microservice.request.headers.origin);
                logger.debug("Forcing to finish the response...");
                this.body = {};
                try {
                  this.done();
                } catch (e) {}
              }
            } else {
              microservice.headers["Access-Control-Allow-Origin"] = "*";
            }
            if (typeof allow_credentials !== "undefined") {
              microservice.headers["Access-Control-Allow-Credentials"] = allow_credentials.toString();
            } else {
              microservice.headers["Access-Control-Allow-Credentials"] = "true";
            }
            if (typeof allow_methods !== "undefined") {
              microservice.headers["Access-Control-Allow-Methods"] = [...allow_methods].join(",");
            } else {
              microservice.headers["Access-Control-Allow-Methods"] = "GET, OPTIONS, POST";
            }
            if (typeof allow_headers !== "undefined") {
              microservice.headers["Access-Control-Allow-Headers"] = [...allow_headers].join(",");
            } else {
              microservice.headers["Access-Control-Allow-Headers"] = "*";
            }
          }
        }
        
  
        head(formData) {
          this.done();
        }
  
        get(formData) {
          this.done();
        }
  
        post(formData) {
          this.done();
        }
  
        put(formData) {
          this.done();
        }
  
        delete(formData) {
          this.done();
        }
  
        connect(formData) {
          this.done();
        }
  
        options(formData) {
          this.done();
        }
  
        trace(formData) {
          this.done();
        }
  
        patch(formData) {
          this.done();
        }
  
        finishWithBody(stream) {
          try {
            stream.write(_DataStringify(this.body));
            stream.end();
          } catch (e) {
            logger.debug("Something wrong writing the response for microservice" + e.toString());
          }
        }
        
        done() {
          var microservice = this;
          var stream = microservice.stream;
          try {
            stream.respond(microservice.headers);
          } catch (e) {
            logger.debug(e.toString());
          }
          if (microservice.body !== null) {
            try {
              microservice.finishWithBody.call(microservice, stream);
            } catch (e) {
              logger.debug(e.toString());
            }
          }
        }
  
  
      }
    ]);


  }

  Class("SourceJS", Object, {
    domain: _domain_,
    basePath: _basePath_,
    body: _DOMCreateElement("script"),
    type: "text/javascript",
    containerTag: "body",
    url: "",
    data: {},
    async: false,
    external: false,
    set(name, value) {
      this[name] = value;
    },
    get(name) {
      return this[name];
    },
    status: false,
    done() {},
    fail() {},
    rebuild() {
      var context = this;
      try {
        document.getElementsByTagName(context.containerTag)[0].appendChild(
          (function (s, url, context) {
            s.type = context.type;
            s.src = url;
            s.crossOrigin = (Object.hasOwnProperty.call(context, "crossOrigin")) ? (context.crossOrigin) : ("anonymous");
            s.async = context.async;
            s.onreadystatechange = function () {
              if (this.readyState === "complete") {
                context.done.call(context);
              }
            };
            s.onload = function (e) {
              context.status = true;
              context.done.call(context, e);
            };
            s.onerror = function (e) {
              context.status = false;
              context.fail.call(context, e);
            };
            context.body = s;
            return s;
          }).call(this,
            _DOMCreateElement("script"),
            (this.external) ? (this.url) : (this.basePath + this.url), context));
      } catch (e) {
        context.status = false;
        context.fail.call(context, e);
      }
    },
    Cast(o) {
      return _Cast(this, o);
    },
    _new_(properties) {
      this.__new__(properties);
      this.rebuild();
    }
  });
  Class("SourceCSS", Object, {
    domain: _domain_,
    basePath: _basePath_,
    body: _DOMCreateElement("link"),
    url: "",
    data: {},
    async: false,
    external: false,
    set(name, value) {
      this[name] = value;
    },
    get(name) {
      return this[name];
    },
    done() {},
    rebuild() {
      var context = this;
      if (isBrowser) {
        window.document.getElementsByTagName("head")[0].appendChild(
          (function (s, url, context) {
            s.type = "text/css";
            s.rel = "stylesheet";
            s.href = url;
            s.crossOrigin = "anonymous";
            s.onreadystatechange = function () {
              if (this.readyState === "complete") {
                context.done.call(context);
              }
            };
            s.onload = context.done;
            context.body = s;
            return s;
          }).call(this,
            _DOMCreateElement("link"),
            (this.external) ? (this.url) : (this.basePath + this.url), context));
      }
    },
    Cast(o) {
      return _Cast(this, o);
    },
    _new_(properties) {
      this.__new__(properties);
      this.rebuild();
    }
  });

  /**
   * Array math functions
   */
  var __to_number = function (value) {
    return (isNaN(value)) ? (new Number(0)) : (new Number(value));
  };
  Array.prototype.unique = function () {
    return this.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
  };
  Array.unique = function (a) {
    return a.unique();
  };
  (_protected_code_)(Array.unique);
  (_protected_code_)(Array.prototype.unique);
  Array.prototype.table = function () {
    console.table(this);
  };
  Array.table = function (a) {
    return a.table();
  };
  (_protected_code_)(Array.table);
  (_protected_code_)(Array.prototype.table);
  Array.prototype.sum = function () {
    return this.reduce(function (prev, current) {
      return __to_number(prev) + __to_number(current);
    }, 0);
  };
  Array.sum = function (a) {
    return a.sum();
  };
  (_protected_code_)(Array.sum);
  (_protected_code_)(Array.prototype.sum);
  Array.prototype.avg = function () {
    return (this.length < 1) ? (0) : (this.reduce(function (prev, current) {
      return ((__to_number(prev) + __to_number(current)) / 2);
    }));
  };
  Array.avg = function (a) {
    return a.avg();
  };
  (_protected_code_)(Array.avg);
  (_protected_code_)(Array.prototype.avg);
  Array.prototype.min = function () {
    return this.reduce(function (prev, current) {
      return (__to_number(prev) <= __to_number(current)) ? (prev) : (current);
    }, Infinity);
  };
  Array.min = function (a) {
    return a.min();
  };
  (_protected_code_)(Array.min);
  (_protected_code_)(Array.prototype.min);
  Array.prototype.max = function () {
    return this.reduce(function (prev, current) {
      return (__to_number(prev) >= __to_number(current)) ? (prev) : (current);
    }, 0);
  };
  Array.max = function (a) {
    return a.max();
  };
  (_protected_code_)(Array.max);
  (_protected_code_)(Array.prototype.max);
  Array.prototype.sortBy = function (propName, sortAsc = true) {
    var sort_function = (sortAsc) ? (
      function (prev, current) {
        return current[propName] < prev[propName] ? 1 : -1;
      }
    ) : (
      function (prev, current) {
        return current[propName] > prev[propName] ? 1 : -1;
      }
    );
    return this.sort(sort_function);
  };
  Array.sortBy = function (a, propName, sortAsc = true) {
    return a.sortBy(propName, sortAsc);
  };
  (_protected_code_)(Array.sortBy);
  (_protected_code_)(Array.prototype.sortBy);

  Array.matrix = function (_length, _fillValue = 0) {
    var x_func = function (x) {
      return _fillValue;
    };
    return Array.from({
      length: _length
    }, x_func);
  };
  (_protected_code_)(Array.matrix);

  Array.matrix2d = function (_length, _fillValue = 0) {
    var y_func = function (y) {
      return _fillValue;
    };
    var x_func = function (x) {
      return Array.from({
        length: _length
      }, y_func);
    };
    return Array.from({
      length: _length
    }, x_func);
  };
  (_protected_code_)(Array.matrix2d);

  Array.matrix3d = function (_length, _fillValue = 0) {
    var y_func = function (y) {
      return Array.from({
        length: _length
      }, function () {
        return _fillValue;
      });
    };
    var x_func = function (x) {
      return Array.from({
        length: _length
      }, y_func);
    };
    return Array.from({
      length: _length
    }, x_func);
  };
  (_protected_code_)(Array.matrix3d);

  _top.range = function (start, stop = 0, step = 1) {
    if (stop === 0 || typeof stop === "undefined") {
      stop = start;
      start = 0;
    }
    return Array.from({
      length: (stop - start) / step + 1
    }, function (_, i) {
      return start + (i * step);
    });
  };
  (_protected_code_)(_top.range);

  String.prototype.list = function () {
    var __instance = this;
    return _top.range(0, __instance.length - 1).map(function (i) {
      return __instance[i];
    });
  };
  (_protected_code_)(String.prototype.list);

  _top.getDocumentLayout = function () {
    var h = (w, h) => {
      return w > h ? "landscape" : null;
    };
    var v = (w, h) => {
      return h > w ? "portrait" : null;
    };
    var square = (w, h) => {
      return w === h ? "square" : null;
    };
    return [
      h(document.documentElement.clientWidth, document.documentElement.clientHeight),
      v(document.documentElement.clientWidth, document.documentElement.clientHeight),
      square(document.documentElement.clientWidth, document.documentElement.clientHeight)
    ].filter(e => e !== null).pop();
  };


  /**
   * End of array math functions
   */


  Class("ArrayList", Array, []);
  ClassFactory("ArrayList").matrix = Array.matrix;
  ClassFactory("ArrayList").matrix2d = Array.matrix2d;
  ClassFactory("ArrayList").matrix3d = Array.matrix3d;
  (_protected_code_)(ClassFactory("ArrayList").matrix);
  (_protected_code_)(ClassFactory("ArrayList").matrix2d);
  (_protected_code_)(ClassFactory("ArrayList").matrix3d);

  Class("ArrayCollection", Object, {
    source: New(ClassFactory("ArrayList"), []),
    changed(prop, value) {
      logger.debug("VALUE CHANGED");
      logger.debug(prop);
      logger.debug(value);
    },
    push(value) {
      var self = this;
      logger.debug("VALUE ADDED");
      logger.debug(value);
      self.source.push(value);
    },
    pop(value) {
      var self = this;
      logger.debug("VALUE POPPED");
      logger.debug(value);
      self.source.pop(value);
    },
    _new_(source) {
      var self = this;
      var _index = 0;
      self.source = New(ClassFactory("ArrayList"), source);
      for (var _k in self.source) {
        if (!isNaN(_k)) {
          logger.debug("binding " + _k.toString());
          (function (_pname) {
            Object.defineProperty(self, _pname, {
              set(value) {
                logger.debug("setting " + _pname + "=" + value);
                self.source[_pname] = value;
                self.changed(_pname, value);
              },
              get() {
                return self.source[_pname];
              }
            });
          })(_k);
          _index++;
        }

      }
      self.source.length = _index;
      Object.defineProperty(self, "length", {
        get() {
          return self.source.length;
        }
      });
    }
  });

  Class("Effect", {
    duration: 1000,
    animate({
      timing,
      draw,
      duration
    }) {

      let start = performance.now();

      requestAnimationFrame(function animate(time) {
        // timeFraction goes from 0 to 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // calculate the current animation state
        let progress = timing(timeFraction);

        draw(Math.round(progress * 100)); // draw it

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        } else {
          // if this is an object with a done method
          if (typeof this !== "undefined" &&
            this !== null &&
            Object.hasOwnProperty.call(this, "done") &&
            (typeof this.done).toLowerCase() === "function") {
            this.done.call(this);
          }
        }

      });
    }
  });

  Class("TransitionEffect", ClassFactory("Effect"), {
    duration: 385,
    defaultParams: {
      alphaFrom: 0,
      alphaTo: 1,
      angleFrom: 180,
      angleTo: 0,
      radiusFrom: 0,
      radiusTo: 30,
      scaleFrom: 0,
      scaleTo: 1
    },
    fitToHeight: false,
    fitToWidth: false,
    effects: [],
    _new_(o) {
      logger.info("DECLARING TransitionEffect  ");
      this.component.defaultParams = this.defaultParams;
    },
    apply({
      alphaFrom,
      alphaTo,
      angleFrom,
      angleTo,
      radiusFrom,
      radiusTo,
      scaleFrom,
      scaleTo
    }) {
      var _transition_ = this;
      logger.info("EXECUTING TransitionEffect  ");
      if (_transition_.fitToHeight) {
        _transition_.component.body.height = _transition_.component.body.offsetParent.scrollHeight;
      }
      if (_transition_.fitToWidth) {
        _transition_.component.body.width = _transition_.component.body.offsetParent.scrollWidth;
      }
      _transition_.component.body.style.display = "block";
      _transition_.effects.map(function (effectClassName, eff) {
        var __effectClass__ = ClassFactory(effectClassName);
        var effectObj = new __effectClass__();
        var effectClassMethod = effectObj.apply;
        var args = [_transition_.component.body].concat(Object.values({
          alphaFrom,
          alphaTo,
          angleFrom,
          angleTo,
          radiusFrom,
          radiusTo,
          scaleFrom,
          scaleTo
        }));
        effectClassMethod.apply(_transition_, args);
      });
    }
  });

  Class("Timer", {
    duration: 1000,
    alive: true,
    thread({
      timing,
      intervalInterceptor,
      duration
    }) {
      var timer = this;

      let start = performance.now();

      requestAnimationFrame(function thread(time) {
        // timeFraction goes from 0 to 1
        let elapsed = (time - start);
        let timeFraction = elapsed / duration;
        if (timeFraction > 1) timeFraction = 1;

        // calculate the current progress state
        let progress = timing(timeFraction, elapsed);

        intervalInterceptor(Math.round(progress * 100)); // draw it

        if ((timeFraction < 1 || duration === -1) && timer.alive) {
          requestAnimationFrame(thread);
        }

      });
    }
  });

  Class("Toggle", ClassFactory("InheritClass"), {
    _toggle: false,
    _inverse: true,
    _positive: null,
    _negative: null,
    _dispatched: null,
    _args: {},
    changeToggle() {
      this._toggle = (this._toggle) ? (false) : (true);
    },
    _new_({
      positive,
      negative,
      args
    }) {
      this._positive = positive;
      this._negative = negative;
      this._args = args;
    },
    fire() {
      var toggle = this;
      var _promise = new Promise(function (resolve, reject) {

        if (typeof toggle._positive === "function" && typeof toggle._negative === "function") {
          if (toggle._inverse) {
            toggle._dispatched = (toggle._toggle) ? (toggle._negative.bind(toggle)) : (toggle._positive.bind(toggle));
          } else {
            toggle._dispatched = (toggle._toggle) ? (toggle._positive.bind(toggle)) : (toggle._negative.bind(toggle));
          }
          toggle._dispatched.call(toggle, toggle._args);
          resolve.call(_promise, toggle);
        } else {
          logger.debug("Toggle functions are not declared");
          reject.call(_promise, toggle);
        }
      }).then(function (toggle) {
        toggle.changeToggle();
      }).catch(function (e) {
        logger.debug(e.toString());
      });
      return _promise;
    }
  });

  // Set Processors
  (function (_top) {

    let mapper = function (componentName, valueName) {
      /*
       * Mapper processor
       * @usage
       *        $mapper(<componentName>,<valueName>)
       *
       * Where componentName is the name of the component (same value as in attribute tag name) without quotes
       * and valueName is the name of the variable that contains the value to map, it can be either a property of
       * the component instance, the data object or a global value
       */


      let globalValue = _top.global.get(valueName);
      let componentValue = this.component.get(valueName);
      let dataValue = this.component.data[valueName];
      let list = (typeof dataValue !== "undefined") ? (dataValue) : ((typeof componentValue !== "undefined") ? (componentValue) : (globalValue));
      let listItems = "";
      if (typeof list !== "undefined" && typeof list["map"] !== "undefined") {
        listItems = list.map(function (element) {
          let dataItems = [...Object.keys(element)].map(k => ` data-${k}="${element[k].toString()}"`).join("");
          return `<component name="${componentName}" ${dataItems} ></component>`;
        }).join("");
      } else {
        logger.debug(`${componentName}.${valueName} does not have a map property`);
      }
      return listItems;
    };
    ClassFactory("Processor").setProcessor(mapper);

    let layout = function (layoutname, cssfile) {
      /*
       * Layout processor
       * @usage
       *        $layout(<layoutname>, <cssfile>)
       * Where layoutname can be "portrait" or "landscape" without quotes
       * cssfile is the uri for the css file to import
       */

      var layout_portrait = `
      /* CSS Document for Mobile Imports */
      @import url("${cssfile}") (orientation:portrait);
      @import url("${cssfile}") (max-width:460px);
      @import url("${cssfile}") (aspect-ratio: 9/16);
      @import url("${cssfile}") (aspect-ratio: 10/16);
      @import url("${cssfile}") (aspect-ratio: 5/8);
      @import url("${cssfile}") (aspect-ratio: 3/4);
      @import url("${cssfile}") (aspect-ratio: 2/3);
      `;
      var layout_landscape = `
      @import url("${cssfile}") (orientation:landscape) and (min-width:460px);
      @import url("${cssfile}") (aspect-ratio: 16/9) and (min-width:460px);
      @import url("${cssfile}") (aspect-ratio: 16/10) and (min-width:460px);
      @import url("${cssfile}") (aspect-ratio: 8/5) and (min-width:460px);
      @import url("${cssfile}") (aspect-ratio: 4/3) and (min-width:460px);
      @import url("${cssfile}") (aspect-ratio: 3/2) and (min-width:460px);
      `;
      var layout_code = {
        "landscape": layout_landscape,
        "portrait": layout_portrait
      };

      return (Object.hasOwnProperty.call(layout_code, layoutname)) ? (layout_code[layoutname]) : ("");
    };

    ClassFactory("Processor").setProcessor(layout);

    let component = function () {
      /*
       * component processor
       * @usage
       *        $component(name=<name>, componentClass=<componentClass>, ...)
       * Returns a component tag declaration like:
       * <component name=<name> ...></component>
       */
      let arg = [...arguments].map(function (a) {
        return {
          [a.split("=")[0]]: a.split("=")[1]
        };
      }).reduce(function (k1, k2) {
        return Object.assign(k1, k2);
      });
      let attrs = [...Object.keys(arg)].map(function (a) {
        return `${a}=${arg[a]}`;
      }).join(" ");
      return `<component ${attrs}></component>`;
    };

    ClassFactory("Processor").setProcessor(component);

    let repeat = function (length, text) {
      /*
       * Repeat processor
       * @usage
       *        $repeat(<length>, <text>)
       * Where length is the number of occurrences of text
       */
      return _top.range(length).map(
        function (index) {
          return text.replace("{{index}}", index.toString());
        }
      ).join("");
    };

    ClassFactory("Processor").setProcessor(repeat);

  })(_top);


  /**
   * Load every component tag declared in the body
   **/
  Ready(function () {
    if (!_top.CONFIG.get("useSDK")) {
      _top.__start__();
    }
  });

  /*
  Public variables and functions
  */
  Export(Export); /* exports the same Export function once */
  Export(Import);
  Export(Package);
  Export(Class);
  Export(New);
  Export(Tag);
  Export(Ready);
  Export(ready);
  Export(isBrowser);
  Export(_methods_);

  asyncLoad(function () {

    Class("GlobalSettings", Object, {
      _GLOBAL: {},
      set(name, value) {
        this._GLOBAL[name] = value;
      },
      get(name, _default) {
        var _value;
        if (typeof this._GLOBAL[name] !== "undefined") {
          _value = this._GLOBAL[name];
        } else if (typeof _default !== "undefined") {
          _value = _default;
        }
        return _value;
      },
      __start__() {
        var __load__serviceWorker = function () {
          var _promise;
          if (isBrowser) {
            _promise = new Promise(function (resolve, reject) {
              if (("serviceWorker" in navigator) &&
                (typeof _top.CONFIG.get("serviceWorkerURI") !== "undefined")) {
                _top.CONFIG.set("serviceWorkerScope", _top.CONFIG.get("serviceWorkerScope") ? (_top.CONFIG.get("serviceWorkerScope")) : ("/"));
                navigator.serviceWorker.register(_top.CONFIG.get("serviceWorkerURI"), {
                    scope: _top.CONFIG.get("serviceWorkerScope")
                  })
                  .then(function (registration) {
                    logger.debug("Service Worker Registered");
                    resolve.call(_promise, registration);
                  }, function (registration) {
                    logger.debug("Error registering Service Worker");
                    reject.call(_promise, registration);
                  });
                navigator.serviceWorker.ready.then(function (registration) {
                  logger.debug("Service Worker Ready");
                  resolve.call(_promise, registration);
                }, function (registration) {
                  logger.debug("Error loading Service Worker");
                  reject.call(_promise, registration);
                });
              }
            });
          }
          return _promise;
        };
        var _buildComponents = function () {
          if (isBrowser) {
            logger.debug("Starting to bind routes");
            _top._bindroute_.call(ClassFactory("Component"));
            logger.debug("Starting to building components");
            global.componentsStack = document.buildComponents.call(document);
            logger.debug("Initializing the service worker");
            __load__serviceWorker.call(_top).catch(function () {
              logger.debug("error loading the service worker");
            });

          }
        };
        logger.debug("Starting to load the config settings...");
        if (_top.CONFIG.get("useConfigService", false)) {
          logger.debug("Loading settings using local configuration file...");
          _top.global.configService = New(ClassFactory("ConfigService"));
          _top.global.configService.configLoaded = _buildComponents;
          serviceLoader(_top.global.configService);
        } else {
          logger.debug("Starting to load the components...");
          _buildComponents.call(this);
        }
      }
    });
    var _g_ = New(ClassFactory("GlobalSettings"));

    Object.defineProperty(global, "PackagesNameList", {
      set(val) {
        logger.debug("PackagesNameList is readonly");
        return;
      },
      get() {
        var _get_packages_names = function (_packages) {
          var _keys = [];
          for (var _k in _packages) {
            if (
              typeof _packages[_k] !== "undefined" &&
              typeof _packages[_k] !== "function" &&
              Object.hasOwnProperty.call(_packages[_k], "length") &&
              _packages[_k].length > 0
            ) {
              _keys.push(_k);
              _keys = _keys.concat(_get_packages_names(_packages[_k]));
            }
          }
          return _keys;
        };
        return _get_packages_names(_QC_PACKAGES);
      }
    });

    Object.defineProperty(global, "PackagesList", {
      set(value) {
        logger.debug("PackagesList is readonly");
        return;
      },
      get() {
        return global.PackagesNameList.map(function (packagename) {
          let _classesList = Package(packagename);
          let _ret_;
          if (_classesList) {
            _ret_ = {
              packageName: packagename,
              classesList: _classesList.filter(function (_packageClass) {
                return isQCObjects_Class(_packageClass);
              })
            };
          }
          return _ret_;
        }).filter(function (_p) {
          return typeof _p !== "undefined";
        });
      }
    });

    Object.defineProperty(global, "ClassesList", {
      set(value) {
        logger.debug("ClassesList is readonly");
        return;
      },
      get() {
        var _classesList = [];
        global.PackagesList.map(function (_package_element) {
          _classesList = _classesList.concat(_package_element.classesList.map(
            function (_class_element) {
              return {
                packageName: _package_element.packageName,
                className: _package_element.packageName + "." + _class_element.__definition.__classType,
                classFactory: _class_element
              };
            }
          ));
          return _package_element;
        });

        return _classesList;
      }
    });

    Object.defineProperty(global, "ClassesNameList", {
      set(value) {
        logger.debug("ClassesNameList is readonly");
        return;
      },
      get() {
        return global.ClassesList.map(function (_class_element) {
          return _class_element.className;
        });
      }
    });

    _top = _CastProps(_g_, _top);

    if (isBrowser) {
      // use of GLOBAL word is deprecated in node.js
      // this is only for compatibility purpose with old versions of QCObjects in browsers
      Class("GLOBAL", _QC_CLASSES["global"]); // case insensitive for compatibility con old versions;
      Export(ClassFactory("GLOBAL"));
    }
    Export(global);

    if (_top.CONFIG.get("useSDK")) {
      (function () {
        var remoteImportsPath = _top.CONFIG.get("remoteImportsPath");
        var external = (!_top.CONFIG.get("useLocalSDK")) ? (true) : (false);
        _top.CONFIG.set("remoteImportsPath", _top.CONFIG.get("remoteSDKPath"));

        var tryImportingSDK = false;
        var sdkName = "QCObjects-SDK";
        if (isBrowser) {
          tryImportingSDK = true;
        } else {
          var sdkPath = findPackageNodePath("qcobjects-sdk");
          if (sdkPath !== null) {
            sdkName = "qcobjects-sdk";
            tryImportingSDK = true;
          } else {
            sdkName = "node_modules/qcobjects-sdk/QCObjects-SDK";
            tryImportingSDK = true;
          }
        }

        if (tryImportingSDK) {
          logger.info("Importing SDK... " + sdkName);
          Import(sdkName, function () {
            if (external) {
              logger.debug("QCObjects-SDK.js loaded from remote location");
            } else {
              logger.debug("QCObjects-SDK.js loaded from local");
            }
            _top.CONFIG.set("remoteImportsPath", remoteImportsPath);
          }, external);
        } else {
          logger.debug("SDK has not been imported as it is not available at the moment");
        }
      }).call(null);
    }


  }, null);

  if (isBrowser) {
    asyncLoad(function () {
      Ready(function () {
        window.onpopstate = function (event) {
          event.stopImmediatePropagation();
          event.stopPropagation();
          if (ClassFactory("CONFIG").get("rebuildObjects", true)){
            global.componentsStack = document.buildComponents.call(document, true);
          } else {
            ClassFactory("Component").route();
          }
        };

        /*
         * scroll management custom events
         * usage: document.addEventListener('percentY90',function(e){console.log(e.detail.percentY)});
         * possible events: scrollpercent, defaultscroll, percentY0, percentY25, percentY50, percentY75, percentY90
         */

        (function (_top) {
          let lastKnownScrollPosition = 0;
          let ticking = false;
          let scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
          );

          let scrollWidth = Math.max(
            document.body.scrollWidth, document.documentElement.scrollWidth,
            document.body.offsetWidth, document.documentElement.offsetWidth,
            document.body.clientWidth, document.documentElement.clientWidth
          );

          function scrollDispatcher(event) {
            var percentY = Math.round(_top.scrollY * 100 / scrollHeight);
            var percentX = Math.round(_top.scrollX * 100 / scrollWidth);
            var scrollPercentEventEvent = new CustomEvent("scrollpercent", {
              detail: {
                percentX: percentX,
                percentY: percentY
              }
            });
            event.target.dispatchEvent(scrollPercentEventEvent);
            var secondaryEventName = "defaultscroll";
            var __valid_scrolls__ = [0, 5, 10, 25, 50, 75, 90, 95, 100];
            __valid_scrolls__.filter(function (p) {
              return p === percentY;
            }).map(function (pY) {
              secondaryEventName = "percentY" + percentY.toString();
              var secondaryCustomEvent = new CustomEvent(secondaryEventName, {
                detail: {
                  percentX: percentX,
                  percentY: percentY
                }
              });
              event.target.dispatchEvent(secondaryCustomEvent);
            });

          }

          document.addEventListener("scroll", function (event) {

            if (!ticking) {
              requestAnimationFrame(function () {
                scrollDispatcher(event);
                ticking = false;
              });

              ticking = true;
            }
          });

        })(_top);

      });
    }, null);
  }

  if (!isBrowser) {
    if (typeof _top.global !== "undefined" && Object.hasOwnProperty.call(_top.global, "_fireAsyncLoad")) {
      _top.global._fireAsyncLoad.call(this);
    }
    if (typeof _top.global !== "undefined" && Object.hasOwnProperty.call(_top.global, "onload")) {
      _top.global.onload.call(this);
    }
  }


  /* Freezing Object && Object.prototype to prevent prototype pollution risks */
  (function (isBrowser) {
    var __freeze__ = function () {
      Object.freeze(Object.prototype);
      Object.freeze(Object);
    };
    if (isBrowser && _top.CONFIG.get("secureObjects", false)) {
      Ready(function () {
        __freeze__();
      });
    } else if (_top.CONFIG.get("secureObjects", false)) {
      __freeze__();
    }
  })(isBrowser);

}).call(null, (typeof module === "object" && typeof module.exports === "object") ? (module.exports = global) : ((typeof global === "object") ? (global) : (
  (typeof window === "object") ? (window) : ({})
)));