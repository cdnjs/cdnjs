'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PrimeReact$1 = require('primereact/api');
var componentbase = require('primereact/componentbase');
var hooks = require('primereact/hooks');
var utils = require('primereact/utils');
var button = require('primereact/button');
var angledoubledown = require('primereact/icons/angledoubledown');
var angledoubleup = require('primereact/icons/angledoubleup');
var angledown = require('primereact/icons/angledown');
var angleup = require('primereact/icons/angleup');
var search = require('primereact/icons/search');
var ripple = require('primereact/ripple');
var angledoubleleft = require('primereact/icons/angledoubleleft');
var angledoubleright = require('primereact/icons/angledoubleright');
var angleleft = require('primereact/icons/angleleft');
var angleright = require('primereact/icons/angleright');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

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
var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact$1);

function _readOnlyError(name) {
  throw new TypeError("\"" + name + "\" is read-only");
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var classes = {
  root: 'p-picklist p-component',
  buttons: 'p-picklist-buttons p-picklist-transfer-buttons',
  header: 'p-picklist-header',
  filterIcon: 'p-picklist-filter-icon',
  filter: 'p-picklist-filter',
  filterInput: 'p-picklist-filter-input p-inputtext p-component',
  filterContainer: 'p-picklist-filter-container',
  list: 'p-picklist-list',
  listWrapper: 'p-picklist-list-wrapper',
  listSourceWrapper: 'p-picklist-list-wrapper p-picklist-source-wrapper',
  listTargetWrapper: 'p-picklist-list-wrapper p-picklist-target-wrapper',
  listSource: 'p-picklist-list p-picklist-source',
  listTarget: 'p-picklist-list p-picklist-target',
  item: function item(_ref) {
    var selected = _ref.selected,
      focused = _ref.focused;
    return utils.classNames('p-picklist-item', {
      'p-highlight': selected,
      'p-focus': focused
    });
  },
  sourceControls: 'p-picklist-source-controls p-picklist-buttons',
  targetControls: 'p-picklist-target-controls p-picklist-buttons'
};
var styles = "\n@layer primereact {\n    .p-picklist {\n        display: flex;\n    }\n\n    .p-picklist-buttons {\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n    }\n\n    .p-picklist-list-wrapper {\n        flex: 1 1 50%;\n    }\n\n    .p-picklist-list {\n        list-style-type: none;\n        margin: 0;\n        padding: 0;\n        overflow: auto;\n        min-height: 12rem;\n        max-height: 24rem;\n    }\n\n    .p-picklist-item {\n        cursor: pointer;\n        overflow: hidden;\n        position: relative;\n    }\n\n    .p-picklist-filter {\n        position: relative;\n    }\n\n    .p-picklist-filter-icon {\n        position: absolute;\n        top: 50%;\n        margin-top: -.5rem;\n    }\n\n    .p-picklist-filter-input {\n        width: 100%;\n    }\n}\n";
var PickListBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'PickList',
    id: null,
    source: null,
    target: null,
    sourceHeader: null,
    targetHeader: null,
    style: null,
    className: null,
    sourceStyle: null,
    targetStyle: null,
    sourceSelection: null,
    targetSelection: null,
    showSourceControls: true,
    showTargetControls: true,
    metaKeySelection: false,
    onFocus: null,
    onBlur: null,
    filter: false,
    filterBy: null,
    filterMatchMode: 'contains',
    targetFilterIcon: null,
    sourceFilterIcon: null,
    moveAllToSourceIcon: null,
    moveToSourceIcon: null,
    moveAllToTargetIcon: null,
    moveToTargetIcon: null,
    moveBottomIcon: null,
    moveUpIcon: null,
    moveTopIcon: null,
    moveDownIcon: null,
    filterLocale: undefined,
    sourceFilterValue: null,
    targetFilterValue: null,
    showSourceFilter: true,
    showTargetFilter: true,
    sourceFilterPlaceholder: null,
    targetFilterPlaceholder: null,
    sourceFilterTemplate: null,
    targetFilterTemplate: null,
    tabIndex: 0,
    dataKey: null,
    autoOptionFocus: true,
    focusOnHover: true,
    breakpoint: '960px',
    itemTemplate: null,
    sourceItemTemplate: null,
    targetItemTemplate: null,
    onChange: null,
    onMoveToSource: null,
    onMoveAllToSource: null,
    onMoveToTarget: null,
    onMoveAllToTarget: null,
    onSourceSelectionChange: null,
    onTargetSelectionChange: null,
    onSourceFilterChange: null,
    onTargetFilterChange: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});

var PickListControls = /*#__PURE__*/React__namespace.memo(function (props) {
  var mergeProps = hooks.useMergeProps();
  var ptm = props.ptm,
    cx = props.cx,
    unstyled = props.unstyled;
  var moveUpIcon = props.moveUpIcon || /*#__PURE__*/React__namespace.createElement(angleup.AngleUpIcon, null);
  var moveTopIcon = props.moveTopIcon || /*#__PURE__*/React__namespace.createElement(angledoubleup.AngleDoubleUpIcon, null);
  var moveDownIcon = props.moveDownIcon || /*#__PURE__*/React__namespace.createElement(angledown.AngleDownIcon, null);
  var moveBottomIcon = props.moveBottomIcon || /*#__PURE__*/React__namespace.createElement(angledoubledown.AngleDoubleDownIcon, null);
  var moveDisabled = !props.selection || !props.selection.length;
  var moveUp = function moveUp(event) {
    var selectedItems = props.selection;
    if (selectedItems && selectedItems.length) {
      var list = _toConsumableArray(props.list);
      for (var i = 0; i < selectedItems.length; i++) {
        var selectedItem = selectedItems[i];
        var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, list, props.dataKey);
        if (selectedItemIndex !== 0) {
          var movedItem = list[selectedItemIndex];
          var temp = list[selectedItemIndex - 1];
          list[selectedItemIndex - 1] = movedItem;
          list[selectedItemIndex] = temp;
        } else {
          break;
        }
      }
      if (props.onReorder) {
        props.onReorder({
          originalEvent: event,
          value: list,
          direction: 'up'
        });
      }
    }
  };
  var moveTop = function moveTop(event) {
    var selectedItems = props.selection;
    if (selectedItems && selectedItems.length) {
      var list = _toConsumableArray(props.list);
      for (var i = 0; i < selectedItems.length; i++) {
        var selectedItem = selectedItems[i];
        var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, list, props.dataKey);
        if (selectedItemIndex !== 0) {
          var movedItem = list.splice(selectedItemIndex, 1)[0];
          list.unshift(movedItem);
        } else {
          break;
        }
      }
      if (props.onReorder) {
        props.onReorder({
          originalEvent: event,
          value: list,
          direction: 'top'
        });
      }
    }
  };
  var moveDown = function moveDown(event) {
    var selectedItems = props.selection;
    if (selectedItems && selectedItems.length) {
      var list = _toConsumableArray(props.list);
      for (var i = selectedItems.length - 1; i >= 0; i--) {
        var selectedItem = selectedItems[i];
        var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, list, props.dataKey);
        if (selectedItemIndex !== list.length - 1) {
          var movedItem = list[selectedItemIndex];
          var temp = list[selectedItemIndex + 1];
          list[selectedItemIndex + 1] = movedItem;
          list[selectedItemIndex] = temp;
        } else {
          break;
        }
      }
      if (props.onReorder) {
        props.onReorder({
          originalEvent: event,
          value: list,
          direction: 'down'
        });
      }
    }
  };
  var moveBottom = function moveBottom(event) {
    var selectedItems = props.selection;
    if (selectedItems && selectedItems.length) {
      var list = _toConsumableArray(props.list);
      for (var i = selectedItems.length - 1; i >= 0; i--) {
        var selectedItem = selectedItems[i];
        var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, list, props.dataKey);
        if (selectedItemIndex !== list.length - 1) {
          var movedItem = list.splice(selectedItemIndex, 1)[0];
          list.push(movedItem);
        } else {
          break;
        }
      }
      if (props.onReorder) {
        props.onReorder({
          originalEvent: event,
          value: list,
          direction: 'bottom'
        });
      }
    }
  };
  var controlsProps = mergeProps({
    className: utils.classNames(props.className, cx('controls'))
  }, ptm('controls', {
    hostName: props.hostName
  }));
  return /*#__PURE__*/React__namespace.createElement("div", controlsProps, /*#__PURE__*/React__namespace.createElement(button.Button, {
    disabled: moveDisabled,
    type: "button",
    icon: moveUpIcon,
    onClick: moveUp,
    pt: ptm('moveUpButton'),
    unstyled: unstyled,
    "aria-label": PrimeReact$1.ariaLabel('moveUp'),
    __parentMetadata: {
      parent: props.metaData
    }
  }), /*#__PURE__*/React__namespace.createElement(button.Button, {
    disabled: moveDisabled,
    type: "button",
    icon: moveTopIcon,
    onClick: moveTop,
    pt: ptm('moveTopButton'),
    unstyled: unstyled,
    "aria-label": PrimeReact$1.ariaLabel('moveTop'),
    __parentMetadata: {
      parent: props.metaData
    }
  }), /*#__PURE__*/React__namespace.createElement(button.Button, {
    disabled: moveDisabled,
    type: "button",
    icon: moveDownIcon,
    onClick: moveDown,
    pt: ptm('moveDownButton'),
    unstyled: unstyled,
    "aria-label": PrimeReact$1.ariaLabel('moveDown'),
    __parentMetadata: {
      parent: props.metaData
    }
  }), /*#__PURE__*/React__namespace.createElement(button.Button, {
    disabled: moveDisabled,
    type: "button",
    icon: moveBottomIcon,
    onClick: moveBottom,
    pt: ptm('moveBottomButton'),
    unstyled: unstyled,
    "aria-label": PrimeReact$1.ariaLabel('moveBottom'),
    __parentMetadata: {
      parent: props.metaData
    }
  }));
});
PickListControls.displayName = 'PickListControls';

