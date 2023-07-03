import * as React from 'react';
import { IconBase } from 'primereact/iconbase';

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

var PlusIcon = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var pti = IconBase.getPTI(inProps);
  var _React$useState = React.useState(inProps.id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    pathId = _React$useState2[0],
    setPathId = _React$useState2[1];
  React.useEffect(function () {
    if (ObjectUtils.isEmpty(pathId)) {
      setPathId(UniqueComponentId('pr_icon_clip_'));
    }
  }, [pathId]);
  return /*#__PURE__*/React.createElement("svg", _extends({
    ref: ref,
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, pti), /*#__PURE__*/React.createElement("g", {
    clipPath: "url(#".concat(pathId, ")")
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7.67742 6.32258V0.677419C7.67742 0.497757 7.60605 0.325452 7.47901 0.198411C7.35197 0.0713707 7.17966 0 7 0C6.82034 0 6.64803 0.0713707 6.52099 0.198411C6.39395 0.325452 6.32258 0.497757 6.32258 0.677419V6.32258H0.677419C0.497757 6.32258 0.325452 6.39395 0.198411 6.52099C0.0713707 6.64803 0 6.82034 0 7C0 7.17966 0.0713707 7.35197 0.198411 7.47901C0.325452 7.60605 0.497757 7.67742 0.677419 7.67742H6.32258V13.3226C6.32492 13.5015 6.39704 13.6725 6.52358 13.799C6.65012 13.9255 6.82106 13.9977 7 14C7.17966 14 7.35197 13.9286 7.47901 13.8016C7.60605 13.6745 7.67742 13.5022 7.67742 13.3226V7.67742H13.3226C13.5022 7.67742 13.6745 7.60605 13.8016 7.47901C13.9286 7.35197 14 7.17966 14 7C13.9977 6.82106 13.9255 6.65012 13.799 6.52358C13.6725 6.39704 13.5015 6.32492 13.3226 6.32258H7.67742Z",
    fill: "currentColor"
  })), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: pathId
  }, /*#__PURE__*/React.createElement("rect", {
    width: "14",
    height: "14",
    fill: "white"
  }))));
}));
PlusIcon.displayName = 'PlusIcon';

export { PlusIcon };
