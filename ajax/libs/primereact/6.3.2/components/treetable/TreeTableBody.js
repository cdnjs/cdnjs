"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeTableBody = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TreeTableRow = require("./TreeTableRow");

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

var TreeTableBody = /*#__PURE__*/function (_Component) {
  _inherits(TreeTableBody, _Component);

  var _super = _createSuper(TreeTableBody);

  function TreeTableBody() {
    _classCallCheck(this, TreeTableBody);

    return _super.apply(this, arguments);
  }

  _createClass(TreeTableBody, [{
    key: "createRow",
    value: function createRow(node, index) {
      return /*#__PURE__*/_react.default.createElement(_TreeTableRow.TreeTableRow, {
        key: node.key || JSON.stringify(node.data),
        level: 0,
        rowIndex: index,
        selectOnEdit: this.props.selectOnEdit,
        node: node,
        columns: this.props.columns,
        expandedKeys: this.props.expandedKeys,
        onToggle: this.props.onToggle,
        onExpand: this.props.onExpand,
        onCollapse: this.props.onCollapse,
        selectionMode: this.props.selectionMode,
        selectionKeys: this.props.selectionKeys,
        onSelectionChange: this.props.onSelectionChange,
        metaKeySelection: this.props.metaKeySelection,
        onRowClick: this.props.onRowClick,
        onSelect: this.props.onSelect,
        onUnselect: this.props.onUnselect,
        propagateSelectionUp: this.props.propagateSelectionUp,
        propagateSelectionDown: this.props.propagateSelectionDown,
        rowClassName: this.props.rowClassName,
        contextMenuSelectionKey: this.props.contextMenuSelectionKey,
        onContextMenuSelectionChange: this.props.onContextMenuSelectionChange,
        onContextMenu: this.props.onContextMenu
      });
    }
  }, {
    key: "renderRows",
    value: function renderRows() {
      var _this = this;

      if (this.props.paginator && !this.props.lazy) {
        var rpp = this.props.rows || 0;
        var startIndex = this.props.first || 0;
        var endIndex = startIndex + rpp;
        var rows = [];

        for (var i = startIndex; i < endIndex; i++) {
          var rowData = this.props.value[i];
          if (rowData) rows.push(this.createRow(this.props.value[i]));else break;
        }

        return rows;
      } else {
        return this.props.value.map(function (node, index) {
          return _this.createRow(node, index);
        });
      }
    }
  }, {
    key: "renderEmptyMessage",
    value: function renderEmptyMessage() {
      if (this.props.loading) {
        return null;
      } else {
        var colSpan = this.props.columns ? this.props.columns.length : null;
        return /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
          className: "p-treetable-emptymessage",
          colSpan: colSpan
        }, this.props.emptyMessage));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var content = this.props.value && this.props.value.length ? this.renderRows() : this.renderEmptyMessage();
      return /*#__PURE__*/_react.default.createElement("tbody", {
        className: "p-treetable-tbody"
      }, content);
    }
  }]);

  return TreeTableBody;
}(_react.Component);

exports.TreeTableBody = TreeTableBody;

_defineProperty(TreeTableBody, "defaultProps", {
  value: null,
  columns: null,
  expandedKeys: null,
  contextMenuSelectionKey: null,
  paginator: false,
  first: null,
  rows: null,
  selectionMode: null,
  selectionKeys: null,
  metaKeySelection: true,
  propagateSelectionUp: true,
  propagateSelectionDown: true,
  lazy: false,
  rowClassName: null,
  emptyMessage: "No records found",
  loading: false,
  onExpand: null,
  onCollapse: null,
  onToggle: null,
  onRowClick: null,
  onSelect: null,
  onUnselect: null,
  onSelectionChange: null,
  onContextMenuSelectionChange: null,
  onContextMenu: null
});

_defineProperty(TreeTableBody, "propTypes", {
  value: _propTypes.default.array,
  columns: _propTypes.default.array,
  expandedKeys: _propTypes.default.object,
  contextMenuSelectionKey: _propTypes.default.any,
  paginator: _propTypes.default.bool,
  first: _propTypes.default.number,
  rows: _propTypes.default.number,
  selectionMode: _propTypes.default.string,
  selectionKeys: _propTypes.default.any,
  metaKeySelection: _propTypes.default.bool,
  propagateSelectionUp: _propTypes.default.bool,
  propagateSelectionDown: _propTypes.default.bool,
  lazy: _propTypes.default.bool,
  rowClassName: _propTypes.default.func,
  emptyMessage: _propTypes.default.string,
  loading: _propTypes.default.bool,
  onExpand: _propTypes.default.func,
  onCollapse: _propTypes.default.func,
  onToggle: _propTypes.default.func,
  onRowClick: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onUnselect: _propTypes.default.func,
  onSelectionChange: _propTypes.default.func,
  onContextMenuSelectionChange: _propTypes.default.func,
  onContextMenu: _propTypes.default.func
});