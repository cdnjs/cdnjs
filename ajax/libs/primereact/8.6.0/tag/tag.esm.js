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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var Tag = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _classNames;

  var elementRef = React.useRef(null);
  var otherProps = ObjectUtils.findDiffKeys(props, Tag.defaultProps);
  var className = classNames('p-tag p-component', (_classNames = {}, _defineProperty(_classNames, "p-tag-".concat(props.severity), props.severity !== null), _defineProperty(_classNames, 'p-tag-rounded', props.rounded), _classNames), props.className);
  var icon = IconUtils.getJSXIcon(props.icon, {
    className: 'p-tag-icon'
  }, {
    props: props
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  return /*#__PURE__*/React.createElement("span", _extends({
    ref: elementRef,
    className: className,
    style: props.style
  }, otherProps), icon, /*#__PURE__*/React.createElement("span", {
    className: "p-tag-value"
  }, props.value), /*#__PURE__*/React.createElement("span", null, props.children));
});
Tag.displayName = 'Tag';
Tag.defaultProps = {
  __TYPE: 'Tag',
  value: null,
  severity: null,
  rounded: false,
  icon: null,
  style: null,
  className: null
};

export { Tag };
