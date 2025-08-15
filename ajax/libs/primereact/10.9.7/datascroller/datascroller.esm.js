'use client';
import * as React from 'react';
import { PrimeReactContext, localeOption } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps, useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { classNames, ObjectUtils } from 'primereact/utils';

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}

function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}

function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}

var classes = {
  header: 'p-datascroller-header',
  footer: 'p-datascroller-footer',
  content: 'p-datascroller-content',
  list: 'p-datascroller-list',
  root: function root(_ref) {
    var props = _ref.props;
    return classNames('p-datascroller p-component', {
      'p-datascroller-inline': props.inline
    });
  }
};
var styles = "\n@layer primereact {\n    .p-datascroller .p-datascroller-header {\n        text-align: center;\n        padding: .5em .75em;\n        border-bottom: 0 none;\n    }\n    \n    .p-datascroller .p-datascroller-footer {\n        text-align: center;\n        padding: .25em .625em;\n        border-top: 0px none;\n    }\n    \n    .p-datascroller .p-datascroller-content {\n        padding: .25em .625em;\n    }\n    \n    .p-datascroller-inline .p-datascroller-content {\n        overflow: auto;\n    }\n    \n    .p-datascroller .p-datascroller-list {\n        list-style-type: none; \n        margin: 0;\n        padding: 0;\n    }\n}\n";
var inlineStyles = {
  content: function content(_ref2) {
    var props = _ref2.props;
    return {
      maxHeight: props.scrollHeight
    };
  }
};
var DataScrollerBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'DataScroller',
    id: null,
    value: null,
    rows: 0,
    inline: false,
    scrollHeight: null,
    loader: false,
    buffer: 0.9,
    style: null,
    className: null,
    onLazyLoad: null,
    emptyMessage: null,
    itemTemplate: null,
    header: null,
    footer: null,
    lazy: false,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles,
    inlineStyles: inlineStyles
  }
});

