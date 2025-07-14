import * as React from 'react';
import PrimeReact, { PrimeReactContext, FilterService } from 'primereact/api';
import { useMatchMedia, useMountEffect, useUpdateEffect } from 'primereact/hooks';
import { classNames, mergeProps, ObjectUtils, IconUtils, DomHandler, UniqueComponentId } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { Button } from 'primereact/button';
import { AngleDoubleDownIcon } from 'primereact/icons/angledoubledown';
import { AngleDoubleUpIcon } from 'primereact/icons/angledoubleup';
import { AngleDownIcon } from 'primereact/icons/angledown';
import { AngleUpIcon } from 'primereact/icons/angleup';
import { SearchIcon } from 'primereact/icons/search';
import { Ripple } from 'primereact/ripple';
import { AngleDoubleLeftIcon } from 'primereact/icons/angledoubleleft';
import { AngleDoubleRightIcon } from 'primereact/icons/angledoubleright';
import { AngleLeftIcon } from 'primereact/icons/angleleft';
import { AngleRightIcon } from 'primereact/icons/angleright';

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

var PickListBase = ComponentBase.extend({
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
    metaKeySelection: true,
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
  }
});

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

var PickListControls = /*#__PURE__*/React.memo(function (props) {
  var moveUpIcon = props.moveUpIcon || /*#__PURE__*/React.createElement(AngleUpIcon, null);
  var moveTopIcon = props.moveTopIcon || /*#__PURE__*/React.createElement(AngleDoubleUpIcon, null);
  var moveDownIcon = props.moveDownIcon || /*#__PURE__*/React.createElement(AngleDownIcon, null);
  var moveBottomIcon = props.moveBottomIcon || /*#__PURE__*/React.createElement(AngleDoubleDownIcon, null);
  var moveDisabled = !props.selection || !props.selection.length;
  var moveUp = function moveUp(event) {
    var selectedItems = props.selection;
    if (selectedItems && selectedItems.length) {
      var list = _toConsumableArray(props.list);
      for (var i = 0; i < selectedItems.length; i++) {
        var selectedItem = selectedItems[i];
        var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list, props.dataKey);
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
        var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list, props.dataKey);
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
        var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list, props.dataKey);
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
        var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list, props.dataKey);
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
  var className = classNames('p-picklist-buttons', props.className);
  var controlsProps = mergeProps({
    className: className
  }, props.ptm('controls'));
  return /*#__PURE__*/React.createElement("div", controlsProps, /*#__PURE__*/React.createElement(Button, {
    disabled: moveDisabled,
    type: "button",
    icon: moveUpIcon,
    onClick: moveUp,
    pt: props.ptm('moveUpButton')
  }), /*#__PURE__*/React.createElement(Button, {
    disabled: moveDisabled,
    type: "button",
    icon: moveTopIcon,
    onClick: moveTop,
    pt: props.ptm('moveTopButton')
  }), /*#__PURE__*/React.createElement(Button, {
    disabled: moveDisabled,
    type: "button",
    icon: moveDownIcon,
    onClick: moveDown,
    pt: props.ptm('moveDownButton')
  }), /*#__PURE__*/React.createElement(Button, {
    disabled: moveDisabled,
    type: "button",
    icon: moveBottomIcon,
    onClick: moveBottom,
    pt: props.ptm('moveBottomButton')
  }));
});
PickListControls.displayName = 'PickListControls';

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

