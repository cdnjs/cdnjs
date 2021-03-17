"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickListTransferControls = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _Button = require("../button/Button");

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

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

var PickListTransferControls = /*#__PURE__*/function (_Component) {
  _inherits(PickListTransferControls, _Component);

  var _super = _createSuper(PickListTransferControls);

  function PickListTransferControls() {
    var _this;

    _classCallCheck(this, PickListTransferControls);

    _this = _super.call(this);
    _this.moveRight = _this.moveRight.bind(_assertThisInitialized(_this));
    _this.moveAllRight = _this.moveAllRight.bind(_assertThisInitialized(_this));
    _this.moveLeft = _this.moveLeft.bind(_assertThisInitialized(_this));
    _this.moveAllLeft = _this.moveAllLeft.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(PickListTransferControls, [{
    key: "moveRight",
    value: function moveRight(event) {
      var selection = this.props.sourceSelection;

      if (selection && selection.length) {
        var targetList = _toConsumableArray(this.props.target);

        var sourceList = _toConsumableArray(this.props.source);

        for (var i = 0; i < selection.length; i++) {
          var selectedItem = selection[i];

          if (_ObjectUtils.default.findIndexInList(selectedItem, targetList) === -1) {
            targetList.push(sourceList.splice(_ObjectUtils.default.findIndexInList(selectedItem, sourceList), 1)[0]);
          }
        }

        if (this.props.onTransfer) {
          this.props.onTransfer({
            originalEvent: event,
            source: sourceList,
            target: targetList,
            direction: 'toTarget'
          });
        }
      }
    }
  }, {
    key: "moveAllRight",
    value: function moveAllRight(event) {
      if (this.props.source) {
        var targetList = [].concat(_toConsumableArray(this.props.target), _toConsumableArray(this.props.source));
        var sourceList = [];

        if (this.props.onTransfer) {
          this.props.onTransfer({
            originalEvent: event,
            source: sourceList,
            target: targetList,
            direction: 'allToTarget'
          });
        }
      }
    }
  }, {
    key: "moveLeft",
    value: function moveLeft(event) {
      var selection = this.props.targetSelection;

      if (selection && selection.length) {
        var targetList = _toConsumableArray(this.props.target);

        var sourceList = _toConsumableArray(this.props.source);

        for (var i = 0; i < selection.length; i++) {
          var selectedItem = selection[i];

          if (_ObjectUtils.default.findIndexInList(selectedItem, sourceList) === -1) {
            sourceList.push(targetList.splice(_ObjectUtils.default.findIndexInList(selectedItem, targetList), 1)[0]);
          }
        }

        if (this.props.onTransfer) {
          this.props.onTransfer({
            originalEvent: event,
            source: sourceList,
            target: targetList,
            direction: 'toSource'
          });
        }
      }
    }
  }, {
    key: "moveAllLeft",
    value: function moveAllLeft(event) {
      if (this.props.source) {
        var sourceList = [].concat(_toConsumableArray(this.props.source), _toConsumableArray(this.props.target));
        var targetList = [];

        if (this.props.onTransfer) {
          this.props.onTransfer({
            originalEvent: event,
            source: sourceList,
            target: targetList,
            direction: 'allToSource'
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var className = (0, _ClassNames.classNames)('p-picklist-buttons p-picklist-transfer-buttons', this.props.className);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: className
      }, /*#__PURE__*/_react.default.createElement(_Button.Button, {
        type: "button",
        icon: "pi pi-angle-right",
        onClick: this.moveRight
      }), /*#__PURE__*/_react.default.createElement(_Button.Button, {
        type: "button",
        icon: "pi pi-angle-double-right",
        onClick: this.moveAllRight
      }), /*#__PURE__*/_react.default.createElement(_Button.Button, {
        type: "button",
        icon: "pi pi-angle-left",
        onClick: this.moveLeft
      }), /*#__PURE__*/_react.default.createElement(_Button.Button, {
        type: "button",
        icon: "pi pi-angle-double-left",
        onClick: this.moveAllLeft
      }));
    }
  }]);

  return PickListTransferControls;
}(_react.Component);

exports.PickListTransferControls = PickListTransferControls;

_defineProperty(PickListTransferControls, "defaultProps", {
  source: null,
  target: null,
  sourceSelection: null,
  targetSelection: null,
  onTransfer: null
});

_defineProperty(PickListTransferControls, "propTypes", {
  source: _propTypes.default.array,
  target: _propTypes.default.array,
  sourceSelection: _propTypes.default.array,
  targetSelection: _propTypes.default.array,
  onTransfer: _propTypes.default.func
});