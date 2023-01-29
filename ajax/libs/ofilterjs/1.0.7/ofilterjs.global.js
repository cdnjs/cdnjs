"use strict";
var ofilterjs = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // lib/src/utils.js
  var require_utils = __commonJS({
    "lib/src/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.forEach = exports.mergeObj = exports.arraySlice = exports.isArray = exports.isLength = exports.isArrayLike = exports.isBoolean = exports.isFunction = exports.isNumber = exports.isString = exports.isObject = exports.isPlainObject = exports.isEmpty = void 0;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var MAX_SAFE_INTEGER = 9007199254740991;
      function isEmpty(value) {
        if (value == null) {
          return true;
        }
        if (isArrayLike(value)) {
          return !value.length;
        } else if (isPlainObject(value)) {
          for (let key in value) {
            if (hasOwnProperty.call(value, key)) {
              return false;
            }
          }
        }
        return false;
      }
      exports.isEmpty = isEmpty;
      function isPlainObject(obj) {
        if (!obj || !isObject(obj) || obj.nodeType) {
          return false;
        }
        try {
          if (obj.constructor && !hasOwnProperty.call(obj, "constructor") && !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
            return false;
          }
        } catch (e) {
          return false;
        }
        let key;
        for (key in obj) {
        }
        return key === void 0 || hasOwnProperty.call(obj, key);
      }
      exports.isPlainObject = isPlainObject;
      function isObject(value) {
        let type = typeof value;
        return value != null && (type === "object" || type === "function");
      }
      exports.isObject = isObject;
      function isString(value) {
        return typeof value === "string";
      }
      exports.isString = isString;
      function isNumber(value) {
        return typeof value === "number";
      }
      exports.isNumber = isNumber;
      function isFunction(value) {
        return typeof value === "function";
      }
      exports.isFunction = isFunction;
      function isBoolean(value) {
        return typeof value === "boolean";
      }
      exports.isBoolean = isBoolean;
      function isArrayLike(value) {
        return value != null && !isFunction(value) && isLength(value.length);
      }
      exports.isArrayLike = isArrayLike;
      function isLength(value) {
        return typeof value === "number" && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
      }
      exports.isLength = isLength;
      exports.isArray = Array.isArray;
      exports.arraySlice = Array.prototype.slice;
      function mergeObj(target, other) {
        for (let i = 1, j = arguments.length; i < j; i++) {
          let source = arguments[i] || {};
          for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
              let value = source[prop];
              if (!isEmpty(value)) {
                target[prop] = value;
              }
            }
          }
        }
        return target;
      }
      exports.mergeObj = mergeObj;
      function forEach(collection, iteratee) {
        if (!isFunction(iteratee)) {
          console.error("forEach: Please pass the callback function");
          return;
        }
        const func = (0, exports.isArray)(collection) ? _arrayEach : _baseEach;
        return func(collection, iteratee);
      }
      exports.forEach = forEach;
      function _arrayEach(array, iteratee) {
        let index = -1;
        const length = array.length;
        while (++index < length) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      function _baseEach(collection, iteratee) {
        if (isEmpty(collection)) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return _baseForOwn(collection, iteratee);
        }
        const length = collection.length;
        const iterable = Object(collection);
        let index = -1;
        while (++index < length) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      }
      function _baseForOwn(object, iteratee) {
        return object && _baseFor(object, iteratee, function(object2) {
          return isArrayLike(object2) ? _arrayLikeKeys(object2) : Object.keys(Object(object2));
        });
      }
      function _isIndex(value, length) {
        const type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length && (type === "number" || type !== "symbol" && /^(?:0|[1-9]\d*)$/.test(value)) && (value > -1 && value % 1 === 0 && value < length);
      }
      function _arrayLikeKeys(value) {
        const length = value.length || 0;
        const result = new Array(length);
        let index = length ? -1 : length;
        while (++index < length) {
          result[index] = `${index}`;
        }
        for (const key in value) {
          if (hasOwnProperty.call(value, key) && !(length && (key === "length" || _isIndex(key, length)))) {
            result.push(key);
          }
        }
        return result;
      }
      function _baseFor(object, iteratee, keysFunc) {
        const iterable = Object(object);
        const props = keysFunc(object);
        let { length } = props;
        let index = -1;
        while (length--) {
          const key = props[++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      }
    }
  });

  // lib/src/get-value.js
  var require_get_value = __commonJS({
    "lib/src/get-value.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getValue = void 0;
      var utils_1 = require_utils();
      function _deepGetAttr(params, nameArr, defaultVal) {
        try {
          nameArr = (0, utils_1.isArray)(nameArr) ? nameArr : [nameArr];
          if (!(0, utils_1.isEmpty)(params) && nameArr.length > 0 && !(0, utils_1.isObject)(params) && !(0, utils_1.isArray)(params))
            return defaultVal;
          if ((0, utils_1.isEmpty)(params) || !(0, utils_1.isObject)(params) || nameArr.length <= 0)
            return params;
          const curKey = nameArr.shift();
          if ((0, utils_1.isEmpty)(curKey)) {
            return params;
          }
          const curParams = params[curKey];
          if (nameArr.length > 0) {
            return _deepGetAttr(curParams, nameArr, defaultVal);
          }
          return curParams;
        } catch (e) {
          return defaultVal;
        }
      }
      function _deepGet(params, _nameStr, _nameList, _defaultVal) {
        const nameArr = _nameStr.toString().split(".");
        const res = _deepGetAttr(params, nameArr, _defaultVal);
        if ((0, utils_1.isEmpty)(res) && _nameList.length > 0) {
          return _deepGet(params, _nameList.shift(), _nameList, _defaultVal);
        }
        return res;
      }
      function getValue(source, name, defaultVal) {
        const _dv = !(0, utils_1.isEmpty)(defaultVal) ? defaultVal : "";
        source = (0, utils_1.isObject)(source) ? source : {};
        if ((0, utils_1.isEmpty)(name) || !(0, utils_1.isEmpty)(name) && !(0, utils_1.isString)(name) && !(0, utils_1.isNumber)(name)) {
          return _dv;
        }
        const nameList = name.toString().split("|");
        const nameStr = nameList.shift();
        const res = _deepGet(source, nameStr, nameList, _dv);
        if ((0, utils_1.isEmpty)(res))
          return _dv;
        return res;
      }
      exports.getValue = getValue;
    }
  });

  // lib/src/filter-value.js
  var require_filter_value = __commonJS({
    "lib/src/filter-value.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.filterValue = void 0;
      var get_value_1 = require_get_value();
      var utils_1 = require_utils();
      function filterValue(source, config) {
        source = source || {};
        config = config || {};
        let res = {};
        if (!(0, utils_1.isEmpty)(config) && (0, utils_1.isObject)(config)) {
          (0, utils_1.forEach)(config, (cnf, key) => {
            let val = "";
            if ((0, utils_1.isObject)(cnf)) {
              const sKey = (0, get_value_1.getValue)(cnf, "key", "_key_").toString();
              const sDv = (0, get_value_1.getValue)(cnf, "default");
              const sVal = (0, get_value_1.getValue)(cnf, "value");
              const isMerge = (0, get_value_1.getValue)(cnf, "merge");
              if (!(0, utils_1.isEmpty)(sVal)) {
                res[key] = sVal;
              } else {
                val = sKey ? (0, get_value_1.getValue)(source, sKey, sDv) : sDv;
                if (cnf.filter) {
                  val = cnf.filter(val, source);
                }
                if (isMerge && (0, utils_1.isObject)(val)) {
                  res = (0, utils_1.mergeObj)(res, val);
                } else {
                  res[key] = val;
                }
              }
            } else {
              val = (0, get_value_1.getValue)(source, cnf);
              res[key] = val;
            }
          });
        }
        const args = utils_1.arraySlice.call(arguments);
        args.shift();
        args.shift();
        (0, utils_1.forEach)(args, (extra) => {
          if (!(0, utils_1.isEmpty)(extra) && (0, utils_1.isObject)(extra)) {
            (0, utils_1.forEach)(extra, (value, key) => {
              res[key] = value;
            });
          }
        });
        return res;
      }
      exports.filterValue = filterValue;
    }
  });

  // lib/src/reset-value.js
  var require_reset_value = __commonJS({
    "lib/src/reset-value.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.resetValue = void 0;
      var utils_1 = require_utils();
      var utils_2 = require_utils();
      function _deepResetValue(source, keys, value, isAuto) {
        if (keys.length <= 0)
          return;
        const curKey = keys.shift();
        if ((0, utils_1.isEmpty)(curKey))
          return;
        if (keys.length <= 0) {
          if (typeof source[curKey] !== "undefined") {
            isAuto && _autoRestValue(source, curKey, source[curKey]);
            !isAuto && (source[curKey] = value);
          }
          return;
        }
        if (!(0, utils_1.isEmpty)(source[curKey]))
          _deepResetValue(source[curKey], keys, value, isAuto);
      }
      function _autoRestValue(source, key, value) {
        if ((0, utils_1.isArray)(value)) {
          source[key] = [];
        } else if ((0, utils_1.isObject)(value)) {
          source[key] = {};
        } else if ((0, utils_2.isNumber)(value)) {
          source[key] = 0;
        } else if ((0, utils_1.isBoolean)(value)) {
          source[key] = false;
        } else if ((0, utils_1.isString)(value)) {
          source[key] = "";
        } else if ((0, utils_1.isFunction)(value)) {
          source[key] = function() {
          };
        } else {
          source[key] = void 0;
        }
      }
      function resetValue(source, arg, ...args) {
        source = source || {};
        const config = arg;
        const deep = (0, utils_1.isBoolean)(arg) ? arg : true;
        let start = (args === null || args === void 0 ? void 0 : args[1]) || 0;
        let length = (args === null || args === void 0 ? void 0 : args[0]) || 0;
        if ((0, utils_1.isEmpty)(source) || !(0, utils_1.isObject)(source))
          return false;
        if (!(0, utils_1.isEmpty)(config) && (0, utils_1.isArray)(config)) {
          (0, utils_1.forEach)(config, (value, key) => {
            let keys = value.split(".");
            _deepResetValue(source, keys, value, true);
          });
        } else if (!(0, utils_1.isEmpty)(config) && (0, utils_1.isObject)(config)) {
          (0, utils_1.forEach)(config, (value, key) => {
            let keys = key.split(".");
            _deepResetValue(source, keys, value, false);
          });
        } else {
          if (!deep) {
            start = 0;
            length = 1;
          }
          (0, utils_1.forEach)(source, (value, key) => {
            if (deep && (0, utils_1.isObject)(value)) {
              if (start === 0 && length === 0) {
                resetValue(source[key], arg, ...args);
              } else {
                _deepResetValueRange(source[key], 1, start, length);
              }
            } else if (key.toString().substring(0, 1) != "_" && start <= 0) {
              _autoRestValue(source, key, value);
            }
          });
        }
        return true;
      }
      exports.resetValue = resetValue;
      function _deepResetValueRange(source, level, start, length) {
        level = level || 1;
        if ((0, utils_1.isEmpty)(source) || !(0, utils_1.isObject)(source))
          return false;
        if (start < 0 || length <= 0) {
          return false;
        }
        if (level >= start + length) {
          return false;
        }
        (0, utils_1.forEach)(source, (value, key) => {
          if ((0, utils_1.isObject)(value)) {
            _deepResetValueRange(source[key], ++level, start, length);
          } else if (key.toString().substring(0, 1) != "_" && level >= start && level < start + length) {
            _autoRestValue(source, key, value);
          }
        });
      }
    }
  });

  // lib/src/index.js
  var require_src = __commonJS({
    "lib/src/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_get_value(), exports);
      __exportStar(require_filter_value(), exports);
      __exportStar(require_reset_value(), exports);
      __exportStar(require_utils(), exports);
    }
  });

  // lib/index.js
  var require_lib = __commonJS({
    "lib/index.js"(exports) {
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_src(), exports);
      var ofilter = __importStar(require_src());
      exports.default = ofilter;
    }
  });
  return require_lib();
})();
//# sourceMappingURL=ofilterjs.global.js.map
