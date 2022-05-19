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

var AvatarGroup = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var otherProps = ObjectUtils.findDiffKeys(props, AvatarGroup.defaultProps);
  var className = classNames('p-avatar-group p-component', props.className);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: props.style
  }, otherProps), props.children);
});
AvatarGroup.displayName = 'AvatarGroup';
AvatarGroup.defaultProps = {
  __TYPE: 'AvatarGroup',
  style: null,
  className: null
};

export { AvatarGroup };
