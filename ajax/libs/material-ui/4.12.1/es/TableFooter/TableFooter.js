import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import Tablelvl2Context from '../Table/Tablelvl2Context';
export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'table-footer-group'
  }
};
const tablelvl2 = {
  variant: 'footer'
};
const defaultComponent = 'tfoot';
const TableFooter = /*#__PURE__*/React.forwardRef(function TableFooter(props, ref) {
  const {
    classes,
    className,
    component: Component = defaultComponent
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["classes", "className", "component"]);

  return /*#__PURE__*/React.createElement(Tablelvl2Context.Provider, {
    value: tablelvl2
  }, /*#__PURE__*/React.createElement(Component, _extends({
    className: clsx(classes.root, className),
    ref: ref,
    role: Component === defaultComponent ? null : 'rowgroup'
  }, other)));
});
process.env.NODE_ENV !== "production" ? TableFooter.propTypes = {
  /**
   * The content of the component, normally `TableRow`.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,

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
  .elementType
} : void 0;
export default withStyles(styles, {
  name: 'MuiTableFooter'
})(TableFooter);