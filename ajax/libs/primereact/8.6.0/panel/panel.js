this.primereact = this.primereact || {};
this.primereact.panel = (function (exports, React, csstransition, hooks, ripple, utils) {
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

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

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

  var Panel = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
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
        var toggleIcon = collapsed ? props.expandIcon : props.collapseIcon;
        return /*#__PURE__*/React__namespace.createElement("button", {
          className: "p-panel-header-icon p-panel-toggler p-link",
          onClick: toggle,
          id: buttonId,
          "aria-controls": contentId,
          "aria-expanded": !collapsed,
          role: "tab"
        }, utils.IconUtils.getJSXIcon(toggleIcon, undefined, {
          props: props,
          collapsed: collapsed
        }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
      }

      return null;
    };

    var createHeader = function createHeader() {
      var header = utils.ObjectUtils.getJSXElement(props.header, props);
      var icons = utils.ObjectUtils.getJSXElement(props.icons, props);
      var togglerElement = createToggleIcon();
      var titleElement = /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-panel-title",
        id: headerId
      }, header);
      var iconsElement = /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-panel-icons"
      }, icons, togglerElement);
      var content = /*#__PURE__*/React__namespace.createElement("div", {
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
        return utils.ObjectUtils.getJSXElement(props.headerTemplate, defaultContentOptions);
      } else if (props.header || props.toggleable) {
        return content;
      }

      return null;
    };

    var createContent = function createContent() {
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
      }, /*#__PURE__*/React__namespace.createElement("div", {
        ref: contentRef,
        className: "p-toggleable-content",
        "aria-hidden": collapsed,
        role: "region",
        id: contentId,
        "aria-labelledby": headerId
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-panel-content"
      }, props.children)));
    };

    var otherProps = utils.ObjectUtils.findDiffKeys(props, Panel.defaultProps);
    var className = utils.classNames('p-panel p-component', {
      'p-panel-toggleable': props.toggleable
    }, props.className);
    var header = createHeader();
    var content = createContent();
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      id: props.id,
      ref: elementRef,
      className: className,
      style: props.style
    }, otherProps), header, content);
  });
  Panel.displayName = 'Panel';
  Panel.defaultProps = {
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
    onToggle: null
  };

  exports.Panel = Panel;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.csstransition, primereact.hooks, primereact.ripple, primereact.utils);
