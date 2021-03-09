"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BodyRow = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ClassNames = require("../utils/ClassNames");

var _BodyCell = require("./BodyCell");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var BodyRow = /*#__PURE__*/function (_Component) {
  _inherits(BodyRow, _Component);

  var _super = _createSuper(BodyRow);

  function BodyRow(props) {
    var _this;

    _classCallCheck(this, BodyRow);

    _this = _super.call(this, props);

    if (!_this.props.isRowEditingControlled) {
      _this.state = {
        editing: false
      };
    }

    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onDoubleClick = _this.onDoubleClick.bind(_assertThisInitialized(_this));
    _this.onTouchEnd = _this.onTouchEnd.bind(_assertThisInitialized(_this));
    _this.onRightClick = _this.onRightClick.bind(_assertThisInitialized(_this));
    _this.onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_this));
    _this.onDragEnd = _this.onDragEnd.bind(_assertThisInitialized(_this));
    _this.onDragOver = _this.onDragOver.bind(_assertThisInitialized(_this));
    _this.onDragLeave = _this.onDragLeave.bind(_assertThisInitialized(_this));
    _this.onDrop = _this.onDrop.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    _this.onRowEditInit = _this.onRowEditInit.bind(_assertThisInitialized(_this));
    _this.onRowEditSave = _this.onRowEditSave.bind(_assertThisInitialized(_this));
    _this.onRowEditCancel = _this.onRowEditCancel.bind(_assertThisInitialized(_this));
    _this.updateEditingState = _this.updateEditingState.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(BodyRow, [{
    key: "getEditing",
    value: function getEditing() {
      return this.props.isRowEditingControlled ? this.props.editing : this.state.editing;
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      if (this.props.onClick) {
        this.props.onClick({
          originalEvent: event,
          data: this.props.rowData,
          index: this.props.rowIndex
        });
      }
    }
  }, {
    key: "onDoubleClick",
    value: function onDoubleClick(event) {
      if (this.props.onDoubleClick) {
        this.props.onDoubleClick({
          originalEvent: event,
          data: this.props.rowData,
          index: this.props.rowIndex
        });
      }
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(event) {
      if (this.props.onTouchEnd) {
        this.props.onTouchEnd(event);
      }
    }
  }, {
    key: "onRightClick",
    value: function onRightClick(event) {
      if (this.props.onRightClick) {
        this.props.onRightClick({
          originalEvent: event,
          data: this.props.rowData,
          index: this.props.rowIndex
        });
      }
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      if (_DomHandler.default.hasClass(event.target, 'p-table-reorderablerow-handle')) event.currentTarget.draggable = true;else event.currentTarget.draggable = false;
    }
  }, {
    key: "onDragEnd",
    value: function onDragEnd(event) {
      if (this.props.onDragEnd) {
        this.props.onDragEnd(event);
      }

      event.currentTarget.draggable = false;
    }
  }, {
    key: "onDragOver",
    value: function onDragOver(event) {
      if (this.props.onDragOver) {
        this.props.onDragOver({
          originalEvent: event,
          rowElement: this.container
        });
      }

      event.preventDefault();
    }
  }, {
    key: "onDragLeave",
    value: function onDragLeave(event) {
      if (this.props.onDragLeave) {
        this.props.onDragLeave({
          originalEvent: event,
          rowElement: this.container
        });
      }
    }
  }, {
    key: "onDrop",
    value: function onDrop(event) {
      if (this.props.onDrop) {
        this.props.onDrop({
          originalEvent: event,
          rowElement: this.container
        });
      }

      event.preventDefault();
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (this.props.selectionMode) {
        var row = event.currentTarget;

        switch (event.which) {
          //down arrow
          case 40:
            var nextRow = this.findNextSelectableRow(row);

            if (nextRow) {
              this.changeTabIndex(row, nextRow);
              nextRow.focus();
            }

            event.preventDefault();
            break;
          //up arrow

          case 38:
            var prevRow = this.findPrevSelectableRow(row);

            if (prevRow) {
              this.changeTabIndex(row, prevRow);
              prevRow.focus();
            }

            event.preventDefault();
            break;
          //enter or space

          case 13: // @deprecated

          case 32:
            this.onClick(event);
            event.preventDefault();
            break;

          default:
            //no op
            break;
        }
      }
    }
  }, {
    key: "changeTabIndex",
    value: function changeTabIndex(currentRow, nextRow) {
      if (currentRow && nextRow) {
        currentRow.tabIndex = -1;
        nextRow.tabIndex = 0;
      }
    }
  }, {
    key: "findNextSelectableRow",
    value: function findNextSelectableRow(row) {
      var nextRow = row.nextElementSibling;

      if (nextRow) {
        if (_DomHandler.default.hasClass(nextRow, 'p-selectable-row')) return nextRow;else return this.findNextSelectableRow(nextRow);
      } else {
        return null;
      }
    }
  }, {
    key: "findPrevSelectableRow",
    value: function findPrevSelectableRow(row) {
      var prevRow = row.previousElementSibling;

      if (prevRow) {
        if (_DomHandler.default.hasClass(prevRow, 'p-selectable-row')) return prevRow;else return this.findPrevSelectableRow(prevRow);
      } else {
        return null;
      }
    }
  }, {
    key: "updateEditingState",
    value: function updateEditingState(event, editing) {
      if (this.props.isRowEditingControlled) {
        this.props.onRowEditingToggle({
          originalEvent: event,
          data: this.props.rowData,
          index: this.props.rowIndex
        });
      } else {
        this.setState({
          editing: editing
        });
      }
    }
  }, {
    key: "onRowEditInit",
    value: function onRowEditInit(event) {
      if (this.props.onRowEditInit) {
        this.props.onRowEditInit({
          originalEvent: event,
          data: this.props.rowData,
          index: this.props.rowIndex
        });
      }

      this.updateEditingState(event, true);
      event.preventDefault();
    }
  }, {
    key: "onRowEditSave",
    value: function onRowEditSave(event) {
      var valid = true;

      if (this.props.rowEditorValidator) {
        valid = this.props.rowEditorValidator(this.props.rowData);
      }

      if (this.props.onRowEditSave) {
        this.props.onRowEditSave({
          originalEvent: event,
          data: this.props.rowData,
          index: this.props.rowIndex,
          valid: valid
        });
      }

      if (valid) {
        this.updateEditingState(event, false);
      }

      event.preventDefault();
    }
  }, {
    key: "onRowEditCancel",
    value: function onRowEditCancel(event) {
      if (this.props.onRowEditCancel) {
        this.props.onRowEditCancel({
          originalEvent: event,
          data: this.props.rowData,
          index: this.props.rowIndex
        });
      }

      this.updateEditingState(event, false);
      event.preventDefault();
    }
  }, {
    key: "getTabIndex",
    value: function getTabIndex() {
      return this.props.selectionMode ? this.props.rowIndex === 0 ? 0 : -1 : null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var columns = _react.default.Children.toArray(this.props.children);

      var conditionalClassNames = {
        'p-highlight': this.props.selected,
        'p-highlight-contextmenu': this.props.contextMenuSelected,
        'p-selectable-row': this.props.selectionMode
      };

      if (this.props.rowClassName) {
        var rowClassNameCondition = this.props.rowClassName(this.props.rowData);
        conditionalClassNames = _objectSpread(_objectSpread({}, conditionalClassNames), rowClassNameCondition);
      }

      var className = (0, _ClassNames.classNames)(conditionalClassNames);
      var style = this.props.virtualScroll ? {
        height: this.props.virtualRowHeight
      } : {};
      var hasRowSpanGrouping = this.props.rowGroupMode === 'rowspan';
      var tabIndex = this.getTabIndex();
      var cells = [];

      for (var i = 0; i < columns.length; i++) {
        var column = columns[i];
        var rowSpan = void 0;

        if (hasRowSpanGrouping) {
          if (this.props.sortField === column.props.field) {
            if (this.props.groupRowSpan) {
              rowSpan = this.props.groupRowSpan;
              className += ' p-datatable-rowspan-group';
            } else {
              continue;
            }
          }
        }

        var editing = this.getEditing();

        var cell = /*#__PURE__*/_react.default.createElement(_BodyCell.BodyCell, _extends({
          tableId: this.props.tableId,
          key: i
        }, column.props, {
          value: this.props.value,
          rowSpan: rowSpan,
          rowData: this.props.rowData,
          rowIndex: this.props.rowIndex,
          onRowToggle: this.props.onRowToggle,
          expanded: this.props.expanded,
          onRadioClick: this.props.onRadioClick,
          onCheckboxClick: this.props.onCheckboxClick,
          selected: this.props.selected,
          selectOnEdit: this.props.selectOnEdit,
          editMode: this.props.editMode,
          editing: editing,
          onRowEditInit: this.onRowEditInit,
          onRowEditSave: this.onRowEditSave,
          onRowEditCancel: this.onRowEditCancel,
          showRowReorderElement: this.props.showRowReorderElement,
          showSelectionElement: this.props.showSelectionElement
        }));

        cells.push(cell);
      }

      return /*#__PURE__*/_react.default.createElement("tr", {
        role: "row",
        tabIndex: tabIndex,
        ref: function ref(el) {
          _this2.container = el;
        },
        className: className,
        onClick: this.onClick,
        onDoubleClick: this.onDoubleClick,
        onTouchEnd: this.onTouchEnd,
        onContextMenu: this.onRightClick,
        onMouseDown: this.onMouseDown,
        onDragStart: this.props.onDragStart,
        onDragEnd: this.onDragEnd,
        onDragOver: this.onDragOver,
        onDragLeave: this.onDragLeave,
        onDrop: this.onDrop,
        style: style,
        onKeyDown: this.onKeyDown
      }, cells);
    }
  }]);

  return BodyRow;
}(_react.Component);

exports.BodyRow = BodyRow;