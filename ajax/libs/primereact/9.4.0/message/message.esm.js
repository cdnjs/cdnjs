import * as React from 'react';
import { ObjectUtils, classNames, IconUtils } from 'primereact/utils';
import { ExclamationTriangleIcon } from 'primereact/icons/exclamationtriangle';
import { InfoCircleIcon } from 'primereact/icons/infocircle';
import { TimesCircleIcon } from 'primereact/icons/timescircle';
import { CheckIcon } from 'primereact/icons/check';

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

var MessageBase = {
  defaultProps: {
    __TYPE: 'Message',
    id: null,
    className: null,
    style: null,
    text: null,
    icon: null,
    severity: 'info',
    content: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, MessageBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, MessageBase.defaultProps);
  }
};

var Message = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = MessageBase.getProps(inProps);
  var elementRef = React.useRef(null);
  var createContent = function createContent() {
    if (props.content) {
      return ObjectUtils.getJSXElement(props.content, props);
    }
    var text = ObjectUtils.getJSXElement(props.text, props);
    var iconClassName = 'p-inline-message-icon';
    var icon = props.icon;
    if (!icon) {
      switch (props.severity) {
        case 'info':
          icon = /*#__PURE__*/React.createElement(InfoCircleIcon, {
            className: iconClassName
          });
          break;
        case 'warn':
          icon = /*#__PURE__*/React.createElement(ExclamationTriangleIcon, {
            className: iconClassName
          });
          break;
        case 'error':
          icon = /*#__PURE__*/React.createElement(TimesCircleIcon, {
            className: iconClassName
          });
          break;
        case 'success':
          icon = /*#__PURE__*/React.createElement(CheckIcon, {
            className: iconClassName
          });
          break;
      }
    }
    var messageIcon = IconUtils.getJSXIcon(icon, {
      className: iconClassName
    }, {
      props: props
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, messageIcon, /*#__PURE__*/React.createElement("span", {
      className: "p-inline-message-text"
    }, text));
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var otherProps = MessageBase.getOtherProps(props);
  var className = classNames('p-inline-message p-component', {
    'p-inline-message-info': props.severity === 'info',
    'p-inline-message-warn': props.severity === 'warn',
    'p-inline-message-error': props.severity === 'error',
    'p-inline-message-success': props.severity === 'success',
    'p-inline-message-icon-only': !props.text
  }, props.className);
  var content = createContent();
  return /*#__PURE__*/React.createElement("div", _extends({
    id: props.id,
    ref: elementRef,
    className: className,
    style: props.style
  }, otherProps, {
    role: "alert",
    "aria-live": "polite"
  }), content);
}));
Message.displayName = 'Message';

export { Message };
