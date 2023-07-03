import * as React from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ChevronRightIcon } from 'primereact/icons/chevronright';
import { classNames, mergeProps, IconUtils, ObjectUtils } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var BreadCrumbBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'BreadCrumb',
    id: null,
    model: null,
    home: null,
    separatorIcon: null,
    style: null,
    className: null,
    children: undefined
  }
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var BreadCrumb = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = BreadCrumbBase.getProps(inProps, context);
  var _BreadCrumbBase$setMe = BreadCrumbBase.setMetaData({
      props: props
    }),
    ptm = _BreadCrumbBase$setMe.ptm;
  var elementRef = React.useRef(null);
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
        template = home.template,
        _label = home.label;
      var _className2 = classNames('p-breadcrumb-home', {
        'p-disabled': disabled
      }, _className);
      var iconProps = mergeProps({
        className: 'p-menuitem-icon'
      }, ptm('icon'));
      var icon = IconUtils.getJSXIcon(_icon, _objectSpread({}, iconProps), {
        props: props
      });
      var actionProps = mergeProps({
        href: url || '#',
        className: 'p-menuitem-link',
        'aria-disabled': disabled,
        target: target,
        onClick: function onClick(event) {
          return itemClick(event, home);
        }
      }, ptm('action'));
      var labelProps = mergeProps({
        className: 'p-menuitem-text'
      }, ptm('label'));
      var label = _label && /*#__PURE__*/React.createElement("span", labelProps, _label);
      var content = /*#__PURE__*/React.createElement("a", actionProps, icon, label);
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
        content = ObjectUtils.getJSXElement(template, home, defaultContentOptions);
      }
      var menuitemProps = mergeProps({
        className: _className2,
        style: style
      }, ptm('menuitem'));
      return /*#__PURE__*/React.createElement("li", menuitemProps, content);
    }
    return null;
  };
  var createSeparator = function createSeparator() {
    var iconClassName = 'p-breadcrumb-chevron';
    var separatorIconProps = mergeProps({
      className: iconClassName
    }, ptm('separatorIcon'));
    var icon = props.separatorIcon || /*#__PURE__*/React.createElement(ChevronRightIcon, separatorIconProps);
    var separatorIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, separatorIconProps), {
      props: props
    });
    var separatorProps = mergeProps({
      className: 'p-menuitem-separator'
    }, ptm('separator'));
    return /*#__PURE__*/React.createElement("li", separatorProps, separatorIcon);
  };
  var createMenuitem = function createMenuitem(item) {
    if (item.visible === false) {
      return null;
    }
    var className = classNames('p-menuitem', item.className, {
      'p-disabled': item.disabled
    });
    var labelProps = mergeProps({
      className: 'p-menuitem-text'
    }, ptm('label'));
    var label = item.label && /*#__PURE__*/React.createElement("span", labelProps, item.label);
    var actionProps = mergeProps({
      href: item.url || '#',
      className: 'p-menuitem-link',
      target: item.target,
      onClick: function onClick(event) {
        return itemClick(event, item);
      },
      'aria-disabled': item.disabled
    }, ptm('action'));
    var content = /*#__PURE__*/React.createElement("a", actionProps, label);
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
      content = ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
    }
    var menuitemProps = mergeProps({
      className: className,
      style: item.style
    }, ptm('menuitem'));
    return /*#__PURE__*/React.createElement("li", menuitemProps, content);
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
        return /*#__PURE__*/React.createElement(React.Fragment, {
          key: key
        }, menuitem, separator);
      });
      return _items;
    }
    return null;
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var className = classNames('p-breadcrumb p-component', props.className);
  var home = createHome();
  var items = createMenuitems();
  var separator = createSeparator();
  var menuProps = mergeProps({
    className: 'p-breadcrumb-list'
  }, ptm('menu'));
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    className: className,
    style: props.style,
    'aria-label': 'Breadcrumb'
  }, BreadCrumbBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("nav", rootProps, /*#__PURE__*/React.createElement("ul", menuProps, home, separator, items));
}));
BreadCrumb.displayName = 'BreadCrumb';

export { BreadCrumb };
