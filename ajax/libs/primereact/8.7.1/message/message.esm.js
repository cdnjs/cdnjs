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

var Message = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var elementRef = React.useRef(null);

  var createContent = function createContent() {
    if (props.content) {
      return ObjectUtils.getJSXElement(props.content, props);
    }

    var text = ObjectUtils.getJSXElement(props.text, props);
    var iconValue = props.icon;

    if (!iconValue) {
      iconValue = classNames('pi', {
        'pi-info-circle': props.severity === 'info',
        'pi-exclamation-triangle': props.severity === 'warn',
        'pi-times-circle': props.severity === 'error',
        'pi-check': props.severity === 'success'
      });
    }

    var icon = IconUtils.getJSXIcon(iconValue, {
      className: 'p-inline-message-icon'
    }, {
      props: props
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, icon, /*#__PURE__*/React.createElement("span", {
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
  var otherProps = ObjectUtils.findDiffKeys(props, Message.defaultProps);
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
Message.defaultProps = {
  __TYPE: 'Message',
  id: null,
  className: null,
  style: null,
  text: null,
  icon: null,
  severity: 'info',
  content: null
};

export { Message };
