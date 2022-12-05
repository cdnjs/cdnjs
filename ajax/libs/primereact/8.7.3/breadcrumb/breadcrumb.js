this.primereact = this.primereact || {};
this.primereact.breadcrumb = (function (exports, React, utils) {
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

  var BreadCrumb = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var elementRef = React__namespace.useRef(null);
    var itemClick = function itemClick(event, item) {
      if (item.disabled) {
        event.preventDefault();
        return;
      }
      if (!item.url) {
        event.preventDefault();
      }
      if (item.command) {
        item.command({
          originalEvent: event,
          item: item
        });
      }
    };
    var createHome = function createHome() {
      var home = props.home;
      if (home) {
        if (home.visible === false) {
          return null;
        }
        var _icon = home.icon,
          target = home.target,
          url = home.url,
          disabled = home.disabled,
          style = home.style,
          _className = home.className,
          template = home.template;
        var _className2 = utils.classNames('p-breadcrumb-home', {
          'p-disabled': disabled
        }, _className);
        var icon = utils.IconUtils.getJSXIcon(_icon, {
          className: 'p-menuitem-icon'
        }, {
          props: props
        });
        var content = /*#__PURE__*/React__namespace.createElement("a", {
          href: url || '#',
          className: "p-menuitem-link",
          "aria-disabled": disabled,
          target: target,
          onClick: function onClick(event) {
            return itemClick(event, home);
          }
        }, icon);
        if (template) {
          var defaultContentOptions = {
            onClick: function onClick(event) {
              return itemClick(event, home);
            },
            className: 'p-menuitem-link',
            labelClassName: 'p-menuitem-text',
            element: content,
            props: props
          };
          content = utils.ObjectUtils.getJSXElement(template, home, defaultContentOptions);
        }
        return /*#__PURE__*/React__namespace.createElement("li", {
          className: _className2,
          style: style
        }, content);
      }
      return null;
    };
    var createSeparator = function createSeparator() {
      return /*#__PURE__*/React__namespace.createElement("li", {
        className: "p-breadcrumb-chevron pi pi-chevron-right"
      });
    };
    var createMenuitem = function createMenuitem(item) {
      if (item.visible === false) {
        return null;
      }
      var className = utils.classNames(item.className, {
        'p-disabled': item.disabled
      });
      var label = item.label && /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-menuitem-text"
      }, item.label);
      var content = /*#__PURE__*/React__namespace.createElement("a", {
        href: item.url || '#',
        className: "p-menuitem-link",
        target: item.target,
        onClick: function onClick(event) {
          return itemClick(event, item);
        },
        "aria-disabled": item.disabled
      }, label);
      if (item.template) {
        var defaultContentOptions = {
          onClick: function onClick(event) {
            return itemClick(event, item);
          },
          className: 'p-menuitem-link',
          labelClassName: 'p-menuitem-text',
          element: content,
          props: props
        };
        content = utils.ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
      }
      return /*#__PURE__*/React__namespace.createElement("li", {
        className: className,
        style: item.style
      }, content);
    };
    var createMenuitems = function createMenuitems() {
      if (props.model) {
        var _items = props.model.map(function (item, index) {
          if (item.visible === false) {
            return null;
          }
          var menuitem = createMenuitem(item);
          var separator = index === props.model.length - 1 ? null : createSeparator();
          var key = item.label + '_' + index;
          return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
            key: key
          }, menuitem, separator);
        });
        return _items;
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
    var otherProps = utils.ObjectUtils.findDiffKeys(props, BreadCrumb.defaultProps);
    var className = utils.classNames('p-breadcrumb p-component', props.className);
    var home = createHome();
    var items = createMenuitems();
    var separator = createSeparator();
    return /*#__PURE__*/React__namespace.createElement("nav", _extends({
      id: props.id,
      ref: elementRef,
      className: className,
      style: props.style,
      "aria-label": "Breadcrumb"
    }, otherProps), /*#__PURE__*/React__namespace.createElement("ul", null, home, separator, items));
  }));
  BreadCrumb.displayName = 'BreadCrumb';
  BreadCrumb.defaultProps = {
    __TYPE: 'BreadCrumb',
    id: null,
    model: null,
    home: null,
    style: null,
    className: null
  };

  exports.BreadCrumb = BreadCrumb;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils);
