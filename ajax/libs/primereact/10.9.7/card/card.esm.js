'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps } from 'primereact/hooks';
import { ObjectUtils, classNames } from 'primereact/utils';

var classes = {
  root: 'p-card p-component',
  header: 'p-card-header',
  title: 'p-card-title',
  subTitle: 'p-card-subtitle',
  content: 'p-card-content',
  footer: 'p-card-footer',
  body: 'p-card-body'
};
var styles = "\n@layer primereact {\n    .p-card-header img {\n        width: 100%;\n    }\n}\n";
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
  },
  css: {
    classes: classes,
    styles: styles
  }
});

var Card = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = CardBase.getProps(inProps, context);
  var elementRef = React.useRef(ref);
  var _CardBase$setMetaData = CardBase.setMetaData({
      props: props
    }),
    ptm = _CardBase$setMetaData.ptm,
    cx = _CardBase$setMetaData.cx,
    isUnstyled = _CardBase$setMetaData.isUnstyled;
  useHandleStyle(CardBase.css.styles, isUnstyled, {
    name: 'card'
  });
  var createHeader = function createHeader() {
    var headerProps = mergeProps({
      className: cx('header')
    }, ptm('header'));
    if (props.header) {
      return /*#__PURE__*/React.createElement("div", headerProps, ObjectUtils.getJSXElement(props.header, props));
    }
    return null;
  };
  var createBody = function createBody() {
    var titleProps = mergeProps({
      className: cx('title')
    }, ptm('title'));
    var title = props.title && /*#__PURE__*/React.createElement("div", titleProps, ObjectUtils.getJSXElement(props.title, props));
    var subTitleProps = mergeProps({
      className: cx('subTitle')
    }, ptm('subTitle'));
    var subTitle = props.subTitle && /*#__PURE__*/React.createElement("div", subTitleProps, ObjectUtils.getJSXElement(props.subTitle, props));
    var contentProps = mergeProps({
      className: cx('content')
    }, ptm('content'));
    var children = props.children && /*#__PURE__*/React.createElement("div", contentProps, props.children);
    var footerProps = mergeProps({
      className: cx('footer')
    }, ptm('footer'));
    var footer = props.footer && /*#__PURE__*/React.createElement("div", footerProps, ObjectUtils.getJSXElement(props.footer, props));
    var bodyProps = mergeProps({
      className: cx('body')
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
    className: classNames(props.className, cx('root'))
  }, CardBase.getOtherProps(props), ptm('root'));
  var header = createHeader();
  var body = createBody();
  return /*#__PURE__*/React.createElement("div", rootProps, header, body);
});
Card.displayName = 'Card';

export { Card };