var PickListItem = /*#__PURE__*/React.memo(function (props) {
  var getPTOptions = function getPTOptions(key) {
    return props.ptm(key, {
      context: {
        selected: props.selected
      }
    });
  };
  var onClick = function onClick(event) {
    if (props.onClick) {
      props.onClick({
        originalEvent: event,
        value: props.value
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
  var content = props.template ? props.template(props.value) : props.value;
  var className = classNames('p-picklist-item', {
    'p-highlight': props.selected
  }, props.className);
  var itemProps = mergeProps({
    className: className,
    onClick: onClick,
    onKeyDown: onKeyDown,
    tabIndex: props.tabIndex,
    role: 'option',
    'aria-selected': props.selected
  }, getPTOptions('item'));
  return /*#__PURE__*/React.createElement("li", itemProps, content, /*#__PURE__*/React.createElement(Ripple, null));
});
PickListItem.displayName = 'PickListItem';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var PickListSubList = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var listElementRef = React.useRef(null);
  var onItemClick = function onItemClick(event) {
    var originalEvent = event.originalEvent;
    var item = event.value;
    var selection = _toConsumableArray(props.selection);
    var index = ObjectUtils.findIndexInList(item, selection, props.dataKey);
    var selected = index !== -1;
    var metaSelection = props.metaKeySelection;
    if (metaSelection) {
      var metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
      if (selected && metaKey) {
        selection.splice(index, 1);
      } else {
        if (!metaKey) {
          selection.length = 0;
        }
        selection.push(item);
      }
    } else {
      if (selected) selection.splice(index, 1);else selection.push(item);
    }
    if (props.onSelectionChange) {
      props.onSelectionChange({
        event: originalEvent,
        value: selection
      });
    }
  };
  var onItemKeyDown = function onItemKeyDown(event) {
    var originalEvent = event.originalEvent;
    var listItem = originalEvent.currentTarget;
    switch (originalEvent.which) {
      //down
      case 40:
        var nextItem = findNextItem(listItem);
        nextItem && nextItem.focus();
        originalEvent.preventDefault();
        break;

      //up
      case 38:
        var prevItem = findPrevItem(listItem);
        prevItem && prevItem.focus();
        originalEvent.preventDefault();
        break;

      //enter
      case 13:
        onItemClick(event);
        originalEvent.preventDefault();
        break;
    }
  };
  var findNextItem = function findNextItem(item) {
    var nextItem = item.nextElementSibling;
    return nextItem ? !DomHandler.hasClass(nextItem, 'p-picklist-item') ? findNextItem(nextItem) : nextItem : null;
  };
  var findPrevItem = function findPrevItem(item) {
    var prevItem = item.previousElementSibling;
    return prevItem ? !DomHandler.hasClass(prevItem, 'p-picklist-item') ? findPrevItem(prevItem) : prevItem : null;
  };
  var isSelected = function isSelected(item) {
    return ObjectUtils.findIndexInList(item, props.selection, props.dataKey) !== -1;
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
  React.useImperativeHandle(ref, function () {
    return {
      listElementRef: listElementRef
    };
  });
  var createHeader = function createHeader() {
    var headerProps = mergeProps({
      className: 'p-picklist-header'
    }, props.ptm('header'));
    if (props.header) {
      return /*#__PURE__*/React.createElement("div", headerProps, ObjectUtils.getJSXElement(props.header, props));
    }
    return null;
  };
  var createItems = function createItems() {
    if (props.list) {
      return props.list.map(function (item) {
        var key = JSON.stringify(item);
        var selected = isSelected(item);
        return /*#__PURE__*/React.createElement(PickListItem, {
          key: key,
          value: item,
          template: props.itemTemplate,
          selected: selected,
          onClick: onItemClick,
          onKeyDown: onItemKeyDown,
          tabIndex: props.tabIndex,
          ptm: props.ptm
        });
      });
    }
    return null;
  };
  var createFilter = function createFilter() {
    var iconClassName = 'p-picklist-filter-icon';
    var filterIconProps = mergeProps({
      className: iconClassName
    }, props.ptm('filterIcon'));
    var icon = props.type === 'source' ? props.sourceFilterIcon || /*#__PURE__*/React.createElement(SearchIcon, filterIconProps) : props.targetFilterIcon || /*#__PURE__*/React.createElement(SearchIcon, filterIconProps);
    var filterIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, filterIconProps), {
      props: props
    });
    if (props.showFilter) {
      var filterProps = mergeProps({
        className: 'p-picklist-filter'
      }, props.ptm('filter'));
      var filterInputProps = mergeProps({
        type: 'text',
        value: props.filterValue,
        onChange: onFilter,
        onKeyDown: onFilterInputKeyDown,
        placeholder: props.placeholder,
        className: 'p-picklist-filter-input p-inputtext p-component'
      }, props.ptm('filterInput'));
      var content = /*#__PURE__*/React.createElement("div", filterProps, /*#__PURE__*/React.createElement("input", filterInputProps), /*#__PURE__*/React.createElement("span", null, " ", filterIcon, " "));
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
        content = ObjectUtils.getJSXElement(props.filterTemplate, defaultContentOptions);
      }
      var filterContainerProps = mergeProps({
        className: 'p-picklist-filter-container'
      }, props.ptm('filterContainer'));
      return /*#__PURE__*/React.createElement("div", filterContainerProps, content);
    }
    return null;
  };
  var createList = function createList() {
    var items = createItems();
    var className = classNames('p-picklist-list', props.listClassName);
    var listProps = mergeProps({
      className: className,
      role: 'listbox',
      'aria-multiselectable': true,
      style: props.style
    }, props.ptm('list'));
    return /*#__PURE__*/React.createElement("ul", listProps, items);
  };
  var className = classNames('p-picklist-list-wrapper', props.className);
  var header = createHeader();
  var filter = createFilter();
  var list = createList();
  var listWrapperProps = mergeProps({
    className: className,
    ref: listElementRef
  }, props.ptm('listWrapper'));
  return /*#__PURE__*/React.createElement("div", listWrapperProps, header, filter, list);
}));
PickListSubList.displayName = 'PickListSubList';

