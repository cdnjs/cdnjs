"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _ClassNames = require("../utils/ClassNames");

var _PickListSubList = require("./PickListSubList");

var _PickListControls = require("./PickListControls");

var _PickListTransferControls = require("./PickListTransferControls");

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

var PickList = /*#__PURE__*/function (_Component) {
  _inherits(PickList, _Component);

  var _super = _createSuper(PickList);

  function PickList(props) {
    var _this;

    _classCallCheck(this, PickList);

    _this = _super.call(this, props);
    _this.state = {};

    if (!_this.props.onSourceSelectionChange) {
      _this.state.sourceSelection = [];
    }

    if (!_this.props.onTargetSelectionChange) {
      _this.state.targetSelection = [];
    }

    _this.onSourceReorder = _this.onSourceReorder.bind(_assertThisInitialized(_this));
    _this.onTargetReorder = _this.onTargetReorder.bind(_assertThisInitialized(_this));
    _this.onTransfer = _this.onTransfer.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(PickList, [{
    key: "getSourceSelection",
    value: function getSourceSelection() {
      return this.props.onSourceSelectionChange ? this.props.sourceSelection : this.state.sourceSelection;
    }
  }, {
    key: "getTargetSelection",
    value: function getTargetSelection() {
      return this.props.onTargetSelectionChange ? this.props.targetSelection : this.state.targetSelection;
    }
  }, {
    key: "onSourceReorder",
    value: function onSourceReorder(event) {
      this.handleChange(event, event.value, this.props.target);
      this.reorderedListElement = this.sourceListElement;
      this.reorderDirection = event.direction;
    }
  }, {
    key: "onTargetReorder",
    value: function onTargetReorder(event) {
      this.handleChange(event, this.props.source, event.value);
      this.reorderedListElement = this.targetListElement;
      this.reorderDirection = event.direction;
    }
  }, {
    key: "handleScrollPosition",
    value: function handleScrollPosition(listElement, direction) {
      if (listElement) {
        var listContainer = _DomHandler.default.findSingle(listElement, '.p-picklist-list');

        switch (direction) {
          case 'up':
            this.scrollInView(listContainer, -1);
            break;

          case 'top':
            listContainer.scrollTop = 0;
            break;

          case 'down':
            this.scrollInView(listContainer, 1);
            break;

          case 'bottom':
            listContainer.scrollTop = listContainer.scrollHeight;
            break;

          default:
            break;
        }
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(event, source, target) {
      if (this.props.onChange) {
        this.props.onChange({
          event: event.originalEvent,
          source: source,
          target: target
        });
      }
    }
  }, {
    key: "onTransfer",
    value: function onTransfer(event) {
      var originalEvent = event.originalEvent,
          source = event.source,
          target = event.target,
          direction = event.direction;

      switch (direction) {
        case 'toTarget':
          if (this.props.onMoveToTarget) {
            this.props.onMoveToTarget({
              originalEvent: originalEvent,
              value: this.getSourceSelection()
            });
          }

          break;

        case 'allToTarget':
          if (this.props.onMoveAllToTarget) {
            this.props.onMoveAllToTarget({
              originalEvent: originalEvent,
              value: this.props.source
            });
          }

          break;

        case 'toSource':
          if (this.props.onMoveToSource) {
            this.props.onMoveToSource({
              originalEvent: originalEvent,
              value: this.getTargetSelection()
            });
          }

          break;

        case 'allToSource':
          if (this.props.onMoveAllToSource) {
            this.props.onMoveAllToSource({
              originalEvent: originalEvent,
              value: this.props.target
            });
          }

          break;

        default:
          break;
      }

      this.onSelectionChange({
        originalEvent: originalEvent,
        value: []
      }, 'sourceSelection', this.props.onSourceSelectionChange);
      this.onSelectionChange({
        originalEvent: originalEvent,
        value: []
      }, 'targetSelection', this.props.onTargetSelectionChange);
      this.handleChange(event, source, target);
    }
  }, {
    key: "scrollInView",
    value: function scrollInView(listContainer) {
      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var selectedItems = listContainer.getElementsByClassName('p-highlight');

      _DomHandler.default.scrollInView(listContainer, direction === -1 ? selectedItems[0] : selectedItems[selectedItems.length - 1]);
    }
  }, {
    key: "onSelectionChange",
    value: function onSelectionChange(e, stateKey, callback) {
      if (callback) {
        callback(e);
      } else {
        this.setState(_defineProperty({}, stateKey, e.value));
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.reorderedListElement) {
        this.handleScrollPosition(this.reorderedListElement, this.reorderDirection);
        this.reorderedListElement = null;
        this.reorderDirection = null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var className = (0, _ClassNames.classNames)('p-picklist p-component', this.props.className);
      var sourceSelection = this.getSourceSelection();
      var targetSelection = this.getTargetSelection();
      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.props.id,
        className: className,
        style: this.props.style
      }, this.props.showSourceControls && /*#__PURE__*/_react.default.createElement(_PickListControls.PickListControls, {
        list: this.props.source,
        selection: sourceSelection,
        onReorder: this.onSourceReorder,
        className: "p-picklist-source-controls"
      }), /*#__PURE__*/_react.default.createElement(_PickListSubList.PickListSubList, {
        ref: function ref(el) {
          return _this2.sourceListElement = el;
        },
        list: this.props.source,
        selection: sourceSelection,
        onSelectionChange: function onSelectionChange(e) {
          return _this2.onSelectionChange(e, 'sourceSelection', _this2.props.onSourceSelectionChange);
        },
        itemTemplate: this.props.itemTemplate,
        header: this.props.sourceHeader,
        style: this.props.sourceStyle,
        className: "p-picklist-source-wrapper",
        listClassName: "p-picklist-source",
        metaKeySelection: this.props.metaKeySelection,
        tabIndex: this.props.tabIndex
      }), /*#__PURE__*/_react.default.createElement(_PickListTransferControls.PickListTransferControls, {
        onTransfer: this.onTransfer,
        source: this.props.source,
        target: this.props.target,
        sourceSelection: sourceSelection,
        targetSelection: targetSelection
      }), /*#__PURE__*/_react.default.createElement(_PickListSubList.PickListSubList, {
        ref: function ref(el) {
          return _this2.targetListElement = el;
        },
        list: this.props.target,
        selection: targetSelection,
        onSelectionChange: function onSelectionChange(e) {
          return _this2.onSelectionChange(e, 'targetSelection', _this2.props.onTargetSelectionChange);
        },
        itemTemplate: this.props.itemTemplate,
        header: this.props.targetHeader,
        style: this.props.targetStyle,
        className: "p-picklist-target-wrapper",
        listClassName: "p-picklist-target",
        metaKeySelection: this.props.metaKeySelection,
        tabIndex: this.props.tabIndex
      }), this.props.showTargetControls && /*#__PURE__*/_react.default.createElement(_PickListControls.PickListControls, {
        list: this.props.target,
        selection: targetSelection,
        onReorder: this.onTargetReorder,
        className: "p-picklist-target-controls"
      }));
    }
  }]);

  return PickList;
}(_react.Component);

exports.PickList = PickList;

_defineProperty(PickList, "defaultProps", {
  id: null,
  source: null,
  target: null,
  sourceHeader: null,
  targetHeader: null,
  style: null,
  className: null,
  sourceStyle: null,
  targetStyle: null,
  sourceSelection: null,
  targetSelection: null,
  showSourceControls: true,
  showTargetControls: true,
  metaKeySelection: true,
  tabIndex: 0,
  itemTemplate: null,
  onChange: null,
  onMoveToSource: null,
  onMoveAllToSource: null,
  onMoveToTarget: null,
  onMoveAllToTarget: null,
  onSourceSelectionChange: null,
  onTargetSelectionChange: null
});

_defineProperty(PickList, "propTypes", {
  id: _propTypes.default.string,
  source: _propTypes.default.array,
  target: _propTypes.default.array,
  sourceHeader: _propTypes.default.string,
  targetHeader: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  sourcestyle: _propTypes.default.object,
  targetstyle: _propTypes.default.object,
  sourceSelection: _propTypes.default.any,
  targetSelection: _propTypes.default.any,
  showSourceControls: _propTypes.default.bool,
  showTargetControls: _propTypes.default.bool,
  metaKeySelection: _propTypes.default.bool,
  tabIndex: _propTypes.default.number,
  itemTemplate: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onMoveToSource: _propTypes.default.func,
  onMoveAllToSource: _propTypes.default.func,
  onMoveToTarget: _propTypes.default.func,
  onMoveAllToTarget: _propTypes.default.func,
  onSourceSelectionChange: _propTypes.default.func,
  onTargetSelectionChange: _propTypes.default.func
});