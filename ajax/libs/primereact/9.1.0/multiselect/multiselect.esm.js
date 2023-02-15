import * as React from 'react';
import PrimeReact, { localeOption, FilterService } from 'primereact/api';
import { useUpdateEffect, useOverlayListener, useUnmountEffect } from 'primereact/hooks';
import { OverlayService } from 'primereact/overlayservice';
import { Tooltip } from 'primereact/tooltip';
import { ObjectUtils, DomHandler, classNames, IconUtils, ZIndexUtils } from 'primereact/utils';
import { CSSTransition } from 'primereact/csstransition';
import { Portal } from 'primereact/portal';
import { VirtualScroller } from 'primereact/virtualscroller';
import { InputText } from 'primereact/inputtext';
import { Ripple } from 'primereact/ripple';

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

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
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
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
}

var MultiSelectBase = {
  defaultProps: {
    __TYPE: 'MultiSelect',
    appendTo: null,
    ariaLabelledBy: null,
    className: null,
    dataKey: null,
    disabled: false,
    display: 'comma',
    dropdownIcon: 'pi pi-chevron-down',
    emptyFilterMessage: null,
    filter: false,
    filterBy: null,
    filterLocale: undefined,
    filterMatchMode: 'contains',
    filterPlaceholder: null,
    filterTemplate: null,
    fixedPlaceholder: false,
    flex: false,
    id: null,
    inline: false,
    inputId: null,
    inputRef: null,
    itemClassName: null,
    itemTemplate: null,
    maxSelectedLabels: null,
    name: null,
    onBlur: null,
    onChange: null,
    onFilter: null,
    onFocus: null,
    onHide: null,
    onSelectAll: null,
    onShow: null,
    optionDisabled: null,
    optionGroupChildren: null,
    optionGroupLabel: null,
    optionGroupTemplate: null,
    optionLabel: null,
    optionValue: null,
    options: null,
    overlayVisible: false,
    panelClassName: null,
    panelFooterTemplate: null,
    panelHeaderTemplate: null,
    panelStyle: null,
    placeholder: null,
    removeIcon: 'pi pi-times-circle',
    resetFilterOnHide: false,
    scrollHeight: '200px',
    selectAll: false,
    selectedItemTemplate: null,
    selectedItemsLabel: '{0} items selected',
    selectionLimit: null,
    showClear: false,
    showSelectAll: true,
    style: null,
    tabIndex: 0,
    tooltip: null,
    tooltipOptions: null,
    transitionOptions: null,
    useOptionAsValue: false,
    value: null,
    virtualScrollerOptions: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, MultiSelectBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, MultiSelectBase.defaultProps);
  }
};

var CheckboxBase = {
  defaultProps: {
    __TYPE: 'Checkbox',
    id: null,
    inputRef: null,
    inputId: null,
    value: null,
    name: null,
    checked: false,
    trueValue: true,
    falseValue: false,
    style: null,
    className: null,
    disabled: false,
    required: false,
    readOnly: false,
    tabIndex: null,
    icon: 'pi pi-check',
    tooltip: null,
    tooltipOptions: null,
    onChange: null,
    onMouseDown: null,
    onContextMenu: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, CheckboxBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, CheckboxBase.defaultProps);
  }
};

var Checkbox = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = CheckboxBase.getProps(inProps);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedState = _React$useState2[0],
    setFocusedState = _React$useState2[1];
  var elementRef = React.useRef(null);
  var inputRef = React.useRef(props.inputRef);
  var onClick = function onClick(event) {
    if (!props.disabled && !props.readOnly && props.onChange) {
      var _checked = isChecked();
      var checkboxClicked = event.target instanceof HTMLDivElement || event.target instanceof HTMLSpanElement;
      var isInputToggled = event.target === inputRef.current;
      var isCheckboxToggled = checkboxClicked && event.target.checked !== _checked;
      if (isInputToggled || isCheckboxToggled) {
        var value = _checked ? props.falseValue : props.trueValue;
        props.onChange({
          originalEvent: event,
          value: props.value,
          checked: value,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            type: 'checkbox',
            name: props.name,
            id: props.id,
            value: props.value,
            checked: value
          }
        });
      }
      DomHandler.focus(inputRef.current);
      event.preventDefault();
    }
  };
  var onFocus = function onFocus() {
    setFocusedState(true);
  };
  var onBlur = function onBlur() {
    setFocusedState(false);
  };
  var onKeyDown = function onKeyDown(event) {
    if (event.code === 'Space' || event.key === ' ') {
      // event.key is for Android support
      onClick(event);
    }
  };
  var isChecked = function isChecked() {
    return props.checked === props.trueValue;
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      focus: function focus() {
        return DomHandler.focus(inputRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      },
      getInput: function getInput() {
        return inputRef.current;
      }
    };
  });
  React.useEffect(function () {
    ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  useUpdateEffect(function () {
    inputRef.current.checked = isChecked();
  }, [props.checked, props.trueValue]);
  var checked = isChecked();
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = CheckboxBase.getOtherProps(props);
  var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
  var className = classNames('p-checkbox p-component', {
    'p-checkbox-checked': checked,
    'p-checkbox-disabled': props.disabled,
    'p-checkbox-focused': focusedState
  }, props.className);
  var boxClass = classNames('p-checkbox-box', {
    'p-highlight': checked,
    'p-disabled': props.disabled,
    'p-focus': focusedState
  });
  var icon = IconUtils.getJSXIcon(checked ? props.icon : '', {
    className: 'p-checkbox-icon p-c'
  }, {
    props: props,
    checked: checked
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, otherProps, {
    onClick: onClick,
    onContextMenu: props.onContextMenu,
    onMouseDown: props.onMouseDown
  }), /*#__PURE__*/React.createElement("div", {
    className: "p-hidden-accessible"
  }, /*#__PURE__*/React.createElement("input", _extends({
    ref: inputRef,
    type: "checkbox",
    id: props.inputId,
    name: props.name,
    tabIndex: props.tabIndex,
    defaultChecked: checked,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    disabled: props.disabled,
    readOnly: props.readOnly,
    required: props.required
  }, ariaProps))), /*#__PURE__*/React.createElement("div", {
    className: boxClass
  }, icon)), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions)));
}));
Checkbox.displayName = 'Checkbox';

