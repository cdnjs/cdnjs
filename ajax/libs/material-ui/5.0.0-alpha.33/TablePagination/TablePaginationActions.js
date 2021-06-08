import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import useTheme from '../styles/useTheme';
import IconButton from '../IconButton';
import LastPageIcon from '../internal/svg-icons/LastPage';
import FirstPageIcon from '../internal/svg-icons/FirstPage';
/**
 * @ignore - internal component.
 */

import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var _ref = /*#__PURE__*/_jsx(LastPageIcon, {});

var _ref2 = /*#__PURE__*/_jsx(FirstPageIcon, {});

var _ref3 = /*#__PURE__*/_jsx(KeyboardArrowRight, {});

var _ref4 = /*#__PURE__*/_jsx(KeyboardArrowLeft, {});

var _ref5 = /*#__PURE__*/_jsx(KeyboardArrowLeft, {});

var _ref6 = /*#__PURE__*/_jsx(KeyboardArrowRight, {});

var _ref7 = /*#__PURE__*/_jsx(FirstPageIcon, {});

var _ref8 = /*#__PURE__*/_jsx(LastPageIcon, {});

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
        other = _objectWithoutPropertiesLoose(props, ["backIconButtonProps", "count", "getItemAriaLabel", "nextIconButtonProps", "onPageChange", "page", "rowsPerPage", "showFirstButton", "showLastButton"]);

  const theme = useTheme();

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

  return /*#__PURE__*/_jsxs("div", _extends({
    ref: ref
  }, other, {
    children: [showFirstButton && /*#__PURE__*/_jsx(IconButton, {
      onClick: handleFirstPageButtonClick,
      disabled: page === 0,
      "aria-label": getItemAriaLabel('first', page),
      title: getItemAriaLabel('first', page),
      children: theme.direction === 'rtl' ? _ref : _ref2
    }), /*#__PURE__*/_jsx(IconButton, _extends({
      onClick: handleBackButtonClick,
      disabled: page === 0,
      color: "inherit",
      "aria-label": getItemAriaLabel('previous', page),
      title: getItemAriaLabel('previous', page)
    }, backIconButtonProps, {
      children: theme.direction === 'rtl' ? _ref3 : _ref4
    })), /*#__PURE__*/_jsx(IconButton, _extends({
      onClick: handleNextButtonClick,
      disabled: count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false,
      color: "inherit",
      "aria-label": getItemAriaLabel('next', page),
      title: getItemAriaLabel('next', page)
    }, nextIconButtonProps, {
      children: theme.direction === 'rtl' ? _ref5 : _ref6
    })), showLastButton && /*#__PURE__*/_jsx(IconButton, {
      onClick: handleLastPageButtonClick,
      disabled: page >= Math.ceil(count / rowsPerPage) - 1,
      "aria-label": getItemAriaLabel('last', page),
      title: getItemAriaLabel('last', page),
      children: theme.direction === 'rtl' ? _ref7 : _ref8
    })]
  }));
});
process.env.NODE_ENV !== "production" ? TablePaginationActions.propTypes = {
  /**
   * Props applied to the back arrow [`IconButton`](/api/icon-button/) element.
   */
  backIconButtonProps: PropTypes.object,

  /**
   * The total number of rows.
   */
  count: PropTypes.number.isRequired,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   *
   * @param {string} type The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous'). Defaults to 'page'.
   * @param {number} page The page number to format.
   * @returns {string}
   */
  getItemAriaLabel: PropTypes.func.isRequired,

  /**
   * Props applied to the next arrow [`IconButton`](/api/icon-button/) element.
   */
  nextIconButtonProps: PropTypes.object,

  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onPageChange: PropTypes.func.isRequired,

  /**
   * The zero-based index of the current page.
   */
  page: PropTypes.number.isRequired,

  /**
   * The number of rows per page.
   */
  rowsPerPage: PropTypes.number.isRequired,

  /**
   * If `true`, show the first-page button.
   */
  showFirstButton: PropTypes.bool.isRequired,

  /**
   * If `true`, show the last-page button.
   */
  showLastButton: PropTypes.bool.isRequired
} : void 0;
export default TablePaginationActions;