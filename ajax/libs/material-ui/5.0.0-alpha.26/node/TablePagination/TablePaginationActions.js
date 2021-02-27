"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _KeyboardArrowLeft = _interopRequireDefault(require("../internal/svg-icons/KeyboardArrowLeft"));

var _KeyboardArrowRight = _interopRequireDefault(require("../internal/svg-icons/KeyboardArrowRight"));

var _useTheme = _interopRequireDefault(require("../styles/useTheme"));

var _IconButton = _interopRequireDefault(require("../IconButton"));

var _LastPage = _interopRequireDefault(require("../internal/svg-icons/LastPage"));

var _FirstPage = _interopRequireDefault(require("../internal/svg-icons/FirstPage"));

var _ref = /*#__PURE__*/React.createElement(_LastPage.default, null);

var _ref2 = /*#__PURE__*/React.createElement(_FirstPage.default, null);

var _ref3 = /*#__PURE__*/React.createElement(_KeyboardArrowRight.default, null);

var _ref4 = /*#__PURE__*/React.createElement(_KeyboardArrowLeft.default, null);

var _ref5 = /*#__PURE__*/React.createElement(_KeyboardArrowLeft.default, null);

var _ref6 = /*#__PURE__*/React.createElement(_KeyboardArrowRight.default, null);

var _ref7 = /*#__PURE__*/React.createElement(_FirstPage.default, null);

var _ref8 = /*#__PURE__*/React.createElement(_LastPage.default, null);

/**
 * @ignore - internal component.
 */
const TablePaginationActions = /*#__PURE__*/React.forwardRef(function TablePaginationActions(props, ref) {
  const {
    backIconButtonProps,
    count,
    getItemAriaLabel,
    nextIconButtonProps,
    onPageChange,
    page,
    rowsPerPage,
    showFirstButton,
    showLastButton
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["backIconButtonProps", "count", "getItemAriaLabel", "nextIconButtonProps", "onPageChange", "page", "rowsPerPage", "showFirstButton", "showLastButton"]);
  const theme = (0, _useTheme.default)();

  const handleFirstPageButtonClick = event => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = event => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    ref: ref
  }, other), showFirstButton && /*#__PURE__*/React.createElement(_IconButton.default, {
    onClick: handleFirstPageButtonClick,
    disabled: page === 0,
    "aria-label": getItemAriaLabel('first', page),
    title: getItemAriaLabel('first', page)
  }, theme.direction === 'rtl' ? _ref : _ref2), /*#__PURE__*/React.createElement(_IconButton.default, (0, _extends2.default)({
    onClick: handleBackButtonClick,
    disabled: page === 0,
    color: "inherit",
    "aria-label": getItemAriaLabel('previous', page),
    title: getItemAriaLabel('previous', page)
  }, backIconButtonProps), theme.direction === 'rtl' ? _ref3 : _ref4), /*#__PURE__*/React.createElement(_IconButton.default, (0, _extends2.default)({
    onClick: handleNextButtonClick,
    disabled: count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false,
    color: "inherit",
    "aria-label": getItemAriaLabel('next', page),
    title: getItemAriaLabel('next', page)
  }, nextIconButtonProps), theme.direction === 'rtl' ? _ref5 : _ref6), showLastButton && /*#__PURE__*/React.createElement(_IconButton.default, {
    onClick: handleLastPageButtonClick,
    disabled: page >= Math.ceil(count / rowsPerPage) - 1,
    "aria-label": getItemAriaLabel('last', page),
    title: getItemAriaLabel('last', page)
  }, theme.direction === 'rtl' ? _ref7 : _ref8));
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
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   *
   * @param {string} type The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous'). Defaults to 'page'.
   * @param {number} page The page number to format.
   * @returns {string}
   */
  getItemAriaLabel: _propTypes.default.func.isRequired,

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
  rowsPerPage: _propTypes.default.number.isRequired,

  /**
   * If `true`, show the first-page button.
   */
  showFirstButton: _propTypes.default.bool.isRequired,

  /**
   * If `true`, show the last-page button.
   */
  showLastButton: _propTypes.default.bool.isRequired
} : void 0;
var _default = TablePaginationActions;
exports.default = _default;