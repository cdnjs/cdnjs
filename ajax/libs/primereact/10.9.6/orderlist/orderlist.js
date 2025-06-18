this.primereact = this.primereact || {};
this.primereact.orderlist = (function (exports, React, PrimeReact, componentbase, hooks, utils, button, angledoubledown, angledoubleup, angledown, angleup, search, ripple) {
  'use strict';

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
  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
  }

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }

  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }

  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }

  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }

  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
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

  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }

  var classes = {
    root: 'p-orderlist p-component',
    controls: 'p-orderlist-controls',
    droppoint: 'p-orderlist-droppoint',
    header: 'p-orderlist-header',
    list: 'p-orderlist-list',
    icon: 'p-orderlist-filter',
    filter: 'p-orderlist-filter',
    filterInput: 'p-orderlist-filter-input p-inputtext p-component',
    filterIcon: 'p-orderlist-filter-icon',
    filterContainer: 'p-orderlist-filter-container',
    container: 'p-orderlist-list-container',
    item: function item(_ref) {
      var selected = _ref.selected,
        focused = _ref.focused;
      return utils.classNames('p-orderlist-item', {
        'p-highlight': selected,
        'p-focus': focused
      });
    }
  };
  var styles = "\n@layer primereact {\n    .p-orderlist {\n        display: flex;\n    }\n\n    .p-orderlist-controls {\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n    }\n\n    .p-orderlist-list-container {\n        flex: 1 1 auto;\n    }\n\n    .p-orderlist-list {\n        list-style-type: none;\n        margin: 0;\n        padding: 0;\n        overflow: auto;\n        min-height: 12rem;\n        max-height: 24rem;\n    }\n\n    .p-orderlist-item {\n        cursor: pointer;\n        overflow: hidden;\n        position: relative;\n    }\n\n    .p-orderlist-item .p-ink {\n        pointer-events: none;\n    }\n\n    .p-orderlist-filter {\n        position: relative;\n    }\n\n    .p-orderlist-filter-icon {\n        position: absolute;\n        top: 50%;\n        margin-top: -.5rem;\n    }\n\n    .p-orderlist-filter-input {\n        width: 100%;\n    }\n\n    .p-orderlist.p-state-disabled .p-orderlist-item,\n    .p-orderlist.p-state-disabled .p-button {\n        cursor: default;\n    }\n\n    .p-orderlist.p-state-disabled .p-orderlist-list {\n        overflow: hidden;\n    }\n\n    .p-orderlist .p-orderlist-droppoint {\n        height: 0.5rem;\n    }\n\n    .p-orderlist .p-orderlist-droppoint.p-orderlist-droppoint-highlight {\n        background: var(--primary-color);\n    }\n}\n";
  var OrderListBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'OrderList',
      id: null,
      ariaLabel: null,
      ariaLabelledBy: null,
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
      autoOptionFocus: true,
      focusOnHover: true,
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
    },
    css: {
      classes: classes,
      styles: styles
    }
  });

  var OrderListControls = /*#__PURE__*/React__namespace.memo(function (props) {
    var mergeProps = hooks.useMergeProps();
    var moveUpIcon = props.moveUpIcon || /*#__PURE__*/React__namespace.createElement(angleup.AngleUpIcon, null);
    var moveTopIcon = props.moveTopIcon || /*#__PURE__*/React__namespace.createElement(angledoubleup.AngleDoubleUpIcon, null);
    var moveDownIcon = props.moveDownIcon || /*#__PURE__*/React__namespace.createElement(angledown.AngleDownIcon, null);
    var moveBottomIcon = props.moveBottomIcon || /*#__PURE__*/React__namespace.createElement(angledoubledown.AngleDoubleDownIcon, null);
    var ptm = props.ptm,
      cx = props.cx,
      unstyled = props.unstyled;
    var moveUp = function moveUp(event) {
      if (props.selection) {
        var value = _toConsumableArray(props.value);
        for (var i = 0; i < props.selection.length; i++) {
          var selectedItem = props.selection[i];
          var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, value, props.dataKey);
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
        for (var i = props.selection.length - 1; i >= 0; i--) {
          var selectedItem = props.selection[i];
          var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, value, props.dataKey);
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
          var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, value, props.dataKey);
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
        for (var i = 0; i < props.selection.length; i++) {
          var selectedItem = props.selection[i];
          var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, value, props.dataKey);
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
    var isMoveDisabled = utils.ObjectUtils.isEmpty(props.value) || utils.ObjectUtils.isEmpty(props.selection);
    var controlsProps = mergeProps({
      className: cx('controls')
    }, ptm('controls', {
      hostName: props.hostName
    }));
    var moveUpButtonProps = mergeProps({
      type: 'button',
      unstyled: unstyled,
      icon: moveUpIcon,
      onClick: moveUp,
      disabled: isMoveDisabled,
      'aria-label': PrimeReact.ariaLabel('moveUp'),
      __parentMetadata: {
        parent: props.metaData
      }
    }, ptm('moveUpButton'));
    var moveTopButtonProps = mergeProps({
      type: 'button',
      unstyled: unstyled,
      icon: moveTopIcon,
      onClick: moveTop,
      disabled: isMoveDisabled,
      'aria-label': PrimeReact.ariaLabel('moveTop'),
      __parentMetadata: {
        parent: props.metaData
      }
    }, ptm('moveTopButton'));
    var moveDownButtonProps = mergeProps({
      type: 'button',
      unstyled: unstyled,
      icon: moveDownIcon,
      onClick: moveDown,
      disabled: isMoveDisabled,
      'aria-label': PrimeReact.ariaLabel('moveDown'),
      __parentMetadata: {
        parent: props.metaData
      }
    }, ptm('moveDownButton'));
    var moveBottomButtonProps = mergeProps({
      type: 'button',
      unstyled: unstyled,
      icon: moveBottomIcon,
      onClick: moveBottom,
      disabled: isMoveDisabled,
      'aria-label': PrimeReact.ariaLabel('moveBottom'),
      __parentMetadata: {
        parent: props.metaData
      }
    }, ptm('moveBottomButton'));
    return /*#__PURE__*/React__namespace.createElement("div", controlsProps, /*#__PURE__*/React__namespace.createElement(button.Button, _extends({
      pt: ptm('moveUpButton')
    }, moveUpButtonProps)), /*#__PURE__*/React__namespace.createElement(button.Button, _extends({
      pt: ptm('moveTopButton')
    }, moveTopButtonProps)), /*#__PURE__*/React__namespace.createElement(button.Button, _extends({
      pt: ptm('moveDownButton')
    }, moveDownButtonProps)), /*#__PURE__*/React__namespace.createElement(button.Button, _extends({
      pt: ptm('moveBottomButton')
    }, moveBottomButtonProps)));
  });
  OrderListControls.displayName = 'OrderListControls';

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != _typeof(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }

  function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
  }

  function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var OrderListSubList = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var mergeProps = hooks.useMergeProps();
    var ptm = props.ptm,
      cx = props.cx;
    var _ptm = function _ptm(key, options) {
      return ptm(key, _objectSpread({
        hostName: props.hostName
      }, options));
    };
    var getPTOptions = function getPTOptions(item, key) {
      return _ptm(key, {
        context: {
          selected: isSelected(item)
        }
      });
    };
    var dragging = React__namespace.useRef(null);
    var draggedItemIndex = React__namespace.useRef(null);
    var dragOverItemIndex = React__namespace.useRef(null);
    var listElementRef = React__namespace.useRef(null);
    var filterOptions = {
      filter: function filter(e) {
        return props.onFilterInputChange(e);
      },
      reset: function reset() {
        return props.resetFilter();
      }
    };
    var isSelected = function isSelected(item) {
      return utils.ObjectUtils.findIndexInList(item, props.selection, props.dataKey) !== -1;
    };
    var _onDragStart = function onDragStart(event, index) {
      event.dataTransfer.setData('text', 'orderlist');
      dragging.current = true;
      draggedItemIndex.current = index;
    };
    var _onDragOver = function onDragOver(event, index) {
      if (draggedItemIndex.current !== index && draggedItemIndex.current + 1 !== index) {
        dragOverItemIndex.current = index;
        !props.isUnstyled() && utils.DomHandler.addClass(event.target, 'p-orderlist-droppoint-highlight');
        event.target.setAttribute('data-p-orderlist-droppoint-highlight', true);
        event.preventDefault();
      }
    };
    var onDragLeave = function onDragLeave(event) {
      dragOverItemIndex.current = null;
      !props.isUnstyled() && utils.DomHandler.removeClass(event.target, 'p-orderlist-droppoint-highlight');
      event.target.setAttribute('data-p-orderlist-droppoint-highlight', false);
    };
    var onDrop = function onDrop(event) {
      var dropIndex = draggedItemIndex.current > dragOverItemIndex.current ? dragOverItemIndex.current : dragOverItemIndex.current === 0 ? 0 : dragOverItemIndex.current - 1;
      var value = _toConsumableArray(props.value);
      utils.ObjectUtils.reorderArray(value, draggedItemIndex.current, dropIndex);
      dragOverItemIndex.current = null;
      !props.isUnstyled() && utils.DomHandler.removeClass(event.target, 'p-orderlist-droppoint-highlight');
      event.target.setAttribute('data-p-orderlist-droppoint-highlight', false);
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
        var offsetY = listElementRef.current.getBoundingClientRect().top + utils.DomHandler.getWindowScrollTop();
        var bottomDiff = offsetY + listElementRef.current.clientHeight - event.pageY;
        var topDiff = event.pageY - offsetY;
        if (bottomDiff < 25 && bottomDiff > 0) {
          listElementRef.current.scrollTop += 15;
        } else if (topDiff < 25 && topDiff > 0) {
          listElementRef.current.scrollTop -= 15;
        }
      }
    };
    var onFilterInputKeyDown = function onFilterInputKeyDown(event) {
      //enter
      if (event.which === 13) {
        event.preventDefault();
      }
    };
    var changeFocusedItemOnHover = function changeFocusedItemOnHover(event, index) {
      if (props.focusOnHover && props.focused) {
        var _props$changeFocusedO;
        props === null || props === void 0 || (_props$changeFocusedO = props.changeFocusedOptionIndex) === null || _props$changeFocusedO === void 0 || _props$changeFocusedO.call(props, index);
      }
    };
    var createDropPoint = function createDropPoint(index, key) {
      var droppointProps = mergeProps({
        className: cx('droppoint'),
        onDragOver: function onDragOver(e) {
          return _onDragOver(e, index + 1);
        },
        onDragLeave: onDragLeave,
        onDrop: onDrop
      }, _ptm('droppoint'));
      return /*#__PURE__*/React__namespace.createElement("li", _extends({
        key: key
      }, droppointProps));
    };
    var createHeader = function createHeader() {
      var headerProps = mergeProps({
        className: cx('header')
      }, _ptm('header'));
      return props.header ? /*#__PURE__*/React__namespace.createElement("div", headerProps, props.header) : null;
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        getElement: function getElement() {
          return listElementRef.current;
        }
      };
    });
    var createItems = function createItems() {
      if (props.value) {
        return props.value.map(function (item, i) {
          var content = props.itemTemplate ? props.itemTemplate(item) : item;
          var key = props.parentId + '_' + i;
          var focused = props.focused && props.focusedOptionId === key;
          var selected = isSelected(item);
          if (props.dragdrop) {
            var _itemProps = mergeProps({
              id: key,
              role: 'option',
              draggable: 'true',
              onClick: function onClick(e) {
                return props.onItemClick({
                  originalEvent: e,
                  value: item,
                  index: i
                });
              },
              onMouseDown: props.onOptionMouseDown,
              onMouseMove: function onMouseMove(e) {
                return changeFocusedItemOnHover(e, i);
              },
              onDragStart: function onDragStart(e) {
                return _onDragStart(e, i);
              },
              onDragEnd: onDragEnd,
              className: utils.classNames(props.className, cx('item', {
                selected: selected,
                focused: focused
              })),
              'aria-selected': selected,
              'data-p-highlight': selected,
              'data-p-focused': focused
            }, getPTOptions(item, 'item'));
            var items = [];
            if (i === 0) {
              items.push(createDropPoint(item, i));
            }
            items.push(/*#__PURE__*/React__namespace.createElement("li", _extends({
              key: key
            }, _itemProps), content));
            items.push(createDropPoint(i, key + '_droppoint'));
            return items;
          }
          var itemProps = mergeProps({
            id: key,
            role: 'option',
            onClick: function onClick(e) {
              return props.onItemClick({
                originalEvent: e,
                value: item,
                index: i
              });
            },
            onMouseDown: props.onOptionMouseDown,
            onMouseMove: function onMouseMove(e) {
              return changeFocusedItemOnHover(e, i);
            },
            className: utils.classNames(props.className, cx('item', {
              selected: selected,
              focused: focused
            })),
            'aria-selected': selected,
            'data-p-highlight': selected,
            'data-p-focused': focused
          }, getPTOptions(item, 'item'));
          return /*#__PURE__*/React__namespace.createElement("li", _extends({
            key: key
          }, itemProps), content, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
        });
      }
      return null;
    };
    var createList = function createList() {
      var items = createItems();
      var listProps = mergeProps({
        ref: listElementRef,
        className: cx('list'),
        style: props.listStyle,
        onDragOver: onListMouseMove,
        role: 'listbox',
        onFocus: props.onListFocus,
        onBlur: props.onListBlur,
        onKeyDown: props.onListKeyDown,
        tabIndex: props.tabIndex,
        'aria-activedescendant': props.focused ? props.focusedOptionId : null,
        'aria-label': props.ariaLabel,
        'aria-labelledby': props.ariaLabelledBy,
        'aria-multiselectable': true
      }, _ptm('list'));
      return /*#__PURE__*/React__namespace.createElement("ul", listProps, items);
    };
    var createFilter = function createFilter() {
      var searchIconProps = mergeProps({
        className: cx('icon')
      }, _ptm('icon'));
      var icon = props.filterIcon || /*#__PURE__*/React__namespace.createElement(search.SearchIcon, searchIconProps);
      var filterIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, searchIconProps), {
        props: props
      });
      if (props.filter) {
        var filterProps = mergeProps({
          className: cx('filter')
        }, _ptm('filter'));
        var filterInputProps = mergeProps({
          type: 'text',
          value: props.filterValue,
          onChange: props.onFilter,
          onKeyDown: onFilterInputKeyDown,
          placeholder: props.filterPlaceholder,
          className: cx('filterInput')
        }, _ptm('filterInput'));
        var filterIconProps = mergeProps({
          className: cx('filterIcon')
        }, _ptm('filterIcon'));
        var content = /*#__PURE__*/React__namespace.createElement("div", filterProps, /*#__PURE__*/React__namespace.createElement("input", filterInputProps), /*#__PURE__*/React__namespace.createElement("span", filterIconProps, filterIcon));
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
          content = utils.ObjectUtils.getJSXElement(props.filterTemplate, defaultContentOptions);
        }
        var filterContainerProps = mergeProps({
          className: cx('filterContainer')
        }, _ptm('filterContainer'));
        return /*#__PURE__*/React__namespace.createElement("div", filterContainerProps, content);
      }
      return null;
    };
    var header = createHeader();
    var filter = createFilter();
    var list = createList();
    var containerProps = mergeProps({
      className: cx('container')
    }, _ptm('container'));
    return /*#__PURE__*/React__namespace.createElement("div", containerProps, header, filter, list);
  }));
  OrderListSubList.displayName = 'OrderListSubList';

  var OrderList = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var props = OrderListBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      selectionState = _React$useState2[0],
      setSelectionState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(''),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      filterValueState = _React$useState4[0],
      setFilterValueState = _React$useState4[1];
    var _React$useState5 = React__namespace.useState(null),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      attributeSelectorState = _React$useState6[0],
      setAttributeSelectorState = _React$useState6[1];
    var _React$useState7 = React__namespace.useState(false),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      focused = _React$useState8[0],
      setFocused = _React$useState8[1];
    var _React$useState9 = React__namespace.useState(null),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      focusedOptionId = _React$useState10[0],
      setFocusedOptionId = _React$useState10[1];
    var _React$useState11 = React__namespace.useState(-1),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      focusedOptionIndex = _React$useState12[0],
      setFocusedOptionIndex = _React$useState12[1];
    var hasFilter = utils.ObjectUtils.isNotEmpty(filterValueState);
    var elementRef = React__namespace.useRef(null);
    var styleElementRef = React__namespace.useRef(null);
    var reorderDirection = React__namespace.useRef(null);
    var listElementRef = React__namespace.useRef(null);
    var reorderedListElementRef = React__namespace.useRef(null);
    var metaData = {
      props: props,
      state: {
        selection: selectionState,
        filterValue: filterValueState,
        attributeSelector: attributeSelectorState
      }
    };
    var _OrderListBase$setMet = OrderListBase.setMetaData(metaData),
      ptm = _OrderListBase$setMet.ptm,
      cx = _OrderListBase$setMet.cx,
      isUnstyled = _OrderListBase$setMet.isUnstyled;
    componentbase.useHandleStyle(OrderListBase.css.styles, isUnstyled, {
      name: 'orderlist'
    });
    var getVisibleList = function getVisibleList() {
      if (hasFilter) {
        var filterValue = filterValueState.trim().toLocaleLowerCase(props.filterLocale);
        var searchFields = props.filterBy ? props.filterBy.split(',') : [];
        return PrimeReact.FilterService.filter(props.value, searchFields, filterValue, props.filterMatchMode, props.filterLocale);
      }
      return props.value;
    };
    var visibleList = getVisibleList();
    var getListElement = function getListElement() {
      return listElementRef.current && listElementRef.current.getElement();
    };
    var onItemClick = function onItemClick(event) {
      var originalEvent = event.originalEvent,
        value = event.value,
        index = event.index;
      var selectedIndex = utils.ObjectUtils.findIndexInList(value, selectionState);
      var listElement = getListElement();
      var selectedId = utils.DomHandler.find(listElement, '[data-pc-section="item"]')[index].getAttribute('id');
      setFocusedOptionIndex(selectedId);
      var metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
      var selected = selectedIndex !== -1;
      var newSelection;
      if (selected) {
        newSelection = metaKey ? selectionState.filter(function (_, i) {
          return i !== selectedIndex;
        }) : [value];
      } else {
        newSelection = metaKey ? [].concat(_toConsumableArray(selectionState), [value]) : [value];
      }
      setSelectionState(newSelection);
    };
    var setSelectionStateWithIndex = function setSelectionStateWithIndex(index) {
      var item = visibleList[index];
      var selected = utils.ObjectUtils.findIndexInList(item, selectionState) !== -1;
      if (selected) {
        setSelectionState(selectionState.filter(function (selectedItem) {
          return selectedItem !== item;
        }));
      } else {
        setSelectionState([].concat(_toConsumableArray(selectionState), [item]));
      }
    };
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
      if (selectionState.length) {
        var selectedFirstItem = utils.DomHandler.findSingle(listElement, '[data-p-highlight="true"]');
        return utils.ObjectUtils.findIndexInList(selectedFirstItem, itemList);
      }
      return -1;
    };
    var findFirstFocusedOptionIndex = function findFirstFocusedOptionIndex(listElement, itemList) {
      var firstFocusableItem = utils.DomHandler.findSingle(listElement, '[data-pc-section="item"]');
      return utils.ObjectUtils.findIndexInList(firstFocusableItem, itemList);
    };
    var onListFocus = function onListFocus(event) {
      setFocused(true);
      var listElement = getListElement();
      var currentFocusedIndex = findCurrentFocusedIndex(listElement);
      changeFocusedOptionIndex(currentFocusedIndex);
      props.onFocus && props.onFocus(event);
    };
    var onListBlur = function onListBlur(event) {
      setFocused(false);
      setFocusedOptionIndex(-1);
      props.onBlur && props.onBlur(event);
    };
    var onListKeyDown = function onListKeyDown(event) {
      switch (event.code) {
        case 'ArrowDown':
          onArrowDownKey(event);
          break;
        case 'ArrowUp':
          onArrowUpKey(event);
          break;
        case 'Home':
          onHomeKey(event);
          break;
        case 'End':
          onEndKey(event);
          break;
        case 'Enter':
        case 'NumpadEnter':
          onEnterKey(event);
          break;
        case 'Space':
          onSpaceKey(event);
          break;
        case 'KeyA':
          if (event.ctrlKey) {
            setSelectionState(visibleList);
            event.preventDefault();
          }
      }
    };
    var onOptionMouseDown = function onOptionMouseDown(index) {
      setFocusedOptionIndex(index);
    };
    var onArrowDownKey = function onArrowDownKey(event) {
      var optionIndex = findNextOptionIndex(focusedOptionIndex);
      changeFocusedOptionIndex(optionIndex);
      if (event.shiftKey) {
        setSelectionStateWithIndex(optionIndex);
      }
      event.preventDefault();
    };
    var onArrowUpKey = function onArrowUpKey(event) {
      var optionIndex = findPrevOptionIndex(focusedOptionIndex);
      changeFocusedOptionIndex(optionIndex);
      if (event.shiftKey) {
        setSelectionStateWithIndex(optionIndex);
      }
      event.preventDefault();
    };
    var onHomeKey = function onHomeKey(event) {
      if (event.ctrlKey && event.shiftKey) {
        var listElement = getListElement();
        var items = utils.DomHandler.find(listElement, '[data-pc-section="item"]');
        var focusedItem = utils.DomHandler.findSingle(listElement, "[data-pc-section=\"item\"][id=".concat(focusedOptionIndex, "]"));
        var matchedOptionIndex = _toConsumableArray(items).findIndex(function (item) {
          return item === focusedItem;
        });
        setSelectionState(_toConsumableArray(visibleList).slice(0, matchedOptionIndex + 1));
      } else {
        changeFocusedOptionIndex(0);
      }
      event.preventDefault();
    };
    var onEndKey = function onEndKey(event) {
      var listElement = getListElement();
      if (event.ctrlKey && event.shiftKey) {
        var items = utils.DomHandler.find(listElement, '[data-pc-section="item"]');
        var focusedItem = utils.DomHandler.findSingle(listElement, "[data-pc-section=\"item\"][id=".concat(focusedOptionIndex, "]"));
        var matchedOptionIndex = _toConsumableArray(items).findIndex(function (item) {
          return item === focusedItem;
        });
        setSelectionState(_toConsumableArray(visibleList).slice(matchedOptionIndex, items.length));
      } else {
        changeFocusedOptionIndex(utils.DomHandler.find(listElement, '[data-pc-section="item"]').length - 1);
      }
      event.preventDefault();
    };
    var onEnterKey = function onEnterKey(event) {
      var listElement = getListElement();
      var items = utils.DomHandler.find(listElement, '[data-pc-section="item"]');
      var focusedItem = utils.DomHandler.findSingle(listElement, "[data-pc-section=\"item\"][id=".concat(focusedOptionIndex, "]"));
      var matchedOptionIndex = _toConsumableArray(items).findIndex(function (item) {
        return item === focusedItem;
      });
      onItemClick({
        originalEvent: event,
        value: visibleList[matchedOptionIndex],
        index: matchedOptionIndex
      });
      event.preventDefault();
    };
    var onSpaceKey = function onSpaceKey(event) {
      event.preventDefault();
      var listElement = getListElement();
      if (event.shiftKey && selectionState && selectionState.length > 0) {
        var items = utils.DomHandler.find(listElement, '[data-pc-section="item"]');
        var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectionState[0], _toConsumableArray(visibleList));
        var focusedItem = utils.DomHandler.findSingle(listElement, "[data-pc-section=\"item\"][id=".concat(focusedOptionIndex, "]"));
        var matchedOptionIndex = _toConsumableArray(items).findIndex(function (item) {
          return item === focusedItem;
        });
        setSelectionState(_toConsumableArray(visibleList).slice(Math.min(selectedItemIndex, matchedOptionIndex), Math.max(selectedItemIndex, matchedOptionIndex) + 1));
      } else {
        onEnterKey(event);
      }
    };
    var findNextOptionIndex = function findNextOptionIndex(index) {
      var listElement = getListElement();
      var items = utils.DomHandler.find(listElement, '[data-pc-section="item"]');
      var matchedOptionIndex = _toConsumableArray(items).findIndex(function (link) {
        return link.id === index;
      });
      return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
    };
    var findPrevOptionIndex = function findPrevOptionIndex(index) {
      var listElement = getListElement();
      var items = utils.DomHandler.find(listElement, '[data-pc-section="item"]');
      var matchedOptionIndex = _toConsumableArray(items).findIndex(function (link) {
        return link.id === index;
      });
      return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
    };
    var changeFocusedOptionIndex = function changeFocusedOptionIndex(index) {
      var listElement = getListElement();
      var items = utils.DomHandler.find(listElement, '[data-pc-section="item"]');
      var order;
      if (index >= items.length) {
        order = items.length - 1;
      } else if (index < 0) {
        return;
      } else {
        order = index;
      }
      var _focusedOptionIndex = items[order] ? items[order].getAttribute('id') : -1;
      setFocusedOptionIndex(_focusedOptionIndex);
      scrollInViewWithFocus(_focusedOptionIndex);
    };
    var scrollInViewWithFocus = function scrollInViewWithFocus(id) {
      var listElement = getListElement();
      var element = utils.DomHandler.findSingle(listElement, "[data-pc-section=\"item\"][id=\"".concat(id, "\"]"));
      if (element) {
        element.scrollIntoView && element.scrollIntoView({
          block: 'nearest',
          inline: 'start'
        });
      }
    };
    var scrollInView = function scrollInView(listContainer) {
      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var selectedItems = listContainer.getElementsByClassName('p-highlight');
      if (utils.ObjectUtils.isNotEmpty(selectedItems)) {
        utils.DomHandler.scrollInView(listContainer, direction === -1 ? selectedItems[0] : selectedItems[selectedItems.length - 1]);
      }
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
            setTimeout(function () {
              return listElement.scrollTop = listElement.scrollHeight;
            }, 100);
            break;
        }
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
    var onReorder = function onReorder(event) {
      if (props.onChange) {
        props.onChange({
          event: event.originalEvent,
          value: event.value
        });
      }
      reorderDirection.current = event.direction;
      reorderedListElementRef.current = getListElement();
    };
    var createStyle = function createStyle() {
      if (!styleElementRef.current) {
        styleElementRef.current = utils.DomHandler.createInlineStyle(context && context.nonce || PrimeReact__default["default"].nonce, context && context.styleContainer);
        var innerHTML = "\n@media screen and (max-width: ".concat(props.breakpoint, ") {\n    .p-orderlist[").concat(attributeSelectorState, "] {\n        flex-direction: column;\n    }\n\n    .p-orderlist[").concat(attributeSelectorState, "] .p-orderlist-controls {\n        padding: var(--content-padding);\n        flex-direction: row;\n    }\n\n    .p-orderlist[").concat(attributeSelectorState, "] .p-orderlist-controls .p-button {\n        margin-right: var(--inline-spacing);\n        margin-bottom: 0;\n    }\n\n    .p-orderlist[").concat(attributeSelectorState, "] .p-orderlist-controls .p-button:last-child {\n        margin-right: 0;\n    }\n}\n");
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
    hooks.useMountEffect(function () {
      !attributeSelectorState && setAttributeSelectorState(utils.UniqueComponentId());
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
      var _focusedOptionId = focusedOptionIndex !== -1 ? focusedOptionIndex : null;
      setFocusedOptionId(_focusedOptionId);
    }, [focusedOptionIndex]);
    hooks.useUpdateEffect(function () {
      if (reorderedListElementRef.current) {
        handleScrollPosition(reorderedListElementRef.current, reorderDirection.current);
        reorderedListElementRef.current = null;
        reorderDirection.current = null;
      }
    });
    var rootProps = mergeProps({
      ref: elementRef,
      id: props.id,
      className: utils.classNames(props.className, cx('root')),
      style: props.style
    }, OrderListBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement(OrderListControls, {
      hostName: "OrderList",
      value: visibleList,
      selection: selectionState,
      onReorder: onReorder,
      dataKey: props.dataKey,
      moveUpIcon: props.moveUpIcon,
      moveTopIcon: props.moveTopIcon,
      moveDownIcon: props.moveDownIcon,
      moveBottomIcon: props.moveBottomIcon,
      ptm: ptm,
      cx: cx,
      unstyled: props.unstyled,
      metaData: metaData
    }), /*#__PURE__*/React__namespace.createElement(OrderListSubList, _extends({
      ref: listElementRef,
      hostName: "OrderList"
    }, props, {
      ariaLabel: props.ariaLabel,
      ariaLabelledBy: props.ariaLabelledBy,
      changeFocusedOptionIndex: changeFocusedOptionIndex,
      cx: cx,
      dataKey: props.dataKey,
      dragdrop: props.dragdrop,
      filter: props.filter,
      filterIcon: props.filterIcon,
      filterPlaceholder: props.filterPlaceholder,
      filterTemplate: props.filterTemplate,
      focused: focused,
      focusedOptionId: focusedOptionId,
      header: props.header,
      isUnstyled: isUnstyled,
      itemTemplate: props.itemTemplate,
      listStyle: props.listStyle,
      onChange: props.onChange,
      onFilter: onFilter,
      onFilterInputChange: onFilterInputChange,
      onItemClick: onItemClick,
      onListBlur: onListBlur,
      onListFocus: onListFocus,
      onListKeyDown: onListKeyDown,
      onOptionMouseDown: onOptionMouseDown,
      parentId: attributeSelectorState,
      ptm: ptm,
      resetFilter: resetFilter,
      selection: selectionState,
      tabIndex: props.tabIndex,
      value: visibleList
    })));
  }));
  OrderList.displayName = 'OrderList';

  exports.OrderList = OrderList;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.utils, primereact.button, primereact.icons.angledoubledown, primereact.icons.angledoubleup, primereact.icons.angledown, primereact.icons.angleup, primereact.icons.search, primereact.ripple);
