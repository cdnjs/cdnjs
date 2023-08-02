import * as React from 'react';
import PrimeReact, { ariaLabel, PrimeReactContext, FilterService } from 'primereact/api';
import { useMountEffect, useUpdateEffect } from 'primereact/hooks';
import { mergeProps, ObjectUtils, IconUtils, DomHandler, classNames, UniqueComponentId } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { Button } from 'primereact/button';
import { AngleDoubleDownIcon } from 'primereact/icons/angledoubledown';
import { AngleDoubleUpIcon } from 'primereact/icons/angledoubleup';
import { AngleDownIcon } from 'primereact/icons/angledown';
import { AngleUpIcon } from 'primereact/icons/angleup';
import { SearchIcon } from 'primereact/icons/search';
import { Ripple } from 'primereact/ripple';

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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var OrderListBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'OrderList',
    id: null,
    value: null,
    header: null,
    style: null,
    className: null,
    listStyle: null,
    dragdrop: false,
    tabIndex: 0,
    filterIcon: null,
    moveUpIcon: null,
    moveTopIcon: null,
    moveDownIcon: null,
    moveBottomIcon: null,
    dataKey: null,
    breakpoint: '960px',
    onChange: null,
    itemTemplate: null,
    filter: false,
    filterBy: null,
    filterMatchMode: 'contains',
    filterLocale: undefined,
    filterPlaceholder: null,
    filterTemplate: null,
    onFilter: null,
    children: undefined
  }
});

