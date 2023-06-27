import * as React from 'react';
import { ObjectUtils, classNames } from 'primereact/utils';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
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

var AvatarGroupBase = {
  defaultProps: {
    __TYPE: 'AvatarGroup',
    style: null,
    className: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, AvatarGroupBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, AvatarGroupBase.defaultProps);
  }
};

var AvatarGroup = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = AvatarGroupBase.getProps(inProps);
  var elementRef = React.useRef(null);
  var otherProps = AvatarGroupBase.getOtherProps(props);
  var className = classNames('p-avatar-group p-component', props.className);
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef,
    className: className,
    style: props.style
  }, otherProps), props.children);
});
AvatarGroup.displayName = 'AvatarGroup';

export { AvatarGroup };
