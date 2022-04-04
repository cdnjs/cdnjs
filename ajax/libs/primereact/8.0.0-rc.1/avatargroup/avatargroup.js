this.primereact = this.primereact || {};
this.primereact.avatargroup = (function (exports, React, utils) {
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

  var AvatarGroup = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var otherProps = utils.ObjectUtils.findDiffKeys(props, AvatarGroup.defaultProps);
    var className = utils.classNames('p-avatar-group p-component', props.className);
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
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

  exports.AvatarGroup = AvatarGroup;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils);
