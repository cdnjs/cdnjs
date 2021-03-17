"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiSelectHeader = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _InputText = require("../inputtext/InputText");

var _Checkbox = require("../checkbox/Checkbox");

var _Ripple = require("../ripple/Ripple");

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MultiSelectHeader = /*#__PURE__*/function (_Component) {
  _inherits(MultiSelectHeader, _Component);

  var _super = _createSuper(MultiSelectHeader);

  function MultiSelectHeader(props) {
    var _this;

    _classCallCheck(this, MultiSelectHeader);

    _this = _super.call(this, props);
    _this.onFilter = _this.onFilter.bind(_assertThisInitialized(_this));
    _this.onToggleAll = _this.onToggleAll.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MultiSelectHeader, [{
    key: "onFilter",
    value: function onFilter(event) {
      if (this.props.onFilter) {
        this.props.onFilter({
          originalEvent: event,
          query: event.target.value
        });
      }
    }
  }, {
    key: "onToggleAll",
    value: function onToggleAll(event) {
      if (this.props.onToggleAll) {
        this.props.onToggleAll({
          originalEvent: event,
          checked: this.props.allSelected
        });
      }
    }
  }, {
    key: "renderFilterElement",
    value: function renderFilterElement() {
      if (this.props.filter) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "p-multiselect-filter-container"
        }, /*#__PURE__*/_react.default.createElement(_InputText.InputText, {
          type: "text",
          role: "textbox",
          value: this.props.filterValue,
          onChange: this.onFilter,
          className: "p-multiselect-filter",
          placeholder: this.props.filterPlaceholder
        }), /*#__PURE__*/_react.default.createElement("span", {
          className: "p-multiselect-filter-icon pi pi-search"
        }));
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var filterElement = this.renderFilterElement();

      var checkboxElement = /*#__PURE__*/_react.default.createElement(_Checkbox.Checkbox, {
        checked: this.props.allSelected,
        onChange: this.onToggleAll,
        role: "checkbox",
        "aria-checked": this.props.allSelected
      });

      var closeElement = /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: "p-multiselect-close p-link",
        onClick: this.props.onClose
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "p-multiselect-close-icon pi pi-times"
      }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));

      var element = /*#__PURE__*/_react.default.createElement("div", {
        className: "p-multiselect-header"
      }, checkboxElement, filterElement, closeElement);

      if (this.props.template) {
        var defaultOptions = {
          className: 'p-multiselect-header',
          checkboxElement: checkboxElement,
          checked: this.props.allSelected,
          onChange: this.onToggleAll,
          filterElement: filterElement,
          closeElement: closeElement,
          closeElementClassName: 'p-multiselect-close p-link',
          closeIconClassName: 'p-multiselect-close-icon pi pi-times',
          onCloseClick: this.props.onClose,
          element: element,
          props: this.props
        };
        return _ObjectUtils.default.getJSXElement(this.props.template, defaultOptions);
      }

      return element;
    }
  }]);

  return MultiSelectHeader;
}(_react.Component);

exports.MultiSelectHeader = MultiSelectHeader;

_defineProperty(MultiSelectHeader, "defaultProps", {
  filter: false,
  filterValue: null,
  filterPlaceholder: null,
  onFilter: null,
  onClose: null,
  onToggleAll: null,
  allSelected: false,
  template: null
});

_defineProperty(MultiSelectHeader, "propTypes", {
  filter: _propTypes.default.bool,
  filterValue: _propTypes.default.string,
  filterPlaceholder: _propTypes.default.string,
  allSelected: _propTypes.default.bool,
  onFilter: _propTypes.default.func,
  onClose: _propTypes.default.func,
  onToggleAll: _propTypes.default.func,
  template: _propTypes.default.any
});