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

var CardBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Card',
    id: null,
    header: null,
    footer: null,
    title: null,
    subTitle: null,
    style: null,
    className: null,
    children: undefined
  }
});

var Card = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = CardBase.getProps(inProps, context);
  var elementRef = React__namespace.useRef(ref);
  var _CardBase$setMetaData = CardBase.setMetaData({
      props: props
    }),
    ptm = _CardBase$setMetaData.ptm;
  var createHeader = function createHeader() {
    var headerProps = utils.mergeProps({
      className: 'p-card-header'
    }, ptm('header'));
    if (props.header) {
      return /*#__PURE__*/React__namespace.createElement("div", headerProps, utils.ObjectUtils.getJSXElement(props.header, props));
    }
    return null;
  };
  var createBody = function createBody() {
    var titleProps = utils.mergeProps({
      className: 'p-card-title'
    }, ptm('title'));
    var title = props.title && /*#__PURE__*/React__namespace.createElement("div", titleProps, utils.ObjectUtils.getJSXElement(props.title, props));
    var subTitleProps = utils.mergeProps({
      className: 'p-card-subtitle'
    }, ptm('subTitle'));
    var subTitle = props.subTitle && /*#__PURE__*/React__namespace.createElement("div", subTitleProps, utils.ObjectUtils.getJSXElement(props.subTitle, props));
    var contentProps = utils.mergeProps({
      className: 'p-card-content'
    }, ptm('content'));
    var children = props.children && /*#__PURE__*/React__namespace.createElement("div", contentProps, props.children);
    var footerProps = utils.mergeProps({
      className: 'p-card-footer'
    }, ptm('footer'));
    var footer = props.footer && /*#__PURE__*/React__namespace.createElement("div", footerProps, utils.ObjectUtils.getJSXElement(props.footer, props));
    var bodyProps = utils.mergeProps({
      className: 'p-card-body'
    }, ptm('body'));
    return /*#__PURE__*/React__namespace.createElement("div", bodyProps, title, subTitle, children, footer);
  };
  React__namespace.useEffect(function () {
    utils.ObjectUtils.combinedRefs(elementRef, ref);
  }, [elementRef, ref]);
  var rootProps = utils.mergeProps({
    id: props.id,
    ref: elementRef,
    style: props.style,
    className: utils.classNames('p-card p-component', props.className)
  }, CardBase.getOtherProps(props), ptm('root'));
  var header = createHeader();
  var body = createBody();
  return /*#__PURE__*/React__namespace.createElement("div", rootProps, header, body);
});
Card.displayName = 'Card';

exports.Card = Card;
