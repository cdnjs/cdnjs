this.primereact = this.primereact || {};
this.primereact.message = (function (exports, React, utils) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

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

  var Message = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var elementRef = React__namespace.useRef(null);
    var createContent = function createContent() {
      if (props.content) {
        return utils.ObjectUtils.getJSXElement(props.content, props);
      }
      var text = utils.ObjectUtils.getJSXElement(props.text, props);
      var iconValue = props.icon;
      if (!iconValue) {
        iconValue = utils.classNames('pi', {
          'pi-info-circle': props.severity === 'info',
          'pi-exclamation-triangle': props.severity === 'warn',
          'pi-times-circle': props.severity === 'error',
          'pi-check': props.severity === 'success'
        });
      }
      var icon = utils.IconUtils.getJSXIcon(iconValue, {
        className: 'p-inline-message-icon'
      }, {
        props: props
      });
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, icon, /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-inline-message-text"
      }, text));
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    var otherProps = utils.ObjectUtils.findDiffKeys(props, Message.defaultProps);
    var className = utils.classNames('p-inline-message p-component', {
      'p-inline-message-info': props.severity === 'info',
      'p-inline-message-warn': props.severity === 'warn',
      'p-inline-message-error': props.severity === 'error',
      'p-inline-message-success': props.severity === 'success',
      'p-inline-message-icon-only': !props.text
    }, props.className);
    var content = createContent();
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
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

  exports.Message = Message;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils);
