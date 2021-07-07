import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
import BreadcrumbCollapsed from './BreadcrumbCollapsed';
export const styles = {
  /* Styles applied to the root element. */
  root: {},

  /* Styles applied to the ol element. */
  ol: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    listStyle: 'none'
  },

  /* Styles applied to the li element. */
  li: {},

  /* Styles applied to the separator element. */
  separator: {
    display: 'flex',
    userSelect: 'none',
    marginLeft: 8,
    marginRight: 8
  }
};

function insertSeparators(items, className, separator) {
  return items.reduce((acc, current, index) => {
    if (index < items.length - 1) {
      acc = acc.concat(current, /*#__PURE__*/React.createElement("li", {
        "aria-hidden": true,
        key: `separator-${index}`,
        className: className
      }, separator));
    } else {
      acc.push(current);
    }

    return acc;
  }, []);
}

const Breadcrumbs = /*#__PURE__*/React.forwardRef(function Breadcrumbs(props, ref) {
  const {
    children,
    classes,
    className,
    component: Component = 'nav',
    expandText = 'Show path',
    itemsAfterCollapse = 1,
    itemsBeforeCollapse = 1,
    maxItems = 8,
    separator = '/'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["children", "classes", "className", "component", "expandText", "itemsAfterCollapse", "itemsBeforeCollapse", "maxItems", "separator"]);

  const [expanded, setExpanded] = React.useState(false);

  const renderItemsBeforeAndAfter = allItems => {
    const handleClickExpand = event => {
      setExpanded(true); // The clicked element received the focus but gets removed from the DOM.
      // Let's keep the focus in the component after expanding.

      const focusable = event.currentTarget.parentNode.querySelector('a[href],button,[tabindex]');

      if (focusable) {
        focusable.focus();
      }
    }; // This defends against someone passing weird input, to ensure that if all
    // items would be shown anyway, we just show all items without the EllipsisItem


    if (itemsBeforeCollapse + itemsAfterCollapse >= allItems.length) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(['Material-UI: You have provided an invalid combination of props to the Breadcrumbs.', `itemsAfterCollapse={${itemsAfterCollapse}} + itemsBeforeCollapse={${itemsBeforeCollapse}} >= maxItems={${maxItems}}`].join('\n'));
      }

      return allItems;
    }

    return [...allItems.slice(0, itemsBeforeCollapse), /*#__PURE__*/React.createElement(BreadcrumbCollapsed, {
      "aria-label": expandText,
      key: "ellipsis",
      onClick: handleClickExpand
    }), ...allItems.slice(allItems.length - itemsAfterCollapse, allItems.length)];
  };

  const allItems = React.Children.toArray(children).filter(child => {
    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(["Material-UI: The Breadcrumbs component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }

    return /*#__PURE__*/React.isValidElement(child);
  }).map((child, index) => /*#__PURE__*/React.createElement("li", {
    className: classes.li,
    key: `child-${index}`
  }, child));
  return /*#__PURE__*/React.createElement(Typography, _extends({
    ref: ref,
    component: Component,
    color: "textSecondary",
    className: clsx(classes.root, className)
  }, other), /*#__PURE__*/React.createElement("ol", {
    className: classes.ol
  }, insertSeparators(expanded || maxItems && allItems.length <= maxItems ? allItems : renderItemsBeforeAndAfter(allItems), classes.separator, separator)));
});
process.env.NODE_ENV !== "production" ? Breadcrumbs.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The breadcrumb children.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
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
  component: PropTypes
  /* @typescript-to-proptypes-ignore */
  .elementType,

  /**
   * Override the default label for the expand button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  expandText: PropTypes.string,

  /**
   * If max items is exceeded, the number of items to show after the ellipsis.
   */
  itemsAfterCollapse: PropTypes.number,

  /**
   * If max items is exceeded, the number of items to show before the ellipsis.
   */
  itemsBeforeCollapse: PropTypes.number,

  /**
   * Specifies the maximum number of breadcrumbs to display. When there are more
   * than the maximum number, only the first `itemsBeforeCollapse` and last `itemsAfterCollapse`
   * will be shown, with an ellipsis in between.
   */
  maxItems: PropTypes.number,

  /**
   * Custom separator node.
   */
  separator: PropTypes.node
} : void 0;
export default withStyles(styles, {
  name: 'MuiBreadcrumbs'
})(Breadcrumbs);