var OrderListControls = /*#__PURE__*/React.memo(function (props) {
  var moveUpIcon = props.moveUpIcon || /*#__PURE__*/React.createElement(AngleUpIcon, null);
  var moveTopIcon = props.moveTopIcon || /*#__PURE__*/React.createElement(AngleDoubleUpIcon, null);
  var moveDownIcon = props.moveDownIcon || /*#__PURE__*/React.createElement(AngleDownIcon, null);
  var moveBottomIcon = props.moveBottomIcon || /*#__PURE__*/React.createElement(AngleDoubleDownIcon, null);
  var moveUp = function moveUp(event) {
    if (props.selection) {
      var value = _toConsumableArray(props.value);
      for (var i = 0; i < props.selection.length; i++) {
        var selectedItem = props.selection[i];
        var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, value, props.dataKey);
        if (selectedItemIndex !== 0) {
          var movedItem = value[selectedItemIndex];
          var temp = value[selectedItemIndex - 1];
          value[selectedItemIndex - 1] = movedItem;
          value[selectedItemIndex] = temp;
        } else {
          break;
        }
      }
      if (props.onReorder) {
        props.onReorder({
          originalEvent: event,
          value: value,
          direction: 'up'
        });
      }
    }
  };
  var moveTop = function moveTop(event) {
    if (props.selection) {
      var value = _toConsumableArray(props.value);
      for (var i = 0; i < props.selection.length; i++) {
        var selectedItem = props.selection[i];
        var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, value, props.dataKey);
        if (selectedItemIndex !== 0) {
          var movedItem = value.splice(selectedItemIndex, 1)[0];
          value.unshift(movedItem);
        } else {
          break;
        }
      }
      if (props.onReorder) {
        props.onReorder({
          originalEvent: event,
          value: value,
          direction: 'top'
        });
      }
    }
  };
  var moveDown = function moveDown(event) {
    if (props.selection) {
      var value = _toConsumableArray(props.value);
      for (var i = props.selection.length - 1; i >= 0; i--) {
        var selectedItem = props.selection[i];
        var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, value, props.dataKey);
        if (selectedItemIndex !== value.length - 1) {
          var movedItem = value[selectedItemIndex];
          var temp = value[selectedItemIndex + 1];
          value[selectedItemIndex + 1] = movedItem;
          value[selectedItemIndex] = temp;
        } else {
          break;
        }
      }
      if (props.onReorder) {
        props.onReorder({
          originalEvent: event,
          value: value,
          direction: 'down'
        });
      }
    }
  };
  var moveBottom = function moveBottom(event) {
    if (props.selection) {
      var value = _toConsumableArray(props.value);
      for (var i = props.selection.length - 1; i >= 0; i--) {
        var selectedItem = props.selection[i];
        var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, value, props.dataKey);
        if (selectedItemIndex !== value.length - 1) {
          var movedItem = value.splice(selectedItemIndex, 1)[0];
          value.push(movedItem);
        } else {
          break;
        }
      }
      if (props.onReorder) {
        props.onReorder({
          originalEvent: event,
          value: value,
          direction: 'bottom'
        });
      }
    }
  };
  var controlProps = mergeProps({
    className: 'p-orderlist-controls'
  }, props.ptm('control'));
  var moveUpButtonProps = mergeProps({
    type: 'button',
    icon: moveUpIcon,
    onClick: moveUp,
    'aria-label': ariaLabel('moveUp')
  }, props.ptm('moveUpButton'));
  var moveTopButtonProps = mergeProps({
    type: 'button',
    icon: moveTopIcon,
    onClick: moveTop,
    'aria-label': ariaLabel('moveTop')
  }, props.ptm('moveTopButton'));
  var moveDownButtonProps = mergeProps({
    type: 'button',
    icon: moveDownIcon,
    onClick: moveDown,
    'aria-label': ariaLabel('moveDown')
  }, props.ptm('moveDownButton'));
  var moveBottomButtonProps = mergeProps({
    type: 'button',
    icon: moveBottomIcon,
    onClick: moveBottom,
    'aria-label': ariaLabel('moveBottom')
  }, props.ptm('moveBottomButton'));
  return /*#__PURE__*/React.createElement("div", controlProps, /*#__PURE__*/React.createElement(Button, moveUpButtonProps), /*#__PURE__*/React.createElement(Button, moveTopButtonProps), /*#__PURE__*/React.createElement(Button, moveDownButtonProps), /*#__PURE__*/React.createElement(Button, moveBottomButtonProps));
});
OrderListControls.displayName = 'OrderListControls';

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var OrderListSubList = /*#__PURE__*/React.memo(function (props) {
  var getPTOptions = function getPTOptions(item, key) {
    return props.ptm(key, {
      context: {
        selected: isSelected(item)
      }
    });
  };
  var dragging = React.useRef(null);
  var draggedItemIndex = React.useRef(null);
  var dragOverItemIndex = React.useRef(null);
  var listElementRef = React.useRef(null);
  var filterOptions = {
    filter: function filter(e) {
      return props.onFilterInputChange(e);
    },
    reset: function reset() {
      return props.resetFilter();
    }
  };
  var isSelected = function isSelected(item) {
    return ObjectUtils.findIndexInList(item, props.selection, props.dataKey) !== -1;
  };
  var _onDragStart = function onDragStart(event, index) {
    dragging.current = true;
    draggedItemIndex.current = index;
    if (props.dragdropScope) {
      event.dataTransfer.setData('text', 'orderlist');
    }
  };
  var _onDragOver = function onDragOver(event, index) {
    if (draggedItemIndex.current !== index && draggedItemIndex.current + 1 !== index) {
      dragOverItemIndex.current = index;
      DomHandler.addClass(event.target, 'p-orderlist-droppoint-highlight');
      event.preventDefault();
    }
  };
  var onDragLeave = function onDragLeave(event) {
    dragOverItemIndex.current = null;
    DomHandler.removeClass(event.target, 'p-orderlist-droppoint-highlight');
  };
  var onDrop = function onDrop(event) {
    var dropIndex = draggedItemIndex.current > dragOverItemIndex.current ? dragOverItemIndex.current : dragOverItemIndex.current === 0 ? 0 : dragOverItemIndex.current - 1;
    var value = _toConsumableArray(props.value);
    ObjectUtils.reorderArray(value, draggedItemIndex.current, dropIndex);
    dragOverItemIndex.current = null;
    DomHandler.removeClass(event.target, 'p-orderlist-droppoint-highlight');
    if (props.onChange) {
      props.onChange({
        originalEvent: event,
        value: value
      });
    }
  };
  var onDragEnd = function onDragEnd(event) {
    dragging.current = false;
  };
  var onListMouseMove = function onListMouseMove(event) {
    if (dragging.current) {
      var offsetY = listElementRef.current.getBoundingClientRect().top + DomHandler.getWindowScrollTop();
      var bottomDiff = offsetY + listElementRef.current.clientHeight - event.pageY;
      var topDiff = event.pageY - offsetY;
      if (bottomDiff < 25 && bottomDiff > 0) listElementRef.current.scrollTop += 15;else if (topDiff < 25 && topDiff > 0) listElementRef.current.scrollTop -= 15;
    }
  };
  var onFilterInputKeyDown = function onFilterInputKeyDown(event) {
    //enter
    if (event.which === 13) {
      event.preventDefault();
    }
  };
  var createDropPoint = function createDropPoint(index, key) {
    var droppointProps = mergeProps({
      className: 'p-orderlist-droppoint',
      onDragOver: function onDragOver(e) {
        return _onDragOver(e, index + 1);
      },
      onDragLeave: onDragLeave,
      onDrop: onDrop
    }, props.ptm('droppoint'));
    return /*#__PURE__*/React.createElement("li", _extends({
      key: key
    }, droppointProps));
  };
  var createHeader = function createHeader() {
    var headerProps = mergeProps({
      className: 'p-orderlist-header'
    }, props.ptm('header'));
    return props.header ? /*#__PURE__*/React.createElement("div", headerProps, props.header) : null;
  };
  var createItems = function createItems() {
    if (props.value) {
      return props.value.map(function (item, i) {
        var content = props.itemTemplate ? props.itemTemplate(item) : item;
        var itemClassName = classNames('p-orderlist-item', {
          'p-highlight': isSelected(item)
        }, props.className);
        var key = JSON.stringify(item);
        var itemProps = mergeProps({
          className: itemClassName,
          onClick: function onClick(e) {
            return props.onItemClick({
              originalEvent: e,
              value: item,
              index: i
            });
          },
          onKeyDown: function onKeyDown(e) {
            return props.onItemKeyDown({
              originalEvent: e,
              value: item,
              index: i
            });
          },
          role: 'option',
          'aria-selected': isSelected(item),
          draggable: 'true',
          onDragStart: function onDragStart(e) {
            return _onDragStart(e, i);
          },
          onDragEnd: onDragEnd,
          tabIndex: props.tabIndex
        }, getPTOptions(item, 'item'));
        if (props.dragdrop) {
          var items = [];
          if (i === 0) {
            items.push(createDropPoint(item, i));
          }
          items.push( /*#__PURE__*/React.createElement("li", _extends({
            key: key
          }, itemProps), content, /*#__PURE__*/React.createElement(Ripple, null)));
          items.push(createDropPoint(i, key + '_droppoint'));
          return items;
        } else {
          var _itemProps = mergeProps({
            className: itemClassName,
            onClick: function onClick(e) {
              return props.onItemClick({
                originalEvent: e,
                value: item,
                index: i
              });
            },
            onKeyDown: function onKeyDown(e) {
              return props.onItemKeyDown({
                originalEvent: e,
                value: item,
                index: i
              });
            },
            role: 'option',
            'aria-selected': isSelected(item),
            tabIndex: props.tabIndex
          }, getPTOptions(item, 'item'));
          return /*#__PURE__*/React.createElement("li", _extends({
            key: key
          }, _itemProps), content);
        }
      });
    }
    return null;
  };
  var createList = function createList() {
    var items = createItems();
    var listProps = mergeProps({
      ref: listElementRef,
      className: 'p-orderlist-list',
      style: props.listStyle,
      onDragOver: onListMouseMove,
      role: 'listbox',
      'aria-multiselectable': true
    }, props.ptm('list'));
    return /*#__PURE__*/React.createElement("ul", listProps, items);
  };
  var createFilter = function createFilter() {
    var iconClassName = 'p-orderlist-filter';
    var searchIconProps = mergeProps({
      className: iconClassName
    }, props.ptm('icon'));
    var icon = props.filterIcon || /*#__PURE__*/React.createElement(SearchIcon, searchIconProps);
    var filterIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, searchIconProps), {
      props: props
    });
    if (props.filter) {
      var filterProps = mergeProps({
        className: 'p-orderlist-filter'
      }, props.ptm('filter'));
      var filterInputProps = mergeProps({
        type: 'text',
        value: props.filterValue,
        onChange: props.onFilter,
        onKeyDown: onFilterInputKeyDown,
        placeholder: props.placeholder,
        className: 'p-orderlist-filter-input p-inputtext p-component'
      }, props.ptm('filterInput'));
      var filterIconProps = mergeProps({
        className: 'p-orderlist-filter-icon'
      }, props.ptm('filterIcon'));
      var content = /*#__PURE__*/React.createElement("div", filterProps, /*#__PURE__*/React.createElement("input", filterInputProps), /*#__PURE__*/React.createElement("span", filterIconProps, filterIcon));
      if (props.filterTemplate) {
        var defaultContentOptions = {
          className: 'p-orderlist-filter',
          inputProps: {
            inputClassName: 'p-orderlist-filter-input p-inputtext p-component',
            onChange: props.onFilter,
            onKeyDown: onFilterInputKeyDown
          },
          filterOptions: filterOptions,
          iconClassName: 'p-orderlist-filter-icon',
          element: content,
          props: props
        };
        content = ObjectUtils.getJSXElement(props.filterTemplate, defaultContentOptions);
      }
      var filterContainerProps = mergeProps({
        className: 'p-orderlist-filter-container'
      }, props.ptm('filterContainer'));
      return /*#__PURE__*/React.createElement("div", filterContainerProps, content);
    }
    return null;
  };
  var header = createHeader();
  var filter = createFilter();
  var list = createList();
  var containerProps = mergeProps({
    className: 'p-orderlist-list-container'
  }, props.ptm('container'));
  return /*#__PURE__*/React.createElement("div", containerProps, header, filter, list);
});
OrderListSubList.displayName = 'OrderListSubList';