var PickListItem = /*#__PURE__*/React__namespace.memo(function (props) {
  var mergeProps = hooks.useMergeProps();
  var ptm = props.ptm,
    cx = props.cx;
  var getPTOptions = function getPTOptions(key) {
    return ptm(key, {
      hostName: props.hostName,
      context: {
        selected: props.selected
      }
    });
  };
  var onClick = function onClick(event) {
    if (props.onClick) {
      props.onClick({
        originalEvent: event,
        value: props.value,
        id: props.id
      });
    }
  };
  var onKeyDown = function onKeyDown(event) {
    if (props.onKeyDown) {
      props.onKeyDown({
        originalEvent: event,
        value: props.value
      });
    }
  };
  var onMouseDown = function onMouseDown(event) {
    if (props.onMouseDown) {
      props.onMouseDown(event);
    }
  };
  var onFocus = function onFocus(event) {
    if (props.onFocus) {
      props.onFocus(event);
    }
  };
  var content = props.template ? props.template(props.value) : props.value;
  var itemProps = mergeProps({
    className: utils.classNames(props.className, cx('item', {
      selected: props.selected,
      focused: props.focused
    })),
    id: props.id,
    onClick: onClick,
    onKeyDown: onKeyDown,
    onFocus: onFocus,
    onMouseDown: onMouseDown,
    onMouseMove: props.onMouseMove,
    role: 'option',
    'aria-selected': props.selected,
    'data-p-highlight': props.selected,
    'data-p-focused': props.focused
  }, getPTOptions('item'));
  return /*#__PURE__*/React__namespace.createElement("li", itemProps, content, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
});
PickListItem.displayName = 'PickListItem';

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var PickListSubList = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var mergeProps = hooks.useMergeProps();
  var listElementRef = React__namespace.useRef(null);
  var ptm = props.ptm,
    cx = props.cx;
  var getPTOptions = function getPTOptions(key, options) {
    return ptm(key, _objectSpread$1({
      hostName: props.hostName
    }, options));
  };
  var isSelected = function isSelected(item) {
    return utils.ObjectUtils.findIndexInList(item, props.selection, props.dataKey) !== -1;
  };
  var onFilter = function onFilter(event) {
    if (props.onFilter) {
      props.onFilter({
        originalEvent: event,
        value: event.target.value,
        type: props.type
      });
    }
  };
  var onFilterInputKeyDown = function onFilterInputKeyDown(event) {
    //enter
    if (event.which === 13) {
      event.preventDefault();
    }
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      getElement: function getElement() {
        return listElementRef.current;
      }
    };
  });
  var createHeader = function createHeader() {
    var headerProps = mergeProps({
      className: cx('header')
    }, getPTOptions('header'));
    if (props.header) {
      return /*#__PURE__*/React__namespace.createElement("div", headerProps, utils.ObjectUtils.getJSXElement(props.header, props));
    }
    return null;
  };
  var changeFocusedItemOnHover = function changeFocusedItemOnHover(index) {
    if (props.focusOnHover && props.focusedList[props.type]) {
      var _props$changeFocusedO;
      props === null || props === void 0 || (_props$changeFocusedO = props.changeFocusedOptionIndex) === null || _props$changeFocusedO === void 0 || _props$changeFocusedO.call(props, index, props.type);
    }
  };
  var createItems = function createItems() {
    if (props.list) {
      return props.list.map(function (item, index) {
        var key = props.parentId + '_' + index;
        var selected = isSelected(item);
        return /*#__PURE__*/React__namespace.createElement(PickListItem, {
          hostName: props.hostName,
          key: key,
          id: key,
          index: index,
          focused: key === props.focusedOptionId,
          value: item,
          template: props.itemTemplate,
          selected: selected,
          onClick: props.onItemClick,
          onKeyDown: props.onItemKeyDown,
          onMouseDown: function onMouseDown(event) {
            return props.onOptionMouseDown(_objectSpread$1(_objectSpread$1({}, event), {}, {
              index: index,
              type: props.type
            }));
          },
          onMouseMove: function onMouseMove() {
            return changeFocusedItemOnHover(index);
          },
          ptm: ptm,
          cx: cx
        });
      });
    }
    return null;
  };
  var createFilter = function createFilter() {
    var iconClassName = 'p-picklist-filter-icon';
    var filterIconProps = mergeProps({
      className: cx('filterIcon')
    }, getPTOptions('filterIcon'));
    var icon = props.type === 'source' ? props.sourceFilterIcon || /*#__PURE__*/React__namespace.createElement(search.SearchIcon, filterIconProps) : props.targetFilterIcon || /*#__PURE__*/React__namespace.createElement(search.SearchIcon, filterIconProps);
    var filterIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread$1({}, filterIconProps), {
      props: props
    });
    if (props.showFilter) {
      var filterProps = mergeProps({
        className: cx('filter')
      }, getPTOptions('filter'));
      var filterInputProps = mergeProps({
        type: 'text',
        value: props.filterValue,
        onChange: onFilter,
        onKeyDown: onFilterInputKeyDown,
        placeholder: props.placeholder,
        className: cx('filterInput')
      }, getPTOptions('filterInput'));
      var content = /*#__PURE__*/React__namespace.createElement("div", filterProps, /*#__PURE__*/React__namespace.createElement("input", filterInputProps), /*#__PURE__*/React__namespace.createElement("span", null, " ", filterIcon, " "));
      if (props.filterTemplate) {
        var defaultContentOptions = {
          className: 'p-picklist-filter',
          inputProps: {
            className: 'p-picklist-filter-input p-inputtext p-component',
            onChange: onFilter,
            onKeyDown: onFilterInputKeyDown
          },
          iconClassName: iconClassName,
          element: content,
          props: props
        };
        content = utils.ObjectUtils.getJSXElement(props.filterTemplate, defaultContentOptions);
      }
      var filterContainerProps = mergeProps({
        className: cx('filterContainer')
      }, getPTOptions('filterContainer'));
      return /*#__PURE__*/React__namespace.createElement("div", filterContainerProps, content);
    }
    return null;
  };
  var createList = function createList() {
    var items = createItems();
    var listProps = mergeProps({
      ref: listElementRef,
      className: utils.classNames(props.listClassName, cx('list')),
      role: 'listbox',
      id: props.parentId + '_' + props.type + '_list',
      'aria-multiselectable': true,
      'aria-activedescendant': props.ariaActivedescendant,
      tabIndex: props.list && props.list.length > 0 ? props.tabIndex : -1,
      onKeyDown: props.onListKeyDown,
      onFocus: function onFocus(event) {
        props.onListFocus(event, props.type);
      },
      onBlur: props.onListBlur,
      style: props.style
    }, getPTOptions('list'));
    return /*#__PURE__*/React__namespace.createElement("ul", listProps, items);
  };
  var header = createHeader();
  var filter = createFilter();
  var list = createList();
  var listWrapperProps = mergeProps({
    className: utils.classNames(props.className, cx('listWrapper'))
  }, getPTOptions('listWrapper'));
  return /*#__PURE__*/React__namespace.createElement("div", listWrapperProps, header, filter, list);
}));
PickListSubList.displayName = 'PickListSubList';

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var FilterMatchMode = Object.freeze({
  STARTS_WITH: 'startsWith',
  CONTAINS: 'contains',
  NOT_CONTAINS: 'notContains',
  ENDS_WITH: 'endsWith',
  EQUALS: 'equals',
  NOT_EQUALS: 'notEquals',
  IN: 'in',
  LESS_THAN: 'lt',
  LESS_THAN_OR_EQUAL_TO: 'lte',
  GREATER_THAN: 'gt',
  GREATER_THAN_OR_EQUAL_TO: 'gte',
  BETWEEN: 'between',
  DATE_IS: 'dateIs',
  DATE_IS_NOT: 'dateIsNot',
  DATE_BEFORE: 'dateBefore',
  DATE_AFTER: 'dateAfter',
  CUSTOM: 'custom'
});

