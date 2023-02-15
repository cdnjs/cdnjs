import * as React from 'react';
import { CSSTransition } from 'primereact/csstransition';
import { useMountEffect } from 'primereact/hooks';
import { Ripple } from 'primereact/ripple';
import { ObjectUtils, UniqueComponentId, classNames, IconUtils } from 'primereact/utils';

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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var PanelBase = {
  defaultProps: {
    __TYPE: 'Panel',
    id: null,
    header: null,
    headerTemplate: null,
    toggleable: null,
    style: null,
    className: null,
    collapsed: null,
    expandIcon: 'pi pi-plus',
    collapseIcon: 'pi pi-minus',
    icons: null,
    transitionOptions: null,
    onExpand: null,
    onCollapse: null,
    onToggle: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, PanelBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, PanelBase.defaultProps);
  }
};

var Panel = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = PanelBase.getProps(inProps);
  var _React$useState = React.useState(props.id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0],
    setIdState = _React$useState2[1];
  var _React$useState3 = React.useState(props.collapsed),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    collapsedState = _React$useState4[0],
    setCollapsedState = _React$useState4[1];
  var elementRef = React.useRef(ref);
  var contentRef = React.useRef(null);
  var collapsed = props.toggleable ? props.onToggle ? props.collapsed : collapsedState : false;
  var headerId = idState + '_header';
  var contentId = idState + '_content';
  var toggle = function toggle(event) {
    if (props.toggleable) {
      collapsed ? expand(event) : collapse(event);
      if (props.onToggle) {
        props.onToggle({
          originalEvent: event,
          value: !collapsed
        });
      }
    }
    event.preventDefault();
  };
  var expand = function expand(event) {
    if (!props.onToggle) {
      setCollapsedState(false);
    }
    props.onExpand && props.onExpand(event);
  };
  var collapse = function collapse(event) {
    if (!props.onToggle) {
      setCollapsedState(true);
    }
    props.onCollapse && props.onCollapse(event);
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      },
      getContent: function getContent() {
        return contentRef.current;
      }
    };
  });
  React.useEffect(function () {
    ObjectUtils.combinedRefs(elementRef, ref);
  }, [elementRef, ref]);
  useMountEffect(function () {
    if (!idState) {
      setIdState(UniqueComponentId());
    }
  });
  var createToggleIcon = function createToggleIcon() {
    if (props.toggleable) {
      var buttonId = idState + '_label';
      var toggleIcon = collapsed ? props.expandIcon : props.collapseIcon;
      return /*#__PURE__*/React.createElement("button", {
        className: "p-panel-header-icon p-panel-toggler p-link",
        onClick: toggle,
        id: buttonId,
        "aria-controls": contentId,
        "aria-expanded": !collapsed,
        role: "tab"
      }, IconUtils.getJSXIcon(toggleIcon, undefined, {
        props: props,
        collapsed: collapsed
      }), /*#__PURE__*/React.createElement(Ripple, null));
    }
    return null;
  };
  var createHeader = function createHeader() {
    var header = ObjectUtils.getJSXElement(props.header, props);
    var icons = ObjectUtils.getJSXElement(props.icons, props);
    var togglerElement = createToggleIcon();
    var titleElement = /*#__PURE__*/React.createElement("span", {
      className: "p-panel-title",
      id: headerId
    }, header);
    var iconsElement = /*#__PURE__*/React.createElement("div", {
      className: "p-panel-icons"
    }, icons, togglerElement);
    var content = /*#__PURE__*/React.createElement("div", {
      className: "p-panel-header"
    }, titleElement, iconsElement);
    if (props.headerTemplate) {
      var defaultContentOptions = {
        className: 'p-panel-header',
        titleClassName: 'p-panel-title',
        iconsClassName: 'p-panel-icons',
        togglerClassName: 'p-panel-header-icon p-panel-toggler p-link',
        togglerIconClassName: collapsed ? props.expandIcon : props.collapseIcon,
        onTogglerClick: toggle,
        titleElement: titleElement,
        iconsElement: iconsElement,
        togglerElement: togglerElement,
        element: content,
        props: props,
        collapsed: collapsed
      };
      return ObjectUtils.getJSXElement(props.headerTemplate, defaultContentOptions);
    } else if (props.header || props.toggleable) {
      return content;
    }
    return null;
  };
  var createContent = function createContent() {
    return /*#__PURE__*/React.createElement(CSSTransition, {
      nodeRef: contentRef,
      classNames: "p-toggleable-content",
      timeout: {
        enter: 1000,
        exit: 450
      },
      "in": !collapsed,
      unmountOnExit: true,
      options: props.transitionOptions
    }, /*#__PURE__*/React.createElement("div", {
      ref: contentRef,
      className: "p-toggleable-content",
      "aria-hidden": collapsed,
      role: "region",
      id: contentId,
      "aria-labelledby": headerId
    }, /*#__PURE__*/React.createElement("div", {
      className: "p-panel-content"
    }, props.children)));
  };
  var otherProps = PanelBase.getOtherProps(props);
  var className = classNames('p-panel p-component', {
    'p-panel-toggleable': props.toggleable
  }, props.className);
  var header = createHeader();
  var content = createContent();
  return /*#__PURE__*/React.createElement("div", _extends({
    id: props.id,
    ref: elementRef,
    className: className,
    style: props.style
  }, otherProps), header, content);
});
Panel.displayName = 'Panel';

export { Panel };
