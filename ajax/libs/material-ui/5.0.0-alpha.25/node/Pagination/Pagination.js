"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _styles = require("../styles");

var _usePagination = _interopRequireDefault(require("../usePagination"));

var _PaginationItem = _interopRequireDefault(require("../PaginationItem"));

const styles = {
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
exports.styles = styles;

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
    renderItem = item => /*#__PURE__*/React.createElement(_PaginationItem.default, item),
    shape = 'circular',
    showFirstButton = false,
    showLastButton = false,
    siblingCount = 1,
    size = 'medium',
    variant = 'text'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["boundaryCount", "classes", "className", "color", "count", "defaultPage", "disabled", "getItemAriaLabel", "hideNextButton", "hidePrevButton", "onChange", "page", "renderItem", "shape", "showFirstButton", "showLastButton", "siblingCount", "size", "variant"]);
  const {
    items
  } = (0, _usePagination.default)((0, _extends2.default)({}, props, {
    componentName: 'Pagination'
  }));
  const themeVariantsClasses = (0, _styles.useThemeVariants)((0, _extends2.default)({}, props, {
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
  return /*#__PURE__*/React.createElement("nav", (0, _extends2.default)({
    "aria-label": "pagination navigation",
    className: (0, _clsx.default)(classes.root, classes[variant], themeVariantsClasses, className),
    ref: ref
  }, other), /*#__PURE__*/React.createElement("ul", {
    className: classes.ul
  }, items.map((item, index) => /*#__PURE__*/React.createElement("li", {
    key: index
  }, renderItem((0, _extends2.default)({}, item, {
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
  boundaryCount: _propTypes.default.number,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The active color.
   * @default 'standard'
   */
  color: _propTypes.default.oneOf(['primary', 'secondary', 'standard']),

  /**
   * The total number of pages.
   * @default 1
   */
  count: _propTypes.default.number,

  /**
   * The page selected by default when the component is uncontrolled.
   * @default 1
   */
  defaultPage: _propTypes.default.number,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,

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
  getItemAriaLabel: _propTypes.default.func,

  /**
   * If `true`, hide the next-page button.
   * @default false
   */
  hideNextButton: _propTypes.default.bool,

  /**
   * If `true`, hide the previous-page button.
   * @default false
   */
  hidePrevButton: _propTypes.default.bool,

  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onChange: _propTypes.default.func,

  /**
   * The current page.
   */
  page: _propTypes.default.number,

  /**
   * Render the item.
   *
   * @param {PaginationRenderItemParams} params The props to spread on a PaginationItem.
   * @returns {ReactNode}
   * @default (item) => <PaginationItem {...item} />
   */
  renderItem: _propTypes.default.func,

  /**
   * The shape of the pagination items.
   * @default 'circular'
   */
  shape: _propTypes.default.oneOf(['circular', 'rounded']),

  /**
   * If `true`, show the first-page button.
   * @default false
   */
  showFirstButton: _propTypes.default.bool,

  /**
   * If `true`, show the last-page button.
   * @default false
   */
  showLastButton: _propTypes.default.bool,

  /**
   * Number of always visible pages before and after the current page.
   * @default 1
   */
  siblingCount: _propTypes.default.number,

  /**
   * The size of the component.
   * @default 'medium'
   */
  size: _propTypes.default.oneOf(['large', 'medium', 'small']),

  /**
   * The variant to use.
   * @default 'text'
   */
  variant: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['outlined', 'text']), _propTypes.default.string])
} : void 0;

var _default = (0, _styles.withStyles)(styles, {
  name: 'MuiPagination'
})(Pagination);

exports.default = _default;