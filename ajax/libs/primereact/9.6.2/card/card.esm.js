import * as React from 'react';
import { ObjectUtils, mergeProps, classNames } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { PrimeReactContext } from 'primereact/api';

var CardBase = ComponentBase.extend({
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

var Card = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = CardBase.getProps(inProps, context);
  var elementRef = React.useRef(ref);
  var _CardBase$setMetaData = CardBase.setMetaData({
      props: props
    }),
    ptm = _CardBase$setMetaData.ptm;
  var createHeader = function createHeader() {
    var headerProps = mergeProps({
      className: 'p-card-header'
    }, ptm('header'));
    if (props.header) {
      return /*#__PURE__*/React.createElement("div", headerProps, ObjectUtils.getJSXElement(props.header, props));
    }
    return null;
  };
  var createBody = function createBody() {
    var titleProps = mergeProps({
      className: 'p-card-title'
    }, ptm('title'));
    var title = props.title && /*#__PURE__*/React.createElement("div", titleProps, ObjectUtils.getJSXElement(props.title, props));
    var subTitleProps = mergeProps({
      className: 'p-card-subtitle'
    }, ptm('subTitle'));
    var subTitle = props.subTitle && /*#__PURE__*/React.createElement("div", subTitleProps, ObjectUtils.getJSXElement(props.subTitle, props));
    var contentProps = mergeProps({
      className: 'p-card-content'
    }, ptm('content'));
    var children = props.children && /*#__PURE__*/React.createElement("div", contentProps, props.children);
    var footerProps = mergeProps({
      className: 'p-card-footer'
    }, ptm('footer'));
    var footer = props.footer && /*#__PURE__*/React.createElement("div", footerProps, ObjectUtils.getJSXElement(props.footer, props));
    var bodyProps = mergeProps({
      className: 'p-card-body'
    }, ptm('body'));
    return /*#__PURE__*/React.createElement("div", bodyProps, title, subTitle, children, footer);
  };
  React.useEffect(function () {
    ObjectUtils.combinedRefs(elementRef, ref);
  }, [elementRef, ref]);
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    style: props.style,
    className: classNames('p-card p-component', props.className)
  }, CardBase.getOtherProps(props), ptm('root'));
  var header = createHeader();
  var body = createBody();
  return /*#__PURE__*/React.createElement("div", rootProps, header, body);
});
Card.displayName = 'Card';

export { Card };
