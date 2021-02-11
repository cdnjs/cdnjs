import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import { emphasize } from '../styles/colorManipulator';
import MoreHorizIcon from '../internal/svg-icons/MoreHoriz';
import ButtonBase from '../ButtonBase';
import { getBreadcrumbCollapsedUtilityClass } from './breadcrumbCollapsedClasses';

const useUtilityClasses = styleProps => {
  const {
    classes
  } = styleProps;
  const slots = {
    button: ['button'],
    icon: ['icon']
  };
  return composeClasses(slots, getBreadcrumbCollapsedUtilityClass, classes);
};

const BreadcrumbCollapsedButton = experimentalStyled(ButtonBase, {}, {
  name: 'PrivateBreadcrumbCollapsed',
  slot: 'Button'
})(({
  theme
}) => _extends({
  display: 'flex',
  marginLeft: theme.spacing(0.5),
  marginRight: theme.spacing(0.5)
}, theme.palette.mode === 'light' ? {
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.grey[700]
} : {
  backgroundColor: theme.palette.grey[700],
  color: theme.palette.grey[100]
}, {
  borderRadius: 2,
  '&:hover, &:focus': _extends({}, theme.palette.mode === 'light' ? {
    backgroundColor: theme.palette.grey[200]
  } : {
    backgroundColor: theme.palette.grey[600]
  }),
  '&:active': _extends({
    boxShadow: theme.shadows[0]
  }, theme.palette.mode === 'light' ? {
    backgroundColor: emphasize(theme.palette.grey[200], 0.12)
  } : {
    backgroundColor: emphasize(theme.palette.grey[600], 0.12)
  })
}));
const BreadcrumbCollapsedIcon = experimentalStyled(MoreHorizIcon, {}, {
  name: 'PrivateBreadcrumbCollapsed',
  slot: 'Icon'
})({
  width: 24,
  height: 16
});
/**
 * @ignore - internal component.
 */

function BreadcrumbCollapsed(props) {
  const styleProps = props;
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(BreadcrumbCollapsedButton, _extends({
    className: classes.button,
    focusRipple: true
  }, props, {
    styleProps: styleProps
  }), /*#__PURE__*/React.createElement(BreadcrumbCollapsedIcon, {
    className: classes.icon,
    styleProps: styleProps
  })));
}

process.env.NODE_ENV !== "production" ? BreadcrumbCollapsed.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default BreadcrumbCollapsed;