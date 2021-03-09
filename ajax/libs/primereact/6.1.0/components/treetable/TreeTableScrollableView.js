"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeTableScrollableView = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

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

var TreeTableScrollableView = /*#__PURE__*/function (_Component) {
  _inherits(TreeTableScrollableView, _Component);

  var _super = _createSuper(TreeTableScrollableView);

  function TreeTableScrollableView(props) {
    var _this;

    _classCallCheck(this, TreeTableScrollableView);

    _this = _super.call(this, props);
    _this.onHeaderScroll = _this.onHeaderScroll.bind(_assertThisInitialized(_this));
    _this.onBodyScroll = _this.onBodyScroll.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TreeTableScrollableView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setScrollHeight();

      if (!this.props.frozen) {
        var scrollBarWidth = _DomHandler.default.calculateScrollbarWidth();

        this.scrollHeaderBox.style.marginRight = scrollBarWidth + 'px';

        if (this.scrollFooterBox) {
          this.scrollFooterBox.style.marginRight = scrollBarWidth + 'px';
        }
      } else {
        this.scrollBody.style.paddingBottom = _DomHandler.default.calculateScrollbarWidth() + 'px';
      }
    }
  }, {
    key: "setScrollHeight",
    value: function setScrollHeight() {
      if (this.props.scrollHeight) {
        if (this.props.scrollHeight.indexOf('%') !== -1) {
          var datatableContainer = this.findDataTableContainer(this.container);
          this.scrollBody.style.visibility = 'hidden';
          this.scrollBody.style.height = '100px'; //temporary height to calculate static height

          var containerHeight = _DomHandler.default.getOuterHeight(datatableContainer);

          var relativeHeight = _DomHandler.default.getOuterHeight(datatableContainer.parentElement) * parseInt(this.props.scrollHeight, 10) / 100;
          var staticHeight = containerHeight - 100; //total height of headers, footers, paginators

          var scrollBodyHeight = relativeHeight - staticHeight;
          this.scrollBody.style.height = 'auto';
          this.scrollBody.style.maxHeight = scrollBodyHeight + 'px';
          this.scrollBody.style.visibility = 'visible';
        } else {
          this.scrollBody.style.maxHeight = this.props.scrollHeight;
        }
      }
    }
  }, {
    key: "findDataTableContainer",
    value: function findDataTableContainer(element) {
      if (element) {
        var el = element;

        while (el && !_DomHandler.default.hasClass(el, 'p-treetable')) {
          el = el.parentElement;
        }

        return el;
      } else {
        return null;
      }
    }
  }, {
    key: "onHeaderScroll",
    value: function onHeaderScroll() {
      this.scrollHeader.scrollLeft = 0;
    }
  }, {
    key: "onBodyScroll",
    value: function onBodyScroll() {
      var frozenView = this.container.previousElementSibling;
      var frozenScrollBody;

      if (frozenView) {
        frozenScrollBody = _DomHandler.default.findSingle(frozenView, '.p-treetable-scrollable-body');
      }

      this.scrollHeaderBox.style.marginLeft = -1 * this.scrollBody.scrollLeft + 'px';

      if (this.scrollFooterBox) {
        this.scrollFooterBox.style.marginLeft = -1 * this.scrollBody.scrollLeft + 'px';
      }

      if (frozenScrollBody) {
        frozenScrollBody.scrollTop = this.scrollBody.scrollTop;
      }
    }
  }, {
    key: "calculateRowHeight",
    value: function calculateRowHeight() {
      var row = _DomHandler.default.findSingle(this.scrollTable, 'tr:not(.p-treetable-emptymessage-row)');

      if (row) {
        this.rowHeight = _DomHandler.default.getOuterHeight(row);
      }
    }
  }, {
    key: "renderColGroup",
    value: function renderColGroup() {
      if (this.props.columns && this.props.columns.length) {
        return /*#__PURE__*/_react.default.createElement("colgroup", {
          className: "p-treetable-scrollable-colgroup"
        }, this.props.columns.map(function (col, i) {
          return /*#__PURE__*/_react.default.createElement("col", {
            key: col.field + '_' + i
          });
        }));
      } else {
        return null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var className = (0, _ClassNames.classNames)('p-treetable-scrollable-view', {
        'p-treetable-frozen-view': this.props.frozen,
        'p-treetable-unfrozen-view': !this.props.frozen && this.props.frozenWidth
      });
      var width = this.props.frozen ? this.props.frozenWidth : 'calc(100% - ' + this.props.frozenWidth + ')';
      var left = this.props.frozen ? null : this.props.frozenWidth;
      var colGroup = this.renderColGroup();
      var scrollableBodyStyle = !this.props.frozen && this.props.scrollHeight ? {
        overflowY: 'scroll'
      } : null;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: className,
        style: {
          width: width,
          left: left
        },
        ref: function ref(el) {
          _this2.container = el;
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-treetable-scrollable-header",
        ref: function ref(el) {
          _this2.scrollHeader = el;
        },
        onScroll: this.onHeaderScroll
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-treetable-scrollable-header-box",
        ref: function ref(el) {
          _this2.scrollHeaderBox = el;
        }
      }, /*#__PURE__*/_react.default.createElement("table", {
        className: "p-treetable-scrollable-header-table"
      }, colGroup, this.props.header))), /*#__PURE__*/_react.default.createElement("div", {
        className: "p-treetable-scrollable-body",
        ref: function ref(el) {
          _this2.scrollBody = el;
        },
        style: scrollableBodyStyle,
        onScroll: this.onBodyScroll
      }, /*#__PURE__*/_react.default.createElement("table", {
        ref: function ref(el) {
          _this2.scrollTable = el;
        },
        style: {
          top: '0'
        },
        className: "p-treetable-scrollable-body-table"
      }, colGroup, this.props.body)), /*#__PURE__*/_react.default.createElement("div", {
        className: "p-treetable-scrollable-footer",
        ref: function ref(el) {
          _this2.scrollFooter = el;
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-treetable-scrollable-footer-box",
        ref: function ref(el) {
          _this2.scrollFooterBox = el;
        }
      }, /*#__PURE__*/_react.default.createElement("table", {
        className: "p-treetable-scrollable-footer-table"
      }, colGroup, this.props.footer))));
    }
  }]);

  return TreeTableScrollableView;
}(_react.Component);

exports.TreeTableScrollableView = TreeTableScrollableView;

_defineProperty(TreeTableScrollableView, "defaultProps", {
  header: null,
  body: null,
  footer: null,
  columns: null,
  frozen: null,
  frozenWidth: null,
  frozenBody: null
});

_defineProperty(TreeTableScrollableView, "propTypes", {
  header: _propTypes.default.any,
  body: _propTypes.default.any,
  footer: _propTypes.default.any,
  columns: _propTypes.default.array,
  frozen: _propTypes.default.bool,
  frozenWidth: _propTypes.default.string,
  frozenBody: _propTypes.default.any
});