/**
 * @deprecated please use PrimeReactContext
 */
var PrimeReact = /*#__PURE__*/_createClass(function PrimeReact() {
  _classCallCheck(this, PrimeReact);
});
_defineProperty(PrimeReact, "ripple", false);
_defineProperty(PrimeReact, "inputStyle", 'outlined');
_defineProperty(PrimeReact, "locale", 'en');
_defineProperty(PrimeReact, "appendTo", null);
_defineProperty(PrimeReact, "cssTransition", true);
_defineProperty(PrimeReact, "autoZIndex", true);
_defineProperty(PrimeReact, "hideOverlaysOnDocumentScrolling", false);
_defineProperty(PrimeReact, "nonce", null);
_defineProperty(PrimeReact, "nullSortOrder", 1);
_defineProperty(PrimeReact, "zIndex", {
  modal: 1100,
  overlay: 1000,
  menu: 1000,
  tooltip: 1100,
  toast: 1200
});
_defineProperty(PrimeReact, "pt", undefined);
_defineProperty(PrimeReact, "filterMatchModeOptions", {
  text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
  numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
  date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
});
_defineProperty(PrimeReact, "changeTheme", function (currentTheme, newTheme, linkElementId, callback) {
  var _linkElement$parentNo;
  var linkElement = document.getElementById(linkElementId);
  var cloneLinkElement = linkElement.cloneNode(true);
  var newThemeUrl = linkElement.getAttribute('href').replace(currentTheme, newTheme);
  cloneLinkElement.setAttribute('id', linkElementId + '-clone');
  cloneLinkElement.setAttribute('href', newThemeUrl);
  cloneLinkElement.addEventListener('load', function () {
    linkElement.remove();
    cloneLinkElement.setAttribute('id', linkElementId);
    if (callback) {
      callback();
    }
  });
  (_linkElement$parentNo = linkElement.parentNode) === null || _linkElement$parentNo === void 0 || _linkElement$parentNo.insertBefore(cloneLinkElement, linkElement.nextSibling);
});

var locales = {
  en: {
    accept: 'Yes',
    addRule: 'Add Rule',
    am: 'AM',
    apply: 'Apply',
    cancel: 'Cancel',
    choose: 'Choose',
    chooseDate: 'Choose Date',
    chooseMonth: 'Choose Month',
    chooseYear: 'Choose Year',
    clear: 'Clear',
    completed: 'Completed',
    contains: 'Contains',
    custom: 'Custom',
    dateAfter: 'Date is after',
    dateBefore: 'Date is before',
    dateFormat: 'mm/dd/yy',
    dateIs: 'Date is',
    dateIsNot: 'Date is not',
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    emptyFilterMessage: 'No results found',
    emptyMessage: 'No available options',
    emptySearchMessage: 'No results found',
    emptySelectionMessage: 'No selected item',
    endsWith: 'Ends with',
    equals: 'Equals',
    fileSizeTypes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    filter: 'Filter',
    firstDayOfWeek: 0,
    gt: 'Greater than',
    gte: 'Greater than or equal to',
    lt: 'Less than',
    lte: 'Less than or equal to',
    matchAll: 'Match All',
    matchAny: 'Match Any',
    medium: 'Medium',
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    nextDecade: 'Next Decade',
    nextHour: 'Next Hour',
    nextMinute: 'Next Minute',
    nextMonth: 'Next Month',
    nextSecond: 'Next Second',
    nextYear: 'Next Year',
    noFilter: 'No Filter',
    notContains: 'Not contains',
    notEquals: 'Not equals',
    now: 'Now',
    passwordPrompt: 'Enter a password',
    pending: 'Pending',
    pm: 'PM',
    prevDecade: 'Previous Decade',
    prevHour: 'Previous Hour',
    prevMinute: 'Previous Minute',
    prevMonth: 'Previous Month',
    prevSecond: 'Previous Second',
    prevYear: 'Previous Year',
    reject: 'No',
    removeRule: 'Remove Rule',
    searchMessage: '{0} results are available',
    selectionMessage: '{0} items selected',
    showMonthAfterYear: false,
    startsWith: 'Starts with',
    strong: 'Strong',
    today: 'Today',
    upload: 'Upload',
    weak: 'Weak',
    weekHeader: 'Wk',
    aria: {
      cancelEdit: 'Cancel Edit',
      close: 'Close',
      collapseRow: 'Row Collapsed',
      editRow: 'Edit Row',
      expandRow: 'Row Expanded',
      falseLabel: 'False',
      filterConstraint: 'Filter Constraint',
      filterOperator: 'Filter Operator',
      firstPageLabel: 'First Page',
      gridView: 'Grid View',
      hideFilterMenu: 'Hide Filter Menu',
      jumpToPageDropdownLabel: 'Jump to Page Dropdown',
      jumpToPageInputLabel: 'Jump to Page Input',
      lastPageLabel: 'Last Page',
      listView: 'List View',
      moveAllToSource: 'Move All to Source',
      moveAllToTarget: 'Move All to Target',
      moveBottom: 'Move Bottom',
      moveDown: 'Move Down',
      moveToSource: 'Move to Source',
      moveToTarget: 'Move to Target',
      moveTop: 'Move Top',
      moveUp: 'Move Up',
      navigation: 'Navigation',
      next: 'Next',
      nextPageLabel: 'Next Page',
      nullLabel: 'Not Selected',
      pageLabel: 'Page {page}',
      otpLabel: 'Please enter one time password character {0}',
      passwordHide: 'Hide Password',
      passwordShow: 'Show Password',
      previous: 'Previous',
      previousPageLabel: 'Previous Page',
      rotateLeft: 'Rotate Left',
      rotateRight: 'Rotate Right',
      rowsPerPageLabel: 'Rows per page',
      saveEdit: 'Save Edit',
      scrollTop: 'Scroll Top',
      selectAll: 'All items selected',
      selectRow: 'Row Selected',
      showFilterMenu: 'Show Filter Menu',
      slide: 'Slide',
      slideNumber: '{slideNumber}',
      star: '1 star',
      stars: '{star} stars',
      trueLabel: 'True',
      unselectAll: 'All items unselected',
      unselectRow: 'Row Unselected',
      zoomImage: 'Zoom Image',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out'
    }
  }
};

