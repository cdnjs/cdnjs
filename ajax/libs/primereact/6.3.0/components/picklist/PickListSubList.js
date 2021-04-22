"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickListSubList = void 0;

var _ClassNames = require("../utils/ClassNames");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _PickListItem = require("./PickListItem");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var PickListSubListComponent = /*#__PURE__*/function (_Component) {
  _inherits(PickListSubListComponent, _Component);

  var _super = _createSuper(PickListSubListComponent);

  function PickListSubListComponent(props) {
    var _this;

    _classCallCheck(this, PickListSubListComponent);

    _this = _super.call(this, props);
    _this.onItemClick = _this.onItemClick.bind(_assertThisInitialized(_this));
    _this.onItemKeyDown = _this.onItemKeyDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(PickListSubListComponent, [{
    key: "onItemClick",
    value: function onItemClick(event) {
      var originalEvent = event.originalEvent;
      var item = event.value;

      var selection = _toConsumableArray(this.props.selection);

      var index = _ObjectUtils.default.findIndexInList(item, selection);

      var selected = index !== -1;
      var metaSelection = this.props.metaKeySelection;

      if (metaSelection) {
        var metaKey = originalEvent.metaKey || originalEvent.ctrlKey;

        if (selected && metaKey) {
          selection.splice(index, 1);
        } else {
          if (!metaKey) {
            selection.length = 0;
          }

          selection.push(item);
        }
      } else {
        if (selected) selection.splice(index, 1);else selection.push(item);
      }

      if (this.props.onSelectionChange) {
        this.props.onSelectionChange({
          event: originalEvent,
          value: selection
        });
      }
    }
  }, {
    key: "onItemKeyDown",
    value: function onItemKeyDown(event) {
      var listItem = event.originalEvent.currentTarget;

      switch (event.originalEvent.which) {
        //down
        case 40:
          var nextItem = this.findNextItem(listItem);

          if (nextItem) {
            nextItem.focus();
          }

          event.originalEvent.preventDefault();
          break;
        //up

        case 38:
          var prevItem = this.findPrevItem(listItem);

          if (prevItem) {
            prevItem.focus();
          }

          event.originalEvent.preventDefault();
          break;
        //enter

        case 13:
          this.onItemClick(event);
          event.originalEvent.preventDefault();
          break;

        default:
          break;
      }
    }
  }, {
    key: "findNextItem",
    value: function findNextItem(item) {
      var nextItem = item.nextElementSibling;
      if (nextItem) return !_DomHandler.default.hasClass(nextItem, 'p-picklist-item') ? this.findNextItem(nextItem) : nextItem;else return null;
    }
  }, {
    key: "findPrevItem",
    value: function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      if (prevItem) return !_DomHandler.default.hasClass(prevItem, 'p-picklist-item') ? this.findPrevItem(prevItem) : prevItem;else return null;
    }
  }, {
    key: "isSelected",
    value: function isSelected(item) {
      return _ObjectUtils.default.findIndexInList(item, this.props.selection) !== -1;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var header = null;
      var items = null;
      var wrapperClassName = (0, _ClassNames.classNames)('p-picklist-list-wrapper', this.props.className);
      var listClassName = (0, _ClassNames.classNames)('p-picklist-list', this.props.listClassName);

      if (this.props.header) {
        header = /*#__PURE__*/_react.default.createElement("div", {
          className: "p-picklist-header"
        }, this.props.header);
      }

      if (this.props.list) {
        items = this.props.list.map(function (item, i) {
          return /*#__PURE__*/_react.default.createElement(_PickListItem.PickListItem, {
            key: JSON.stringify(item),
            value: item,
            template: _this2.props.itemTemplate,
            selected: _this2.isSelected(item),
            onClick: _this2.onItemClick,
            onKeyDown: _this2.onItemKeyDown,
            tabIndex: _this2.props.tabIndex
          });
        });
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        ref: this.props.forwardRef,
        className: wrapperClassName
      }, header, /*#__PURE__*/_react.default.createElement("ul", {
        className: listClassName,
        style: this.props.style,
        role: "listbox",
        "aria-multiselectable": true
      }, items));
    }
  }]);

  return PickListSubListComponent;
}(_react.Component);

_defineProperty(PickListSubListComponent, "defaultProps", {
  forwardRef: null,
  list: null,
  selection: null,
  header: null,
  className: null,
  listClassName: null,
  style: null,
  showControls: true,
  metaKeySelection: true,
  tabIndex: null,
  itemTemplate: null,
  onItemClick: null,
  onSelectionChange: null
});

_defineProperty(PickListSubListComponent, "propTypes", {
  forwardRef: _propTypes.default.any,
  list: _propTypes.default.array,
  selection: _propTypes.default.array,
  header: _propTypes.default.string,
  className: _propTypes.default.string,
  listClassName: _propTypes.default.string,
  style: _propTypes.default.object,
  showControls: _propTypes.default.bool,
  metaKeySelection: _propTypes.default.bool,
  tabIndex: _propTypes.default.number,
  itemTemplate: _propTypes.default.func,
  onItemClick: _propTypes.default.func,
  onSelectionChange: _propTypes.default.func
});

var PickListSubList = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(PickListSubListComponent, _extends({
    forwardRef: ref
  }, props));
});

exports.PickListSubList = PickListSubList;