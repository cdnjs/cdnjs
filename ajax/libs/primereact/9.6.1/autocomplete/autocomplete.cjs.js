'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PrimeReact = require('primereact/api');
var button = require('primereact/button');
var hooks = require('primereact/hooks');
var chevrondown = require('primereact/icons/chevrondown');
var spinner = require('primereact/icons/spinner');
var timescircle = require('primereact/icons/timescircle');
var inputtext = require('primereact/inputtext');
var overlayservice = require('primereact/overlayservice');
var tooltip = require('primereact/tooltip');
var utils = require('primereact/utils');
var componentbase = require('primereact/componentbase');
var csstransition = require('primereact/csstransition');
var portal = require('primereact/portal');
var ripple = require('primereact/ripple');
var virtualscroller = require('primereact/virtualscroller');

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

var AutoCompleteBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'AutoComplete',
    id: null,
    appendTo: null,
    autoFocus: false,
    autoHighlight: false,
    className: null,
    completeMethod: null,
    delay: 300,
    disabled: false,
    dropdown: false,
    dropdownAriaLabel: null,
    dropdownAutoFocus: true,
    dropdownIcon: null,
    dropdownMode: 'blank',
    emptyMessage: null,
    field: null,
    forceSelection: false,
    inputClassName: null,
    inputId: null,
    inputRef: null,
    inputStyle: null,
    itemTemplate: null,
    loadingIcon: null,
    maxLength: null,
    minLength: 1,
    multiple: false,
    name: null,
    onBlur: null,
    onChange: null,
    onClear: null,
    onClick: null,
    onContextMenu: null,
    onDblClick: null,
    onDropdownClick: null,
    onFocus: null,
    onHide: null,
    onKeyPress: null,
    onKeyUp: null,
    onMouseDown: null,
    onSelect: null,
    onShow: null,
    onUnselect: null,
    optionGroupChildren: null,
    optionGroupLabel: null,
    optionGroupTemplate: null,
    panelClassName: null,
    panelFooterTemplate: null,
    panelStyle: null,
    placeholder: null,
    readOnly: false,
    removeTokenIcon: null,
    scrollHeight: '200px',
    selectedItemTemplate: null,
    selectionLimit: null,
    showEmptyMessage: false,
    size: null,
    style: null,
    suggestions: null,
    tabIndex: null,
    tooltip: null,
    tooltipOptions: null,
    transitionOptions: null,
    type: 'text',
    value: null,
    virtualScrollerOptions: null,
    children: undefined
  }
});

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var AutoCompletePanel = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
  var getPTOptions = function getPTOptions(item, key) {
    return props.ptm(key, {
      context: {
        selected: props.selectedItem.current === item
      }
    });
  };
  var getOptionGroupRenderKey = function getOptionGroupRenderKey(optionGroup) {
    return utils.ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel);
  };
  var createFooter = function createFooter() {
    if (props.panelFooterTemplate) {
      var content = utils.ObjectUtils.getJSXElement(props.panelFooterTemplate, props, props.onOverlayHide);
      var footerProps = utils.mergeProps({
        className: 'p-autocomplete-footer'
      }, props.ptm('footer'));
      return /*#__PURE__*/React__namespace.createElement("div", footerProps, content);
    }
    return null;
  };
  var createGroupChildren = function createGroupChildren(optionGroup, i, style) {
    var groupChildren = props.getOptionGroupChildren(optionGroup);
    return groupChildren.map(function (item, j) {
      var key = i + '_' + j;
      var selected = props.selectedItem === item;
      var content = props.itemTemplate ? utils.ObjectUtils.getJSXElement(props.itemTemplate, item, j) : props.field ? utils.ObjectUtils.resolveFieldData(item, props.field) : item;
      var className = utils.classNames('p-autocomplete-item', {
        'p-disabled': item.disabled
      });
      var itemProps = utils.mergeProps({
        role: 'option',
        'aria-selected': selected,
        className: className,
        style: style,
        onClick: function onClick(e) {
          return props.onItemClick(e, item);
        },
        'data-group': i,
        'data-index': j
      }, getPTOptions(item, 'item'));
      return /*#__PURE__*/React__namespace.createElement("li", _extends({
        key: key
      }, itemProps), content, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    });
  };
  var createItem = function createItem(suggestion, index) {
    var scrollerOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var style = {
      height: scrollerOptions.props ? scrollerOptions.props.itemSize : undefined
    };
    if (props.optionGroupLabel) {
      var content = props.optionGroupTemplate ? utils.ObjectUtils.getJSXElement(props.optionGroupTemplate, suggestion, index) : props.getOptionGroupLabel(suggestion);
      var childrenContent = createGroupChildren(suggestion, index, style);
      var key = index + '_' + getOptionGroupRenderKey(suggestion);
      var itemGroupProps = utils.mergeProps({
        className: 'p-autocomplete-item-group',
        style: style
      }, props.ptm('itemGroup'));
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
        key: key
      }, /*#__PURE__*/React__namespace.createElement("li", itemGroupProps, content), childrenContent);
    } else {
      var _content = props.itemTemplate ? utils.ObjectUtils.getJSXElement(props.itemTemplate, suggestion, index) : props.field ? utils.ObjectUtils.resolveFieldData(suggestion, props.field) : suggestion;
      var className = utils.classNames('p-autocomplete-item', {
        'p-disabled': suggestion.disabled
      });
      var itemProps = utils.mergeProps({
        role: 'option',
        'aria-selected': props.selectedItem === suggestion,
        className: className,
        style: style,
        onClick: function onClick(e) {
          return props.onItemClick(e, suggestion);
        }
      }, getPTOptions(suggestion, 'item'));
      return /*#__PURE__*/React__namespace.createElement("li", _extends({
        key: index
      }, itemProps), _content, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    }
  };
  var createItems = function createItems() {
    return props.suggestions ? props.suggestions.map(createItem) : null;
  };
  var createContent = function createContent() {
    if (props.showEmptyMessage && utils.ObjectUtils.isEmpty(props.suggestions)) {
      var emptyMessage = props.emptyMessage || PrimeReact.localeOption('emptyMessage');
      var emptyMessageProps = utils.mergeProps({
        className: 'p-autocomplete-item'
      }, props.ptm('emptyMesage'));
      var listProps = utils.mergeProps({
        className: 'p-autocomplete-items'
      }, props.ptm('list'));
      return /*#__PURE__*/React__namespace.createElement("ul", listProps, /*#__PURE__*/React__namespace.createElement("li", emptyMessageProps, emptyMessage));
    }
    if (props.virtualScrollerOptions) {
      var virtualScrollerProps = _objectSpread$1(_objectSpread$1({}, props.virtualScrollerOptions), {
        style: _objectSpread$1(_objectSpread$1({}, props.virtualScrollerOptions.style), {
          height: props.scrollHeight
        }),
        autoSize: true,
        items: props.suggestions,
        itemTemplate: function itemTemplate(item, options) {
          return item && createItem(item, options.index, options);
        },
        contentTemplate: function contentTemplate(options) {
          var className = utils.classNames('p-autocomplete-items', options.className);
          var listProps = utils.mergeProps({
            id: props.listId,
            ref: options.contentRef,
            style: options.style,
            className: className,
            role: 'listbox'
          }, props.ptm('list'));
          return /*#__PURE__*/React__namespace.createElement("ul", listProps, options.children);
        }
      });
      return /*#__PURE__*/React__namespace.createElement(virtualscroller.VirtualScroller, _extends({
        ref: props.virtualScrollerRef
      }, virtualScrollerProps, {
        pt: props.ptm('virtualScroller')
      }));
    } else {
      var items = createItems();
      var _listProps = utils.mergeProps({
        id: props.listId,
        className: 'p-autocomplete-items',
        role: 'listbox'
      }, props.ptm('list'));
      var listWrapperProps = utils.mergeProps({
        className: 'p-autocomplete-items-wrapper',
        style: {
          maxHeight: props.scrollHeight || 'auto'
        }
      }, props.ptm('listWrapper'));
      return /*#__PURE__*/React__namespace.createElement("div", listWrapperProps, /*#__PURE__*/React__namespace.createElement("ul", _listProps, items));
    }
  };
  var createElement = function createElement() {
    var className = utils.classNames('p-autocomplete-panel p-component', props.panelClassName, {
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact__default["default"].inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact__default["default"].ripple === false
    });
    var style = _objectSpread$1({}, props.panelStyle || {});
    var content = createContent();
    var footer = createFooter();
    var panelProps = utils.mergeProps({
      ref: ref,
      className: className,
      style: style,
      onClick: function onClick(e) {
        return props.onClick(e);
      }
    }, props.ptm('panel'));
    return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
      nodeRef: ref,
      classNames: "p-connected-overlay",
      "in": props["in"],
      timeout: {
        enter: 120,
        exit: 100
      },
      options: props.transitionOptions,
      unmountOnExit: true,
      onEnter: props.onEnter,
      onEntering: props.onEntering,
      onEntered: props.onEntered,
      onExit: props.onExit,
      onExited: props.onExited
    }, /*#__PURE__*/React__namespace.createElement("div", panelProps, content, footer));
  };
  var element = createElement();
  return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
    element: element,
    appendTo: props.appendTo
  });
}));
AutoCompletePanel.displayName = 'AutoCompletePanel';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var AutoComplete = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
  var props = AutoCompleteBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState(props.id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0],
    setIdState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    searchingState = _React$useState4[0],
    setSearchingState = _React$useState4[1];
  var _React$useState5 = React__namespace.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    focusedState = _React$useState6[0],
    setFocusedState = _React$useState6[1];
  var _React$useState7 = React__namespace.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    overlayVisibleState = _React$useState8[0],
    setOverlayVisibleState = _React$useState8[1];
  var _AutoCompleteBase$set = AutoCompleteBase.setMetaData({
      props: props,
      state: {
        id: idState,
        searching: searchingState,
        focused: focusedState,
        overlayVisible: overlayVisibleState
      }
    }),
    ptm = _AutoCompleteBase$set.ptm;
  var elementRef = React__namespace.useRef(null);
  var overlayRef = React__namespace.useRef(null);
  var inputRef = React__namespace.useRef(props.inputRef);
  var multiContainerRef = React__namespace.useRef(null);
  var virtualScrollerRef = React__namespace.useRef(null);
  var timeout = React__namespace.useRef(null);
  var selectedItem = React__namespace.useRef(null);
  var _useOverlayListener = hooks.useOverlayListener({
      target: elementRef,
      overlay: overlayRef,
      listener: function listener(event, _ref) {
        var type = _ref.type,
          valid = _ref.valid;
        if (valid) {
          type === 'outside' ? !isInputClicked(event) && hide() : hide();
        }
      },
      when: overlayVisibleState
    }),
    _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
    bindOverlayListener = _useOverlayListener2[0],
    unbindOverlayListener = _useOverlayListener2[1];
  var isInputClicked = function isInputClicked(event) {
    return props.multiple ? event.target === multiContainerRef.current || multiContainerRef.current.contains(event.target) : event.target === inputRef.current;
  };
  var onInputChange = function onInputChange(event) {
    //Cancel the search request if user types within the timeout
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    var query = event.target.value;
    if (!props.multiple) {
      updateModel(event, query);
    }
    if (utils.ObjectUtils.isEmpty(query)) {
      hide();
      props.onClear && props.onClear(event);
    } else {
      if (query.length >= props.minLength) {
        timeout.current = setTimeout(function () {
          search(event, query, 'input');
        }, props.delay);
      } else {
        hide();
      }
    }
  };
  var search = function search(event, query, source) {
    //allow empty string but not undefined or null
    if (query === undefined || query === null) {
      return;
    }

    //do not search blank values on input change
    if (source === 'input' && query.trim().length === 0) {
      return;
    }
    if (props.completeMethod) {
      setSearchingState(true);
      props.completeMethod({
        originalEvent: event,
        query: query
      });
    }
  };
  var selectItem = function selectItem(event, option, preventInputFocus) {
    if (props.multiple) {
      inputRef.current.value = '';
      if (!isSelected(option)) {
        // allows empty value/selectionlimit and within sectionlimit
        if (!props.value || !props.selectionLimit || props.value.length < props.selectionLimit) {
          var newValue = props.value ? [].concat(_toConsumableArray(props.value), [option]) : [option];
          updateModel(event, newValue);
        }
      }
    } else {
      updateInputField(option);
      updateModel(event, option);
    }
    if (props.onSelect) {
      props.onSelect({
        originalEvent: event,
        value: option
      });
    }
    if (!preventInputFocus) {
      utils.DomHandler.focus(inputRef.current);
      hide();
    }
  };
  var updateModel = function updateModel(event, value) {
    // #2176 only call change if value actually changed
    if (selectedItem && utils.ObjectUtils.deepEquals(selectedItem.current, value)) {
      return;
    }
    if (props.onChange) {
      props.onChange({
        originalEvent: event,
        value: value,
        stopPropagation: function stopPropagation() {
          event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event.preventDefault();
        },
        target: {
          name: props.name,
          id: idState,
          value: value
        }
      });
    }
    selectedItem.current = value;
  };
  var formatValue = function formatValue(value) {
    if (value) {
      if (typeof value === 'string') {
        return value;
      } else if (props.selectedItemTemplate) {
        var resolvedFieldData = utils.ObjectUtils.getJSXElement(props.selectedItemTemplate, value);
        return resolvedFieldData ? resolvedFieldData : value;
      } else if (props.field) {
        var _resolvedFieldData = utils.ObjectUtils.resolveFieldData(value, props.field);
        return _resolvedFieldData !== null && _resolvedFieldData !== undefined ? _resolvedFieldData : value;
      } else {
        return value;
      }
    }
    return '';
  };
  var updateInputField = function updateInputField(value) {
    inputRef.current.value = formatValue(value);
  };
  var show = function show() {
    setOverlayVisibleState(true);
  };
  var hide = function hide() {
    setOverlayVisibleState(false);
    setSearchingState(false);
  };
  var onOverlayEnter = function onOverlayEnter() {
    utils.ZIndexUtils.set('overlay', overlayRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, context && context.zIndex['overlay'] || PrimeReact__default["default"].zIndex['overlay']);
    alignOverlay();
  };
  var onOverlayEntering = function onOverlayEntering() {
    if (props.autoHighlight && props.suggestions && props.suggestions.length) {
      var element = getScrollableElement().firstChild.firstChild;
      utils.DomHandler.addClass(element, 'p-highlight');
    }
  };
  var onOverlayEntered = function onOverlayEntered() {
    bindOverlayListener();
    props.onShow && props.onShow();
  };
  var onOverlayExit = function onOverlayExit() {
    unbindOverlayListener();
  };
  var onOverlayExited = function onOverlayExited() {
    utils.ZIndexUtils.clear(overlayRef.current);
    props.onHide && props.onHide();
  };
  var alignOverlay = function alignOverlay() {
    var target = props.multiple ? multiContainerRef.current : inputRef.current;
    utils.DomHandler.alignOverlay(overlayRef.current, target, props.appendTo || context && context.appendTo || PrimeReact__default["default"].appendTo);
  };
  var onPanelClick = function onPanelClick(event) {
    overlayservice.OverlayService.emit('overlay-click', {
      originalEvent: event,
      target: elementRef.current
    });
  };
  var onDropdownClick = function onDropdownClick(event) {
    if (props.dropdownAutoFocus) {
      utils.DomHandler.focus(inputRef.current, props.dropdownAutoFocus);
    }
    if (props.dropdownMode === 'blank') search(event, '', 'dropdown');else if (props.dropdownMode === 'current') search(event, inputRef.current.value, 'dropdown');
    if (props.onDropdownClick) {
      props.onDropdownClick({
        originalEvent: event,
        query: inputRef.current.value
      });
    }
  };
  var removeItem = function removeItem(event, index) {
    var removedValue = props.value[index];
    var newValue = props.value.filter(function (_, i) {
      return index !== i;
    });
    updateModel(event, newValue);
    if (props.onUnselect) {
      props.onUnselect({
        originalEvent: event,
        value: removedValue
      });
    }
  };
  var onInputKeyDown = function onInputKeyDown(event) {
    if (overlayVisibleState) {
      var highlightItem = utils.DomHandler.findSingle(overlayRef.current, 'li.p-highlight');
      switch (event.which) {
        //down
        case 40:
          if (highlightItem) {
            var nextElement = findNextItem(highlightItem);
            if (nextElement) {
              utils.DomHandler.addClass(nextElement, 'p-highlight');
              utils.DomHandler.removeClass(highlightItem, 'p-highlight');
              utils.DomHandler.scrollInView(getScrollableElement(), nextElement);
            }
          } else {
            highlightItem = utils.DomHandler.findSingle(overlayRef.current, 'li');
            if (utils.DomHandler.hasClass(highlightItem, 'p-autocomplete-item-group')) {
              highlightItem = findNextItem(highlightItem);
            }
            if (highlightItem) {
              utils.DomHandler.addClass(highlightItem, 'p-highlight');
            }
          }
          event.preventDefault();
          break;

        //up
        case 38:
          if (highlightItem) {
            var previousElement = findPrevItem(highlightItem);
            if (previousElement) {
              utils.DomHandler.addClass(previousElement, 'p-highlight');
              utils.DomHandler.removeClass(highlightItem, 'p-highlight');
              utils.DomHandler.scrollInView(getScrollableElement(), previousElement);
            }
          }
          event.preventDefault();
          break;

        //enter
        case 13:
          if (highlightItem) {
            selectHighlightItem(event, highlightItem);
            hide();
            event.preventDefault();
          }
          break;

        //escape
        case 27:
          hide();
          event.preventDefault();
          break;

        //tab
        case 9:
          if (highlightItem) {
            selectHighlightItem(event, highlightItem);
          }
          hide();
          break;
      }
    }
    if (props.multiple) {
      switch (event.which) {
        //backspace
        case 8:
          if (props.value && props.value.length && !inputRef.current.value) {
            var removedValue = props.value[props.value.length - 1];
            var newValue = props.value.slice(0, -1);
            updateModel(event, newValue);
            if (props.onUnselect) {
              props.onUnselect({
                originalEvent: event,
                value: removedValue
              });
            }
          }
          break;
      }
    }
  };
  var selectHighlightItem = function selectHighlightItem(event, item) {
    if (props.optionGroupLabel) {
      var optionGroup = props.suggestions[item.dataset.group];
      selectItem(event, getOptionGroupChildren(optionGroup)[item.dataset.index]);
    } else {
      selectItem(event, props.suggestions[utils.DomHandler.index(item)]);
    }
  };
  var findNextItem = function findNextItem(item) {
    var nextItem = item.nextElementSibling;
    return nextItem ? utils.DomHandler.hasClass(nextItem, 'p-autocomplete-item-group') ? findNextItem(nextItem) : nextItem : null;
  };
  var findPrevItem = function findPrevItem(item) {
    var prevItem = item.previousElementSibling;
    return prevItem ? utils.DomHandler.hasClass(prevItem, 'p-autocomplete-item-group') ? findPrevItem(prevItem) : prevItem : null;
  };
  var onInputFocus = function onInputFocus(event) {
    setFocusedState(true);
    props.onFocus && props.onFocus(event);
  };
  var forceItemSelection = function forceItemSelection(event) {
    if (props.multiple) {
      inputRef.current.value = '';
      return;
    }
    var inputValue = event.target.value.trim();
    var item = (props.suggestions || []).find(function (it) {
      var value = props.field ? utils.ObjectUtils.resolveFieldData(it, props.field) : it;
      return value && inputValue === value.trim();
    });
    if (item) {
      selectItem(event, item, true);
    } else {
      inputRef.current.value = '';
      updateModel(event, null);
      props.onClear && props.onClear(event);
    }
  };
  var onInputBlur = function onInputBlur(event) {
    setFocusedState(false);
    if (props.forceSelection) {
      forceItemSelection(event);
    }
    props.onBlur && props.onBlur(event);
  };
  var onMultiContainerClick = function onMultiContainerClick(event) {
    utils.DomHandler.focus(inputRef.current);
    props.onClick && props.onClick(event);
  };
  var onMultiInputFocus = function onMultiInputFocus(event) {
    onInputFocus(event);
    utils.DomHandler.addClass(multiContainerRef.current, 'p-focus');
  };
  var onMultiInputBlur = function onMultiInputBlur(event) {
    onInputBlur(event);
    utils.DomHandler.removeClass(multiContainerRef.current, 'p-focus');
  };
  var isSelected = function isSelected(val) {
    return props.value ? props.value.some(function (v) {
      return utils.ObjectUtils.equals(v, val);
    }) : false;
  };
  var getScrollableElement = function getScrollableElement() {
    return virtualScrollerRef.current ? overlayRef.current.firstChild : overlayRef.current;
  };
  var getOptionGroupLabel = function getOptionGroupLabel(optionGroup) {
    return props.optionGroupLabel ? utils.ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel) : optionGroup;
  };
  var getOptionGroupChildren = function getOptionGroupChildren(optionGroup) {
    return utils.ObjectUtils.resolveFieldData(optionGroup, props.optionGroupChildren);
  };
  React__namespace.useEffect(function () {
    utils.ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  hooks.useMountEffect(function () {
    if (!idState) {
      setIdState(utils.UniqueComponentId());
    }
    if (props.autoFocus) {
      utils.DomHandler.focus(inputRef.current, props.autoFocus);
    }
  });
  hooks.useUpdateEffect(function () {
    if (searchingState) {
      utils.ObjectUtils.isNotEmpty(props.suggestions) || props.showEmptyMessage ? show() : hide();
      setSearchingState(false);
    }
  }, [props.suggestions]);
  hooks.useUpdateEffect(function () {
    if (inputRef.current && !props.multiple) {
      updateInputField(props.value);
    }
    if (overlayVisibleState) {
      alignOverlay();
    }
  });
  hooks.useUnmountEffect(function () {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    utils.ZIndexUtils.clear(overlayRef.current);
  });
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      search: search,
      show: show,
      hide: hide,
      focus: function focus() {
        return utils.DomHandler.focus(inputRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      },
      getOverlay: function getOverlay() {
        return overlayRef.current;
      },
      getInput: function getInput() {
        return inputRef.current;
      },
      getVirtualScroller: function getVirtualScroller() {
        return virtualScrollerRef.current;
      }
    };
  });
  var createSimpleAutoComplete = function createSimpleAutoComplete() {
    var value = formatValue(props.value);
    var ariaControls = overlayVisibleState ? idState + '_list' : null;
    var className = utils.classNames('p-autocomplete-input', props.inputClassName, {
      'p-autocomplete-dd-input': props.dropdown
    });
    return /*#__PURE__*/React__namespace.createElement(inputtext.InputText, _extends({
      ref: inputRef,
      id: props.inputId,
      type: props.type,
      name: props.name,
      defaultValue: value,
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-controls": ariaControls,
      "aria-haspopup": "listbox",
      "aria-expanded": overlayVisibleState,
      className: className,
      style: props.inputStyle,
      autoComplete: "off",
      readOnly: props.readOnly,
      disabled: props.disabled,
      placeholder: props.placeholder,
      size: props.size,
      maxLength: props.maxLength,
      tabIndex: props.tabIndex,
      onBlur: onInputBlur,
      onFocus: onInputFocus,
      onChange: onInputChange,
      onMouseDown: props.onMouseDown,
      onKeyUp: props.onKeyUp,
      onKeyDown: onInputKeyDown,
      onKeyPress: props.onKeyPress,
      onContextMenu: props.onContextMenu,
      onClick: props.onClick,
      onDoubleClick: props.onDblClick,
      pt: ptm('input')
    }, ariaProps));
  };
  var createChips = function createChips() {
    if (utils.ObjectUtils.isNotEmpty(props.value)) {
      return props.value.map(function (val, index) {
        var key = index + 'multi-item';
        var removeTokenIconProps = utils.mergeProps({
          className: 'p-autocomplete-token-icon',
          onClick: function onClick(e) {
            return removeItem(e, index);
          }
        }, ptm('removeTokenIcon'));
        var icon = props.removeTokenIcon || /*#__PURE__*/React__namespace.createElement(timescircle.TimesCircleIcon, removeTokenIconProps);
        var removeTokenIcon = !props.disabled && utils.IconUtils.getJSXIcon(icon, _objectSpread({}, removeTokenIconProps), {
          props: props
        });
        var tokenProps = utils.mergeProps({
          className: 'p-autocomplete-token p-highlight'
        }, ptm('token'));
        var tokenLabelProps = utils.mergeProps({
          className: 'p-autocomplete-token-label'
        }, ptm('tokenLabel'));
        return /*#__PURE__*/React__namespace.createElement("li", _extends({
          key: key
        }, tokenProps), /*#__PURE__*/React__namespace.createElement("span", tokenLabelProps, formatValue(val)), removeTokenIcon);
      });
    }
    return null;
  };
  var createMultiInput = function createMultiInput() {
    var ariaControls = overlayVisibleState ? idState + '_list' : null;
    var inputTokenProps = utils.mergeProps({
      className: 'p-autocomplete-input-token'
    }, ptm('inputToken'));
    var inputProps = utils.mergeProps(_objectSpread({
      id: props.inputId,
      ref: inputRef,
      type: props.type,
      disabled: props.disabled,
      placeholder: props.placeholder,
      role: 'combobox',
      'aria-autocomplete': 'list',
      'aria-controls': ariaControls,
      'aria-haspopup': 'listbox',
      'aria-expanded': overlayVisibleState,
      autoComplete: 'off',
      readOnly: props.readOnly,
      tabIndex: props.tabIndex,
      onChange: onInputChange,
      name: props.name,
      style: props.inputStyle,
      className: props.inputClassName,
      maxLength: props.maxLength,
      onKeyUp: props.onKeyUp,
      onKeyDown: onInputKeyDown,
      onKeyPress: props.onKeyPress,
      onFocus: onMultiInputFocus,
      onBlur: onMultiInputBlur
    }, ariaProps), ptm('input'));
    return /*#__PURE__*/React__namespace.createElement("li", inputTokenProps, /*#__PURE__*/React__namespace.createElement("input", inputProps));
  };
  var createMultipleAutoComplete = function createMultipleAutoComplete() {
    var className = utils.classNames('p-autocomplete-multiple-container p-component p-inputtext', {
      'p-disabled': props.disabled
    });
    var tokens = createChips();
    var input = createMultiInput();
    var containerProps = utils.mergeProps({
      ref: multiContainerRef,
      className: className,
      onClick: onMultiContainerClick,
      onContextMenu: props.onContextMenu,
      onMouseDown: props.onMouseDown,
      onDoubleClick: props.onDblClick
    }, ptm('container'));
    return /*#__PURE__*/React__namespace.createElement("ul", containerProps, tokens, input);
  };
  var createDropdown = function createDropdown() {
    if (props.dropdown) {
      var ariaLabel = props.dropdownAriaLabel || props.placeholder || PrimeReact.localeOption('choose');
      return /*#__PURE__*/React__namespace.createElement(button.Button, {
        type: "button",
        icon: props.dropdownIcon || /*#__PURE__*/React__namespace.createElement(chevrondown.ChevronDownIcon, null),
        className: "p-autocomplete-dropdown",
        disabled: props.disabled,
        onClick: onDropdownClick,
        "aria-label": ariaLabel,
        pt: ptm('dropdownButton')
      });
    }
    return null;
  };
  var createLoader = function createLoader() {
    if (searchingState) {
      var iconClassName = 'p-autocomplete-loader p-icon-spin';
      var loadingIconProps = utils.mergeProps({
        className: iconClassName
      }, ptm('loadingIcon'));
      var icon = props.loadingIcon || /*#__PURE__*/React__namespace.createElement(spinner.SpinnerIcon, loadingIconProps);
      var loaderIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, loadingIconProps), {
        props: props
      });
      return loaderIcon;
    }
    return null;
  };
  var createInput = function createInput() {
    return props.multiple ? createMultipleAutoComplete() : createSimpleAutoComplete();
  };
  var listId = idState + '_list';
  var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = AutoCompleteBase.getOtherProps(props);
  var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
  var className = utils.classNames('p-autocomplete p-component p-inputwrapper', {
    'p-autocomplete-dd': props.dropdown,
    'p-autocomplete-multiple': props.multiple,
    'p-inputwrapper-filled': props.value,
    'p-inputwrapper-focus': focusedState
  }, props.className);
  var loader = createLoader();
  var input = createInput();
  var dropdown = createDropdown();
  var rootProps = utils.mergeProps({
    id: idState,
    ref: elementRef,
    style: props.style,
    className: className
  }, otherProps, ptm('root'));
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("span", rootProps, input, loader, dropdown, /*#__PURE__*/React__namespace.createElement(AutoCompletePanel, _extends({
    ref: overlayRef,
    virtualScrollerRef: virtualScrollerRef
  }, props, {
    listId: listId,
    onItemClick: selectItem,
    selectedItem: selectedItem,
    onClick: onPanelClick,
    getOptionGroupLabel: getOptionGroupLabel,
    getOptionGroupChildren: getOptionGroupChildren,
    "in": overlayVisibleState,
    onEnter: onOverlayEnter,
    onEntering: onOverlayEntering,
    onEntered: onOverlayEntered,
    onExit: onOverlayExit,
    onExited: onOverlayExited,
    ptm: ptm
  }))), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions, {
    pt: ptm('tooltip')
  })));
}));
AutoComplete.displayName = 'AutoComplete';

exports.AutoComplete = AutoComplete;
