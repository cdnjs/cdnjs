this.primereact = this.primereact || {};
this.primereact.row = (function (exports, React, utils) {
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

  var Row = function Row(props) {
    var otherProps = utils.ObjectUtils.findDiffKeys(props, Row.defaultProps);
    return /*#__PURE__*/React__namespace.createElement("tr", _extends({
      className: props.className,
      style: props.style
    }, otherProps), props.children);
  };
  Row.displayName = 'Row';
  Row.defaultProps = {
    __TYPE: 'Row',
    style: null,
    className: null
  };

  exports.Row = Row;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils);
