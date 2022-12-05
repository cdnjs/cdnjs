import * as React from 'react';
import { ObjectUtils, classNames, IconUtils } from 'primereact/utils';

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

var Steps = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var elementRef = React.useRef(null);
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
    var className = classNames('p-steps-item', item.className, {
      'p-highlight p-steps-current': active,
      'p-disabled': disabled
    });
    var iconClassName = classNames('p-menuitem-icon', item.icon);
    var icon = IconUtils.getJSXIcon(item.icon, {
      className: 'p-menuitem-icon'
    }, {
      props: props
    });
    var label = item.label && /*#__PURE__*/React.createElement("span", {
      className: "p-steps-title"
    }, item.label);
    var content = /*#__PURE__*/React.createElement("a", {
      href: item.url || '#',
      className: "p-menuitem-link",
      role: "presentation",
      target: item.target,
      onClick: function onClick(event) {
        return itemClick(event, item, index);
      },
      tabIndex: tabIndex
    }, /*#__PURE__*/React.createElement("span", {
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
      content = ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
    }
    return /*#__PURE__*/React.createElement("li", {
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
      return /*#__PURE__*/React.createElement("ul", {
        role: "tablist"
      }, _items);
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
  var otherProps = ObjectUtils.findDiffKeys(props, Steps.defaultProps);
  var className = classNames('p-steps p-component', {
    'p-readonly': props.readOnly
  }, props.className);
  var items = createItems();
  return /*#__PURE__*/React.createElement("div", _extends({
    id: props.id,
    ref: elementRef,
    className: className,
    style: props.style
  }, otherProps), items);
}));
Steps.displayName = 'Steps';
Steps.defaultProps = {
  __TYPE: 'Steps',
  id: null,
  model: null,
  activeIndex: 0,
  readOnly: true,
  style: null,
  className: null,
  onSelect: null
};

export { Steps };
