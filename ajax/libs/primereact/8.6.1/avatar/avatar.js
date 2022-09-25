this.primereact = this.primereact || {};
this.primereact.avatar = (function (exports, React, utils) {
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

  var Avatar = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var elementRef = React__namespace.useRef(null);

    var createContent = function createContent() {
      if (props.image) {
        return /*#__PURE__*/React__namespace.createElement("img", {
          src: props.image,
          alt: props.imageAlt,
          onError: props.onImageError
        });
      } else if (props.label) {
        return /*#__PURE__*/React__namespace.createElement("span", {
          className: "p-avatar-text"
        }, props.label);
      } else if (props.icon) {
        return utils.IconUtils.getJSXIcon(props.icon, {
          className: 'p-avatar-icon'
        }, {
          props: props
        });
      }

      return null;
    };

    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    var otherProps = utils.ObjectUtils.findDiffKeys(props, Avatar.defaultProps);
    var containerClassName = utils.classNames('p-avatar p-component', {
      'p-avatar-image': props.image != null,
      'p-avatar-circle': props.shape === 'circle',
      'p-avatar-lg': props.size === 'large',
      'p-avatar-xl': props.size === 'xlarge',
      'p-avatar-clickable': !!props.onClick
    }, props.className);
    var content = props.template ? utils.ObjectUtils.getJSXElement(props.template, props) : createContent();
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
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

  exports.Avatar = Avatar;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils);
