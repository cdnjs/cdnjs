import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles, useThemeVariants } from '../styles';
import usePagination from '../usePagination';
import PaginationItem from '../PaginationItem';
export const styles = {
  /* Styles applied to the root element. */
  root: {},

  /* Styles applied to the ul element. */
  ul: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    listStyle: 'none'
  },

  /* Styles applied to the root element if `variant="outlined"`. */
  outlined: {},

  /* Styles applied to the root element if `variant="text"`. */
  text: {}
};

function defaultGetAriaLabel(type, page, selected) {
  if (type === 'page') {
    return `${selected ? '' : 'Go to '}page ${page}`;
  }

  return `Go to ${type} page`;
}

const Pagination = /*#__PURE__*/React.forwardRef(function Pagination(props, ref) {
  const {
    boundaryCount = 1,
    classes,
    className,
    color = 'standard',
    count = 1,
    defaultPage = 1,
    disabled = false,
    getItemAriaLabel = defaultGetAriaLabel,
    hideNextButton = false,
    hidePrevButton = false,
    renderItem = item => /*#__PURE__*/React.createElement(PaginationItem, item),
    shape = 'circular',
    showFirstButton = false,
    showLastButton = false,
    siblingCount = 1,
    size = 'medium',
    variant = 'text'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["boundaryCount", "classes", "className", "color", "count", "defaultPage", "disabled", "getItemAriaLabel", "hideNextButton", "hidePrevButton", "onChange", "page", "renderItem", "shape", "showFirstButton", "showLastButton", "siblingCount", "size", "variant"]);

  const {
    items
  } = usePagination(_extends({}, props, {
    componentName: 'Pagination'
  }));
  const themeVariantsClasses = useThemeVariants(_extends({}, props, {
    boundaryCount,
    color,
    count,
    defaultPage,
    disabled,
    getItemAriaLabel,
    hideNextButton,
    hidePrevButton,
    renderItem,
    shape,
    showFirstButton,
    showLastButton,
    siblingCount,
    size,
    variant
  }), 'MuiPaginationItem');
  return /*#__PURE__*/React.createElement("nav", _extends({
    "aria-label": "pagination navigation",
    className: clsx(classes.root, classes[variant], themeVariantsClasses, className),
    ref: ref
  }, other), /*#__PURE__*/React.createElement("ul", {
    className: classes.ul
  }, items.map((item, index) => /*#__PURE__*/React.createElement("li", {
    key: index
  }, renderItem(_extends({}, item, {
    color,
    'aria-label': getItemAriaLabel(item.type, item.page, item.selected),
    shape,
    size,
    variant
  }))))));
}); // @default tags synced with default values from usePagination

process.env.NODE_ENV !== "production" ? Pagination.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Number of always visible pages at the beginning and end.
   * @default 1
   */
  boundaryCount: PropTypes.number,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The active color.
   * @default 'standard'
   */
  color: PropTypes.oneOf(['primary', 'secondary', 'standard']),

  /**
   * The total number of pages.
   * @default 1
   */
  count: PropTypes.number,

  /**
   * The page selected by default when the component is uncontrolled.
   * @default 1
   */
  defaultPage: PropTypes.number,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   *
   * @param {string} type The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous'). Defaults to 'page'.
   * @param {number} page The page number to format.
   * @param {bool} selected If true, the current page is selected.
   * @returns {string}
   */
  getItemAriaLabel: PropTypes.func,

  /**
   * If `true`, hide the next-page button.
   * @default false
   */
  hideNextButton: PropTypes.bool,

  /**
   * If `true`, hide the previous-page button.
   * @default false
   */
  hidePrevButton: PropTypes.bool,

  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onChange: PropTypes.func,

  /**
   * The current page.
   */
  page: PropTypes.number,

  /**
   * Render the item.
   *
   * @param {PaginationRenderItemParams} params The props to spread on a PaginationItem.
   * @returns {ReactNode}
   * @default (item) => <PaginationItem {...item} />
   */
  renderItem: PropTypes.func,

  /**
   * The shape of the pagination items.
   * @default 'circular'
   */
  shape: PropTypes.oneOf(['circular', 'rounded']),

  /**
   * If `true`, show the first-page button.
   * @default false
   */
  showFirstButton: PropTypes.bool,

  /**
   * If `true`, show the last-page button.
   * @default false
   */
  showLastButton: PropTypes.bool,

  /**
   * Number of always visible pages before and after the current page.
   * @default 1
   */
  siblingCount: PropTypes.number,

  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['large', 'medium', 'small']),

  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['outlined', 'text']), PropTypes.string])
} : void 0;
export default withStyles(styles, {
  name: 'MuiPagination'
})(Pagination);