var OrderList = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = OrderListBase.getProps(inProps, context);
  var _React$useState = React.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    selectionState = _React$useState2[0],
    setSelectionState = _React$useState2[1];
  var _React$useState3 = React.useState(''),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    filterValueState = _React$useState4[0],
    setFilterValueState = _React$useState4[1];
  var _React$useState5 = React.useState(null),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    attributeSelectorState = _React$useState6[0],
    setAttributeSelectorState = _React$useState6[1];
  var hasFilter = ObjectUtils.isNotEmpty(filterValueState);
  var elementRef = React.useRef(null);
  var styleElementRef = React.useRef(null);
  var reorderDirection = React.useRef(null);
  var _OrderListBase$setMet = OrderListBase.setMetaData({
      props: props,
      state: {
        selection: selectionState,
        filterValue: filterValueState,
        attributeSelector: attributeSelectorState
      }
    }),
    ptm = _OrderListBase$setMet.ptm;
  var onItemClick = function onItemClick(event) {
    var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
    var index = ObjectUtils.findIndexInList(event.value, selectionState, props.dataKey);
    var selected = index !== -1;
    var newSelection;
    if (selected) newSelection = metaKey ? selectionState.filter(function (_, i) {
      return i !== index;
    }) : [event.value];else newSelection = metaKey ? [].concat(_toConsumableArray(selectionState), [event.value]) : [event.value];
    setSelectionState(newSelection);
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
  var onFilter = function onFilter(event) {
    var _filterValue = event.target.value;
    setFilterValueState(_filterValue);
    if (props.onFilter) {
      props.onFilter({
        originalEvent: event,
        value: _filterValue
      });
    }
  };
  var resetFilter = function resetFilter() {
    setFilterValueState('');
    props.onFilter && props.onFilter({
      filter: ''
    });
  };
  var onFilterInputChange = function onFilterInputChange(event) {
    var filter = event.target.value;
    setFilterValueState(filter);
    if (props.onFilter) {
      props.onFilter({
        originalEvent: event,
        filter: filter
      });
    }
  };
  var getVisibleList = function getVisibleList() {
    if (hasFilter) {
      var filterValue = filterValueState.trim().toLocaleLowerCase(props.filterLocale);
      var searchFields = props.filterBy ? props.filterBy.split(',') : [];
      return FilterService.filter(props.value, searchFields, filterValue, props.filterMatchMode, props.filterLocale);
    }
    return props.value;
  };
  var findNextItem = function findNextItem(item) {
    var nextItem = item.nextElementSibling;
    return nextItem ? !DomHandler.hasClass(nextItem, 'p-orderlist-item') ? findNextItem(nextItem) : nextItem : null;
  };
  var findPrevItem = function findPrevItem(item) {
    var prevItem = item.previousElementSibling;
    return prevItem ? !DomHandler.hasClass(prevItem, 'p-orderlist-item') ? findPrevItem(prevItem) : prevItem : null;
  };
  var onReorder = function onReorder(event) {
    if (props.onChange) {
      props.onChange({
        event: event.originalEvent,
        value: event.value
      });
    }
    reorderDirection.current = event.direction;
  };
  var updateListScroll = function updateListScroll() {
    var list = DomHandler.findSingle(elementRef.current, '.p-orderlist-list');
    var listItems = DomHandler.find(list, '.p-orderlist-item.p-highlight');
    if (listItems && listItems.length) {
      switch (reorderDirection.current) {
        case 'up':
          DomHandler.scrollInView(list, listItems[0]);
          break;
        case 'top':
          list.scrollTop = 0;
          break;
        case 'down':
          DomHandler.scrollInView(list, listItems[listItems.length - 1]);
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
  var createStyle = function createStyle() {
    if (!styleElementRef.current) {
      styleElementRef.current = DomHandler.createInlineStyle(context && context.nonce || PrimeReact.nonce);
      var innerHTML = "\n@media screen and (max-width: ".concat(props.breakpoint, ") {\n    .p-orderlist[").concat(attributeSelectorState, "] {\n        flex-direction: column;\n    }\n\n    .p-orderlist[").concat(attributeSelectorState, "] .p-orderlist-controls {\n        padding: var(--content-padding);\n        flex-direction: row;\n    }\n\n    .p-orderlist[").concat(attributeSelectorState, "] .p-orderlist-controls .p-button {\n        margin-right: var(--inline-spacing);\n        margin-bottom: 0;\n    }\n\n    .p-orderlist[").concat(attributeSelectorState, "] .p-orderlist-controls .p-button:last-child {\n        margin-right: 0;\n    }\n}\n");
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
    if (reorderDirection.current) {
      updateListScroll();
      reorderDirection.current = null;
    }
  });
  var className = classNames('p-orderlist p-component', props.className);
  var visibleList = getVisibleList();
  var rootProps = mergeProps({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, OrderListBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement(OrderListControls, {
    value: visibleList,
    selection: selectionState,
    onReorder: onReorder,
    dataKey: props.dataKey,
    moveUpIcon: props.moveUpIcon,
    moveTopIcon: props.moveTopIcon,
    moveDownIcon: props.moveDownIcon,
    moveBottomIcon: props.moveBottomIcon,
    ptm: ptm
  }), /*#__PURE__*/React.createElement(OrderListSubList, {
    value: visibleList,
    selection: selectionState,
    onItemClick: onItemClick,
    onItemKeyDown: onItemKeyDown,
    onFilterInputChange: onFilterInputChange,
    itemTemplate: props.itemTemplate,
    filter: props.filter,
    onFilter: onFilter,
    resetFilter: resetFilter,
    filterTemplate: props.filterTemplate,
    header: props.header,
    listStyle: props.listStyle,
    dataKey: props.dataKey,
    dragdrop: props.dragdrop,
    onChange: props.onChange,
    tabIndex: props.tabIndex,
    filterIcon: props.filterIcon,
    ptm: ptm
  }));
}));
OrderList.displayName = 'OrderList';

export { OrderList };