var DataScroller = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = DataScrollerBase.getProps(inProps, context);
  var _React$useState = React.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    dataToRenderState = _React$useState2[0],
    setDataToRenderState = _React$useState2[1];
  var _DataScrollerBase$set = DataScrollerBase.setMetaData({
      props: props
    }),
    ptm = _DataScrollerBase$set.ptm,
    cx = _DataScrollerBase$set.cx,
    sx = _DataScrollerBase$set.sx,
    isUnstyled = _DataScrollerBase$set.isUnstyled;
  useHandleStyle(DataScrollerBase.css.styles, isUnstyled, {
    name: 'datascroller'
  });
  var elementRef = React.useRef(null);
  var contentRef = React.useRef(null);
  var value = React.useRef(props.value);
  var dataToRender = React.useRef([]);
  var first = React.useRef(0);
  var scrollFunction = React.useRef(null);
  var handleDataChange = function handleDataChange() {
    if (props.lazy) {
      dataToRender.current = value.current;
      setDataToRenderState(_toConsumableArray(dataToRender.current));
    } else {
      load();
    }
  };
  var load = function load() {
    if (props.lazy) {
      if (props.onLazyLoad) {
        props.onLazyLoad(createLazyLoadMetadata());
      }
      first.current = first.current + props.rows;
    } else if (value.current) {
      for (var i = first.current; i < first.current + props.rows; i++) {
        if (i >= value.current.length) {
          break;
        }
        dataToRender.current.push(value.current[i]);
      }
      if (value.current.length !== 0) {
        first.current = first.current + props.rows;
      }
      setDataToRenderState(_toConsumableArray(dataToRender.current));
    }
  };
  var reset = function reset() {
    first.current = 0;
    dataToRender.current = [];
    setDataToRenderState(_toConsumableArray(dataToRender.current));
    load();
  };
  var createLazyLoadMetadata = function createLazyLoadMetadata() {
    return {
      first: first.current,
      rows: props.rows
    };
  };
  var bindScrollListener = function bindScrollListener() {
    if (props.inline) {
      scrollFunction.current = function () {
        var scrollTop = contentRef.current.scrollTop;
        var scrollHeight = contentRef.current.scrollHeight;
        var viewportHeight = contentRef.current.clientHeight;
        if (scrollTop >= scrollHeight * props.buffer - viewportHeight) {
          load();
        }
      };
      contentRef.current.addEventListener('scroll', scrollFunction.current);
    } else {
      scrollFunction.current = function () {
        var docBody = document.body;
        var docElement = document.documentElement;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var winHeight = docElement.clientHeight;
        var docHeight = Math.max(docBody.scrollHeight, docBody.offsetHeight, winHeight, docElement.scrollHeight, docElement.offsetHeight);
        if (scrollTop >= docHeight * props.buffer - winHeight) {
          load();
        }
      };
      window.addEventListener('scroll', scrollFunction.current);
    }
  };
  var unbindScrollListener = function unbindScrollListener() {
    if (scrollFunction.current) {
      if (props.inline && contentRef.current) {
        contentRef.current.removeEventListener('scroll', scrollFunction.current);
      } else if (!props.loader) {
        window.removeEventListener('scroll', scrollFunction.current);
      }
    }
    scrollFunction.current = null;
  };
  useMountEffect(function () {
    load();
    if (!props.loader) {
      bindScrollListener();
    }
  });
  useUpdateEffect(function () {
    if (props.value) {
      value.current = props.value;
      if (!props.lazy) {
        first.current = 0;
      }
      dataToRender.current = [];
      handleDataChange();
    }
  }, [props.value]);
  useUpdateEffect(function () {
    if (props.loader) {
      unbindScrollListener();
    } else {
      bindScrollListener();
    }
  }, [props.loader]);
  useUnmountEffect(function () {
    if (scrollFunction.current) {
      unbindScrollListener();
    }
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      load: load,
      reset: reset,
      getElement: function getElement() {
        return elementRef.current;
      },
      getContent: function getContent() {
        return contentRef.current;
      }
    };
  });
  var createHeader = function createHeader() {
    var headerProps = mergeProps({
      className: cx('header')
    }, ptm('header'));
    if (props.header) {
      return /*#__PURE__*/React.createElement("div", headerProps, props.header);
    }
    return null;
  };
  var createFooter = function createFooter() {
    var footerProps = mergeProps({
      className: cx('footer')
    }, ptm('footer'));
    if (props.footer) {
      return /*#__PURE__*/React.createElement("div", footerProps, props.footer);
    }
    return null;
  };
  var createItem = function createItem(_value, index) {
    var itemProps = ptm('item');
    var content = props.itemTemplate ? props.itemTemplate(_value) : _value;
    return /*#__PURE__*/React.createElement("li", _extends({}, itemProps, {
      key: index + '_datascrollitem'
    }), content);
  };
  var createEmptyMessage = function createEmptyMessage() {
    var emptyMessageProps = mergeProps(ptm('emptyMessage'));
    var content = ObjectUtils.getJSXElement(props.emptyMessage, props) || localeOption('emptyMessage');
    return /*#__PURE__*/React.createElement("li", emptyMessageProps, content);
  };
  var createContent = function createContent() {
    var contentProps = mergeProps({
      ref: contentRef,
      className: cx('content'),
      style: sx('content')
    }, ptm('content'));
    var listProps = mergeProps({
      className: cx('list')
    }, ptm('list'));
    var content = ObjectUtils.isNotEmpty(dataToRenderState) ? dataToRenderState.map(createItem) : createEmptyMessage();
    return /*#__PURE__*/React.createElement("div", contentProps, /*#__PURE__*/React.createElement("ul", listProps, content));
  };
  var header = createHeader();
  var footer = createFooter();
  var content = createContent();
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    className: classNames(props.className, cx('root'))
  }, DataScrollerBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", rootProps, header, content, footer);
}));
DataScroller.displayName = 'DataScroller';

export { DataScroller };
