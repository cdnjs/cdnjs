this.primereact = this.primereact || {};
this.primereact.tag = (function (exports, React, utils) {
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

  var Tag = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var _classNames;

    var elementRef = React__namespace.useRef(null);
    var otherProps = utils.ObjectUtils.findDiffKeys(props, Tag.defaultProps);
    var className = utils.classNames('p-tag p-component', (_classNames = {}, _defineProperty(_classNames, "p-tag-".concat(props.severity), props.severity !== null), _defineProperty(_classNames, 'p-tag-rounded', props.rounded), _classNames), props.className);
    var icon = utils.IconUtils.getJSXIcon(props.icon, {
      className: 'p-tag-icon'
    }, {
      props: props
    });
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    return /*#__PURE__*/React__namespace.createElement("span", _extends({
      ref: elementRef,
      className: className,
      style: props.style
    }, otherProps), icon, /*#__PURE__*/React__namespace.createElement("span", {
      className: "p-tag-value"
    }, props.value), /*#__PURE__*/React__namespace.createElement("span", null, props.children));
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

  exports.Tag = Tag;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils);
