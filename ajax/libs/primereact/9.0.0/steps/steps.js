this.primereact = this.primereact || {};
this.primereact.steps = (function (exports, React, utils) {
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

  var StepsBase = {
    defaultProps: {
      __TYPE: 'Steps',
      id: null,
      model: null,
      activeIndex: 0,
      readOnly: true,
      style: null,
      className: null,
      onSelect: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, StepsBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, StepsBase.defaultProps);
    }
  };

  var Steps = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var props = StepsBase.getProps(inProps);
    var elementRef = React__namespace.useRef(null);
    var itemClick = function itemClick(event, item, index) {
      if (props.readOnly || item.disabled) {
        event.preventDefault();
        return;
      }
      if (props.onSelect) {
        props.onSelect({
          originalEvent: event,
          item: item,
          index: index
        });
      }
      if (!item.url) {
        event.preventDefault();
      }
      if (item.command) {
        item.command({
          originalEvent: event,
          item: item,
          index: index
        });
      }
    };
    var createItem = function createItem(item, index) {
      if (item.visible === false) {
        return null;
      }
      var key = item.label + '_' + index;
      var active = index === props.activeIndex;
      var disabled = item.disabled || index !== props.activeIndex && props.readOnly;
      var tabIndex = disabled ? -1 : '';
      var className = utils.classNames('p-steps-item', item.className, {
        'p-highlight p-steps-current': active,
        'p-disabled': disabled
      });
      var iconClassName = utils.classNames('p-menuitem-icon', item.icon);
      var icon = utils.IconUtils.getJSXIcon(item.icon, {
        className: 'p-menuitem-icon'
      }, {
        props: props
      });
      var label = item.label && /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-steps-title"
      }, item.label);
      var content = /*#__PURE__*/React__namespace.createElement("a", {
        href: item.url || '#',
        className: "p-menuitem-link",
        role: "presentation",
        target: item.target,
        onClick: function onClick(event) {
          return itemClick(event, item, index);
        },
        tabIndex: tabIndex
      }, /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-steps-number"
      }, index + 1), icon, label);
      if (item.template) {
        var defaultContentOptions = {
          onClick: function onClick(event) {
            return itemClick(event, item, index);
          },
          className: 'p-menuitem-link',
          labelClassName: 'p-steps-title',
          numberClassName: 'p-steps-number',
          iconClassName: iconClassName,
          element: content,
          props: props,
          tabIndex: tabIndex,
          active: active,
          disabled: disabled
        };
        content = utils.ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
      }
      return /*#__PURE__*/React__namespace.createElement("li", {
        key: key,
        id: item.id,
        className: className,
        style: item.style,
        role: "tab",
        "aria-selected": active,
        "aria-expanded": active
      }, content);
    };
    var createItems = function createItems() {
      if (props.model) {
        var _items = props.model.map(createItem);
        return /*#__PURE__*/React__namespace.createElement("ul", {
          role: "tablist"
        }, _items);
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
    var otherProps = StepsBase.getOtherProps(props);
    var className = utils.classNames('p-steps p-component', {
      'p-readonly': props.readOnly
    }, props.className);
    var items = createItems();
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      id: props.id,
      ref: elementRef,
      className: className,
      style: props.style
    }, otherProps), items);
  }));
  Steps.displayName = 'Steps';

  exports.Steps = Steps;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils);