/**
 * Find an ARIA label in the locale by key.  If options are passed it will replace all options:
 * ```ts
 * const ariaValue = "Page {page}, User {user}, Role {role}";
 * const options = { page: 2, user: "John", role: "Admin" };
 * const result = ariaLabel('yourLabel', { page: 2, user: "John", role: "Admin" })
 * console.log(result); // Output: Page 2, User John, Role Admin
 * ```
 * @param {string} ariaKey key of the ARIA label to look up in locale.
 * @param {any} options JSON options like { page: 2, user: "John", role: "Admin" }
 * @returns the ARIA label with replaced values
 */
function ariaLabel(ariaKey, options) {
  if (ariaKey.includes('__proto__') || ariaKey.includes('prototype')) {
    throw new Error('Unsafe ariaKey detected');
  }
  var _locale = PrimeReact.locale;
  try {
    var _ariaLabel = localeOptions(_locale).aria[ariaKey];
    if (_ariaLabel) {
      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          _ariaLabel = _ariaLabel.replace("{".concat(key, "}"), options[key]);
        }
      }
    }
    return _ariaLabel;
  } catch (error) {
    throw new Error("The ".concat(ariaKey, " option is not found in the current locale('").concat(_locale, "')."));
  }
}
function localeOptions(locale) {
  var _locale = locale || PrimeReact.locale;
  if (_locale.includes('__proto__') || _locale.includes('prototype')) {
    throw new Error('Unsafe locale detected');
  }
  return locales[_locale];
}

