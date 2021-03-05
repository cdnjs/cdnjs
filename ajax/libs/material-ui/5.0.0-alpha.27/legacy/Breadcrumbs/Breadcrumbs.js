import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import Typography from '../Typography';
import BreadcrumbCollapsed from './BreadcrumbCollapsed';
import breadcrumbsClasses, { getBreadcrumbsUtilityClass } from './breadcrumbsClasses';

var overridesResolver = function overridesResolver(props, styles) {
  var _deepmerge;

  return deepmerge((_deepmerge = {}, _defineProperty(_deepmerge, "& .".concat(breadcrumbsClasses.ol), styles.ol), _defineProperty(_deepmerge, "& .".concat(breadcrumbsClasses.li), styles.li), _defineProperty(_deepmerge, "& .".concat(breadcrumbsClasses.separator), styles.separator), _deepmerge), styles.root || {});
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes;
  var slots = {
    root: ['root'],
    li: ['li'],
    ol: ['ol'],
    separator: ['separator']
  };
  return composeClasses(slots, getBreadcrumbsUtilityClass, classes);
};

var BreadcrumbsRoot = experimentalStyled(Typography, {}, {
  name: 'MuiBreadcrumbs',
  slot: 'Root',
  overridesResolver: overridesResolver
})({});
var BreadcrumbsOl = experimentalStyled('ol', {}, {
  name: 'MuiBreadcrumbs',
  slot: 'Ol'
})({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  listStyle: 'none'
});
var BreadcrumbsSeparator = experimentalStyled('li', {}, {
  name: 'MuiBreadcrumbs',
  slot: 'Separator'
})({
  display: 'flex',
  userSelect: 'none',
  marginLeft: 8,
  marginRight: 8
});

function insertSeparators(items, className, separator, styleProps) {
  return items.reduce(function (acc, current, index) {
    if (index < items.length - 1) {
      acc = acc.concat(current, /*#__PURE__*/React.createElement(BreadcrumbsSeparator, {
        "aria-hidden": true,
        key: "separator-".concat(index),
        className: className,
        styleProps: styleProps
      }, separator));
    } else {
      acc.push(current);
    }

    return acc;
  }, []);
}

var Breadcrumbs = /*#__PURE__*/React.forwardRef(function Breadcrumbs(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiBreadcrumbs'
  });

  var children = props.children,
      className = props.className,
      _props$component = props.component,
      component = _props$component === void 0 ? 'nav' : _props$component,
      _props$expandText = props.expandText,
      expandText = _props$expandText === void 0 ? 'Show path' : _props$expandText,
      _props$itemsAfterColl = props.itemsAfterCollapse,
      itemsAfterCollapse = _props$itemsAfterColl === void 0 ? 1 : _props$itemsAfterColl,
      _props$itemsBeforeCol = props.itemsBeforeCollapse,
      itemsBeforeCollapse = _props$itemsBeforeCol === void 0 ? 1 : _props$itemsBeforeCol,
      _props$maxItems = props.maxItems,
      maxItems = _props$maxItems === void 0 ? 8 : _props$maxItems,
      _props$separator = props.separator,
      separator = _props$separator === void 0 ? '/' : _props$separator,
      other = _objectWithoutProperties(props, ["children", "className", "component", "expandText", "itemsAfterCollapse", "itemsBeforeCollapse", "maxItems", "separator"]);

  var _React$useState = React.useState(false),
      expanded = _React$useState[0],
      setExpanded = _React$useState[1];

  var styleProps = _extends({}, props, {
    component: component,
    expanded: expanded,
    expandText: expandText,
    itemsAfterCollapse: itemsAfterCollapse,
    itemsBeforeCollapse: itemsBeforeCollapse,
    maxItems: maxItems,
    separator: separator
  });

  var classes = useUtilityClasses(styleProps);
  var listRef = React.useRef(null);

  var renderItemsBeforeAndAfter = function renderItemsBeforeAndAfter(allItems) {
    var handleClickExpand = function handleClickExpand() {
      setExpanded(true); // The clicked element received the focus but gets removed from the DOM.
      // Let's keep the focus in the component after expanding.
      // Moving it to the <ol> or <nav> does not cause any announcement in NVDA.
      // By moving it to some link/button at least we have some announcement.

      var focusable = listRef.current.querySelector('a[href],button,[tabindex]');

      if (focusable) {
        focusable.focus();
      }
    }; // This defends against someone passing weird input, to ensure that if all
    // items would be shown anyway, we just show all items without the EllipsisItem


    if (itemsBeforeCollapse + itemsAfterCollapse >= allItems.length) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(['Material-UI: You have provided an invalid combination of props to the Breadcrumbs.', "itemsAfterCollapse={".concat(itemsAfterCollapse, "} + itemsBeforeCollapse={").concat(itemsBeforeCollapse, "} >= maxItems={").concat(maxItems, "}")].join('\n'));
      }

      return allItems;
    }

    return [].concat(_toConsumableArray(allItems.slice(0, itemsBeforeCollapse)), [/*#__PURE__*/React.createElement(BreadcrumbCollapsed, {
      "aria-label": expandText,
      key: "ellipsis",
      onClick: handleClickExpand
    })], _toConsumableArray(allItems.slice(allItems.length - itemsAfterCollapse, allItems.length)));
  };

  var allItems = React.Children.toArray(children).filter(function (child) {
    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(["Material-UI: The Breadcrumbs component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }

    return /*#__PURE__*/React.isValidElement(child);
  }).map(function (child, index) {
    return /*#__PURE__*/React.createElement("li", {
      className: classes.li,
      key: "child-".concat(index)
    }, child);
  });
  return /*#__PURE__*/React.createElement(BreadcrumbsRoot, _extends({
    ref: ref,
    component: component,
    color: "textSecondary",
    className: clsx(classes.root, className),
    styleProps: styleProps
  }, other), /*#__PURE__*/React.createElement(BreadcrumbsOl, {
    className: classes.ol,
    ref: listRef,
    styleProps: styleProps
  }, insertSeparators(expanded || maxItems && allItems.length <= maxItems ? allItems : renderItemsBeforeAndAfter(allItems), classes.separator, separator, styleProps)));
});
process.env.NODE_ENV !== "production" ? Breadcrumbs.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * Override the default label for the expand button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Show path'
   */
  expandText: PropTypes.string,

  /**
   * If max items is exceeded, the number of items to show after the ellipsis.
   * @default 1
   */
  itemsAfterCollapse: PropTypes.number,

  /**
   * If max items is exceeded, the number of items to show before the ellipsis.
   * @default 1
   */
  itemsBeforeCollapse: PropTypes.number,

  /**
   * Specifies the maximum number of breadcrumbs to display. When there are more
   * than the maximum number, only the first `itemsBeforeCollapse` and last `itemsAfterCollapse`
   * will be shown, with an ellipsis in between.
   * @default 8
   */
  maxItems: PropTypes.number,

  /**
   * Custom separator node.
   * @default '/'
   */
  separator: PropTypes.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default Breadcrumbs;