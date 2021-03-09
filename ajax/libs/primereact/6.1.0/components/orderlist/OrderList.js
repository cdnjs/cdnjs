"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _OrderListControls = require("./OrderListControls");

var _OrderListSubList = require("./OrderListSubList");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var OrderList = /*#__PURE__*/function (_Component) {
  _inherits(OrderList, _Component);

  var _super = _createSuper(OrderList);

  function OrderList(props) {
    var _this;

    _classCallCheck(this, OrderList);

    _this = _super.call(this, props);
    _this.state = {
      selection: []
    };
    _this.onItemClick = _this.onItemClick.bind(_assertThisInitialized(_this));
    _this.onItemKeyDown = _this.onItemKeyDown.bind(_assertThisInitialized(_this));
    _this.onReorder = _this.onReorder.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(OrderList, [{
    key: "onItemClick",
    value: function onItemClick(event) {
      var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;

      var index = _ObjectUtils.default.findIndexInList(event.value, this.state.selection);

      var selected = index !== -1;
      var selection;

      if (selected) {
        if (metaKey) selection = this.state.selection.filter(function (val, i) {
          return i !== index;
        });else selection = [event.value];
      } else {
        if (metaKey) selection = [].concat(_toConsumableArray(this.state.selection), [event.value]);else selection = [event.value];
      }

      this.setState({
        selection: selection
      });
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
      if (nextItem) return !_DomHandler.default.hasClass(nextItem, 'p-orderlist-item') ? this.findNextItem(nextItem) : nextItem;else return null;
    }
  }, {
    key: "findPrevItem",
    value: function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      if (prevItem) return !_DomHandler.default.hasClass(prevItem, 'p-orderlist-item') ? this.findPrevItem(prevItem) : prevItem;else return null;
    }
  }, {
    key: "onReorder",
    value: function onReorder(event) {
      if (this.props.onChange) {
        this.props.onChange({
          event: event.originalEvent,
          value: event.value
        });
      }

      this.reorderDirection = event.direction;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.reorderDirection) {
        this.updateListScroll();
        this.reorderDirection = null;
      }
    }
  }, {
    key: "updateListScroll",
    value: function updateListScroll() {
      var listItems = _DomHandler.default.find(this.subList.listElement, '.p-orderlist-item.p-highlight');

      if (listItems && listItems.length) {
        switch (this.reorderDirection) {
          case 'up':
            _DomHandler.default.scrollInView(this.subList.listElement, listItems[0]);

            break;

          case 'top':
            this.subList.listElement.scrollTop = 0;
            break;

          case 'down':
            _DomHandler.default.scrollInView(this.subList.listElement, listItems[listItems.length - 1]);

            break;

          case 'bottom':
            this.subList.listElement.scrollTop = this.subList.listElement.scrollHeight;
            break;

          default:
            break;
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var className = (0, _classnames.default)('p-orderlist p-component', this.props.className);
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this2.element = el;
        },
        id: this.props.id,
        className: className,
        style: this.props.style
      }, /*#__PURE__*/_react.default.createElement(_OrderListControls.OrderListControls, {
        value: this.props.value,
        selection: this.state.selection,
        onReorder: this.onReorder
      }), /*#__PURE__*/_react.default.createElement(_OrderListSubList.OrderListSubList, {
        ref: function ref(el) {
          return _this2.subList = el;
        },
        value: this.props.value,
        selection: this.state.selection,
        onItemClick: this.onItemClick,
        onItemKeyDown: this.onItemKeyDown,
        itemTemplate: this.props.itemTemplate,
        header: this.props.header,
        listStyle: this.props.listStyle,
        dragdrop: this.props.dragdrop,
        onDragStart: this.onDragStart,
        onDragEnter: this.onDragEnter,
        onDragEnd: this.onDragEnd,
        onDragLeave: this.onDragEnter,
        onDrop: this.onDrop,
        onChange: this.props.onChange,
        tabIndex: this.props.tabIndex
      }));
    }
  }]);

  return OrderList;
}(_react.Component);

exports.OrderList = OrderList;

_defineProperty(OrderList, "defaultProps", {
  id: null,
  value: null,
  header: null,
  style: null,
  className: null,
  listStyle: null,
  dragdrop: false,
  tabIndex: 0,
  onChange: null,
  itemTemplate: null
});

_defineProperty(OrderList, "propTypes", {
  id: _propTypes.default.string,
  value: _propTypes.default.array,
  header: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  listStyle: _propTypes.default.object,
  dragdrop: _propTypes.default.bool,
  tabIndex: _propTypes.default.number,
  onChange: _propTypes.default.func,
  itemTemplate: _propTypes.default.func
});