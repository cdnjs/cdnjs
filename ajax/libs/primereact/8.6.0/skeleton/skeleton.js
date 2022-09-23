this.primereact = this.primereact || {};
this.primereact.skeleton = (function (exports, React, utils) {
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

  var Skeleton = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var elementRef = React__namespace.useRef(null);
    var otherProps = utils.ObjectUtils.findDiffKeys(props, Skeleton.defaultProps);
    var style = props.size ? {
      width: props.size,
      height: props.size,
      borderRadius: props.borderRadius
    } : {
      width: props.width,
      height: props.height,
      borderRadius: props.borderRadius
    };
    var className = utils.classNames('p-skeleton p-component', {
      'p-skeleton-circle': props.shape === 'circle',
      'p-skeleton-none': props.animation === 'none'
    }, props.className);
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: elementRef,
      style: style,
      className: className
    }, otherProps));
  }));
  Skeleton.displayName = 'Skeleton';
  Skeleton.defaultProps = {
    __TYPE: 'Skeleton',
    shape: 'rectangle',
    size: null,
    width: '100%',
    height: '1rem',
    borderRadius: null,
    animation: 'wave',
    style: null,
    className: null
  };

  exports.Skeleton = Skeleton;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils);
