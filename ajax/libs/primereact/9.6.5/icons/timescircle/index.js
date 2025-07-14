this.primereact = this.primereact || {};
this.primereact.icons = this.primereact.icons || {};
this.primereact.icons.timescircle = (function (exports, React, iconbase) {
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

  var TimesCircleIcon = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
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
      d: "M7 14C5.61553 14 4.26215 13.5895 3.11101 12.8203C1.95987 12.0511 1.06266 10.9579 0.532846 9.67879C0.00303296 8.3997 -0.13559 6.99224 0.134506 5.63437C0.404603 4.2765 1.07129 3.02922 2.05026 2.05026C3.02922 1.07129 4.2765 0.404603 5.63437 0.134506C6.99224 -0.13559 8.3997 0.00303296 9.67879 0.532846C10.9579 1.06266 12.0511 1.95987 12.8203 3.11101C13.5895 4.26215 14 5.61553 14 7C14 8.85652 13.2625 10.637 11.9497 11.9497C10.637 13.2625 8.85652 14 7 14ZM7 1.16667C5.84628 1.16667 4.71846 1.50879 3.75918 2.14976C2.79989 2.79074 2.05222 3.70178 1.61071 4.76768C1.16919 5.83358 1.05367 7.00647 1.27876 8.13803C1.50384 9.26958 2.05941 10.309 2.87521 11.1248C3.69102 11.9406 4.73042 12.4962 5.86198 12.7212C6.99353 12.9463 8.16642 12.8308 9.23232 12.3893C10.2982 11.9478 11.2093 11.2001 11.8502 10.2408C12.4912 9.28154 12.8333 8.15373 12.8333 7C12.8333 5.45291 12.2188 3.96918 11.1248 2.87521C10.0308 1.78125 8.5471 1.16667 7 1.16667ZM4.66662 9.91668C4.58998 9.91704 4.51404 9.90209 4.44325 9.87271C4.37246 9.84333 4.30826 9.8001 4.2544 9.74557C4.14516 9.6362 4.0838 9.48793 4.0838 9.33335C4.0838 9.17876 4.14516 9.0305 4.2544 8.92113L6.17553 7L4.25443 5.07891C4.15139 4.96832 4.09529 4.82207 4.09796 4.67094C4.10063 4.51982 4.16185 4.37563 4.26872 4.26876C4.3756 4.16188 4.51979 4.10066 4.67091 4.09799C4.82204 4.09532 4.96829 4.15142 5.07887 4.25446L6.99997 6.17556L8.92106 4.25446C9.03164 4.15142 9.1779 4.09532 9.32903 4.09799C9.48015 4.10066 9.62434 4.16188 9.73121 4.26876C9.83809 4.37563 9.89931 4.51982 9.90198 4.67094C9.90464 4.82207 9.84855 4.96832 9.74551 5.07891L7.82441 7L9.74554 8.92113C9.85478 9.0305 9.91614 9.17876 9.91614 9.33335C9.91614 9.48793 9.85478 9.6362 9.74554 9.74557C9.69168 9.8001 9.62748 9.84333 9.55669 9.87271C9.4859 9.90209 9.40996 9.91704 9.33332 9.91668C9.25668 9.91704 9.18073 9.90209 9.10995 9.87271C9.03916 9.84333 8.97495 9.8001 8.9211 9.74557L6.99997 7.82444L5.07884 9.74557C5.02499 9.8001 4.96078 9.84333 4.88999 9.87271C4.81921 9.90209 4.74326 9.91704 4.66662 9.91668Z",
      fill: "currentColor"
    })), /*#__PURE__*/React__namespace.createElement("defs", null, /*#__PURE__*/React__namespace.createElement("clipPath", {
      id: pathId
    }, /*#__PURE__*/React__namespace.createElement("rect", {
      width: "14",
      height: "14",
      fill: "white"
    }))));
  }));
  TimesCircleIcon.displayName = 'TimesCircleIcon';

  exports.TimesCircleIcon = TimesCircleIcon;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.iconbase);