var MultiSelectHeader = /*#__PURE__*/React.memo(function (props) {
  var filterOptions = {
    filter: function filter(e) {
      return onFilter(e);
    },
    reset: function reset() {
      return props.resetFilter();
    }
  };
  var onFilter = function onFilter(event) {
    if (props.onFilter) {
      props.onFilter({
        originalEvent: event,
        query: event.target.value
      });
    }
  };
  var onSelectAll = function onSelectAll(event) {
    if (props.onSelectAll) {
      props.onSelectAll({
        originalEvent: event,
        checked: props.selectAll
      });
    }
    event.preventDefault();
  };
  var createFilterElement = function createFilterElement() {
    if (props.filter) {
      var containerClassName = classNames('p-multiselect-filter-container');
      var content = /*#__PURE__*/React.createElement("div", {
        className: containerClassName
      }, /*#__PURE__*/React.createElement(InputText, {
        ref: props.filterRef,
        type: "text",
        role: "textbox",
        value: props.filterValue,
        onChange: onFilter,
        className: "p-multiselect-filter",
        placeholder: props.filterPlaceholder
      }), /*#__PURE__*/React.createElement("span", {
        className: "p-multiselect-filter-icon pi pi-search"
      }));
      if (props.filterTemplate) {
        var defaultContentOptions = {
          className: containerClassName,
          element: content,
          filterOptions: filterOptions,
          onFilter: onFilter,
          filterIconClassName: 'p-multeselect-filter-icon pi pi-search',
          props: props
        };
        content = ObjectUtils.getJSXElement(props.filterTemplate, defaultContentOptions);
      }
      return /*#__PURE__*/React.createElement(React.Fragment, null, content);
    }
    return null;
  };
  var filterElement = createFilterElement();
  var checkboxElement = props.showSelectAll && /*#__PURE__*/React.createElement(Checkbox, {
    checked: props.selectAll,
    onChange: onSelectAll,
    role: "checkbox",
    "aria-checked": props.selectAll
  });
  var closeElement = /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "p-multiselect-close p-link",
    "aria-label": localeOption('close'),
    onClick: props.onClose
  }, /*#__PURE__*/React.createElement("span", {
    className: "p-multiselect-close-icon pi pi-times",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement(Ripple, null));
  var element = /*#__PURE__*/React.createElement("div", {
    className: "p-multiselect-header"
  }, checkboxElement, filterElement, closeElement);
  if (props.template) {
    var defaultOptions = {
      className: 'p-multiselect-header',
      checkboxElement: checkboxElement,
      checked: props.selectAll,
      onChange: onSelectAll,
      filterElement: filterElement,
      closeElement: closeElement,
      closeElementClassName: 'p-multiselect-close p-link',
      closeIconClassName: 'p-multiselect-close-icon pi pi-times',
      onCloseClick: props.onClose,
      element: element,
      props: props
    };
    return ObjectUtils.getJSXElement(props.template, defaultOptions);
  }
  return element;
});
MultiSelectHeader.displayName = 'MultiSelectHeader';

