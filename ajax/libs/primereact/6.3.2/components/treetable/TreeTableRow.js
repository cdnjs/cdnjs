"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeTableRow = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _TreeTableBodyCell = require("./TreeTableBodyCell");

var _Ripple = require("../ripple/Ripple");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var TreeTableRow = /*#__PURE__*/function (_Component) {
  _inherits(TreeTableRow, _Component);

  var _super = _createSuper(TreeTableRow);

  function TreeTableRow(props) {
    var _this;

    _classCallCheck(this, TreeTableRow);

    _this = _super.call(this, props);
    _this.onTogglerClick = _this.onTogglerClick.bind(_assertThisInitialized(_this));
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onTouchEnd = _this.onTouchEnd.bind(_assertThisInitialized(_this));
    _this.propagateUp = _this.propagateUp.bind(_assertThisInitialized(_this));
    _this.onCheckboxChange = _this.onCheckboxChange.bind(_assertThisInitialized(_this));
    _this.onCheckboxFocus = _this.onCheckboxFocus.bind(_assertThisInitialized(_this));
    _this.onCheckboxBlur = _this.onCheckboxBlur.bind(_assertThisInitialized(_this));
    _this.onRightClick = _this.onRightClick.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TreeTableRow, [{
    key: "isLeaf",
    value: function isLeaf() {
      return this.props.node.leaf === false ? false : !(this.props.node.children && this.props.node.children.length);
    }
  }, {
    key: "onTogglerClick",
    value: function onTogglerClick(event) {
      if (this.isExpanded()) this.collapse(event);else this.expand(event);
      event.preventDefault();
      event.stopPropagation();
    }
  }, {
    key: "expand",
    value: function expand(event) {
      var expandedKeys = this.props.expandedKeys ? _objectSpread({}, this.props.expandedKeys) : {};
      expandedKeys[this.props.node.key] = true;
      this.props.onToggle({
        originalEvent: event,
        value: expandedKeys
      });
      this.invokeToggleEvents(event, true);
    }
  }, {
    key: "collapse",
    value: function collapse(event) {
      var expandedKeys = _objectSpread({}, this.props.expandedKeys);

      delete expandedKeys[this.props.node.key];
      this.props.onToggle({
        originalEvent: event,
        value: expandedKeys
      });
      this.invokeToggleEvents(event, false);
    }
  }, {
    key: "invokeToggleEvents",
    value: function invokeToggleEvents(event, expanded) {
      if (expanded) {
        if (this.props.onExpand) {
          this.props.onExpand({
            originalEvent: event,
            node: this.props.node
          });
        }
      } else {
        if (this.props.onCollapse) {
          this.props.onCollapse({
            originalEvent: event,
            node: this.props.node
          });
        }
      }
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      if (this.props.onRowClick) {
        this.props.onRowClick({
          originalEvent: event,
          node: this.props.node
        });
      }

      var targetNode = event.target.nodeName;

      if (targetNode === 'INPUT' || targetNode === 'BUTTON' || targetNode === 'A' || _DomHandler.default.hasClass(event.target, 'p-clickable') || _DomHandler.default.hasClass(event.target, 'p-treetable-toggler') || _DomHandler.default.hasClass(event.target.parentElement, 'p-treetable-toggler')) {
        return;
      }

      if ((this.isSingleSelectionMode() || this.isMultipleSelectionMode()) && this.props.node.selectable !== false) {
        var selectionKeys;
        var selected = this.isSelected();
        var metaSelection = this.nodeTouched ? false : this.props.metaKeySelection;

        if (metaSelection) {
          var metaKey = event.metaKey || event.ctrlKey;

          if (selected && metaKey) {
            if (this.isSingleSelectionMode()) {
              selectionKeys = null;
            } else {
              selectionKeys = _objectSpread({}, this.props.selectionKeys);
              delete selectionKeys[this.props.node.key];
            }

            if (this.props.onUnselect) {
              this.props.onUnselect({
                originalEvent: event,
                node: this.props.node
              });
            }
          } else {
            if (this.isSingleSelectionMode()) {
              selectionKeys = this.props.node.key;
            } else if (this.isMultipleSelectionMode()) {
              selectionKeys = !metaKey ? {} : this.props.selectionKeys ? _objectSpread({}, this.props.selectionKeys) : {};
              selectionKeys[this.props.node.key] = true;
            }

            if (this.props.onSelect) {
              this.props.onSelect({
                originalEvent: event,
                node: this.props.node
              });
            }
          }
        } else {
          if (this.isSingleSelectionMode()) {
            if (selected) {
              selectionKeys = null;

              if (this.props.onUnselect) {
                this.props.onUnselect({
                  originalEvent: event,
                  node: this.props.node
                });
              }
            } else {
              selectionKeys = this.props.node.key;

              if (this.props.onSelect) {
                this.props.onSelect({
                  originalEvent: event,
                  node: this.props.node
                });
              }
            }
          } else {
            if (selected) {
              selectionKeys = _objectSpread({}, this.props.selectionKeys);
              delete selectionKeys[this.props.node.key];

              if (this.props.onUnselect) {
                this.props.onUnselect({
                  originalEvent: event,
                  node: this.props.node
                });
              }
            } else {
              selectionKeys = this.props.selectionKeys ? _objectSpread({}, this.props.selectionKeys) : {};
              selectionKeys[this.props.node.key] = true;

              if (this.props.onSelect) {
                this.props.onSelect({
                  originalEvent: event,
                  node: this.props.node
                });
              }
            }
          }
        }

        if (this.props.onSelectionChange) {
          this.props.onSelectionChange({
            originalEvent: event,
            value: selectionKeys
          });
        }
      }

      this.nodeTouched = false;
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd() {
      this.nodeTouched = true;
    }
  }, {
    key: "onCheckboxChange",
    value: function onCheckboxChange(event) {
      var checked = this.isChecked();
      var selectionKeys = this.props.selectionKeys ? _objectSpread({}, this.props.selectionKeys) : {};

      if (checked) {
        if (this.props.propagateSelectionDown) this.propagateDown(this.props.node, false, selectionKeys);else delete selectionKeys[this.props.node.key];

        if (this.props.propagateSelectionUp && this.props.onPropagateUp) {
          this.props.onPropagateUp({
            originalEvent: event,
            check: false,
            selectionKeys: selectionKeys
          });
        }

        if (this.props.onUnselect) {
          this.props.onUnselect({
            originalEvent: event,
            node: this.props.node
          });
        }
      } else {
        if (this.props.propagateSelectionDown) this.propagateDown(this.props.node, true, selectionKeys);else selectionKeys[this.props.node.key] = {
          checked: true
        };

        if (this.props.propagateSelectionUp && this.props.onPropagateUp) {
          this.props.onPropagateUp({
            originalEvent: event,
            check: true,
            selectionKeys: selectionKeys
          });
        }

        if (this.props.onSelect) {
          this.props.onSelect({
            originalEvent: event,
            node: this.props.node
          });
        }
      }

      if (this.props.onSelectionChange) {
        this.props.onSelectionChange({
          originalEvent: event,
          value: selectionKeys
        });
      }

      _DomHandler.default.clearSelection();
    }
  }, {
    key: "onCheckboxFocus",
    value: function onCheckboxFocus() {
      _DomHandler.default.addClass(this.checkboxBox, 'p-focus');
    }
  }, {
    key: "onCheckboxBlur",
    value: function onCheckboxBlur() {
      _DomHandler.default.removeClass(this.checkboxBox, 'p-focus');
    }
  }, {
    key: "propagateUp",
    value: function propagateUp(event) {
      var check = event.check;
      var selectionKeys = event.selectionKeys;
      var checkedChildCount = 0;
      var childPartialSelected = false;

      var _iterator = _createForOfIteratorHelper(this.props.node.children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;
          if (selectionKeys[child.key] && selectionKeys[child.key].checked) checkedChildCount++;else if (selectionKeys[child.key] && selectionKeys[child.key].partialChecked) childPartialSelected = true;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (check && checkedChildCount === this.props.node.children.length) {
        selectionKeys[this.props.node.key] = {
          checked: true,
          partialChecked: false
        };
      } else {
        if (!check) {
          delete selectionKeys[this.props.node.key];
        }

        if (childPartialSelected || checkedChildCount > 0 && checkedChildCount !== this.props.node.children.length) selectionKeys[this.props.node.key] = {
          checked: false,
          partialChecked: true
        };else selectionKeys[this.props.node.key] = {
          checked: false,
          partialChecked: false
        };
      }

      if (this.props.propagateSelectionUp && this.props.onPropagateUp) {
        this.props.onPropagateUp(event);
      }
    }
  }, {
    key: "propagateDown",
    value: function propagateDown(node, check, selectionKeys) {
      if (check) selectionKeys[node.key] = {
        checked: true,
        partialChecked: false
      };else delete selectionKeys[node.key];

      if (node.children && node.children.length) {
        for (var i = 0; i < node.children.length; i++) {
          this.propagateDown(node.children[i], check, selectionKeys);
        }
      }
    }
  }, {
    key: "onRightClick",
    value: function onRightClick(event) {
      _DomHandler.default.clearSelection();

      if (this.props.onContextMenuSelectionChange) {
        this.props.onContextMenuSelectionChange({
          originalEvent: event,
          value: this.props.node.key
        });
      }

      if (this.props.onContextMenu) {
        this.props.onContextMenu({
          originalEvent: event,
          node: this.props.node
        });
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (event.target === this.container) {
        var rowElement = event.currentTarget;

        switch (event.which) {
          //down arrow
          case 40:
            var nextRow = rowElement.nextElementSibling;

            if (nextRow) {
              nextRow.focus();
            }

            event.preventDefault();
            break;
          //up arrow

          case 38:
            var previousRow = rowElement.previousElementSibling;

            if (previousRow) {
              previousRow.focus();
            }

            event.preventDefault();
            break;
          //right arrow

          case 39:
            if (!this.isExpanded()) {
              this.expand(event);
            }

            event.preventDefault();
            break;
          //left arrow

          case 37:
            if (this.isExpanded()) {
              this.collapse(event);
            }

            event.preventDefault();
            break;
          //enter

          case 13:
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
    key: "isSingleSelectionMode",
    value: function isSingleSelectionMode() {
      return this.props.selectionMode && this.props.selectionMode === 'single';
    }
  }, {
    key: "isMultipleSelectionMode",
    value: function isMultipleSelectionMode() {
      return this.props.selectionMode && this.props.selectionMode === 'multiple';
    }
  }, {
    key: "isExpanded",
    value: function isExpanded() {
      return this.props.expandedKeys ? this.props.expandedKeys[this.props.node.key] !== undefined : false;
    }
  }, {
    key: "isSelected",
    value: function isSelected() {
      if ((this.props.selectionMode === 'single' || this.props.selectionMode === 'multiple') && this.props.selectionKeys) return this.props.selectionMode === 'single' ? this.props.selectionKeys === this.props.node.key : this.props.selectionKeys[this.props.node.key] !== undefined;else return false;
    }
  }, {
    key: "isChecked",
    value: function isChecked() {
      return this.props.selectionKeys ? this.props.selectionKeys[this.props.node.key] && this.props.selectionKeys[this.props.node.key].checked : false;
    }
  }, {
    key: "isPartialChecked",
    value: function isPartialChecked() {
      return this.props.selectionKeys ? this.props.selectionKeys[this.props.node.key] && this.props.selectionKeys[this.props.node.key].partialChecked : false;
    }
  }, {
    key: "renderToggler",
    value: function renderToggler() {
      var expanded = this.isExpanded();
      var iconClassName = (0, _ClassNames.classNames)('"p-treetable-toggler-icon pi pi-fw', {
        'pi-chevron-right': !expanded,
        'pi-chevron-down': expanded
      });
      var style = {
        marginLeft: this.props.level * 16 + 'px',
        visibility: this.props.node.leaf === false || this.props.node.children && this.props.node.children.length ? 'visible' : 'hidden'
      };
      return /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: "p-treetable-toggler p-link p-unselectable-text",
        onClick: this.onTogglerClick,
        tabIndex: -1,
        style: style
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: iconClassName
      }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));
    }
  }, {
    key: "renderCheckbox",
    value: function renderCheckbox() {
      var _this2 = this;

      if (this.props.selectionMode === 'checkbox' && this.props.node.selectable !== false) {
        var checked = this.isChecked();
        var partialChecked = this.isPartialChecked();
        var className = (0, _ClassNames.classNames)('p-checkbox-box', {
          'p-highlight': checked,
          'p-indeterminate': partialChecked
        });
        var icon = (0, _ClassNames.classNames)('p-checkbox-icon p-c', {
          'pi pi-check': checked,
          'pi pi-minus': partialChecked
        });
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "p-checkbox p-treetable-checkbox p-component",
          onClick: this.onCheckboxChange,
          role: "checkbox",
          "aria-checked": checked
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "p-hidden-accessible"
        }, /*#__PURE__*/_react.default.createElement("input", {
          type: "checkbox",
          onFocus: this.onCheckboxFocus,
          onBlur: this.onCheckboxBlur
        })), /*#__PURE__*/_react.default.createElement("div", {
          className: className,
          ref: function ref(el) {
            return _this2.checkboxBox = el;
          }
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: icon
        })));
      } else {
        return null;
      }
    }
  }, {
    key: "renderCell",
    value: function renderCell(column) {
      var toggler, checkbox;

      if (column.props.expander) {
        toggler = this.renderToggler();
        checkbox = this.renderCheckbox();
      }

      return /*#__PURE__*/_react.default.createElement(_TreeTableBodyCell.TreeTableBodyCell, _extends({
        key: column.props.columnKey || column.props.field
      }, column.props, {
        selectOnEdit: this.props.selectOnEdit,
        selected: this.isSelected(),
        node: this.props.node,
        rowIndex: this.props.rowIndex
      }), toggler, checkbox);
    }
  }, {
    key: "renderChildren",
    value: function renderChildren() {
      var _this3 = this;

      if (this.isExpanded() && this.props.node.children) {
        return this.props.node.children.map(function (childNode, index) {
          return /*#__PURE__*/_react.default.createElement(TreeTableRow, {
            key: childNode.key || JSON.stringify(childNode.data),
            level: _this3.props.level + 1,
            rowIndex: _this3.props.rowIndex + '_' + index,
            node: childNode,
            columns: _this3.props.columns,
            expandedKeys: _this3.props.expandedKeys,
            selectOnEdit: _this3.props.selectOnEdit,
            onToggle: _this3.props.onToggle,
            onExpand: _this3.props.onExpand,
            onCollapse: _this3.props.onCollapse,
            selectionMode: _this3.props.selectionMode,
            selectionKeys: _this3.props.selectionKeys,
            onSelectionChange: _this3.props.onSelectionChange,
            metaKeySelection: _this3.props.metaKeySelection,
            onRowClick: _this3.props.onRowClick,
            onSelect: _this3.props.onSelect,
            onUnselect: _this3.props.onUnselect,
            propagateSelectionUp: _this3.props.propagateSelectionUp,
            propagateSelectionDown: _this3.props.propagateSelectionDown,
            onPropagateUp: _this3.propagateUp,
            rowClassName: _this3.props.rowClassName,
            contextMenuSelectionKey: _this3.props.contextMenuSelectionKey,
            onContextMenuSelectionChange: _this3.props.onContextMenuSelectionChange,
            onContextMenu: _this3.props.onContextMenu
          });
        });
      } else {
        return null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var cells = this.props.columns.map(function (col) {
        return _this4.renderCell(col);
      });
      var children = this.renderChildren();
      var className = {
        'p-highlight': this.isSelected(),
        'p-highlight-contextmenu': this.props.contextMenuSelectionKey && this.props.contextMenuSelectionKey === this.props.node.key
      };

      if (this.props.rowClassName) {
        var rowClassName = this.props.rowClassName(this.props.node);
        className = _objectSpread(_objectSpread({}, className), rowClassName);
      }

      className = (0, _ClassNames.classNames)(className, this.props.node.className);
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("tr", {
        ref: function ref(el) {
          return _this4.container = el;
        },
        tabIndex: 0,
        className: className,
        style: this.props.node.style,
        onClick: this.onClick,
        onTouchEnd: this.onTouchEnd,
        onContextMenu: this.onRightClick,
        onKeyDown: this.onKeyDown
      }, cells), children);
    }
  }]);

  return TreeTableRow;
}(_react.Component);

