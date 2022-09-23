import * as React from 'react';
import { ObjectUtils, classNames, IconUtils } from 'primereact/utils';

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

var Avatar = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var elementRef = React.useRef(null);

  var createContent = function createContent() {
    if (props.image) {
      return /*#__PURE__*/React.createElement("img", {
        src: props.image,
        alt: props.imageAlt,
        onError: props.onImageError
      });
    } else if (props.label) {
      return /*#__PURE__*/React.createElement("span", {
        className: "p-avatar-text"
      }, props.label);
    } else if (props.icon) {
      return IconUtils.getJSXIcon(props.icon, {
        className: 'p-avatar-icon'
      }, {
        props: props
      });
    }

    return null;
  };

  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var otherProps = ObjectUtils.findDiffKeys(props, Avatar.defaultProps);
  var containerClassName = classNames('p-avatar p-component', {
    'p-avatar-image': props.image != null,
    'p-avatar-circle': props.shape === 'circle',
    'p-avatar-lg': props.size === 'large',
    'p-avatar-xl': props.size === 'xlarge',
    'p-avatar-clickable': !!props.onClick
  }, props.className);
  var content = props.template ? ObjectUtils.getJSXElement(props.template, props) : createContent();
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef,
    className: containerClassName,
    style: props.style
  }, otherProps), content, props.children);
});
Avatar.displayName = 'Avatar';
Avatar.defaultProps = {
  __TYPE: 'Avatar',
  label: null,
  icon: null,
  image: null,
  size: 'normal',
  shape: 'square',
  style: null,
  className: null,
  template: null,
  imageAlt: 'avatar',
  onImageError: null
};

export { Avatar };
