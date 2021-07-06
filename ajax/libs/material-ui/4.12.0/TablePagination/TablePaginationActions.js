"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _KeyboardArrowLeft = _interopRequireDefault(require("../internal/svg-icons/KeyboardArrowLeft"));

var _KeyboardArrowRight = _interopRequireDefault(require("../internal/svg-icons/KeyboardArrowRight"));

var _useTheme = _interopRequireDefault(require("../styles/useTheme"));

var _IconButton = _interopRequireDefault(require("../IconButton"));

var _ref = /*#__PURE__*/React.createElement(_KeyboardArrowRight.default, null);

var _ref2 = /*#__PURE__*/React.createElement(_KeyboardArrowLeft.default, null);

var _ref3 = /*#__PURE__*/React.createElement(_KeyboardArrowLeft.default, null);

var _ref4 = /*#__PURE__*/React.createElement(_KeyboardArrowRight.default, null);

/**
 * @ignore - internal component.
 */
var TablePaginationActions = /*#__PURE__*/React.forwardRef(function TablePaginationActions(props, ref) {
  var backIconButtonProps = props.backIconButtonProps,
      count = props.count,
      nextIconButtonProps = props.nextIconButtonProps,
      onPageChange = props.onPageChange,
      page = props.page,
      rowsPerPage = props.rowsPerPage,
      other = (0, _objectWithoutProperties2.default)(props, ["backIconButtonProps", "count", "nextIconButtonProps", "onPageChange", "page", "rowsPerPage"]);
  var theme = (0, _useTheme.default)();

  var handleBackButtonClick = function handleBackButtonClick(event) {
    onPageChange(event, page - 1);
  };

  var handleNextButtonClick = function handleNextButtonClick(event) {
    onPageChange(event, page + 1);
  };

  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    ref: ref
  }, other), /*#__PURE__*/React.createElement(_IconButton.default, (0, _extends2.default)({
    onClick: handleBackButtonClick,
    disabled: page === 0,
    color: "inherit"
  }, backIconButtonProps), theme.direction === 'rtl' ? _ref : _ref2), /*#__PURE__*/React.createElement(_IconButton.default, (0, _extends2.default)({
    onClick: handleNextButtonClick,
    disabled: count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false,
    color: "inherit"
  }, nextIconButtonProps), theme.direction === 'rtl' ? _ref3 : _ref4));
});
process.env.NODE_ENV !== "production" ? TablePaginationActions.propTypes = {
  /**
   * Props applied to the back arrow [`IconButton`](/api/icon-button/) element.
   */
  backIconButtonProps: _propTypes.default.object,

  /**
   * The total number of rows.
   */
  count: _propTypes.default.number.isRequired,

  /**
   * Props applied to the next arrow [`IconButton`](/api/icon-button/) element.
   */
  nextIconButtonProps: _propTypes.default.object,

  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onPageChange: _propTypes.default.func.isRequired,

  /**
   * The zero-based index of the current page.
   */
  page: _propTypes.default.number.isRequired,

  /**
   * The number of rows per page.
   */
  rowsPerPage: _propTypes.default.number.isRequired
} : void 0;
var _default = TablePaginationActions;
exports.default = _default;