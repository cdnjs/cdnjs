this.primereact = this.primereact || {};
this.primereact.toolbar = (function (exports, React, utils) {
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

  var ToolbarBase = {
    defaultProps: {
      __TYPE: 'Toolbar',
      id: null,
      style: null,
      className: null,
      left: null,
      right: null,
      start: null,
      center: null,
      end: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, ToolbarBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, ToolbarBase.defaultProps);
    }
  };

  var Toolbar = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var props = ToolbarBase.getProps(inProps);
    var elementRef = React__namespace.useRef(null);
    var otherProps = ToolbarBase.getOtherProps(props);
    var toolbarClass = utils.classNames('p-toolbar p-component', props.className);
    var start = utils.ObjectUtils.getJSXElement(props.left || props.start, props);
    var center = utils.ObjectUtils.getJSXElement(props.center, props);
    var end = utils.ObjectUtils.getJSXElement(props.right || props.end, props);
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      id: props.id,
      ref: elementRef,
      className: toolbarClass,
      style: props.style,
      role: "toolbar"
    }, otherProps), /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-toolbar-group-start p-toolbar-group-left"
    }, start), /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-toolbar-group-center"
    }, center), /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-toolbar-group-end p-toolbar-group-right"
    }, end));
  }));
  Toolbar.displayName = 'Toolbar';

  exports.Toolbar = Toolbar;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils);
