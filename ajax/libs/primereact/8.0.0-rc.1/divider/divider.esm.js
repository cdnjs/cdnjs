import * as React from 'react';
import { ObjectUtils, classNames } from 'primereact/utils';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var Divider = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var horizontal = props.layout === 'horizontal';
  var vertical = props.layout === 'vertical';
  var otherProps = ObjectUtils.findDiffKeys(props, Divider.defaultProps);
  var className = classNames("p-divider p-component p-divider-".concat(props.layout, " p-divider-").concat(props.type), {
    'p-divider-left': horizontal && (!props.align || props.align === 'left'),
    'p-divider-right': horizontal && props.align === 'right',
    'p-divider-center': horizontal && props.align === 'center' || vertical && (!props.align || props.align === 'center'),
    'p-divider-top': vertical && props.align === 'top',
    'p-divider-bottom': vertical && props.align === 'bottom'
  }, props.className);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: props.style,
    role: "separator"
  }, otherProps), /*#__PURE__*/React.createElement("div", {
    className: "p-divider-content"
  }, props.children));
});
Divider.displayName = 'Divider';
Divider.defaultProps = {
  __TYPE: 'Divider',
  align: null,
  layout: 'horizontal',
  type: 'solid',
  style: null,
  className: null
};

export { Divider };
