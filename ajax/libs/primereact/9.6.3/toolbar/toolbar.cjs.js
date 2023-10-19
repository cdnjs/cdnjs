'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var utils = require('primereact/utils');
var componentbase = require('primereact/componentbase');
var api = require('primereact/api');

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

var ToolbarBase = componentbase.ComponentBase.extend({
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
  }
});

var Toolbar = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = ToolbarBase.getProps(inProps, context);
  var elementRef = React__namespace.useRef(null);
  var start = utils.ObjectUtils.getJSXElement(props.left || props.start, props);
  var center = utils.ObjectUtils.getJSXElement(props.center, props);
  var end = utils.ObjectUtils.getJSXElement(props.right || props.end, props);
  var _ToolbarBase$setMetaD = ToolbarBase.setMetaData({
      props: props
    }),
    ptm = _ToolbarBase$setMetaD.ptm;
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var startProps = utils.mergeProps({
    className: 'p-toolbar-group-start p-toolbar-group-left'
  }, ptm('start'));
  var centerProps = utils.mergeProps({
    className: 'p-toolbar-group-center'
  }, ptm('center'));
  var endProps = utils.mergeProps({
    className: 'p-toolbar-group-end p-toolbar-group-right'
  }, ptm('end'));
  var rootProps = utils.mergeProps({
    id: props.id,
    ref: elementRef,
    style: props.style,
    className: utils.classNames('p-toolbar p-component', props.className),
    role: 'toolbar'
  }, ToolbarBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement("div", startProps, start), /*#__PURE__*/React__namespace.createElement("div", centerProps, center), /*#__PURE__*/React__namespace.createElement("div", endProps, end));
}));
Toolbar.displayName = 'Toolbar';

exports.Toolbar = Toolbar;