var PickListTransferControls = /*#__PURE__*/React__namespace.memo(function (props) {
  var mergeProps = hooks.useMergeProps();
  var viewChanged = hooks.useMatchMedia("(max-width: ".concat(props.breakpoint, ")"), props.breakpoint);
  var ptm = props.ptm,
    cx = props.cx,
    unstyled = props.unstyled;
  function getIconComponent(iconType) {
    switch (iconType) {
      case 'moveToTargetIcon':
        return props.moveToTargetIcon || viewChanged ? props.moveToTargetIcon || /*#__PURE__*/React__namespace.createElement(angledown.AngleDownIcon, null) : props.moveToTargetIcon || /*#__PURE__*/React__namespace.createElement(angleright.AngleRightIcon, null);
      case 'moveAllToTargetIcon':
        return props.moveAllToTargetIcon || viewChanged ? props.moveAllToTargetIcon || /*#__PURE__*/React__namespace.createElement(angledoubledown.AngleDoubleDownIcon, null) : props.moveAllToTargetIcon || /*#__PURE__*/React__namespace.createElement(angledoubleright.AngleDoubleRightIcon, null);
      case 'moveToSourceIcon':
        return props.moveToSourceIcon || viewChanged ? props.moveToSourceIcon || /*#__PURE__*/React__namespace.createElement(angleup.AngleUpIcon, null) : props.moveToSourceIcon || /*#__PURE__*/React__namespace.createElement(angleleft.AngleLeftIcon, null);
      case 'moveAllToSourceIcon':
        return props.moveAllToSourceIcon || viewChanged ? props.moveAllToSourceIcon || /*#__PURE__*/React__namespace.createElement(angledoubleup.AngleDoubleUpIcon, null) : props.moveAllToSourceIcon || /*#__PURE__*/React__namespace.createElement(angledoubleleft.AngleDoubleLeftIcon, null);
      default:
        return null;
    }
  }
  var moveToTargetIcon = utils.IconUtils.getJSXIcon(getIconComponent('moveToTargetIcon'), undefined, {
    props: props,
    viewChanged: viewChanged
  });
  var moveAllToTargetIcon = utils.IconUtils.getJSXIcon(getIconComponent('moveAllToTargetIcon'), undefined, {
    props: props,
    viewChanged: viewChanged
  });
  var moveToSourceIcon = utils.IconUtils.getJSXIcon(getIconComponent('moveToSourceIcon'), undefined, {
    props: props,
    viewChanged: viewChanged
  });
  var moveAllToSourceIcon = utils.IconUtils.getJSXIcon(getIconComponent('moveAllToSourceIcon'), undefined, {
    props: props,
    viewChanged: viewChanged
  });
  var moveRightDisabled = utils.ObjectUtils.isEmpty(props.sourceSelection) || utils.ObjectUtils.isEmpty(props.visibleSourceList);
  var moveLeftDisabled = utils.ObjectUtils.isEmpty(props.targetSelection) || utils.ObjectUtils.isEmpty(props.visibleTargetList);
  var moveAllRightDisabled = utils.ObjectUtils.isEmpty(props.visibleSourceList);
  var moveAllLeftDisabled = utils.ObjectUtils.isEmpty(props.visibleTargetList);
  var moveRight = function moveRight(event) {
    var selection = props.sourceSelection;
    if (utils.ObjectUtils.isNotEmpty(selection)) {
      var targetList = _toConsumableArray(props.target);
      var sourceList = _toConsumableArray(props.source);
      for (var i = 0; i < selection.length; i++) {
        var selectedItem = selection[i];
        if (utils.ObjectUtils.findIndexInList(selectedItem, targetList, props.dataKey) === -1) {
          targetList.push(sourceList.splice(utils.ObjectUtils.findIndexInList(selectedItem, sourceList, props.dataKey), 1)[0]);
        }
      }
      if (props.onTransfer) {
        props.onTransfer({
          originalEvent: event,
          source: sourceList,
          target: targetList,
          direction: 'toTarget'
        });
      }
    }
  };
  var moveAllRight = function moveAllRight(event) {
    if (props.source) {
      var targetList = [].concat(_toConsumableArray(props.target), _toConsumableArray(props.visibleSourceList));
      var sourceList = props.source.filter(function (s) {
        return !props.visibleSourceList.some(function (vs) {
          return vs === s;
        });
      });
      if (props.onTransfer) {
        props.onTransfer({
          originalEvent: event,
          source: sourceList,
          target: targetList,
          direction: 'allToTarget'
        });
      }
    }
  };
  var moveLeft = function moveLeft(event) {
    var selection = props.targetSelection;
    if (utils.ObjectUtils.isNotEmpty(selection)) {
      var targetList = _toConsumableArray(props.target);
      var sourceList = _toConsumableArray(props.source);
      for (var i = 0; i < selection.length; i++) {
        var selectedItem = selection[i];
        if (utils.ObjectUtils.findIndexInList(selectedItem, sourceList, props.dataKey) === -1) {
          sourceList.push(targetList.splice(utils.ObjectUtils.findIndexInList(selectedItem, targetList, props.dataKey), 1)[0]);
        }
      }
      if (props.onTransfer) {
        props.onTransfer({
          originalEvent: event,
          source: sourceList,
          target: targetList,
          direction: 'toSource'
        });
      }
    }
  };
  var moveAllLeft = function moveAllLeft(event) {
    if (props.source) {
      var sourceList = [].concat(_toConsumableArray(props.source), _toConsumableArray(props.visibleTargetList));
      var targetList = props.target.filter(function (t) {
        return !props.visibleTargetList.some(function (vt) {
          return vt === t;
        });
      });
      if (props.onTransfer) {
        props.onTransfer({
          originalEvent: event,
          source: sourceList,
          target: targetList,
          direction: 'allToSource'
        });
      }
    }
  };
  var buttonsProps = mergeProps({
    className: utils.classNames(props.className, cx('buttons'))
  }, ptm('buttons', {
    hostName: props.hostName
  }));
  return /*#__PURE__*/React__namespace.createElement("div", buttonsProps, /*#__PURE__*/React__namespace.createElement(button.Button, {
    disabled: moveRightDisabled,
    type: "button",
    icon: moveToTargetIcon,
    onClick: moveRight,
    pt: ptm('moveToTargetButton'),
    unstyled: unstyled,
    "aria-label": ariaLabel('moveToTarget'),
    __parentMetadata: {
      parent: props.metaData
    }
  }), /*#__PURE__*/React__namespace.createElement(button.Button, {
    disabled: moveAllRightDisabled,
    type: "button",
    icon: moveAllToTargetIcon,
    onClick: moveAllRight,
    pt: ptm('moveAllToTargetButton'),
    unstyled: unstyled,
    "aria-label": ariaLabel('moveAllToTarget'),
    __parentMetadata: {
      parent: props.metaData
    }
  }), /*#__PURE__*/React__namespace.createElement(button.Button, {
    disabled: moveLeftDisabled,
    type: "button",
    icon: moveToSourceIcon,
    onClick: moveLeft,
    pt: ptm('moveToSourceButton'),
    unstyled: unstyled,
    "aria-label": ariaLabel('moveToSource'),
    __parentMetadata: {
      parent: props.metaData
    }
  }), /*#__PURE__*/React__namespace.createElement(button.Button, {
    disabled: moveAllLeftDisabled,
    type: "button",
    icon: moveAllToSourceIcon,
    onClick: moveAllLeft,
    pt: ptm('moveAllToSourceButton'),
    unstyled: unstyled,
    "aria-label": ariaLabel('moveAllToSource'),
    __parentMetadata: {
      parent: props.metaData
    }
  }));
});
PickListTransferControls.displayName = 'PickListTransferControls';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var PickList = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(PrimeReact$1.PrimeReactContext);
  var props = PickListBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    sourceSelectionState = _React$useState2[0],
    setSourceSelectionState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState([]),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    targetSelectionState = _React$useState4[0],
    setTargetSelectionState = _React$useState4[1];
  var _React$useState5 = React__namespace.useState(''),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    sourceFilterValueState = _React$useState6[0],
    setSourceFilterValueState = _React$useState6[1];
  var _React$useState7 = React__namespace.useState(''),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    targetFilterValueState = _React$useState8[0],
    setTargetFilterValueState = _React$useState8[1];
  var _React$useState9 = React__namespace.useState(props.id),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    attributeSelectorState = _React$useState10[0],
    setAttributeSelectorState = _React$useState10[1];
  var _React$useState11 = React__namespace.useState(-1),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    focusedOptionIndex = _React$useState12[0],
    setFocusedOptionIndex = _React$useState12[1];
  var _React$useState13 = React__namespace.useState(null),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    focusedOptionId = _React$useState14[0],
    setFocusedOptionId = _React$useState14[1];
  var _React$useState15 = React__namespace.useState({
      source: false,
      target: false
    }),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    focused = _React$useState16[0],
    setFocused = _React$useState16[1];
  var metaData = {
    props: props,
    state: {
      sourceSelection: sourceSelectionState,
      targetSelection: targetSelectionState,
      sourceFilterValue: sourceFilterValueState,
      targetFilterValue: targetFilterValueState,
      attributeSelector: attributeSelectorState
    }
  };
  var _PickListBase$setMeta = PickListBase.setMetaData(metaData),
    ptm = _PickListBase$setMeta.ptm,
    cx = _PickListBase$setMeta.cx,
    isUnstyled = _PickListBase$setMeta.isUnstyled;
  componentbase.useHandleStyle(PickListBase.css.styles, isUnstyled, {
    name: 'picklist'
  });
  var elementRef = React__namespace.useRef(null);
  var sourceListElementRef = React__namespace.useRef(null);
  var targetListElementRef = React__namespace.useRef(null);
  var reorderedListElementRef = React__namespace.useRef(null);
  var reorderDirection = React__namespace.useRef(null);
  var styleElementRef = React__namespace.useRef(null);
  var sourceSelection = props.sourceSelection ? props.sourceSelection : sourceSelectionState;
  var targetSelection = props.targetSelection ? props.targetSelection : targetSelectionState;
  var sourceFilteredValue = props.onSourceFilterChange ? props.sourceFilterValue : sourceFilterValueState;
  var targetFilteredValue = props.onTargetFilterChange ? props.targetFilterValue : targetFilterValueState;
  var hasFilterBy = utils.ObjectUtils.isNotEmpty(props.filterBy);
  var showSourceFilter = hasFilterBy && props.showSourceFilter;
  var showTargetFilter = hasFilterBy && props.showTargetFilter;
  var onSourceReorder = function onSourceReorder(event) {
    handleChange(event, event.value, props.target);
    reorderedListElementRef.current = getListElement('source');
    reorderDirection.current = event.direction;
  };
  var onTargetReorder = function onTargetReorder(event) {
    handleChange(event, props.source, event.value);
    reorderedListElementRef.current = getListElement('target');
    reorderDirection.current = event.direction;
  };
  var handleScrollPosition = function handleScrollPosition(listElement, direction) {
    if (listElement) {
      switch (direction) {
        case 'up':
          scrollInView(listElement, -1);
          break;
        case 'top':
          listElement.scrollTop = 0;
          break;
        case 'down':
          scrollInView(listElement, 1);
          break;
        case 'bottom':
          /* TODO: improve this code block */
          setTimeout(function () {
            return listElement.scrollTop = listElement.scrollHeight;
          }, 100);
          break;
      }
    }
  };
  var handleChange = function handleChange(event, source, target) {
    if (props.onChange) {
      props.onChange({
        originalEvent: event.originalEvent,
        source: source,
        target: target
      });
    }
  };
  var onTransfer = function onTransfer(event) {
    var originalEvent = event.originalEvent,
      source = event.source,
      target = event.target,
      direction = event.direction;
    var selectedValue = [];
    switch (direction) {
      case 'toTarget':
        selectedValue = sourceSelection;
        if (props.onMoveToTarget) {
          props.onMoveToTarget({
            originalEvent: originalEvent,
            value: selectedValue
          });
        }
        break;
      case 'allToTarget':
        selectedValue = props.source;
        if (props.onMoveAllToTarget) {
          props.onMoveAllToTarget({
            originalEvent: originalEvent,
            value: selectedValue
          });
        }
        selectedValue = [];
        break;
      case 'toSource':
        selectedValue = targetSelection;
        if (props.onMoveToSource) {
          props.onMoveToSource({
            originalEvent: originalEvent,
            value: selectedValue
          });
        }
        break;
      case 'allToSource':
        selectedValue = props.target;
        if (props.onMoveAllToSource) {
          props.onMoveAllToSource({
            originalEvent: originalEvent,
            value: selectedValue
          });
        }
        selectedValue = [];
        break;
    }
    _onSelectionChange({
      originalEvent: originalEvent,
      value: selectedValue
    }, 'sourceSelection', props.onSourceSelectionChange);
    _onSelectionChange({
      originalEvent: originalEvent,
      value: selectedValue
    }, 'targetSelection', props.onTargetSelectionChange);
    handleChange(event, source, target);
  };
  var scrollInView = function scrollInView(listContainer) {
    var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var selectedItems = listContainer.getElementsByClassName('p-highlight');
    if (utils.ObjectUtils.isNotEmpty(selectedItems)) {
      utils.DomHandler.scrollInView(listContainer, direction === -1 ? selectedItems[0] : selectedItems[selectedItems.length - 1]);
    }
  };
  var _onSelectionChange = function onSelectionChange(e, stateKey, callback) {
    if (stateKey === 'sourceSelection') {
      setSourceSelectionState(e.value);
    } else {
      setTargetSelectionState(e.value);
    }
    if (callback) {
      callback(e);
    }
    if (utils.ObjectUtils.isNotEmpty(sourceSelection) && stateKey === 'targetSelection') {
      setSourceSelectionState([]);
    } else if (utils.ObjectUtils.isNotEmpty(targetSelection) && stateKey === 'sourceSelection') {
      setTargetSelectionState([]);
    }
  };
  var onFilter = function onFilter(event) {
    var originalEvent = event.originalEvent,
      value = event.value,
      type = event.type;
    var _ref = type === 'source' ? [setSourceFilterValueState, props.onSourceFilterChange] : [setTargetFilterValueState, props.onTargetFilterChange],
      _ref2 = _slicedToArray(_ref, 2),
      setFilterState = _ref2[0],
      onFilterChange = _ref2[1];
    if (onFilterChange) {
      onFilterChange({
        originalEvent: originalEvent,
        value: value
      });
    } else {
      setFilterState(value);
    }
  };
  var filterSource = function filterSource() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var filteredValue = value.trim().toLocaleLowerCase(props.filterLocale);
    return filter(props.source, filteredValue);
  };
  var filterTarget = function filterTarget() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var filteredValue = value.trim().toLocaleLowerCase(props.filterLocale);
    return filter(props.target, filteredValue);
  };
  var filter = function filter(list, filterValue) {
    var searchFields = hasFilterBy ? props.filterBy.split(',') : [];
    return PrimeReact$1.FilterService.filter(list, searchFields, filterValue, props.filterMatchMode, props.filterLocale);
  };
  var getVisibleList = function getVisibleList(list, type) {
    var _ref3 = type === 'source' ? [sourceFilteredValue, filterSource] : [targetFilteredValue, filterTarget],
      _ref4 = _slicedToArray(_ref3, 2),
      filteredValue = _ref4[0],
      filterCallback = _ref4[1];
    return hasFilterBy && utils.ObjectUtils.isNotEmpty(filteredValue) ? filterCallback(filteredValue) : list;
  };
  var sourceList = getVisibleList(props.source, 'source');
  var targetList = getVisibleList(props.target, 'target');
  var findCurrentFocusedIndex = function findCurrentFocusedIndex(listElement) {
    if (focusedOptionIndex === -1) {
      var itemList = listElement && listElement.children ? _toConsumableArray(listElement.children) : [];
      var selectedOptionIndex = findFirstSelectedOptionIndex(listElement, itemList);
      if (props.autoOptionFocus && selectedOptionIndex === -1) {
        selectedOptionIndex = findFirstFocusedOptionIndex(listElement, itemList);
      }
      return selectedOptionIndex;
    }
    return -1;
  };
  var findFirstSelectedOptionIndex = function findFirstSelectedOptionIndex(listElement, itemList) {
    if (sourceSelectionState.length || targetSelectionState.length) {
      var selectedFirstItem = utils.DomHandler.findSingle(listElement, '[data-p-highlight="true"]');
      return utils.ObjectUtils.findIndexInList(selectedFirstItem, itemList);
    }
    return -1;
  };
  var findFirstFocusedOptionIndex = function findFirstFocusedOptionIndex(listElement, itemList) {
    var firstFocusableItem = utils.DomHandler.findSingle(listElement, '[data-pc-section="item"]');
    return utils.ObjectUtils.findIndexInList(firstFocusableItem, itemList);
  };
  var _onListFocus = function onListFocus(event, type) {
    setFocused(_objectSpread(_objectSpread({}, focused), {}, _defineProperty({}, type, true)));
    var listElement = getListElement(type);
    var currentFocusedIndex = findCurrentFocusedIndex(listElement);
    changeFocusedOptionIndex(currentFocusedIndex, type);
    props.onFocus && props.onFocus(event);
  };
  var _onListBlur = function onListBlur(event, type) {
    setFocused(_objectSpread(_objectSpread({}, focused), {}, _defineProperty({}, type, false)));
    setFocusedOptionIndex(-1);
    props.onBlur && props.onBlur(event);
  };
  var _onItemClick = function onItemClick(event, type) {
    var arrowKeyClick = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var originalEvent = event.originalEvent;
    var item = event.value;
    var selectedId = event.id;
    var isSource = type === 'source';
    var selection = _toConsumableArray(isSource ? sourceSelection : targetSelection);
    var index = utils.ObjectUtils.findIndexInList(item, selection, props.dataKey);
    var selected = index !== -1;
    var metaSelection = props.metaKeySelection;
    if (!arrowKeyClick) {
      setFocusedOptionIndex(selectedId);
    }
    if (metaSelection) {
      var metaKey = originalEvent.metaKey || originalEvent.ctrlKey || originalEvent.shiftKey;
      if (selected && metaKey) {
        selection.splice(index, 1);
      } else {
        if (!metaKey) {
          selection.length = 0;
        }
        selection.push(item);
      }
    } else if (selected) {
      selection.splice(index, 1);
    } else {
      selection.push(item);
    }
    if (isSource) {
      _onSelectionChange({
        originalEvent: originalEvent,
        value: selection
      }, 'sourceSelection', props.onSourceSelectionChange);
    } else {
      _onSelectionChange({
        originalEvent: originalEvent,
        value: selection
      }, 'targetSelection', props.onTargetSelectionChange);
    }
  };
  var _onOptionMouseDown = function onOptionMouseDown(_ref5) {
    var index = _ref5.index,
      type = _ref5.type;
    setFocused(_objectSpread(_objectSpread({}, focused), {}, _defineProperty({}, type, true)));
    setFocusedOptionIndex(index);
  };
  var _onListKeyDown = function onListKeyDown(event, type) {
    switch (event.code) {
      case 'ArrowDown':
        onArrowDownKey(event, type);
        break;
      case 'ArrowUp':
        onArrowUpKey(event, type);
        break;
      case 'Home':
        onHomeKey(event, type);
        break;
      case 'End':
        onEndKey(event, type);
        break;
      case 'Enter':
      case 'NumpadEnter':
        onEnterKey(event, type);
        break;
      case 'Space':
        onSpaceKey(event, type);
        break;
      case 'KeyA':
        if (event.ctrlKey) {
          var isSource = type === 'source';
          if (isSource) {
            setSourceSelectionState(_toConsumableArray(sourceList));
          } else {
            setTargetSelectionState(_toConsumableArray(targetList));
          }
          _onSelectionChange({
            originalEvent: event,
            value: _toConsumableArray(sourceList)
          }, isSource ? 'sourceSelection' : 'targetSelection', isSource ? props.onSourceSelectionChange : props.onTargetSelectionChange);
          event.preventDefault();
        }
    }
  };
  var onArrowDownKey = function onArrowDownKey(event, type) {
    var optionIndex = findNextOptionIndex(focusedOptionIndex, type);
    var visibleList = getVisibleList(type === 'source' ? props.source : props.target, type);
    changeFocusedOptionIndex(optionIndex, type);
    if (visibleList && visibleList.length > 0 && event.shiftKey) {
      _onItemClick({
        originalEvent: event,
        value: visibleList[optionIndex]
      }, type, true);
    }
    event.preventDefault();
  };
  var onArrowUpKey = function onArrowUpKey(event, type) {
    var optionIndex = findPrevOptionIndex(focusedOptionIndex, type);
    var visibleList = getVisibleList(type === 'source' ? props.source : props.target, type);
    changeFocusedOptionIndex(optionIndex, type);
    if (visibleList && visibleList.length > 0 && event.shiftKey) {
      _onItemClick({
        originalEvent: event,
        value: visibleList[optionIndex]
      }, type, true);
    }
    event.preventDefault();
  };
  var onEnterKey = function onEnterKey(event, type) {
    var listElement = getListElement(type);
    var visibleList = getVisibleList(type === 'source' ? props.source : props.target, type);
    var items = utils.DomHandler.find(listElement, '[data-pc-section="item"]');
    var focusedItem = utils.DomHandler.findSingle(listElement, "[data-pc-section=\"item\"][id=".concat(focusedOptionIndex, "]"));
    var id = focusedItem && focusedItem.getAttribute('id');
    var matchedOptionIndex = _toConsumableArray(items).findIndex(function (item) {
      return item === focusedItem;
    });
    if (visibleList && visibleList.length > 0) {
      _onItemClick({
        originalEvent: event,
        value: visibleList[matchedOptionIndex],
        id: id
      }, type);
    }
    event.preventDefault();
  };
  var onSpaceKey = function onSpaceKey(event, type) {
    event.preventDefault();
    var isSource = type === 'source';
    var selection = isSource ? sourceSelectionState : targetSelectionState;
    if (event.shiftKey && selection && selection.length > 0) {
      var listItems = isSource ? sourceList : targetList;
      var listElement = getListElement(type);
      var items = utils.DomHandler.find(listElement, '[data-pc-section="item"]');
      var selectedItemIndex = utils.ObjectUtils.findIndexInList(selection[0], _toConsumableArray(listItems));
      var focusedItem = utils.DomHandler.findSingle(listElement, "[data-pc-section=\"item\"][id=".concat(focusedOptionIndex, "]"));
      var matchedOptionIndex = _toConsumableArray(items).findIndex(function (item) {
        return item === focusedItem;
      });
      _toConsumableArray(listItems).slice(Math.min(selectedItemIndex, matchedOptionIndex), Math.max(selectedItemIndex, matchedOptionIndex) + 1), _readOnlyError("selection");
      if (isSource) {
        _onSelectionChange({
          originalEvent: event,
          value: selection
        }, 'sourceSelection', props.onSourceSelectionChange);
      } else {
        _onSelectionChange({
          originalEvent: event,
          value: selection
        }, 'targetSelection', props.onTargetSelectionChange);
      }
    } else {
      onEnterKey(event, type);
    }
  };
  var onHomeKey = function onHomeKey(event, type) {
    if (event.ctrlKey && event.shiftKey) {
      var isSource = type === 'source';
      var listItems = isSource ? sourceList : targetList;
      var listElement = getListElement(type);
      var items = utils.DomHandler.find(listElement, '[data-pc-section="item"]');
      var focusedItem = utils.DomHandler.findSingle(listElement, "[data-pc-section=\"item\"][id=".concat(focusedOptionIndex, "]"));
      var matchedOptionIndex = _toConsumableArray(items).findIndex(function (item) {
        return item === focusedItem;
      });
      var selection = _toConsumableArray(listItems).slice(0, matchedOptionIndex + 1);
      if (isSource) {
        _onSelectionChange({
          originalEvent: event,
          value: selection
        }, 'sourceSelection', props.onSourceSelectionChange);
      } else {
        _onSelectionChange({
          originalEvent: event,
          value: selection
        }, 'targetSelection', props.onTargetSelectionChange);
      }
    } else {
      changeFocusedOptionIndex(0, type);
    }
    event.preventDefault();
  };
  var onEndKey = function onEndKey(event, type) {
    var listElement = getListElement(type);
    var items = utils.DomHandler.find(listElement, '[data-pc-section="item"]');
    if (event.ctrlKey && event.shiftKey) {
      var isSource = type === 'source';
      var listItems = isSource ? sourceList : targetList;
      var focusedItem = utils.DomHandler.findSingle(listElement, "[data-pc-section=\"item\"][id=".concat(focusedOptionIndex, "]"));
      var matchedOptionIndex = _toConsumableArray(items).findIndex(function (item) {
        return item === focusedItem;
      });
      var selection = _toConsumableArray(listItems).slice(matchedOptionIndex, items.length);
      if (isSource) {
        _onSelectionChange({
          originalEvent: event,
          value: selection
        }, 'sourceSelection', props.onSourceSelectionChange);
      } else {
        _onSelectionChange({
          originalEvent: event,
          value: selection
        }, 'targetSelection', props.onTargetSelectionChange);
      }
    } else {
      changeFocusedOptionIndex(items.length - 1, type);
    }
    event.preventDefault();
  };
  var findNextOptionIndex = function findNextOptionIndex(index, type) {
    var listElement = getListElement(type);
    var items = utils.DomHandler.find(listElement, '[data-pc-section="item"]');
    var matchedOptionIndex = _toConsumableArray(items).findIndex(function (link) {
      return link.id === index;
    });
    return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
  };
  var findPrevOptionIndex = function findPrevOptionIndex(index, type) {
    var listElement = getListElement(type);
    var items = utils.DomHandler.find(listElement, '[data-pc-section="item"]');
    var matchedOptionIndex = _toConsumableArray(items).findIndex(function (link) {
      return link.id === index;
    });
    return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
  };
  var changeFocusedOptionIndex = function changeFocusedOptionIndex(index, type) {
    var listElement = getListElement(type);
    var items = utils.DomHandler.find(listElement, '[data-pc-section="item"]');
    var order;
    if (index >= items.length) {
      order = items.length - 1;
    } else if (index < 0) {
      return;
    } else {
      order = index;
    }
    setFocusedOptionIndex(items[order].getAttribute('id'));
    scrollInViewWithFocus(items[order].getAttribute('id'), type);
  };
  var scrollInViewWithFocus = function scrollInViewWithFocus(id, type) {
    var listElement = getListElement(type);
    var element = utils.DomHandler.findSingle(listElement, "[data-pc-section=\"item\"][id=\"".concat(id, "\"]"));
    if (element) {
      element.scrollIntoView && element.scrollIntoView({
        block: 'nearest',
        inline: 'start'
      });
    }
  };
  var getListElement = function getListElement(type) {
    return type === 'source' ? sourceListElementRef.current.getElement() : targetListElementRef.current.getElement();
  };
  var createStyle = function createStyle() {
    if (!styleElementRef.current) {
      styleElementRef.current = utils.DomHandler.createInlineStyle(context && context.nonce || PrimeReact__default["default"].nonce, context && context.styleContainer);
      var innerHTML = "\n@media screen and (max-width: ".concat(props.breakpoint, ") {\n    .p-picklist[").concat(attributeSelectorState, "] {\n        flex-direction: column;\n    }\n\n    .p-picklist[").concat(attributeSelectorState, "] .p-picklist-buttons {\n        padding: var(--content-padding);\n        flex-direction: row;\n    }\n\n    .p-picklist[").concat(attributeSelectorState, "] .p-picklist-buttons .p-button {\n        margin-right: var(--inline-spacing);\n        margin-bottom: 0;\n    }\n\n    .p-picklist[").concat(attributeSelectorState, "] .p-picklist-buttons .p-button:last-child {\n        margin-right: 0;\n    }\n}\n");
      styleElementRef.current.innerHTML = innerHTML;
    }
  };
  var destroyStyle = function destroyStyle() {
    styleElementRef.current = utils.DomHandler.removeInlineStyle(styleElementRef.current);
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  hooks.useUpdateEffect(function () {
    if (attributeSelectorState) {
      elementRef.current.setAttribute(attributeSelectorState, '');
      createStyle();
    }
    return function () {
      destroyStyle();
    };
  }, [attributeSelectorState, props.breakpoint]);
  hooks.useUpdateEffect(function () {
    if (!props.id && !attributeSelectorState) {
      setAttributeSelectorState(utils.UniqueComponentId());
    }
    if (reorderedListElementRef.current) {
      handleScrollPosition(reorderedListElementRef.current, reorderDirection.current);
      reorderedListElementRef.current = null;
      reorderDirection.current = null;
    }
  });
  hooks.useUpdateEffect(function () {
    var _focusedOptionId = focusedOptionIndex !== -1 ? focusedOptionIndex : null;
    setFocusedOptionId(_focusedOptionId);
  }, [focusedOptionIndex]);
  var sourceItemTemplate = props.sourceItemTemplate ? props.sourceItemTemplate : props.itemTemplate;
  var targetItemTemplate = props.targetItemTemplate ? props.targetItemTemplate : props.itemTemplate;
  var rootProps = mergeProps({
    id: attributeSelectorState,
    ref: elementRef,
    className: utils.classNames(props.className, cx('root')),
    style: props.style
  }, PickListBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React__namespace.createElement("div", rootProps, props.showSourceControls && /*#__PURE__*/React__namespace.createElement(PickListControls, {
    hostName: "PickList",
    list: props.source,
    selection: sourceSelection,
    onReorder: onSourceReorder,
    className: cx('sourceControls'),
    dataKey: props.dataKey,
    moveUpIcon: props.moveUpIcon,
    moveTopIcon: props.moveTopIcon,
    moveDownIcon: props.moveDownIcon,
    moveBottomIcon: props.moveBottomIcon,
    ptm: ptm,
    cx: cx,
    unstyled: props.unstyled,
    metaData: metaData
  }), /*#__PURE__*/React__namespace.createElement(PickListSubList, {
    hostName: "PickList",
    ref: sourceListElementRef,
    type: "source",
    list: sourceList,
    parentId: attributeSelectorState,
    selection: sourceSelection,
    onSelectionChange: function onSelectionChange(e) {
      return _onSelectionChange(e, 'sourceSelection', props.onSourceSelectionChange);
    },
    onListKeyDown: function onListKeyDown(e) {
      return _onListKeyDown(e, 'source');
    },
    onListFocus: function onListFocus(e) {
      return _onListFocus(e, 'source');
    },
    onListBlur: function onListBlur(e) {
      return _onListBlur(e, 'source');
    },
    onOptionMouseDown: function onOptionMouseDown(index) {
      return _onOptionMouseDown(index);
    },
    onItemClick: function onItemClick(e) {
      return _onItemClick(e, 'source');
    },
    focusedOptionId: focused.source ? focusedOptionId : null,
    ariaActivedescendant: focused.source ? focusedOptionId : null,
    itemTemplate: sourceItemTemplate,
    header: props.sourceHeader,
    style: props.sourceStyle,
    className: cx('listSourceWrapper'),
    listClassName: cx('listSource'),
    metaKeySelection: props.metaKeySelection,
    tabIndex: props.tabIndex,
    dataKey: props.dataKey,
    filterValue: sourceFilteredValue,
    onFilter: onFilter,
    showFilter: showSourceFilter,
    placeholder: props.sourceFilterPlaceholder,
    filterTemplate: props.sourceFilterTemplate,
    sourceFilterIcon: props.sourceFilterIcon,
    ptm: ptm,
    cx: cx,
    focusedList: focused,
    changeFocusedOptionIndex: changeFocusedOptionIndex,
    focusOnHover: props.focusOnHover
  }), /*#__PURE__*/React__namespace.createElement(PickListTransferControls, {
    hostName: "PickList",
    onTransfer: onTransfer,
    source: props.source,
    visibleSourceList: sourceList,
    target: props.target,
    breakpoint: props.breakpoint,
    visibleTargetList: targetList,
    sourceSelection: sourceSelection,
    targetSelection: targetSelection,
    dataKey: props.dataKey,
    moveToTargetIcon: props.moveToTargetIcon,
    moveAllToTargetIcon: props.moveAllToTargetIcon,
    moveToSourceIcon: props.moveToSourceIcon,
    moveAllToSourceIcon: props.moveAllToSourceIcon,
    ptm: ptm,
    cx: cx,
    unstyled: props.unstyled,
    metaData: metaData
  }), /*#__PURE__*/React__namespace.createElement(PickListSubList, {
    hostName: "PickList",
    ref: targetListElementRef,
    type: "target",
    list: targetList,
    selection: targetSelection,
    parentId: attributeSelectorState,
    onSelectionChange: function onSelectionChange(e) {
      return _onSelectionChange(e, 'targetSelection', props.onTargetSelectionChange);
    },
    onListKeyDown: function onListKeyDown(e) {
      return _onListKeyDown(e, 'target');
    },
    onListFocus: function onListFocus(e) {
      return _onListFocus(e, 'target');
    },
    onListBlur: function onListBlur(e) {
      return _onListBlur(e, 'target');
    },
    onOptionMouseDown: function onOptionMouseDown(index) {
      return _onOptionMouseDown(index);
    },
    onItemClick: function onItemClick(e) {
      return _onItemClick(e, 'target');
    },
    focusedOptionId: focused.target ? focusedOptionId : null,
    ariaActivedescendant: focused.target ? focusedOptionId : null,
    itemTemplate: targetItemTemplate,
    header: props.targetHeader,
    style: props.targetStyle,
    className: cx('listTargetWrapper'),
    listClassName: cx('listWrapper'),
    metaKeySelection: props.metaKeySelection,
    tabIndex: props.tabIndex,
    dataKey: props.dataKey,
    filterValue: targetFilteredValue,
    onFilter: onFilter,
    showFilter: showTargetFilter,
    placeholder: props.targetFilterPlaceholder,
    filterTemplate: props.targetFilterTemplate,
    targetFilterIcon: props.targetFilterIcon,
    ptm: ptm,
    cx: cx,
    focusedList: focused,
    changeFocusedOptionIndex: changeFocusedOptionIndex,
    focusOnHover: props.focusOnHover
  }), props.showTargetControls && /*#__PURE__*/React__namespace.createElement(PickListControls, {
    hostName: "PickList",
    list: props.target,
    selection: targetSelection,
    onReorder: onTargetReorder,
    className: cx('targetControls'),
    dataKey: props.dataKey,
    moveUpIcon: props.moveUpIcon,
    moveTopIcon: props.moveTopIcon,
    moveDownIcon: props.moveDownIcon,
    moveBottomIcon: props.moveBottomIcon,
    ptm: ptm,
    cx: cx,
    unstyled: props.unstyled,
    metaData: metaData
  }));
}));
PickList.displayName = 'PickList';

exports.PickList = PickList;