exports.TreeTableRow = TreeTableRow;

_defineProperty(TreeTableRow, "defaultProps", {
  node: null,
  level: null,
  columns: null,
  expandedKeys: null,
  contextMenuSelectionKey: null,
  selectionMode: null,
  selectionKeys: null,
  metaKeySelection: true,
  propagateSelectionUp: true,
  propagateSelectionDown: true,
  rowClassName: null,
  onExpand: null,
  onCollapse: null,
  onToggle: null,
  onRowClick: null,
  onSelect: null,
  onUnselect: null,
  onSelectionChange: null,
  onPropagateUp: null,
  onContextMenuSelectionChange: null,
  onContextMenu: null
});

_defineProperty(TreeTableRow, "propTypes", {
  node: _propTypes.default.any,
  level: _propTypes.default.number,
  columns: _propTypes.default.array,
  expandedKeys: _propTypes.default.object,
  contextMenuSelectionKey: _propTypes.default.any,
  selectionMode: _propTypes.default.string,
  selectionKeys: _propTypes.default.any,
  metaKeySelection: _propTypes.default.bool,
  propagateSelectionUp: _propTypes.default.bool,
  propagateSelectionDown: _propTypes.default.bool,
  rowClassName: _propTypes.default.func,
  onExpand: _propTypes.default.func,
  onCollapse: _propTypes.default.func,
  onToggle: _propTypes.default.func,
  onRowClick: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onUnselect: _propTypes.default.func,
  onSelectionChange: _propTypes.default.func,
  onPropagateUp: _propTypes.default.func,
  onContextMenuSelectionChange: _propTypes.default.func,
  onContextMenu: _propTypes.default.func
});