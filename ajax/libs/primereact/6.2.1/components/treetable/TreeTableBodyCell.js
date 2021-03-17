"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeTableBodyCell = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ClassNames = require("../utils/ClassNames");

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _OverlayEventBus = _interopRequireDefault(require("../overlayeventbus/OverlayEventBus"));

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

var TreeTableBodyCell = /*#__PURE__*/function (_Component) {
  _inherits(TreeTableBodyCell, _Component);

  var _super = _createSuper(TreeTableBodyCell);

  function TreeTableBodyCell(props) {
    var _this;

    _classCallCheck(this, TreeTableBodyCell);

    _this = _super.call(this, props);

    if (_this.props.editor) {
      _this.state = {};
    }

    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    _this.onEditorFocus = _this.onEditorFocus.bind(_assertThisInitialized(_this));
    _this.eventBusKey = "".concat(_this.props.field, "_").concat(_this.props.rowIndex);
    return _this;
  }

  _createClass(TreeTableBodyCell, [{
    key: "onClick",
    value: function onClick() {
      var _this2 = this;

      if (this.props.editor && !this.state.editing && (this.props.selectOnEdit || !this.props.selectOnEdit && this.props.selected)) {
        this.selfClick = true;
        this.setState({
          editing: true
        }, function () {
          _this2.bindDocumentEditListener();

          _OverlayEventBus.default.on('overlay-click', function (e) {
            if (!_this2.isOutsideClicked(e.target)) {
              _this2.selfClick = true;
            }
          }, _this2.eventBusKey);
        });
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (event.which === 13 || event.which === 9) {
        this.switchCellToViewMode(event);
      }
    }
  }, {
    key: "bindDocumentEditListener",
    value: function bindDocumentEditListener() {
      var _this3 = this;

      if (!this.documentEditListener) {
        this.documentEditListener = function (e) {
          if (!_this3.selfClick && _this3.isOutsideClicked(e.target)) {
            _this3.switchCellToViewMode(e);
          }

          _this3.selfClick = false;
        };

        document.addEventListener('click', this.documentEditListener);
      }
    }
  }, {
    key: "isOutsideClicked",
    value: function isOutsideClicked(target) {
      return this.container && !(this.container.isSameNode(target) || this.container.contains(target));
    }
  }, {
    key: "unbindDocumentEditListener",
    value: function unbindDocumentEditListener() {
      if (this.documentEditListener) {
        document.removeEventListener('click', this.documentEditListener);
        this.documentEditListener = null;
        this.selfClick = false;
      }
    }
  }, {
    key: "closeCell",
    value: function closeCell() {
      var _this4 = this;

      /* When using the 'tab' key, the focus event of the next cell is not called in IE. */
      setTimeout(function () {
        _this4.setState({
          editing: false
        }, function () {
          _this4.unbindDocumentEditListener();

          _OverlayEventBus.default.off('overlay-click', _this4.eventBusKey);
        });
      }, 1);
    }
  }, {
    key: "onEditorFocus",
    value: function onEditorFocus(event) {
      this.onClick(event);
    }
  }, {
    key: "switchCellToViewMode",
    value: function switchCellToViewMode(event) {
      if (this.props.editorValidator) {
        var valid = this.props.editorValidator({
          originalEvent: event,
          columnProps: this.props
        });

        if (valid) {
          this.closeCell();
        }
      } else {
        this.closeCell();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this5 = this;

      if (this.container && this.props.editor) {
        clearTimeout(this.tabindexTimeout);

        if (this.state && this.state.editing) {
          var focusable = _DomHandler.default.findSingle(this.container, 'input');

          if (focusable && document.activeElement !== focusable && !focusable.hasAttribute('data-isCellEditing')) {
            focusable.setAttribute('data-isCellEditing', true);
            focusable.focus();
          }

          this.keyHelper.tabIndex = -1;
        } else {
          this.tabindexTimeout = setTimeout(function () {
            if (_this5.keyHelper) {
              _this5.keyHelper.setAttribute('tabindex', 0);
            }
          }, 50);
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindDocumentEditListener();
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var className = (0, _ClassNames.classNames)(this.props.bodyClassName || this.props.className, {
        'p-editable-column': this.props.editor,
        'p-cell-editing': this.props.editor ? this.state.editing : false
      });
      var style = this.props.bodyStyle || this.props.style;
      var content;

      if (this.state && this.state.editing) {
        if (this.props.editor) content = this.props.editor(this.props);else throw new Error("Editor is not found on column.");
      } else {
        if (this.props.body) content = this.props.body(this.props.node, this.props);else content = _ObjectUtils.default.resolveFieldData(this.props.node.data, this.props.field);
      }
      /* eslint-disable */


      var editorKeyHelper = this.props.editor && /*#__PURE__*/_react.default.createElement("a", {
        tabIndex: 0,
        ref: function ref(el) {
          _this6.keyHelper = el;
        },
        className: "p-cell-editor-key-helper p-hidden-accessible",
        onFocus: this.onEditorFocus
      }, /*#__PURE__*/_react.default.createElement("span", null));
      /* eslint-enable */


      return /*#__PURE__*/_react.default.createElement("td", {
        ref: function ref(el) {
          return _this6.container = el;
        },
        className: className,
        style: style,
        onClick: this.onClick,
        onKeyDown: this.onKeyDown
      }, this.props.children, editorKeyHelper, content);
    }
  }]);

  return TreeTableBodyCell;
}(_react.Component);

exports.TreeTableBodyCell = TreeTableBodyCell;