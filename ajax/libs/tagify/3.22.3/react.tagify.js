;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.React.tagify = factory();
  }
}(this, function() {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MixedTags = void 0;

var _react = _interopRequireWildcard(require("react"));

var _server = require("react-dom/server");

var _propTypes = require("prop-types");

var _tagifyMin = _interopRequireDefault(require("./tagify.min.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var noop = function noop(_) {
  return _;
}; // if a template is a React component, it should be outputed as a String (and not as a React component)


function templatesToString(templates) {
  if (templates) {
    for (var templateName in templates) {
      var isReactComp = String(templates[templateName]).includes(".createElement");

      if (isReactComp) {
        (function () {
          var Template = templates[templateName];

          templates[templateName] = function (data) {
            return (0, _server.renderToStaticMarkup)(
            /*#__PURE__*/
            _react.default.createElement(Template, data));
          };
        })();
      }
    }
  }
}

var TagifyWrapper = function TagifyWrapper(_ref) {
  var name = _ref.name,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? "" : _ref$value,
      _ref$loading = _ref.loading,
      loading = _ref$loading === void 0 ? false : _ref$loading,
      _ref$onInput = _ref.onInput,
      onInput = _ref$onInput === void 0 ? noop : _ref$onInput,
      _ref$onAdd = _ref.onAdd,
      onAdd = _ref$onAdd === void 0 ? noop : _ref$onAdd,
      _ref$onRemove = _ref.onRemove,
      onRemove = _ref$onRemove === void 0 ? noop : _ref$onRemove,
      _ref$onEdit = _ref.onEdit,
      onEdit = _ref$onEdit === void 0 ? noop : _ref$onEdit,
      _ref$onInvalid = _ref.onInvalid,
      onInvalid = _ref$onInvalid === void 0 ? noop : _ref$onInvalid,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === void 0 ? noop : _ref$onClick,
      _ref$onKeydown = _ref.onKeydown,
      onKeydown = _ref$onKeydown === void 0 ? noop : _ref$onKeydown,
      _ref$onFocus = _ref.onFocus,
      onFocus = _ref$onFocus === void 0 ? noop : _ref$onFocus,
      _ref$onBlur = _ref.onBlur,
      onBlur = _ref$onBlur === void 0 ? noop : _ref$onBlur,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? noop : _ref$onChange,
      readOnly = _ref.readOnly,
      children = _ref.children,
      _ref$settings = _ref.settings,
      settings = _ref$settings === void 0 ? {} : _ref$settings,
      _ref$InputMode = _ref.InputMode,
      InputMode = _ref$InputMode === void 0 ? "input" : _ref$InputMode,
      autoFocus = _ref.autoFocus,
      className = _ref.className,
      whitelist = _ref.whitelist,
      tagifyRef = _ref.tagifyRef,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? "" : _ref$placeholder,
      defaultValue = _ref.defaultValue,
      showDropdown = _ref.showDropdown;
  var mountedRef = (0, _react.useRef)();
  var inputElmRef = (0, _react.useRef)();
  var tagify = (0, _react.useRef)();

  var handleRef = function handleRef(elm) {
    inputElmRef.current = elm;
  };

  var inputAttrs = (0, _react.useMemo)(function () {
    return {
      ref: handleRef,
      name: name,
      value: children ? children : typeof value === "string" ? value : JSON.stringify(value),
      className: className,
      readOnly: readOnly,
      onChange: onChange,
      autoFocus: autoFocus,
      placeholder: placeholder,
      defaultValue: defaultValue
    };
  }, []);
  var setFocus = (0, _react.useCallback)(function () {
    autoFocus && tagify.current && tagify.current.DOM.input.focus();
  }, [tagify]);
  (0, _react.useEffect)(function () {
    templatesToString(settings.templates);
    if (InputMode == "textarea") settings.mode = "mix"; // "whitelist" prop takes precedence

    if (whitelist && whitelist.length) settings.whitelist = whitelist;
    var t = new _tagifyMin.default(inputElmRef.current, settings);
    onInput && t.on("input", onInput);
    onAdd && t.on("add", onAdd);
    onRemove && t.on("remove", onRemove);
    onEdit && t.on("edit", onEdit);
    onInvalid && t.on("invalid", onInvalid);
    onKeydown && t.on("keydown", onKeydown);
    onFocus && t.on("focus", onFocus);
    onBlur && t.on("blur", onBlur);
    onClick && t.on("click", onClick); // Bridge Tagify instance with parent component

    if (tagifyRef) {
      tagifyRef.current = t;
    }

    tagify.current = t;
    setFocus(); // cleanup

    return function () {
      t.destroy();
    };
  }, []);
  (0, _react.useEffect)(function () {
    setFocus();
  }, [autoFocus]);
  (0, _react.useEffect)(function () {
    if (mountedRef.current) {
      var _tagify$current$setti;

      tagify.current.settings.whitelist.length = 0; // replace whitelist array items

      whitelist && whitelist.length && (_tagify$current$setti = tagify.current.settings.whitelist).push.apply(_tagify$current$setti, _toConsumableArray(whitelist));
    }
  }, [whitelist]);
  (0, _react.useEffect)(function () {
    if (mountedRef.current) {
      tagify.current.loadOriginalValues(value);
    }
  }, [value]);
  (0, _react.useEffect)(function () {
    if (mountedRef.current) {
      tagify.current.toggleClass(className);
    }
  }, [className]);
  (0, _react.useEffect)(function () {
    if (mountedRef.current) {
      tagify.current.loading(loading);
    }
  }, [loading]);
  (0, _react.useEffect)(function () {
    if (mountedRef.current) {
      tagify.current.setReadonly(readOnly);
    }
  }, [readOnly]);
  (0, _react.useEffect)(function () {
    var t = tagify.current;

    if (mountedRef.current) {
      if (showDropdown) {
        t.dropdown.show.call(t, showDropdown);
        t.toggleFocusClass(true);
      } else {
        t.dropdown.hide.call(t);
      }
    }
  }, [showDropdown]);
  (0, _react.useEffect)(function () {
    mountedRef.current = true;
  }, []);
  return (
    /*#__PURE__*/
    // a wrapper must be used because Tagify will appened inside it it's component,
    // keeping the virtual-DOM out of the way
    _react.default.createElement("div", {
      className: "tags-input"
    },
    /*#__PURE__*/
    _react.default.createElement(InputMode, inputAttrs))
  );
};

TagifyWrapper.propTypes = {
  name: _propTypes.string,
  value: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.array]),
  loading: _propTypes.bool,
  children: _propTypes.element,
  onChange: _propTypes.func,
  readOnly: _propTypes.bool,
  settings: _propTypes.object,
  InputMode: _propTypes.string,
  autoFocus: _propTypes.bool,
  className: _propTypes.string,
  tagifyRef: _propTypes.object,
  whitelist: _propTypes.array,
  placeholder: _propTypes.string,
  defaultValue: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.array]),
  showDropdown: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.bool])
};

var Tags = _react.default.memo(TagifyWrapper);

Tags.displayName = "Tags";

var MixedTags = function MixedTags(_ref2) {
  var children = _ref2.children,
      rest = _objectWithoutProperties(_ref2, ["children"]);

  return (
    /*#__PURE__*/
    _react.default.createElement(Tags, _extends({
      InputMode: "textarea"
    }, rest), children)
  );
};

exports.MixedTags = MixedTags;
var _default = Tags;
exports.default = _default;
return Tags;
}));
