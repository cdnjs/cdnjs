"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Column = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Column = /*#__PURE__*/function (_Component) {
  _inherits(Column, _Component);

  var _super = _createSuper(Column);

  function Column() {
    _classCallCheck(this, Column);

    return _super.apply(this, arguments);
  }

  return Column;
}(_react.Component);

exports.Column = Column;

_defineProperty(Column, "defaultProps", {
  columnKey: null,
  field: null,
  sortField: null,
  filterField: null,
  header: null,
  body: null,
  loadingBody: null,
  footer: null,
  sortable: false,
  sortFunction: null,
  filter: false,
  filterMatchMode: 'startsWith',
  filterPlaceholder: null,
  filterType: 'text',
  filterMaxLength: null,
  filterElement: null,
  filterFunction: null,
  filterHeaderStyle: null,
  filterHeaderClassName: null,
  style: null,
  className: null,
  headerStyle: null,
  headerClassName: null,
  bodyStyle: null,
  bodyClassName: null,
  footerStyle: null,
  footerClassName: null,
  expander: false,
  frozen: false,
  selectionMode: null,
  colSpan: null,
  rowSpan: null,
  editor: null,
  editorValidator: null,
  editorValidatorEvent: 'click',
  onBeforeEditorHide: null,
  onBeforeEditorShow: null,
  onEditorInit: null,
  onEditorSubmit: null,
  onEditorCancel: null,
  excludeGlobalFilter: false,
  rowReorder: false,
  rowReorderIcon: 'pi pi-bars',
  rowEditor: false,
  exportable: true,
  reorderable: true
});

_defineProperty(Column, "propTypes", {
  columnKey: _propTypes.default.string,
  field: _propTypes.default.string,
  sortField: _propTypes.default.string,
  filterField: _propTypes.default.string,
  header: _propTypes.default.any,
  body: _propTypes.default.any,
  loadingBody: _propTypes.default.func,
  footer: _propTypes.default.any,
  sortable: _propTypes.default.any,
  sortFunction: _propTypes.default.func,
  filter: _propTypes.default.bool,
  filterMatchMode: _propTypes.default.string,
  filterPlaceholder: _propTypes.default.string,
  filterType: _propTypes.default.string,
  filterMaxLength: _propTypes.default.number,
  filterElement: _propTypes.default.object,
  filterFunction: _propTypes.default.func,
  filterHeaderStyle: _propTypes.default.object,
  filterHeaderClassName: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  headerStyle: _propTypes.default.object,
  headerClassName: _propTypes.default.string,
  bodyStyle: _propTypes.default.object,
  bodyClassName: _propTypes.default.string,
  footerStyle: _propTypes.default.object,
  footerClassName: _propTypes.default.string,
  expander: _propTypes.default.bool,
  frozen: _propTypes.default.bool,
  selectionMode: _propTypes.default.string,
  colSpan: _propTypes.default.number,
  rowSpan: _propTypes.default.number,
  editor: _propTypes.default.func,
  editorValidator: _propTypes.default.func,
  editorValidatorEvent: _propTypes.default.string,
  onBeforeEditorHide: _propTypes.default.func,
  onBeforeEditorShow: _propTypes.default.func,
  onEditorInit: _propTypes.default.func,
  onEditorSubmit: _propTypes.default.func,
  onEditorCancel: _propTypes.default.func,
  excludeGlobalFilter: _propTypes.default.bool,
  rowReorder: _propTypes.default.bool,
  rowReorderIcon: _propTypes.default.string,
  rowEditor: _propTypes.default.bool,
  exportable: _propTypes.default.bool,
  reorderable: _propTypes.default.bool
});