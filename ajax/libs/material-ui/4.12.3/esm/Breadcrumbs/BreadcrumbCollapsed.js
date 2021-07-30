import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { emphasize } from '../styles/colorManipulator';
import MoreHorizIcon from '../internal/svg-icons/MoreHoriz';
import ButtonBase from '../ButtonBase';

var styles = function styles(theme) {
  return {
    root: {
      display: 'flex',
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
      backgroundColor: theme.palette.grey[100],
      color: theme.palette.grey[700],
      borderRadius: 2,
      cursor: 'pointer',
      '&:hover, &:focus': {
        backgroundColor: theme.palette.grey[200]
      },
      '&:active': {
        boxShadow: theme.shadows[0],
        backgroundColor: emphasize(theme.palette.grey[200], 0.12)
      }
    },
    icon: {
      width: 24,
      height: 16
    }
  };
};
/**
 * @ignore - internal component.
 */


function BreadcrumbCollapsed(props) {
  var classes = props.classes,
      other = _objectWithoutProperties(props, ["classes"]);

  return /*#__PURE__*/React.createElement(ButtonBase, _extends({
    component: "li",
    className: classes.root,
    focusRipple: true
  }, other), /*#__PURE__*/React.createElement(MoreHorizIcon, {
    className: classes.icon
  }));
}

process.env.NODE_ENV !== "production" ? BreadcrumbCollapsed.propTypes = {
  /**
   * @ignore
   */
  classes: PropTypes.object.isRequired
} : void 0;
export default withStyles(styles, {
  name: 'PrivateBreadcrumbCollapsed'
})(BreadcrumbCollapsed);