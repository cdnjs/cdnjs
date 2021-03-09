"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BodyCell = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ClassNames = require("../utils/ClassNames");

var _OverlayEventBus = _interopRequireDefault(require("../overlayeventbus/OverlayEventBus"));

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _RowRadioButton = require("./RowRadioButton");

var _RowCheckbox = require("./RowCheckbox");

var _Ripple = require("../ripple/Ripple");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var BodyCell = /*#__PURE__*/function (_Component) {
  _inherits(BodyCell, _Component);

  var _super = _createSuper(BodyCell);

  function BodyCell(props) {
    var _this;

    _classCallCheck(this, BodyCell);

    _this = _super.call(this, props);
    _this.state = {
      editing: _this.props.editing
    };
    _this.onExpanderClick = _this.onExpanderClick.bind(_assertThisInitialized(_this));
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    _this.onEditorFocus = _this.onEditorFocus.bind(_assertThisInitialized(_this));
    _this.eventBusKey = "".concat(_this.props.field, "_").concat(_this.props.rowIndex);
    return _this;
  }

  _createClass(BodyCell, [{
    key: "onExpanderClick",
    value: function onExpanderClick(event) {
      if (this.props.onRowToggle) {
        this.props.onRowToggle({
          originalEvent: event,
          data: this.props.rowData
        });
      }

      event.preventDefault();
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (this.props.editMode !== 'row') {
        if (event.which === 13 || event.which === 9) {
          // tab || enter
          this.switchCellToViewMode(event, true);
        }

        if (event.which === 27) {
          // escape
          this.switchCellToViewMode(event, false);
        }
      }
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      var _this2 = this;

      if (this.props.editMode !== 'row' && this.props.editor && !this.state.editing && (this.props.selectOnEdit || !this.props.selectOnEdit && this.props.selected)) {
        this.selfClick = true;

        if (this.props.onBeforeEditorShow) {
          this.props.onBeforeEditorShow({
            originalEvent: event,
            columnProps: this.props
          });
        }

        this.setState({
          editing: true
        }, function () {
          if (_this2.props.onEditorInit) {
            _this2.props.onEditorInit({
              originalEvent: event,
              columnProps: _this2.props
            });
          }

          if (_this2.props.editorValidatorEvent === 'click') {
            _this2.bindDocumentEditListener();

            _OverlayEventBus.default.on('overlay-click', function (e) {
              if (!_this2.isOutsideClicked(e.target)) {
                _this2.selfClick = true;
              }
            }, _this2.eventBusKey);
          }
        });
      }
    }
  }, {
    key: "onBlur",
    value: function onBlur(event) {
      this.selfClick = false;

      if (this.props.editMode !== 'row' && this.state.editing && this.props.editorValidatorEvent === 'blur') {
        this.switchCellToViewMode(event, true);
      }
    }
  }, {
    key: "onEditorFocus",
    value: function onEditorFocus(event) {
      this.onClick(event);
    }
  }, {
    key: "bindDocumentEditListener",
    value: function bindDocumentEditListener() {
      var _this3 = this;

      if (!this.documentEditListener) {
        this.documentEditListener = function (e) {
          if (!_this3.selfClick && _this3.isOutsideClicked(e.target)) {
            _this3.switchCellToViewMode(e, true);
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
    key: "closeCell",
    value: function closeCell(event) {
      var _this4 = this;

      if (this.props.onBeforeEditorHide) {
        this.props.onBeforeEditorHide({
          originalEvent: event,
          columnProps: this.props
        });
      }
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
    key: "switchCellToViewMode",
    value: function switchCellToViewMode(event, submit) {
      var params = {
        originalEvent: event,
        columnProps: this.props
      };

      if (!submit && this.props.onEditorCancel) {
        this.props.onEditorCancel(params);
      }

      var valid = true;

      if (this.props.editorValidator) {
        valid = this.props.editorValidator(params);
      }

      if (valid) {
        if (submit && this.props.onEditorSubmit) {
          this.props.onEditorSubmit(params);
        }

        this.closeCell(event);
      }
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
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this5 = this;

      if (this.props.editMode !== 'row' && this.container && this.props.editor) {
        clearTimeout(this.tabindexTimeout);

        if (this.state.editing) {
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

      var content, header, editorKeyHelper;
      var cellClassName = (0, _ClassNames.classNames)(this.props.bodyClassName || this.props.className, {
        'p-selection-column': this.props.selectionMode,
        'p-editable-column': this.props.editor,
        'p-cell-editing': this.state.editing && this.props.editor
      });

      if (this.props.expander) {
        var iconClassName = (0, _ClassNames.classNames)('p-row-toggler-icon pi pi-fw p-clickable', {
          'pi-chevron-down': this.props.expanded,
          'pi-chevron-right': !this.props.expanded
        });
        var ariaControls = "".concat(this.props.tableId ? this.props.tableId + '_' : '', "content_").concat(this.props.rowIndex, "_expanded");
        var expanderProps = {
          onClick: this.onExpanderClick,
          className: 'p-row-toggler p-link',
          iconClassName: iconClassName
        };
        content = /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          onClick: expanderProps.onClick,
          className: expanderProps.className,
          "aria-expanded": this.props.expanded,
          "aria-controls": ariaControls
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: expanderProps.iconClassName
        }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));

        if (this.props.body) {
          expanderProps['element'] = content;
          content = this.props.body(this.props.rowData, _objectSpread(_objectSpread({}, this.props), {
            expander: expanderProps
          }));
        }
      } else if (this.props.selectionMode) {
        var showSelection = true;

        if (this.props.showSelectionElement) {
          showSelection = this.props.showSelectionElement(this.props.rowData);
        }

        if (showSelection) {
          if (this.props.selectionMode === 'single') content = /*#__PURE__*/_react.default.createElement(_RowRadioButton.RowRadioButton, {
            onClick: this.props.onRadioClick,
            rowData: this.props.rowData,
            selected: this.props.selected,
            tableId: this.props.tableId
          });else content = /*#__PURE__*/_react.default.createElement(_RowCheckbox.RowCheckbox, {
            onClick: this.props.onCheckboxClick,
            rowData: this.props.rowData,
            selected: this.props.selected
          });
        }
      } else if (this.props.rowReorder) {
        var showReorder = true;

        if (this.props.showRowReorderElement) {
          showReorder = this.props.showRowReorderElement(this.props.rowData);
        }

        if (showReorder) {
          var reorderIcon = (0, _ClassNames.classNames)('p-table-reorderablerow-handle', this.props.rowReorderIcon);
          content = /*#__PURE__*/_react.default.createElement("i", {
            className: reorderIcon
          });
        }
      } else if (this.props.rowEditor) {
        var rowEditorProps = {};

        if (this.state.editing) {
          rowEditorProps = {
            editing: true,
            onSaveClick: this.props.onRowEditSave,
            saveClassName: 'p-row-editor-save p-link',
            saveIconClassName: 'p-row-editor-save-icon pi pi-fw pi-check p-clickable',
            onCancelClick: this.props.onRowEditCancel,
            cancelClassName: 'p-row-editor-cancel p-link',
            cancelIconClassName: 'p-row-editor-cancel-icon pi pi-fw pi-times p-clickable'
          };
          content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", {
            type: "button",
            onClick: rowEditorProps.onSaveClick,
            className: rowEditorProps.saveClassName
          }, /*#__PURE__*/_react.default.createElement("span", {
            className: rowEditorProps.saveIconClassName
          }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null)), /*#__PURE__*/_react.default.createElement("button", {
            type: "button",
            onClick: rowEditorProps.onCancelClick,
            className: rowEditorProps.cancelClassName
          }, /*#__PURE__*/_react.default.createElement("span", {
            className: rowEditorProps.cancelIconClassName
          }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null)));
        } else {
          rowEditorProps = {
            editing: false,
            onInitClick: this.props.onRowEditInit,
            initClassName: 'p-row-editor-init p-link',
            initIconClassName: 'p-row-editor-init-icon pi pi-fw pi-pencil p-clickable'
          };
          content = /*#__PURE__*/_react.default.createElement("button", {
            type: "button",
            onClick: rowEditorProps.onInitClick,
            className: rowEditorProps.initClassName
          }, /*#__PURE__*/_react.default.createElement("span", {
            className: rowEditorProps.initIconClassName
          }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));
        }

        if (this.props.body) {
          rowEditorProps['element'] = content;
          content = this.props.body(this.props.rowData, _objectSpread(_objectSpread({}, this.props), {
            rowEditor: rowEditorProps
          }));
        }
      } else {
        if (this.state.editing && this.props.editor) {
          content = this.props.editor(this.props);
        } else {
          if (this.props.body) content = this.props.body(this.props.rowData, this.props);else content = _ObjectUtils.default.resolveFieldData(this.props.rowData, this.props.field);
        }
      }

      if (this.props.editMode !== 'row') {
        /* eslint-disable */
        editorKeyHelper = this.props.editor && /*#__PURE__*/_react.default.createElement("a", {
          tabIndex: "0",
          ref: function ref(el) {
            _this6.keyHelper = el;
          },
          className: "p-cell-editor-key-helper p-hidden-accessible",
          onFocus: this.onEditorFocus
        }, /*#__PURE__*/_react.default.createElement("span", null));
        /* eslint-enable */
      }

      return /*#__PURE__*/_react.default.createElement("td", {
        ref: function ref(el) {
          _this6.container = el;
        },
        role: "cell",
        className: cellClassName,
        style: this.props.bodyStyle || this.props.style,
        onClick: this.onClick,
        onKeyDown: this.onKeyDown,
        rowSpan: this.props.rowSpan,
        onBlur: this.onBlur
      }, header, editorKeyHelper, content);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.editMode === 'row' && nextProps.editing !== prevState.editing) {
        return {
          editing: nextProps.editing
        };
      }

      return null;
    }
  }]);

  return BodyCell;
}(_react.Component);

exports.BodyCell = BodyCell;