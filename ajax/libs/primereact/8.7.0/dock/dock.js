this.primereact = this.primereact || {};
this.primereact.dock = (function (exports, React, ripple, utils) {
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

  var Dock = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var _React$useState = React__namespace.useState(-3),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        currentIndexState = _React$useState2[0],
        setCurrentIndexState = _React$useState2[1];

    var elementRef = React__namespace.useRef(null);

    var onListMouseLeave = function onListMouseLeave() {
      setCurrentIndexState(-3);
    };

    var onItemMouseEnter = function onItemMouseEnter(index) {
      setCurrentIndexState(index);
    };

    var onItemClick = function onItemClick(e, item) {
      if (item.command) {
        item.command({
          originalEvent: e,
          item: item
        });
      }

      e.preventDefault();
    };

    var createItem = function createItem(item, index) {
      if (item.visible === false) {
        return null;
      }

      var disabled = item.disabled,
          _icon = item.icon,
          label = item.label,
          template = item.template,
          url = item.url,
          target = item.target;
      var className = utils.classNames('p-dock-item', {
        'p-dock-item-second-prev': currentIndexState - 2 === index,
        'p-dock-item-prev': currentIndexState - 1 === index,
        'p-dock-item-current': currentIndexState === index,
        'p-dock-item-next': currentIndexState + 1 === index,
        'p-dock-item-second-next': currentIndexState + 2 === index
      });
      var contentClassName = utils.classNames('p-dock-action', {
        'p-disabled': disabled
      });
      var iconClassName = utils.classNames('p-dock-action-icon', _icon);
      var icon = utils.IconUtils.getJSXIcon(_icon, {
        className: 'p-dock-action-icon'
      }, {
        props: props
      });
      var content = /*#__PURE__*/React__namespace.createElement("a", {
        href: url || '#',
        role: "menuitem",
        className: contentClassName,
        target: target,
        "data-pr-tooltip": label,
        onClick: function onClick(e) {
          return onItemClick(e, item);
        }
      }, icon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));

      if (template) {
        var defaultContentOptions = {
          onClick: function onClick(e) {
            return onItemClick(e, item);
          },
          className: contentClassName,
          iconClassName: iconClassName,
          element: content,
          props: props,
          index: index
        };
        content = utils.ObjectUtils.getJSXElement(template, item, defaultContentOptions);
      }

      return /*#__PURE__*/React__namespace.createElement("li", {
        key: index,
        className: className,
        role: "none",
        onMouseEnter: function onMouseEnter() {
          return onItemMouseEnter(index);
        }
      }, content);
    };

    var createItems = function createItems() {
      return props.model ? props.model.map(createItem) : null;
    };

    var createHeader = function createHeader() {
      if (props.header) {
        var _header = utils.ObjectUtils.getJSXElement(props.header, {
          props: props
        });

        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-dock-header"
        }, _header);
      }

      return null;
    };

    var createList = function createList() {
      var items = createItems();
      return /*#__PURE__*/React__namespace.createElement("ul", {
        className: "p-dock-list",
        role: "menu",
        onMouseLeave: onListMouseLeave
      }, items);
    };

    var createFooter = function createFooter() {
      if (props.footer) {
        var _footer = utils.ObjectUtils.getJSXElement(props.footer, {
          props: props
        });

        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-dock-footer"
        }, _footer);
      }

      return null;
    };

    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    var otherProps = utils.ObjectUtils.findDiffKeys(props, Dock.defaultProps);
    var className = utils.classNames("p-dock p-component p-dock-".concat(props.position), {
      'p-dock-magnification': props.magnification
    }, props.className);
    var header = createHeader();
    var list = createList();
    var footer = createFooter();
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      id: props.id,
      ref: elementRef,
      className: className,
      style: props.style
    }, otherProps), /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-dock-container"
    }, header, list, footer));
  }));
  Dock.displayName = 'Dock';
  Dock.defaultProps = {
    __TYPE: 'Dock',
    id: null,
    style: null,
    className: null,
    model: null,
    position: 'bottom',
    magnification: true,
    header: null,
    footer: null
  };

  exports.Dock = Dock;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.ripple, primereact.utils);
