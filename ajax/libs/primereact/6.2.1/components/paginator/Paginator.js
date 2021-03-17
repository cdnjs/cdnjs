"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Paginator = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _FirstPageLink = require("./FirstPageLink");

var _NextPageLink = require("./NextPageLink");

var _PrevPageLink = require("./PrevPageLink");

var _LastPageLink = require("./LastPageLink");

var _PageLinks = require("./PageLinks");

var _RowsPerPageDropdown = require("./RowsPerPageDropdown");

var _CurrentPageReport = require("./CurrentPageReport");

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var Paginator = /*#__PURE__*/function (_Component) {
  _inherits(Paginator, _Component);

  var _super = _createSuper(Paginator);

  function Paginator(props) {
    var _this;

    _classCallCheck(this, Paginator);

    _this = _super.call(this, props);
    _this.changePageToFirst = _this.changePageToFirst.bind(_assertThisInitialized(_this));
    _this.changePageToPrev = _this.changePageToPrev.bind(_assertThisInitialized(_this));
    _this.changePageToNext = _this.changePageToNext.bind(_assertThisInitialized(_this));
    _this.changePageToLast = _this.changePageToLast.bind(_assertThisInitialized(_this));
    _this.onRowsChange = _this.onRowsChange.bind(_assertThisInitialized(_this));
    _this.onPageLinkClick = _this.onPageLinkClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Paginator, [{
    key: "isFirstPage",
    value: function isFirstPage() {
      return this.getPage() === 0;
    }
  }, {
    key: "isLastPage",
    value: function isLastPage() {
      return this.getPage() === this.getPageCount() - 1;
    }
  }, {
    key: "getPageCount",
    value: function getPageCount() {
      return Math.ceil(this.props.totalRecords / this.props.rows) || 1;
    }
  }, {
    key: "calculatePageLinkBoundaries",
    value: function calculatePageLinkBoundaries() {
      var numberOfPages = this.getPageCount();
      var visiblePages = Math.min(this.props.pageLinkSize, numberOfPages); //calculate range, keep current in middle if necessary

      var start = Math.max(0, Math.ceil(this.getPage() - visiblePages / 2));
      var end = Math.min(numberOfPages - 1, start + visiblePages - 1); //check when approaching to last page

      var delta = this.props.pageLinkSize - (end - start + 1);
      start = Math.max(0, start - delta);
      return [start, end];
    }
  }, {
    key: "updatePageLinks",
    value: function updatePageLinks() {
      var pageLinks = [];
      var boundaries = this.calculatePageLinkBoundaries();
      var start = boundaries[0];
      var end = boundaries[1];

      for (var i = start; i <= end; i++) {
        pageLinks.push(i + 1);
      }

      return pageLinks;
    }
  }, {
    key: "changePage",
    value: function changePage(first, rows) {
      var pc = this.getPageCount();
      var p = Math.floor(first / rows);

      if (p >= 0 && p < pc) {
        var newPageState = {
          first: first,
          rows: rows,
          page: p,
          pageCount: pc
        };

        if (this.props.onPageChange) {
          this.props.onPageChange(newPageState);
        }
      }
    }
  }, {
    key: "getPage",
    value: function getPage() {
      return Math.floor(this.props.first / this.props.rows);
    }
  }, {
    key: "changePageToFirst",
    value: function changePageToFirst(event) {
      this.changePage(0, this.props.rows);
      event.preventDefault();
    }
  }, {
    key: "changePageToPrev",
    value: function changePageToPrev(event) {
      this.changePage(this.props.first - this.props.rows, this.props.rows);
      event.preventDefault();
    }
  }, {
    key: "onPageLinkClick",
    value: function onPageLinkClick(event) {
      this.changePage((event.value - 1) * this.props.rows, this.props.rows);
    }
  }, {
    key: "changePageToNext",
    value: function changePageToNext(event) {
      this.changePage(this.props.first + this.props.rows, this.props.rows);
      event.preventDefault();
    }
  }, {
    key: "changePageToLast",
    value: function changePageToLast(event) {
      this.changePage((this.getPageCount() - 1) * this.props.rows, this.props.rows);
      event.preventDefault();
    }
  }, {
    key: "onRowsChange",
    value: function onRowsChange(event) {
      this.changePage(0, event.value);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.rows !== prevProps.rows) {
        this.changePage(0, this.props.rows);
      } else if (this.getPage() > 0 && prevProps.totalRecords !== this.props.totalRecords && this.props.first >= this.props.totalRecords) {
        this.changePage((this.getPageCount() - 1) * this.props.rows, this.props.rows);
      }
    }
  }, {
    key: "renderElement",
    value: function renderElement(key, template) {
      var element;

      switch (key) {
        case 'FirstPageLink':
          element = /*#__PURE__*/_react.default.createElement(_FirstPageLink.FirstPageLink, {
            key: key,
            onClick: this.changePageToFirst,
            disabled: this.isFirstPage(),
            template: template
          });
          break;

        case 'PrevPageLink':
          element = /*#__PURE__*/_react.default.createElement(_PrevPageLink.PrevPageLink, {
            key: key,
            onClick: this.changePageToPrev,
            disabled: this.isFirstPage(),
            template: template
          });
          break;

        case 'NextPageLink':
          element = /*#__PURE__*/_react.default.createElement(_NextPageLink.NextPageLink, {
            key: key,
            onClick: this.changePageToNext,
            disabled: this.isLastPage(),
            template: template
          });
          break;

        case 'LastPageLink':
          element = /*#__PURE__*/_react.default.createElement(_LastPageLink.LastPageLink, {
            key: key,
            onClick: this.changePageToLast,
            disabled: this.isLastPage(),
            template: template
          });
          break;

        case 'PageLinks':
          element = /*#__PURE__*/_react.default.createElement(_PageLinks.PageLinks, {
            key: key,
            value: this.updatePageLinks(),
            page: this.getPage(),
            rows: this.props.rows,
            pageCount: this.getPageCount(),
            onClick: this.onPageLinkClick,
            template: template
          });
          break;

        case 'RowsPerPageDropdown':
          element = /*#__PURE__*/_react.default.createElement(_RowsPerPageDropdown.RowsPerPageDropdown, {
            key: key,
            value: this.props.rows,
            page: this.getPage(),
            pageCount: this.getPageCount(),
            totalRecords: this.props.totalRecords,
            options: this.props.rowsPerPageOptions,
            onChange: this.onRowsChange,
            appendTo: this.props.dropdownAppendTo,
            template: template
          });
          break;

        case 'CurrentPageReport':
          element = /*#__PURE__*/_react.default.createElement(_CurrentPageReport.CurrentPageReport, {
            reportTemplate: this.props.currentPageReportTemplate,
            key: key,
            page: this.getPage(),
            pageCount: this.getPageCount(),
            first: this.props.first,
            rows: this.props.rows,
            totalRecords: this.props.totalRecords,
            template: template
          });
          break;

        default:
          element = null;
          break;
      }

      return element;
    }
  }, {
    key: "renderElements",
    value: function renderElements() {
      var _this2 = this;

      var template = this.props.template;

      if (template) {
        if (_typeof(template) === 'object') {
          return template.layout ? template.layout.split(' ').map(function (value) {
            var key = value.trim();
            return _this2.renderElement(key, template[key]);
          }) : Object.entries(template).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                _template = _ref2[1];

            return _this2.renderElement(key, _template);
          });
        }

        return template.split(' ').map(function (value) {
          return _this2.renderElement(value.trim());
        });
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.props.alwaysShow && this.getPageCount() === 1) {
        return null;
      } else {
        var className = (0, _ClassNames.classNames)('p-paginator p-component', this.props.className);

        var leftContent = _ObjectUtils.default.getJSXElement(this.props.leftContent, this.props);

        var rightContent = _ObjectUtils.default.getJSXElement(this.props.rightContent, this.props);

        var elements = this.renderElements();

        var leftElement = leftContent && /*#__PURE__*/_react.default.createElement("div", {
          className: "p-paginator-left-content"
        }, leftContent);

        var rightElement = rightContent && /*#__PURE__*/_react.default.createElement("div", {
          className: "p-paginator-right-content"
        }, rightContent);

        return /*#__PURE__*/_react.default.createElement("div", {
          className: className,
          style: this.props.style
        }, leftElement, elements, rightElement);
      }
    }
  }]);

  return Paginator;
}(_react.Component);

exports.Paginator = Paginator;

_defineProperty(Paginator, "defaultProps", {
  totalRecords: 0,
  rows: 0,
  first: 0,
  pageLinkSize: 5,
  rowsPerPageOptions: null,
  style: null,
  className: null,
  template: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
  onPageChange: null,
  leftContent: null,
  rightContent: null,
  dropdownAppendTo: null,
  currentPageReportTemplate: '({currentPage} of {totalPages})',
  alwaysShow: true
});

_defineProperty(Paginator, "propTypes", {
  totalRecords: _propTypes.default.number,
  rows: _propTypes.default.number,
  first: _propTypes.default.number,
  pageLinkSize: _propTypes.default.number,
  rowsPerPageOptions: _propTypes.default.array,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  template: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  onPageChange: _propTypes.default.func,
  leftContent: _propTypes.default.any,
  rightContent: _propTypes.default.any,
  dropdownAppendTo: _propTypes.default.any,
  currentPageReportTemplate: _propTypes.default.any,
  alwaysShow: _propTypes.default.bool
});