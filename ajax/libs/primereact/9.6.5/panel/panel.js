this.primereact = this.primereact || {};
this.primereact.panel = (function (exports, React, csstransition, hooks, minus, plus, ripple, utils, componentbase, api) {
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

  var PanelBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'Panel',
      id: null,
      header: null,
      headerTemplate: null,
      footer: null,
      footerTemplate: null,
      toggleable: null,
      style: null,
      className: null,
      collapsed: null,
      expandIcon: null,
      collapseIcon: null,
      icons: null,
      transitionOptions: null,
      onExpand: null,
      onCollapse: null,
      onToggle: null,
      children: undefined
    }
  });

  var Panel = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = PanelBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(props.id),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      idState = _React$useState2[0],
      setIdState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(props.collapsed),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      collapsedState = _React$useState4[0],
      setCollapsedState = _React$useState4[1];
    var elementRef = React__namespace.useRef(ref);
    var contentRef = React__namespace.useRef(null);
    var collapsed = props.toggleable ? props.onToggle ? props.collapsed : collapsedState : false;
    var headerId = idState + '_header';
    var contentId = idState + '_content';
    var _PanelBase$setMetaDat = PanelBase.setMetaData({
        props: props,
        state: {
          id: idState,
          collapsed: collapsed
        }
      }),
      ptm = _PanelBase$setMetaDat.ptm;
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
    React__namespace.useImperativeHandle(ref, function () {
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
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(elementRef, ref);
    }, [elementRef, ref]);
    hooks.useMountEffect(function () {
      if (!idState) {
        setIdState(utils.UniqueComponentId());
      }
    });
    var createToggleIcon = function createToggleIcon() {
      if (props.toggleable) {
        var buttonId = idState + '_label';
        var togglerProps = utils.mergeProps({
          className: 'p-panel-header-icon p-panel-toggler p-link',
          onClick: toggle,
          id: buttonId,
          'aria-controls': contentId,
          'aria-expanded': !collapsed,
          role: 'tab'
        }, ptm('toggler'));
        var togglerIconProps = utils.mergeProps(ptm('togglericon'));
        var icon = collapsed ? props.expandIcon || /*#__PURE__*/React__namespace.createElement(plus.PlusIcon, togglerIconProps) : props.collapseIcon || /*#__PURE__*/React__namespace.createElement(minus.MinusIcon, togglerIconProps);
        var toggleIcon = utils.IconUtils.getJSXIcon(icon, togglerIconProps, {
          props: props,
          collapsed: collapsed
        });
        return /*#__PURE__*/React__namespace.createElement("button", togglerProps, toggleIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
      }
      return null;
    };
    var createHeader = function createHeader() {
      var header = utils.ObjectUtils.getJSXElement(props.header, props);
      var icons = utils.ObjectUtils.getJSXElement(props.icons, props);
      var togglerElement = createToggleIcon();
      var titleProps = utils.mergeProps({
        id: headerId,
        className: 'p-panel-title'
      }, ptm('title'));
      var titleElement = /*#__PURE__*/React__namespace.createElement("span", titleProps, header);
      var iconsProps = utils.mergeProps({
        className: 'p-panel-icons'
      }, ptm('icons'));
      var iconsElement = /*#__PURE__*/React__namespace.createElement("div", iconsProps, icons, togglerElement);
      var headerProps = utils.mergeProps({
        className: 'p-panel-header'
      }, ptm('header'));
      var content = /*#__PURE__*/React__namespace.createElement("div", headerProps, titleElement, iconsElement);
      if (props.headerTemplate) {
        var defaultContentOptions = {
          className: 'p-panel-header',
          titleClassName: 'p-panel-title',
          iconsClassName: 'p-panel-icons',
          togglerClassName: 'p-panel-header-icon p-panel-toggler p-link',
          onTogglerClick: toggle,
          titleElement: titleElement,
          iconsElement: iconsElement,
          togglerElement: togglerElement,
          element: content,
          props: props,
          collapsed: collapsed
        };
        return utils.ObjectUtils.getJSXElement(props.headerTemplate, defaultContentOptions);
      } else if (props.header || props.toggleable) {
        return content;
      }
      return null;
    };
    var createContent = function createContent() {
      var toggleableContentProps = utils.mergeProps({
        ref: contentRef,
        className: 'p-toggleable-content',
        'aria-hidden': collapsed,
        role: 'region',
        id: contentId,
        'aria-labelledby': headerId
      }, ptm('toggleablecontent'));
      var contentProps = utils.mergeProps({
        className: 'p-panel-content'
      }, ptm('content'));
      return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
        nodeRef: contentRef,
        classNames: "p-toggleable-content",
        timeout: {
          enter: 1000,
          exit: 450
        },
        "in": !collapsed,
        unmountOnExit: true,
        options: props.transitionOptions
      }, /*#__PURE__*/React__namespace.createElement("div", toggleableContentProps, /*#__PURE__*/React__namespace.createElement("div", contentProps, props.children)));
    };
    var createFooter = function createFooter() {
      var footer = utils.ObjectUtils.getJSXElement(props.footer, props);
      var footerProps = utils.mergeProps({
        className: 'p-panel-footer'
      }, ptm('footer'));
      var content = /*#__PURE__*/React__namespace.createElement("div", footerProps, footer);
      if (props.footerTemplate) {
        var defaultContentOptions = {
          className: 'p-panel-footer',
          element: content,
          props: props
        };
        return utils.ObjectUtils.getJSXElement(props.footerTemplate, defaultContentOptions);
      } else if (props.footer) {
        return content;
      }
      return null;
    };
    var rootProps = utils.mergeProps({
      id: idState,
      ref: elementRef,
      style: props.style,
      className: utils.classNames('p-panel p-component', {
        'p-panel-toggleable': props.toggleable
      }, props.className)
    }, PanelBase.getOtherProps(props), ptm('root'));
    var header = createHeader();
    var content = createContent();
    var footer = createFooter();
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, header, content, footer);
  });
  Panel.displayName = 'Panel';

  exports.Panel = Panel;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.csstransition, primereact.hooks, primereact.icons.minus, primereact.icons.plus, primereact.ripple, primereact.utils, primereact.componentbase, primereact.api);
