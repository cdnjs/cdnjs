this.primereact = this.primereact || {};
this.primereact.icons = this.primereact.icons || {};
this.primereact.icons.trash = (function (exports, React, iconbase) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  var ObjectUtils = /*#__PURE__*/function () {
    function ObjectUtils() {
      _classCallCheck(this, ObjectUtils);
    }
    _createClass(ObjectUtils, null, [{
      key: "equals",
      value: function equals(obj1, obj2, field) {
        if (field && obj1 && _typeof(obj1) === 'object' && obj2 && _typeof(obj2) === 'object') return this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field);else return this.deepEquals(obj1, obj2);
      }
    }, {
      key: "deepEquals",
      value: function deepEquals(a, b) {
        if (a === b) return true;
        if (a && b && _typeof(a) == 'object' && _typeof(b) == 'object') {
          var arrA = Array.isArray(a),
            arrB = Array.isArray(b),
            i,
            length,
            key;
          if (arrA && arrB) {
            length = a.length;
            if (length !== b.length) return false;
            for (i = length; i-- !== 0;) if (!this.deepEquals(a[i], b[i])) return false;
            return true;
          }
          if (arrA !== arrB) return false;
          var dateA = a instanceof Date,
            dateB = b instanceof Date;
          if (dateA !== dateB) return false;
          if (dateA && dateB) return a.getTime() === b.getTime();
          var regexpA = a instanceof RegExp,
            regexpB = b instanceof RegExp;
          if (regexpA !== regexpB) return false;
          if (regexpA && regexpB) return a.toString() === b.toString();
          var keys = Object.keys(a);
          length = keys.length;
          if (length !== Object.keys(b).length) return false;
          for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
          for (i = length; i-- !== 0;) {
            key = keys[i];
            if (!this.deepEquals(a[key], b[key])) return false;
          }
          return true;
        }

        /*eslint no-self-compare: "off"*/
        return a !== a && b !== b;
      }
    }, {
      key: "resolveFieldData",
      value: function resolveFieldData(data, field) {
        if (data && Object.keys(data).length && field) {
          if (this.isFunction(field)) {
            return field(data);
          } else if (ObjectUtils.isNotEmpty(data[field])) {
            return data[field];
          } else if (field.indexOf('.') === -1) {
            return data[field];
          } else {
            var fields = field.split('.');
            var value = data;
            for (var i = 0, len = fields.length; i < len; ++i) {
              if (value == null) {
                return null;
              }
              value = value[fields[i]];
            }
            return value;
          }
        } else {
          return null;
        }
      }
    }, {
      key: "isFunction",
      value: function isFunction(obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
      }
    }, {
      key: "isObject",
      value: function isObject(obj) {
        return obj !== null && obj instanceof Object && obj.constructor === Object;
      }
    }, {
      key: "isLetter",
      value: function isLetter(_char) {
        return _char && (_char.toUpperCase() != _char.toLowerCase() || _char.codePointAt(0) > 127);
      }
    }, {
      key: "findDiffKeys",
      value: function findDiffKeys(obj1, obj2) {
        if (!obj1 || !obj2) {
          return {};
        }
        return Object.keys(obj1).filter(function (key) {
          return !obj2.hasOwnProperty(key);
        }).reduce(function (result, current) {
          result[current] = obj1[current];
          return result;
        }, {});
      }

      /**
       * Removes keys from a JSON object that start with a string such as "data" to get all "data-id" type properties.
       *
       * @param {any} obj the JSON object to reduce
       * @param {string[]} startsWiths the string(s) to check if the property starts with this key
       * @returns the JSON object containing only the key/values that match the startsWith string
       */
    }, {
      key: "reduceKeys",
      value: function reduceKeys(obj, startsWiths) {
        var result = {};
        if (!obj || !startsWiths || startsWiths.length === 0) {
          return result;
        }
        Object.keys(obj).filter(function (key) {
          return startsWiths.some(function (value) {
            return key.startsWith(value);
          });
        }).forEach(function (key) {
          result[key] = obj[key];
          delete obj[key];
        });
        return result;
      }
    }, {
      key: "reorderArray",
      value: function reorderArray(value, from, to) {
        if (value && from !== to) {
          if (to >= value.length) {
            to %= value.length;
            from %= value.length;
          }
          value.splice(to, 0, value.splice(from, 1)[0]);
        }
      }
    }, {
      key: "findIndexInList",
      value: function findIndexInList(value, list, dataKey) {
        var _this = this;
        if (list) {
          return dataKey ? list.findIndex(function (item) {
            return _this.equals(item, value, dataKey);
          }) : list.findIndex(function (item) {
            return item === value;
          });
        }
        return -1;
      }
    }, {
      key: "getJSXElement",
      value: function getJSXElement(obj) {
        for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          params[_key - 1] = arguments[_key];
        }
        return this.isFunction(obj) ? obj.apply(void 0, params) : obj;
      }
    }, {
      key: "getProp",
      value: function getProp(props) {
        var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var defaultProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var value = props ? props[prop] : undefined;
        return value === undefined ? defaultProps[prop] : value;
      }
    }, {
      key: "getMergedProps",
      value: function getMergedProps(props, defaultProps) {
        return Object.assign({}, defaultProps, props);
      }
    }, {
      key: "getDiffProps",
      value: function getDiffProps(props, defaultProps) {
        return this.findDiffKeys(props, defaultProps);
      }
    }, {
      key: "getPropValue",
      value: function getPropValue(obj) {
        for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          params[_key2 - 1] = arguments[_key2];
        }
        return this.isFunction(obj) ? obj.apply(void 0, params) : obj;
      }
    }, {
      key: "getComponentProp",
      value: function getComponentProp(component) {
        var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var defaultProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return this.isNotEmpty(component) ? this.getProp(component.props, prop, defaultProps) : undefined;
      }
    }, {
      key: "getComponentProps",
      value: function getComponentProps(component, defaultProps) {
        return this.isNotEmpty(component) ? this.getMergedProps(component.props, defaultProps) : undefined;
      }
    }, {
      key: "getComponentDiffProps",
      value: function getComponentDiffProps(component, defaultProps) {
        return this.isNotEmpty(component) ? this.getDiffProps(component.props, defaultProps) : undefined;
      }
    }, {
      key: "isValidChild",
      value: function isValidChild(child, type, validTypes) {
        /* eslint-disable */
        if (child) {
          var childType = this.getComponentProp(child, '__TYPE') || (child.type ? child.type.displayName : undefined);
          var isValid = childType === type;
          try {
            var messageTypes; if ("production" !== 'production' && !isValid) ;
          } catch (error) {
            // NOOP
          }
          return isValid;
        }
        return false;
        /* eslint-enable */
      }
    }, {
      key: "getRefElement",
      value: function getRefElement(ref) {
        if (ref) {
          return _typeof(ref) === 'object' && ref.hasOwnProperty('current') ? ref.current : ref;
        }
        return null;
      }
    }, {
      key: "combinedRefs",
      value: function combinedRefs(innerRef, forwardRef) {
        if (innerRef && forwardRef) {
          if (typeof forwardRef === 'function') {
            forwardRef(innerRef.current);
          } else {
            forwardRef.current = innerRef.current;
          }
        }
      }
    }, {
      key: "removeAccents",
      value: function removeAccents(str) {
        if (str && str.search(/[\xC0-\xFF]/g) > -1) {
          str = str.replace(/[\xC0-\xC5]/g, 'A').replace(/[\xC6]/g, 'AE').replace(/[\xC7]/g, 'C').replace(/[\xC8-\xCB]/g, 'E').replace(/[\xCC-\xCF]/g, 'I').replace(/[\xD0]/g, 'D').replace(/[\xD1]/g, 'N').replace(/[\xD2-\xD6\xD8]/g, 'O').replace(/[\xD9-\xDC]/g, 'U').replace(/[\xDD]/g, 'Y').replace(/[\xDE]/g, 'P').replace(/[\xE0-\xE5]/g, 'a').replace(/[\xE6]/g, 'ae').replace(/[\xE7]/g, 'c').replace(/[\xE8-\xEB]/g, 'e').replace(/[\xEC-\xEF]/g, 'i').replace(/[\xF1]/g, 'n').replace(/[\xF2-\xF6\xF8]/g, 'o').replace(/[\xF9-\xFC]/g, 'u').replace(/[\xFE]/g, 'p').replace(/[\xFD\xFF]/g, 'y');
        }
        return str;
      }
    }, {
      key: "convertToFlatCase",
      value: function convertToFlatCase(str) {
        // convert snake, kebab, camel and pascal cases to flat case
        return this.isNotEmpty(str) && typeof str === 'string' ? str.replace(/(-|_)/g, '').toLowerCase() : str;
      }
    }, {
      key: "isEmpty",
      value: function isEmpty(value) {
        return value === null || value === undefined || value === '' || Array.isArray(value) && value.length === 0 || !(value instanceof Date) && _typeof(value) === 'object' && Object.keys(value).length === 0;
      }
    }, {
      key: "isNotEmpty",
      value: function isNotEmpty(value) {
        return !this.isEmpty(value);
      }
    }, {
      key: "sort",
      value: function sort(value1, value2) {
        var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var locale = arguments.length > 3 ? arguments[3] : undefined;
        var nullSortOrder = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
        var result = ObjectUtils.compare(value1, value2, locale, order);
        var finalSortOrder = order;

        // nullSortOrder == 1 means Excel like sort nulls at bottom
        if (ObjectUtils.isEmpty(value1) || ObjectUtils.isEmpty(value2)) {
          finalSortOrder = nullSortOrder === 1 ? order : nullSortOrder;
        }
        return finalSortOrder * result;
      }
    }, {
      key: "compare",
      value: function compare(value1, value2, locale) {
        var order = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        var result = -1;
        var emptyValue1 = ObjectUtils.isEmpty(value1);
        var emptyValue2 = ObjectUtils.isEmpty(value2);
        if (emptyValue1 && emptyValue2) result = 0;else if (emptyValue1) result = order;else if (emptyValue2) result = -order;else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, locale, {
          numeric: true
        });else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        return result;
      }
    }]);
    return ObjectUtils;
  }();

  var lastId = 0;
  function UniqueComponentId() {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'pr_id_';
    lastId++;
    return "".concat(prefix).concat(lastId);
  }

  var TrashIcon = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var pti = iconbase.IconBase.getPTI(inProps);
    var _React$useState = React__namespace.useState(inProps.id),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      pathId = _React$useState2[0],
      setPathId = _React$useState2[1];
    React__namespace.useEffect(function () {
      if (ObjectUtils.isEmpty(pathId)) {
        setPathId(UniqueComponentId('pr_icon_clip_'));
      }
    }, [pathId]);
    return /*#__PURE__*/React__namespace.createElement("svg", _extends({
      ref: ref,
      width: "14",
      height: "14",
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, pti), /*#__PURE__*/React__namespace.createElement("g", {
      clipPath: "url(#".concat(pathId, ")")
    }, /*#__PURE__*/React__namespace.createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M3.44802 13.9955H10.552C10.8056 14.0129 11.06 13.9797 11.3006 13.898C11.5412 13.8163 11.7632 13.6877 11.9537 13.5196C12.1442 13.3515 12.2995 13.1473 12.4104 12.9188C12.5213 12.6903 12.5858 12.442 12.6 12.1884V4.36041H13.4C13.5591 4.36041 13.7117 4.29722 13.8243 4.18476C13.9368 4.07229 14 3.91976 14 3.76071C14 3.60166 13.9368 3.44912 13.8243 3.33666C13.7117 3.22419 13.5591 3.16101 13.4 3.16101H12.0537C12.0203 3.1557 11.9863 3.15299 11.952 3.15299C11.9178 3.15299 11.8838 3.1557 11.8503 3.16101H11.2285C11.2421 3.10893 11.2487 3.05513 11.248 3.00106V1.80966C11.2171 1.30262 10.9871 0.828306 10.608 0.48989C10.229 0.151475 9.73159 -0.0236625 9.22402 0.00257442H4.77602C4.27251 -0.0171866 3.78126 0.160868 3.40746 0.498617C3.03365 0.836366 2.807 1.30697 2.77602 1.80966V3.00106C2.77602 3.0556 2.78346 3.10936 2.79776 3.16101H0.6C0.521207 3.16101 0.443185 3.17652 0.37039 3.20666C0.297595 3.2368 0.231451 3.28097 0.175736 3.33666C0.120021 3.39235 0.0758251 3.45846 0.0456722 3.53121C0.0155194 3.60397 0 3.68196 0 3.76071C0 3.83946 0.0155194 3.91744 0.0456722 3.9902C0.0758251 4.06296 0.120021 4.12907 0.175736 4.18476C0.231451 4.24045 0.297595 4.28462 0.37039 4.31476C0.443185 4.3449 0.521207 4.36041 0.6 4.36041H1.40002V12.1884C1.41426 12.442 1.47871 12.6903 1.58965 12.9188C1.7006 13.1473 1.85582 13.3515 2.04633 13.5196C2.23683 13.6877 2.45882 13.8163 2.69944 13.898C2.94005 13.9797 3.1945 14.0129 3.44802 13.9955ZM2.60002 4.36041H11.304V12.1884C11.304 12.5163 10.952 12.7961 10.504 12.7961H3.40002C2.97602 12.7961 2.60002 12.5163 2.60002 12.1884V4.36041ZM3.95429 3.16101C3.96859 3.10936 3.97602 3.0556 3.97602 3.00106V1.80966C3.97602 1.48183 4.33602 1.20197 4.77602 1.20197H9.24802C9.66403 1.20197 10.048 1.48183 10.048 1.80966V3.00106C10.0473 3.05515 10.054 3.10896 10.0678 3.16101H3.95429ZM5.57571 10.997C5.41731 10.995 5.26597 10.9311 5.15395 10.8191C5.04193 10.7071 4.97808 10.5558 4.97601 10.3973V6.77517C4.97601 6.61612 5.0392 6.46359 5.15166 6.35112C5.26413 6.23866 5.41666 6.17548 5.57571 6.17548C5.73476 6.17548 5.8873 6.23866 5.99976 6.35112C6.11223 6.46359 6.17541 6.61612 6.17541 6.77517V10.3894C6.17647 10.4688 6.16174 10.5476 6.13208 10.6213C6.10241 10.695 6.05841 10.762 6.00261 10.8186C5.94682 10.8751 5.88035 10.92 5.80707 10.9506C5.73378 10.9813 5.65514 10.9971 5.57571 10.997ZM7.99968 10.8214C8.11215 10.9339 8.26468 10.997 8.42373 10.997C8.58351 10.9949 8.73604 10.93 8.84828 10.8163C8.96052 10.7025 9.02345 10.5491 9.02343 10.3894V6.77517C9.02343 6.61612 8.96025 6.46359 8.84778 6.35112C8.73532 6.23866 8.58278 6.17548 8.42373 6.17548C8.26468 6.17548 8.11215 6.23866 7.99968 6.35112C7.88722 6.46359 7.82404 6.61612 7.82404 6.77517V10.3973C7.82404 10.5564 7.88722 10.7089 7.99968 10.8214Z",
      fill: "currentColor"
    })), /*#__PURE__*/React__namespace.createElement("defs", null, /*#__PURE__*/React__namespace.createElement("clipPath", {
      id: pathId
    }, /*#__PURE__*/React__namespace.createElement("rect", {
      width: "14",
      height: "14",
      fill: "white"
    }))));
  }));
  TrashIcon.displayName = 'TrashIcon';

  exports.TrashIcon = TrashIcon;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.iconbase);