var MultiSelectItem = /*#__PURE__*/React.memo(function (props) {
  var onClick = function onClick(event) {
    if (props.onClick) {
      props.onClick({
        originalEvent: event,
        option: props.option
      });
    }
    event.preventDefault();
  };
  var onKeyDown = function onKeyDown(event) {
    if (props.onKeyDown) {
      props.onKeyDown({
        originalEvent: event,
        option: props.option
      });
    }
  };
  var className = classNames('p-multiselect-item', {
    'p-highlight': props.selected,
    'p-disabled': props.disabled
  }, props.className, props.option.className);
  var checkboxClassName = classNames('p-checkbox-box', {
    'p-highlight': props.selected
  });
  var checkboxIcon = classNames('p-checkbox-icon p-c', {
    'pi pi-check': props.selected
  });
  var content = props.template ? ObjectUtils.getJSXElement(props.template, props.option) : props.label;
  var tabIndex = props.disabled ? null : props.tabIndex || 0;
  return /*#__PURE__*/React.createElement("li", {
    className: className,
    style: props.style,
    onClick: onClick,
    tabIndex: tabIndex,
    onKeyDown: onKeyDown,
    role: "option",
    "aria-selected": props.selected
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-checkbox p-component"
  }, /*#__PURE__*/React.createElement("div", {
    className: checkboxClassName
  }, /*#__PURE__*/React.createElement("span", {
    className: checkboxIcon
  }))), /*#__PURE__*/React.createElement("span", null, content), /*#__PURE__*/React.createElement(Ripple, null));
});
MultiSelectItem.displayName = 'MultiSelectItem';

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var MultiSelectPanel = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var virtualScrollerRef = React.useRef(null);
  var filterInputRef = React.useRef(null);
  var onEnter = function onEnter() {
    props.onEnter(function () {
      if (virtualScrollerRef.current) {
        var selectedIndex = props.getSelectedOptionIndex();
        if (selectedIndex !== -1) {
          setTimeout(function () {
            return virtualScrollerRef.current.scrollToIndex(selectedIndex);
          }, 0);
        }
      }
    });
  };
  var onEntered = function onEntered() {
    props.onEntered(function () {
      if (props.filter && filterInputRef.current) {
        DomHandler.focus(filterInputRef.current, false);
      }
    });
  };
  var onFilterInputChange = function onFilterInputChange(event) {
    if (virtualScrollerRef.current) {
      virtualScrollerRef.current.scrollToIndex(0);
    }
    props.onFilterInputChange && props.onFilterInputChange(event);
  };
  var isEmptyFilter = function isEmptyFilter() {
    return !(props.visibleOptions && props.visibleOptions.length) && props.hasFilter;
  };
  var createHeader = function createHeader() {
    return /*#__PURE__*/React.createElement(MultiSelectHeader, {
      filter: props.filter,
      filterRef: filterInputRef,
      filterValue: props.filterValue,
      filterTemplate: props.filterTemplate,
      onFilter: onFilterInputChange,
      filterPlaceholder: props.filterPlaceholder,
      onClose: props.onCloseClick,
      showSelectAll: props.showSelectAll,
      selectAll: props.isAllSelected(),
      onSelectAll: props.onSelectAll,
      template: props.panelHeaderTemplate
    });
  };
  var createFooter = function createFooter() {
    if (props.panelFooterTemplate) {
      var content = ObjectUtils.getJSXElement(props.panelFooterTemplate, props, props.onOverlayHide);
      return /*#__PURE__*/React.createElement("div", {
        className: "p-multiselect-footer"
      }, content);
    }
    return null;
  };
  var createGroupChildren = function createGroupChildren(optionGroup, style) {
    var groupChildren = props.getOptionGroupChildren(optionGroup);
    return groupChildren.map(function (option, j) {
      var optionLabel = props.getOptionLabel(option);
      var optionKey = j + '_' + props.getOptionRenderKey(option);
      var disabled = props.isOptionDisabled(option);
      var tabIndex = disabled ? null : props.tabIndex || 0;
      var selected = props.isSelected(option);
      return /*#__PURE__*/React.createElement(MultiSelectItem, {
        key: optionKey,
        label: optionLabel,
        option: option,
        style: style,
        template: props.itemTemplate,
        selected: selected,
        onClick: props.onOptionSelect,
        onKeyDown: props.onOptionKeyDown,
        tabIndex: tabIndex,
        disabled: disabled,
        className: props.itemClassName
      });
    });
  };
  var createEmptyFilter = function createEmptyFilter() {
    var emptyFilterMessage = ObjectUtils.getJSXElement(props.emptyFilterMessage, props) || localeOption('emptyFilterMessage');
    return /*#__PURE__*/React.createElement("li", {
      className: "p-multiselect-empty-message"
    }, emptyFilterMessage);
  };
  var createItem = function createItem(option, index) {
    var scrollerOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var style = {
      height: scrollerOptions.props ? scrollerOptions.props.itemSize : undefined
    };
    if (props.optionGroupLabel) {
      var groupContent = props.optionGroupTemplate ? ObjectUtils.getJSXElement(props.optionGroupTemplate, option, index) : props.getOptionGroupLabel(option);
      var groupChildrenContent = createGroupChildren(option, style);
      var key = index + '_' + props.getOptionGroupRenderKey(option);
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: key
      }, /*#__PURE__*/React.createElement("li", {
        className: "p-multiselect-item-group",
        style: style
      }, groupContent), groupChildrenContent);
    } else {
      var optionLabel = props.getOptionLabel(option);
      var optionKey = index + '_' + props.getOptionRenderKey(option);
      var disabled = props.isOptionDisabled(option);
      var tabIndex = disabled ? null : props.tabIndex || 0;
      var selected = props.isSelected(option);
      return /*#__PURE__*/React.createElement(MultiSelectItem, {
        key: optionKey,
        label: optionLabel,
        option: option,
        style: style,
        template: props.itemTemplate,
        selected: selected,
        onClick: props.onOptionSelect,
        onKeyDown: props.onOptionKeyDown,
        tabIndex: tabIndex,
        disabled: disabled,
        className: props.itemClassName
      });
    }
  };
  var createItems = function createItems() {
    if (ObjectUtils.isNotEmpty(props.visibleOptions)) {
      return props.visibleOptions.map(createItem);
    } else if (props.hasFilter) {
      return createEmptyFilter();
    }
    return null;
  };
  var createContent = function createContent() {
    if (props.virtualScrollerOptions) {
      var virtualScrollerProps = _objectSpread$1(_objectSpread$1({}, props.virtualScrollerOptions), {
        style: _objectSpread$1(_objectSpread$1({}, props.virtualScrollerOptions.style), {
          height: props.scrollHeight
        }),
        className: classNames('p-multiselect-items-wrapper', props.virtualScrollerOptions.className),
        items: props.visibleOptions,
        autoSize: true,
        onLazyLoad: function onLazyLoad(event) {
          return props.virtualScrollerOptions.onLazyLoad(_objectSpread$1(_objectSpread$1({}, event), {
            filter: props.filterValue
          }));
        },
        itemTemplate: function itemTemplate(item, options) {
          return item && createItem(item, options.index, options);
        },
        contentTemplate: function contentTemplate(options) {
          var className = classNames('p-multiselect-items p-component', options.className);
          var content = isEmptyFilter() ? createEmptyFilter() : options.children;
          return /*#__PURE__*/React.createElement("ul", {
            ref: options.contentRef,
            className: className,
            role: "listbox",
            "aria-multiselectable": true
          }, content);
        }
      });
      return /*#__PURE__*/React.createElement(VirtualScroller, _extends({
        ref: virtualScrollerRef
      }, virtualScrollerProps));
    } else {
      var items = createItems();
      return /*#__PURE__*/React.createElement("div", {
        className: "p-multiselect-items-wrapper",
        style: {
          maxHeight: props.scrollHeight
        }
      }, /*#__PURE__*/React.createElement("ul", {
        className: "p-multiselect-items p-component",
        role: "listbox",
        "aria-multiselectable": true
      }, items));
    }
  };
  var createElement = function createElement() {
    var allowOptionSelect = props.allowOptionSelect();
    var panelClassName = classNames('p-multiselect-panel p-component', {
      'p-multiselect-inline': props.inline,
      'p-multiselect-flex': props.flex,
      'p-multiselect-limited': !allowOptionSelect,
      'p-input-filled': PrimeReact.inputStyle === 'filled',
      'p-ripple-disabled': PrimeReact.ripple === false
    }, props.panelClassName);
    var header = createHeader();
    var content = createContent();
    var footer = createFooter();
    if (props.inline) {
      return /*#__PURE__*/React.createElement("div", {
        ref: ref,
        className: panelClassName,
        style: props.panelStyle,
        onClick: props.onClick
      }, content, footer);
    }
    return /*#__PURE__*/React.createElement(CSSTransition, {
      nodeRef: ref,
      classNames: "p-connected-overlay",
      "in": props["in"],
      timeout: {
        enter: 120,
        exit: 100
      },
      options: props.transitionOptions,
      unmountOnExit: true,
      onEnter: onEnter,
      onEntered: onEntered,
      onExit: props.onExit,
      onExited: props.onExited
    }, /*#__PURE__*/React.createElement("div", {
      ref: ref,
      className: panelClassName,
      style: props.panelStyle,
      onClick: props.onClick
    }, header, content, footer));
  };
  var element = createElement();
  if (props.inline) return element;
  return /*#__PURE__*/React.createElement(Portal, {
    element: element,
    appendTo: props.appendTo
  });
}));
MultiSelectPanel.displayName = 'MultiSelectPanel';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var MultiSelect = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = MultiSelectBase.getProps(inProps);
  var _React$useState = React.useState(''),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    filterState = _React$useState2[0],
    setFilterState = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    focusedState = _React$useState4[0],
    setFocusedState = _React$useState4[1];
  var _React$useState5 = React.useState(props.inline),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    overlayVisibleState = _React$useState6[0],
    setOverlayVisibleState = _React$useState6[1];
  var elementRef = React.useRef(null);
  var inputRef = React.useRef(props.inputRef);
  var labelRef = React.useRef(null);
  var overlayRef = React.useRef(null);
  var hasFilter = filterState && filterState.trim().length > 0;
  var empty = ObjectUtils.isEmpty(props.value);
  var equalityKey = props.optionValue ? null : props.dataKey;
  var _useOverlayListener = useOverlayListener({
      target: elementRef,
      overlay: overlayRef,
      listener: function listener(event, _ref) {
        var type = _ref.type,
          valid = _ref.valid;
        if (valid) {
          type === 'outside' ? !isClearClicked(event) && hide() : hide();
        }
      },
      when: overlayVisibleState
    }),
    _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
    bindOverlayListener = _useOverlayListener2[0],
    unbindOverlayListener = _useOverlayListener2[1];
  var onPanelClick = function onPanelClick(event) {
    OverlayService.emit('overlay-click', {
      originalEvent: event,
      target: elementRef.current
    });
  };
  var allowOptionSelect = function allowOptionSelect() {
    return !props.selectionLimit || !props.value || props.value && props.value.length < props.selectionLimit;
  };
  var onOptionSelect = function onOptionSelect(event) {
    var originalEvent = event.originalEvent,
      option = event.option;
    if (props.disabled || isOptionDisabled(option)) {
      return;
    }
    var optionValue = getOptionValue(option);
    var isUsed = isOptionValueUsed(option);
    var selected = isSelected(option);
    var allowSelect = allowOptionSelect();
    if (selected) updateModel(originalEvent, props.value.filter(function (val) {
      return !ObjectUtils.equals(isUsed ? val : getOptionValue(val), optionValue, equalityKey);
    }));else if (allowSelect) updateModel(originalEvent, [].concat(_toConsumableArray(props.value || []), [optionValue]));
  };
  var onOptionKeyDown = function onOptionKeyDown(event) {
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

      //enter and space
      case 13:
      case 32:
        onOptionSelect(event);
        originalEvent.preventDefault();
        break;

      //escape
      case 27:
        hide();
        DomHandler.focus(inputRef.current);
        break;
    }
  };
  var findNextItem = function findNextItem(item) {
    var nextItem = item.nextElementSibling;
    return nextItem ? DomHandler.hasClass(nextItem, 'p-disabled') || DomHandler.hasClass(nextItem, 'p-multiselect-item-group') ? findNextItem(nextItem) : nextItem : null;
  };
  var findPrevItem = function findPrevItem(item) {
    var prevItem = item.previousElementSibling;
    return prevItem ? DomHandler.hasClass(prevItem, 'p-disabled') || DomHandler.hasClass(prevItem, 'p-multiselect-item-group') ? findPrevItem(prevItem) : prevItem : null;
  };
  var onClick = function onClick(event) {
    if (!props.inline && !props.disabled && !isPanelClicked(event) && !DomHandler.hasClass(event.target, 'p-multiselect-token-icon') && !isClearClicked(event)) {
      overlayVisibleState ? hide() : show();
      DomHandler.focus(inputRef.current);
      event.preventDefault();
    }
  };
  var onKeyDown = function onKeyDown(event) {
    switch (event.which) {
      //down
      case 40:
        if (props.inline) break;
        if (!overlayVisibleState && event.altKey) {
          show();
          event.preventDefault();
        }
        break;

      //space
      case 32:
        if (props.inline) break;
        overlayVisibleState ? hide() : show();
        event.preventDefault();
        break;

      //escape
      case 27:
        if (props.inline) break;
        hide();
        break;

      //tab
      case 9:
        if (overlayVisibleState) {
          var firstFocusableElement = DomHandler.getFirstFocusableElement(overlayRef.current);
          if (firstFocusableElement) {
            firstFocusableElement.focus();
            event.preventDefault();
          }
        }
        break;
    }
  };
  var onSelectAll = function onSelectAll(event) {
    if (props.onSelectAll) {
      props.onSelectAll(event);
    } else {
      var value = null;
      if (event.checked) {
        value = [];
        if (visibleOptions) {
          var selectedOptions = visibleOptions.filter(function (option) {
            return isOptionDisabled(option) && isSelected(option);
          });
          value = selectedOptions.map(function (option) {
            return getOptionValue(option);
          });
        }
      } else if (visibleOptions) {
        var options = visibleOptions.filter(function (option) {
          return !isOptionDisabled(option);
        });
        if (props.optionGroupLabel) {
          value = [];
          options.forEach(function (optionGroup) {
            return value = [].concat(_toConsumableArray(value), _toConsumableArray(getOptionGroupChildren(optionGroup).filter(function (option) {
              return !isOptionDisabled(option);
            }).map(function (option) {
              return getOptionValue(option);
            })));
          });
        } else {
          value = options.map(function (option) {
            return getOptionValue(option);
          });
        }
      }
      updateModel(event.originalEvent, value);
    }
  };
  var updateModel = function updateModel(event, value) {
    if (props.onChange) {
      props.onChange({
        originalEvent: event,
        value: value,
        stopPropagation: function stopPropagation() {},
        preventDefault: function preventDefault() {},
        target: {
          name: props.name,
          id: props.id,
          value: value
        }
      });
    }
  };
  var onFilterInputChange = function onFilterInputChange(event) {
    var filter = event.query;
    setFilterState(filter);
    if (props.onFilter) {
      props.onFilter({
        originalEvent: event,
        filter: filter
      });
    }
  };
  var resetFilter = function resetFilter() {
    setFilterState('');
    props.onFilter && props.onFilter({
      filter: ''
    });
  };
  var scrollInView = function scrollInView() {
    var highlightItem = DomHandler.findSingle(overlayRef.current, 'li.p-highlight');
    if (highlightItem && highlightItem.scrollIntoView) {
      highlightItem.scrollIntoView({
        block: 'nearest',
        inline: 'nearest'
      });
    }
  };
  var show = function show() {
    setOverlayVisibleState(true);
  };
  var hide = function hide() {
    setOverlayVisibleState(false);
  };
  var onOverlayEnter = function onOverlayEnter(callback) {
    ZIndexUtils.set('overlay', overlayRef.current, PrimeReact.autoZIndex, PrimeReact.zIndex['overlay']);
    alignOverlay();
    scrollInView();
    callback && callback();
  };
  var onOverlayEntered = function onOverlayEntered(callback) {
    callback && callback();
    bindOverlayListener();
    props.onShow && props.onShow();
  };
  var onOverlayExit = function onOverlayExit() {
    unbindOverlayListener();
  };
  var onOverlayExited = function onOverlayExited() {
    if (props.filter && props.resetFilterOnHide) {
      resetFilter();
    }
    ZIndexUtils.clear(overlayRef.current);
    props.onHide && props.onHide();
  };
  var alignOverlay = function alignOverlay() {
    DomHandler.alignOverlay(overlayRef.current, labelRef.current.parentElement, props.appendTo || PrimeReact.appendTo);
  };
  var isClearClicked = function isClearClicked(event) {
    return DomHandler.hasClass(event.target, 'p-multiselect-clear-icon');
  };
  var isPanelClicked = function isPanelClicked(event) {
    return overlayRef.current && overlayRef.current.contains(event.target);
  };
  var onCloseClick = function onCloseClick(event) {
    hide();
    DomHandler.focus(inputRef.current);
    event.preventDefault();
    event.stopPropagation();
  };
  var getSelectedOptionIndex = function getSelectedOptionIndex() {
    if (props.value != null && props.options) {
      if (props.optionGroupLabel) {
        var groupIndex = 0;
        var optionIndex = props.options.findIndex(function (optionGroup, i) {
          return (groupIndex = i) && findOptionIndexInList(props.value, getOptionGroupChildren(optionGroup)) !== -1;
        });
        return optionIndex !== -1 ? {
          group: groupIndex,
          option: optionIndex
        } : -1;
      } else {
        return findOptionIndexInList(props.value, props.options);
      }
    }
    return -1;
  };
  var findOptionIndexInList = function findOptionIndexInList(value, list) {
    return list.findIndex(function (item) {
      return value.some(function (val) {
        return ObjectUtils.equals(val, getOptionValue(item), equalityKey);
      });
    });
  };
  var isSelected = function isSelected(option) {
    if (props.value) {
      var optionValue = getOptionValue(option);
      var isUsed = isOptionValueUsed(option);
      return props.value.some(function (val) {
        return ObjectUtils.equals(isUsed ? val : getOptionValue(val), optionValue, equalityKey);
      });
    }
    return false;
  };
  var getLabelByValue = function getLabelByValue(val) {
    var option;
    if (props.options) {
      if (props.optionGroupLabel) {
        var _iterator = _createForOfIteratorHelper(props.options),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var optionGroup = _step.value;
            option = findOptionByValue(val, getOptionGroupChildren(optionGroup));
            if (option) {
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        option = findOptionByValue(val, props.options);
      }
    }
    return option ? getOptionLabel(option) : null;
  };
  var findOptionByValue = function findOptionByValue(val, list) {
    return list.find(function (option) {
      return ObjectUtils.equals(getOptionValue(option), val, equalityKey);
    });
  };
  var onFocus = function onFocus(event) {
    setFocusedState(true);
    props.onFocus && props.onFocus(event);
  };
  var onBlur = function onBlur(event) {
    setFocusedState(false);
    props.onBlur && props.onBlur(event);
  };
  var isAllSelected = function isAllSelected() {
    if (props.onSelectAll) {
      return props.selectAll;
    } else {
      if (ObjectUtils.isEmpty(visibleOptions)) {
        return false;
      }
      var options = visibleOptions.filter(function (option) {
        return !isOptionDisabled(option);
      });
      if (props.optionGroupLabel) {
        var _iterator2 = _createForOfIteratorHelper(options),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var optionGroup = _step2.value;
            var visibleOptionsGroupChildren = getOptionGroupChildren(optionGroup).filter(function (option) {
              return !isOptionDisabled(option);
            });
            return !visibleOptionsGroupChildren.some(function (option) {
              return !isSelected(option);
            });
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      } else {
        return !options.some(function (option) {
          return !isSelected(option);
        });
      }
    }
    return true;
  };
  var getOptionLabel = function getOptionLabel(option) {
    return props.optionLabel ? ObjectUtils.resolveFieldData(option, props.optionLabel) : option && option['label'] !== undefined ? option['label'] : option;
  };
  var getOptionValue = function getOptionValue(option) {
    if (props.useOptionAsValue) {
      return option;
    }
    if (props.optionValue) {
      var data = ObjectUtils.resolveFieldData(option, props.optionValue);
      return data !== null ? data : option;
    }
    return option && option['value'] !== undefined ? option['value'] : option;
  };
  var getOptionRenderKey = function getOptionRenderKey(option) {
    return props.dataKey ? ObjectUtils.resolveFieldData(option, props.dataKey) : getOptionLabel(option);
  };
  var getOptionGroupRenderKey = function getOptionGroupRenderKey(optionGroup) {
    return ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel);
  };
  var getOptionGroupLabel = function getOptionGroupLabel(optionGroup) {
    return ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel);
  };
  var getOptionGroupChildren = function getOptionGroupChildren(optionGroup) {
    return ObjectUtils.resolveFieldData(optionGroup, props.optionGroupChildren);
  };
  var isOptionDisabled = function isOptionDisabled(option) {
    if (props.optionDisabled) {
      return ObjectUtils.isFunction(props.optionDisabled) ? props.optionDisabled(option) : ObjectUtils.resolveFieldData(option, props.optionDisabled);
    }
    return option && option['disabled'] !== undefined ? option['disabled'] : false;
  };
  var isOptionValueUsed = function isOptionValueUsed(option) {
    return !props.useOptionAsValue && props.optionValue || option && option['value'] !== undefined;
  };
  var removeChip = function removeChip(event, item) {
    var value = props.value.filter(function (val) {
      return !ObjectUtils.equals(val, item, equalityKey);
    });
    updateModel(event, value);
  };
  var getSelectedItemsLabel = function getSelectedItemsLabel() {
    var pattern = /{(.*?)}/;
    if (pattern.test(props.selectedItemsLabel)) {
      return props.selectedItemsLabel.replace(props.selectedItemsLabel.match(pattern)[0], props.value.length + '');
    }
    return props.selectedItemsLabel;
  };
  var getLabel = function getLabel() {
    var label;
    if (!empty && !props.fixedPlaceholder) {
      if (ObjectUtils.isNotEmpty(props.maxSelectedLabels) && props.value.length > props.maxSelectedLabels) {
        return getSelectedItemsLabel();
      } else {
        return props.value.reduce(function (acc, value, index) {
          return acc + (index !== 0 ? ',' : '') + getLabelByValue(value);
        }, '');
      }
    }
    return label;
  };
  var getLabelContent = function getLabelContent() {
    if (props.selectedItemTemplate) {
      if (!empty) {
        if (ObjectUtils.isNotEmpty(props.maxSelectedLabels) && props.value.length > props.maxSelectedLabels) {
          return getSelectedItemsLabel();
        } else {
          return props.value.map(function (val, index) {
            var item = ObjectUtils.getJSXElement(props.selectedItemTemplate, val);
            return /*#__PURE__*/React.createElement(React.Fragment, {
              key: index
            }, item);
          });
        }
      } else {
        return ObjectUtils.getJSXElement(props.selectedItemTemplate);
      }
    } else {
      if (props.display === 'chip' && !empty) {
        var value = props.value.slice(0, props.maxSelectedLabels || props.value.length);
        return value.map(function (val) {
          var label = getLabelByValue(val);
          var icon = !props.disabled && IconUtils.getJSXIcon(props.removeIcon, {
            className: 'p-multiselect-token-icon',
            onClick: function onClick(e) {
              return removeChip(e, val);
            }
          }, {
            props: props
          });
          return /*#__PURE__*/React.createElement("div", {
            className: "p-multiselect-token",
            key: label
          }, /*#__PURE__*/React.createElement("span", {
            className: "p-multiselect-token-label"
          }, label), icon);
        });
      }
      return getLabel();
    }
  };
  var getVisibleOptions = function getVisibleOptions() {
    if (hasFilter) {
      var filterValue = filterState.trim().toLocaleLowerCase(props.filterLocale);
      var searchFields = props.filterBy ? props.filterBy.split(',') : [props.optionLabel || 'label'];
      if (props.optionGroupLabel) {
        var filteredGroups = [];
        var _iterator3 = _createForOfIteratorHelper(props.options),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var optgroup = _step3.value;
            var filteredSubOptions = FilterService.filter(getOptionGroupChildren(optgroup), searchFields, filterValue, props.filterMatchMode, props.filterLocale);
            if (filteredSubOptions && filteredSubOptions.length) {
              filteredGroups.push(_objectSpread(_objectSpread({}, optgroup), _defineProperty({}, props.optionGroupChildren, filteredSubOptions)));
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        return filteredGroups;
      } else {
        return FilterService.filter(props.options, searchFields, filterValue, props.filterMatchMode, props.filterLocale);
      }
    } else {
      return props.options;
    }
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      show: show,
      hide: hide,
      focus: function focus() {
        return DomHandler.focus(inputRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      },
      getOverlay: function getOverlay() {
        return overlayRef.current;
      },
      getInput: function getInput() {
        return inputRef.current;
      }
    };
  });
  React.useEffect(function () {
    ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  React.useEffect(function () {
    setTimeout(function () {
      props.overlayVisible ? show() : hide();
    }, 100);
  }, [props.overlayVisible]);
  useUpdateEffect(function () {
    if (overlayVisibleState && hasFilter) {
      alignOverlay();
    }
  }, [overlayVisibleState, hasFilter]);
  useUnmountEffect(function () {
    ZIndexUtils.clear(overlayRef.current);
  });
  var createClearIcon = function createClearIcon() {
    if (!empty && props.showClear && !props.disabled) {
      return /*#__PURE__*/React.createElement("i", {
        className: "p-multiselect-clear-icon pi pi-times",
        onClick: function onClick(e) {
          return updateModel(e, null);
        }
      });
    }
    return null;
  };
  var createLabel = function createLabel() {
    var content = getLabelContent();
    var className = classNames('p-multiselect-label', {
      'p-placeholder': empty && props.placeholder,
      'p-multiselect-label-empty': empty && !props.placeholder && !props.selectedItemTemplate,
      'p-multiselect-items-label': !empty && props.display !== 'chip' && props.value.length > props.maxSelectedLabels
    });
    return /*#__PURE__*/React.createElement("div", {
      ref: labelRef,
      className: "p-multiselect-label-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: className
    }, content || props.placeholder || 'empty'));
  };
  var visibleOptions = getVisibleOptions();
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = MultiSelectBase.getOtherProps(props);
  var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
  var className = classNames('p-multiselect p-component p-inputwrapper', {
    'p-multiselect-chip': props.display === 'chip',
    'p-disabled': props.disabled,
    'p-multiselect-clearable': props.showClear && !props.disabled,
    'p-focus': focusedState,
    'p-inputwrapper-filled': ObjectUtils.isNotEmpty(props.value),
    'p-inputwrapper-focus': focusedState || overlayVisibleState
  }, props.className);
  var label = !props.inline && createLabel();
  var clearIcon = !props.inline && createClearIcon();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef,
    id: props.id,
    style: props.style,
    className: className
  }, otherProps, {
    onClick: onClick
  }), /*#__PURE__*/React.createElement("div", {
    className: "p-hidden-accessible"
  }, /*#__PURE__*/React.createElement("input", _extends({
    ref: inputRef,
    id: props.inputId,
    name: props.name,
    readOnly: true,
    type: "text",
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    role: "listbox",
    "aria-expanded": overlayVisibleState,
    disabled: props.disabled,
    tabIndex: props.tabIndex
  }, ariaProps))), !props.inline && /*#__PURE__*/React.createElement(React.Fragment, null, label, clearIcon, /*#__PURE__*/React.createElement("div", {
    className: "p-multiselect-trigger"
  }, IconUtils.getJSXIcon(props.dropdownIcon, {
    className: 'p-multiselect-trigger-icon p-c'
  }, {
    props: props
  }))), /*#__PURE__*/React.createElement(MultiSelectPanel, _extends({
    ref: overlayRef,
    visibleOptions: visibleOptions
  }, props, {
    onClick: onPanelClick,
    onOverlayHide: hide,
    filterValue: filterState,
    hasFilter: hasFilter,
    onFilterInputChange: onFilterInputChange,
    resetFilter: resetFilter,
    onCloseClick: onCloseClick,
    onSelectAll: onSelectAll,
    getOptionLabel: getOptionLabel,
    getOptionRenderKey: getOptionRenderKey,
    isOptionDisabled: isOptionDisabled,
    getOptionGroupChildren: getOptionGroupChildren,
    getOptionGroupLabel: getOptionGroupLabel,
    getOptionGroupRenderKey: getOptionGroupRenderKey,
    isSelected: isSelected,
    getSelectedOptionIndex: getSelectedOptionIndex,
    isAllSelected: isAllSelected,
    onOptionSelect: onOptionSelect,
    allowOptionSelect: allowOptionSelect,
    onOptionKeyDown: onOptionKeyDown,
    "in": overlayVisibleState,
    onEnter: onOverlayEnter,
    onEntered: onOverlayEntered,
    onExit: onOverlayExit,
    onExited: onOverlayExited
  }))), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions)));
}));
MultiSelect.displayName = 'MultiSelect';

export { MultiSelect };