var PickListTransferControls = /*#__PURE__*/React.memo(function (props) {
  var viewChanged = useMatchMedia("(max-width: ".concat(props.breakpoint, ")"), props.breakpoint);
  function getIconComponent(iconType) {
    switch (iconType) {
      case 'moveToTargetIcon':
        return props.moveToTargetIcon || viewChanged ? /*#__PURE__*/React.createElement(AngleDownIcon, null) : /*#__PURE__*/React.createElement(AngleRightIcon, null);
      case 'moveAllToTargetIcon':
        return props.moveAllToTargetIcon || viewChanged ? /*#__PURE__*/React.createElement(AngleDoubleDownIcon, null) : /*#__PURE__*/React.createElement(AngleDoubleRightIcon, null);
      case 'moveToSourceIcon':
        return props.moveToSourceIcon || viewChanged ? /*#__PURE__*/React.createElement(AngleUpIcon, null) : /*#__PURE__*/React.createElement(AngleLeftIcon, null);
      case 'moveAllToSourceIcon':
        return props.moveAllToSourceIcon || viewChanged ? /*#__PURE__*/React.createElement(AngleDoubleUpIcon, null) : /*#__PURE__*/React.createElement(AngleDoubleLeftIcon, null);
      default:
        return null;
    }
  }
  var moveToTargetIcon = IconUtils.getJSXIcon(getIconComponent('moveToTargetIcon'), undefined, {
    props: props,
    viewChanged: viewChanged
  });
  var moveAllToTargetIcon = IconUtils.getJSXIcon(getIconComponent('moveAllToTargetIcon'), undefined, {
    props: props,
    viewChanged: viewChanged
  });
  var moveToSourceIcon = IconUtils.getJSXIcon(getIconComponent('moveToSourceIcon'), undefined, {
    props: props,
    viewChanged: viewChanged
  });
  var moveAllToSourceIcon = IconUtils.getJSXIcon(getIconComponent('moveAllToSourceIcon'), undefined, {
    props: props,
    viewChanged: viewChanged
  });
  var moveRightDisabled = ObjectUtils.isEmpty(props.sourceSelection) || ObjectUtils.isEmpty(props.visibleSourceList);
  var moveLeftDisabled = ObjectUtils.isEmpty(props.targetSelection) || ObjectUtils.isEmpty(props.visibleTargetList);
  var moveAllRightDisabled = ObjectUtils.isEmpty(props.visibleSourceList);
  var moveAllLeftDisabled = ObjectUtils.isEmpty(props.visibleTargetList);
  var moveRight = function moveRight(event) {
    var selection = props.sourceSelection;
    if (ObjectUtils.isNotEmpty(selection)) {
      var targetList = _toConsumableArray(props.target);
      var sourceList = _toConsumableArray(props.source);
      for (var i = 0; i < selection.length; i++) {
        var selectedItem = selection[i];
        if (ObjectUtils.findIndexInList(selectedItem, targetList, props.dataKey) === -1) {
          targetList.push(sourceList.splice(ObjectUtils.findIndexInList(selectedItem, sourceList, props.dataKey), 1)[0]);
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
    if (ObjectUtils.isNotEmpty(selection)) {
      var targetList = _toConsumableArray(props.target);
      var sourceList = _toConsumableArray(props.source);
      for (var i = 0; i < selection.length; i++) {
        var selectedItem = selection[i];
        if (ObjectUtils.findIndexInList(selectedItem, sourceList, props.dataKey) === -1) {
          sourceList.push(targetList.splice(ObjectUtils.findIndexInList(selectedItem, targetList, props.dataKey), 1)[0]);
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
  var className = classNames('p-picklist-buttons p-picklist-transfer-buttons', props.className);
  var buttonsProps = mergeProps({
    className: className
  }, props.ptm('buttons'));
  return /*#__PURE__*/React.createElement("div", buttonsProps, /*#__PURE__*/React.createElement(Button, {
    disabled: moveRightDisabled,
    type: "button",
    icon: moveToTargetIcon,
    onClick: moveRight,
    pt: props.ptm('moveToTargetButton')
  }), /*#__PURE__*/React.createElement(Button, {
    disabled: moveAllRightDisabled,
    type: "button",
    icon: moveAllToTargetIcon,
    onClick: moveAllRight,
    pt: props.ptm('moveAllToTargetButton')
  }), /*#__PURE__*/React.createElement(Button, {
    disabled: moveLeftDisabled,
    type: "button",
    icon: moveToSourceIcon,
    onClick: moveLeft,
    pt: props.ptm('moveToSourceButton')
  }), /*#__PURE__*/React.createElement(Button, {
    disabled: moveAllLeftDisabled,
    type: "button",
    icon: moveAllToSourceIcon,
    onClick: moveAllLeft,
    pt: props.ptm('moveAllToSourceButton')
  }));
});
PickListTransferControls.displayName = 'PickListTransferControls';

var PickList = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = PickListBase.getProps(inProps, context);
  var _React$useState = React.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    sourceSelectionState = _React$useState2[0],
    setSourceSelectionState = _React$useState2[1];
  var _React$useState3 = React.useState([]),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    targetSelectionState = _React$useState4[0],
    setTargetSelectionState = _React$useState4[1];
  var _React$useState5 = React.useState(''),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    sourceFilterValueState = _React$useState6[0],
    setSourceFilterValueState = _React$useState6[1];
  var _React$useState7 = React.useState(''),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    targetFilterValueState = _React$useState8[0],
    setTargetFilterValueState = _React$useState8[1];
  var _React$useState9 = React.useState(null),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    attributeSelectorState = _React$useState10[0],
    setAttributeSelectorState = _React$useState10[1];
  var _PickListBase$setMeta = PickListBase.setMetaData({
      props: props,
      state: {
        sourceSelection: sourceSelectionState,
        targetSelection: targetSelectionState,
        sourceFilterValue: sourceFilterValueState,
        targetFilterValue: targetFilterValueState,
        attributeSelector: attributeSelectorState
      }
    }),
    ptm = _PickListBase$setMeta.ptm;
  var elementRef = React.useRef(null);
  var sourceListElementRef = React.useRef(null);
  var targetListElementRef = React.useRef(null);
  var reorderedListElementRef = React.useRef(null);
  var reorderDirection = React.useRef(null);
  var styleElementRef = React.useRef(null);
  var sourceSelection = props.sourceSelection ? props.sourceSelection : sourceSelectionState;
  var targetSelection = props.targetSelection ? props.targetSelection : targetSelectionState;
  var sourceFilteredValue = props.onSourceFilterChange ? props.sourceFilterValue : sourceFilterValueState;
  var targetFilteredValue = props.onTargetFilterChange ? props.targetFilterValue : targetFilterValueState;
  var hasFilterBy = ObjectUtils.isNotEmpty(props.filterBy);
  var showSourceFilter = hasFilterBy && props.showSourceFilter;
  var showTargetFilter = hasFilterBy && props.showTargetFilter;
  var onSourceReorder = function onSourceReorder(event) {
    handleChange(event, event.value, props.target);
    reorderedListElementRef.current = sourceListElementRef.current.listElementRef.current;
    reorderDirection.current = event.direction;
  };
  var onTargetReorder = function onTargetReorder(event) {
    handleChange(event, props.source, event.value);
    reorderedListElementRef.current = targetListElementRef.current.listElementRef.current;
    reorderDirection.current = event.direction;
  };
  var handleScrollPosition = function handleScrollPosition(listElement, direction) {
    if (listElement) {
      var list = DomHandler.findSingle(listElement, '.p-picklist-list');
      switch (direction) {
        case 'up':
          scrollInView(list, -1);
          break;
        case 'top':
          list.scrollTop = 0;
          break;
        case 'down':
          scrollInView(list, 1);
          break;
        case 'bottom':
          /* TODO: improve this code block */
          setTimeout(function () {
            return list.scrollTop = list.scrollHeight;
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
    if (ObjectUtils.isNotEmpty(selectedItems)) {
      DomHandler.scrollInView(listContainer, direction === -1 ? selectedItems[0] : selectedItems[selectedItems.length - 1]);
    }
  };
  var _onSelectionChange = function onSelectionChange(e, stateKey, callback) {
    if (stateKey === 'sourceSelection') setSourceSelectionState(e.value);else setTargetSelectionState(e.value);
    if (callback) {
      callback(e);
    }
    if (ObjectUtils.isNotEmpty(sourceSelection) && stateKey === 'targetSelection') {
      setSourceSelectionState([]);
    } else if (ObjectUtils.isNotEmpty(targetSelection) && stateKey === 'sourceSelection') {
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
  var getVisibleList = function getVisibleList(list, type) {
    var _ref3 = type === 'source' ? [sourceFilteredValue, filterSource] : [targetFilteredValue, filterTarget],
      _ref4 = _slicedToArray(_ref3, 2),
      filteredValue = _ref4[0],
      filterCallback = _ref4[1];
    return hasFilterBy && ObjectUtils.isNotEmpty(filteredValue) ? filterCallback(filteredValue) : list;
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
    return FilterService.filter(list, searchFields, filterValue, props.filterMatchMode, props.filterLocale);
  };
  var createStyle = function createStyle() {
    if (!styleElementRef.current) {
      styleElementRef.current = DomHandler.createInlineStyle(context && context.nonce || PrimeReact.nonce);
      var innerHTML = "\n@media screen and (max-width: ".concat(props.breakpoint, ") {\n    .p-picklist[").concat(attributeSelectorState, "] {\n        flex-direction: column;\n    }\n\n    .p-picklist[").concat(attributeSelectorState, "] .p-picklist-buttons {\n        padding: var(--content-padding);\n        flex-direction: row;\n    }\n\n    .p-picklist[").concat(attributeSelectorState, "] .p-picklist-buttons .p-button {\n        margin-right: var(--inline-spacing);\n        margin-bottom: 0;\n    }\n\n    .p-picklist[").concat(attributeSelectorState, "] .p-picklist-buttons .p-button:last-child {\n        margin-right: 0;\n    }\n}\n");
      styleElementRef.current.innerHTML = innerHTML;
    }
  };
  var destroyStyle = function destroyStyle() {
    styleElementRef.current = DomHandler.removeInlineStyle(styleElementRef.current);
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  useMountEffect(function () {
    !attributeSelectorState && setAttributeSelectorState(UniqueComponentId());
  });
  useUpdateEffect(function () {
    if (attributeSelectorState) {
      elementRef.current.setAttribute(attributeSelectorState, '');
      createStyle();
    }
    return function () {
      destroyStyle();
    };
  }, [attributeSelectorState, props.breakpoint]);
  useUpdateEffect(function () {
    if (reorderedListElementRef.current) {
      handleScrollPosition(reorderedListElementRef.current, reorderDirection.current);
      reorderedListElementRef.current = null;
      reorderDirection.current = null;
    }
  });
  var className = classNames('p-picklist p-component', props.className);
  var sourceItemTemplate = props.sourceItemTemplate ? props.sourceItemTemplate : props.itemTemplate;
  var targetItemTemplate = props.targetItemTemplate ? props.targetItemTemplate : props.itemTemplate;
  var sourceList = getVisibleList(props.source, 'source');
  var targetList = getVisibleList(props.target, 'target');
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    className: className,
    style: props.style
  }, PickListBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", rootProps, props.showSourceControls && /*#__PURE__*/React.createElement(PickListControls, {
    list: props.source,
    selection: sourceSelection,
    onReorder: onSourceReorder,
    className: "p-picklist-source-controls",
    dataKey: props.dataKey,
    moveUpIcon: props.moveUpIcon,
    moveTopIcon: props.moveTopIcon,
    moveDownIcon: props.moveDownIcon,
    moveBottomIcon: props.moveBottomIcon,
    ptm: ptm
  }), /*#__PURE__*/React.createElement(PickListSubList, {
    ref: sourceListElementRef,
    type: "source",
    list: sourceList,
    selection: sourceSelection,
    onSelectionChange: function onSelectionChange(e) {
      return _onSelectionChange(e, 'sourceSelection', props.onSourceSelectionChange);
    },
    itemTemplate: sourceItemTemplate,
    header: props.sourceHeader,
    style: props.sourceStyle,
    className: "p-picklist-source-wrapper",
    listClassName: "p-picklist-source",
    metaKeySelection: props.metaKeySelection,
    tabIndex: props.tabIndex,
    dataKey: props.dataKey,
    filterValue: sourceFilteredValue,
    onFilter: onFilter,
    showFilter: showSourceFilter,
    placeholder: props.sourceFilterPlaceholder,
    filterTemplate: props.sourceFilterTemplate,
    sourceFilterIcon: props.sourceFilterIcon,
    ptm: ptm
  }), /*#__PURE__*/React.createElement(PickListTransferControls, {
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
    ptm: ptm
  }), /*#__PURE__*/React.createElement(PickListSubList, {
    ref: targetListElementRef,
    type: "target",
    list: targetList,
    selection: targetSelection,
    onSelectionChange: function onSelectionChange(e) {
      return _onSelectionChange(e, 'targetSelection', props.onTargetSelectionChange);
    },
    itemTemplate: targetItemTemplate,
    header: props.targetHeader,
    style: props.targetStyle,
    className: "p-picklist-target-wrapper",
    listClassName: "p-picklist-target",
    metaKeySelection: props.metaKeySelection,
    tabIndex: props.tabIndex,
    dataKey: props.dataKey,
    filterValue: targetFilteredValue,
    onFilter: onFilter,
    showFilter: showTargetFilter,
    placeholder: props.targetFilterPlaceholder,
    filterTemplate: props.targetFilterTemplate,
    targetFilterIcon: props.targetFilterIcon,
    ptm: ptm
  }), props.showTargetControls && /*#__PURE__*/React.createElement(PickListControls, {
    list: props.target,
    selection: targetSelection,
    onReorder: onTargetReorder,
    className: "p-picklist-target-controls",
    dataKey: props.dataKey,
    moveUpIcon: props.moveUpIcon,
    moveTopIcon: props.moveTopIcon,
    moveDownIcon: props.moveDownIcon,
    moveBottomIcon: props.moveBottomIcon,
    ptm: ptm
  }));
}));
PickList.displayName = 'PickList';

export { PickList };
