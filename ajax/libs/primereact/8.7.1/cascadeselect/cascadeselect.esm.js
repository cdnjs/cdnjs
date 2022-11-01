import * as React from 'react';
import PrimeReact from 'primereact/api';
import { CSSTransition } from 'primereact/csstransition';
import { useMountEffect, useUpdateEffect, useOverlayListener, useUnmountEffect } from 'primereact/hooks';
import { OverlayService } from 'primereact/overlayservice';
import { Portal } from 'primereact/portal';
import { classNames, DomHandler, ObjectUtils, ZIndexUtils } from 'primereact/utils';
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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
}

var CascadeSelectSub = /*#__PURE__*/React.memo(function (props) {
  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      activeOptionState = _React$useState2[0],
      setActiveOptionState = _React$useState2[1];

  var elementRef = React.useRef(null);

  var position = function position() {
    var parentItem = elementRef.current.parentElement;
    var containerOffset = DomHandler.getOffset(parentItem);
    var viewport = DomHandler.getViewport();
    var sublistWidth = elementRef.current.offsetParent ? elementRef.current.offsetWidth : DomHandler.getHiddenElementOuterWidth(element);
    var itemOuterWidth = DomHandler.getOuterWidth(parentItem.children[0]);

    if (parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - DomHandler.calculateScrollbarWidth()) {
      elementRef.current.style.left = '-100%';
    }
  };

  var onOptionSelect = function onOptionSelect(event) {
    props.onOptionSelect && props.onOptionSelect(event);
  };

  var _onKeyDown = function onKeyDown(event, option) {
    var listItem = event.currentTarget.parentElement;

    switch (event.key) {
      case 'Down':
      case 'ArrowDown':
        var nextItem = findNextItem(listItem);

        if (nextItem) {
          nextItem.children[0].focus();
        }

        break;

      case 'Up':
      case 'ArrowUp':
        var prevItem = findPrevItem(listItem);

        if (prevItem) {
          prevItem.children[0].focus();
        }

        break;

      case 'Right':
      case 'ArrowRight':
        if (isOptionGroup(option)) {
          if (activeOptionState === option) {
            listItem.children[1].children[0].children[0].focus();
          } else {
            setActiveOptionState(option);
          }
        }

        break;

      case 'Left':
      case 'ArrowLeft':
        setActiveOptionState(null);
        var parentList = event.currentTarget.parentElement.parentElement.previousElementSibling;

        if (parentList) {
          parentList.focus();
        }

        break;

      case 'Enter':
        onOptionClick(event, option);
        break;

      case 'Tab':
      case 'Escape':
        if (props.onPanelHide) {
          props.onPanelHide();
          event.preventDefault();
        }

        break;
    }

    event.preventDefault();
  };

  var findNextItem = function findNextItem(item) {
    var nextItem = item.nextElementSibling;
    return nextItem ? DomHandler.hasClass(nextItem, 'p-disabled') || !DomHandler.hasClass(nextItem, 'p-cascadeselect-item') ? findNextItem(nextItem) : nextItem : null;
  };

  var findPrevItem = function findPrevItem(item) {
    var prevItem = item.previousElementSibling;
    return prevItem ? DomHandler.hasClass(prevItem, 'p-disabled') || !DomHandler.hasClass(prevItem, 'p-cascadeselect-item') ? findPrevItem(prevItem) : prevItem : null;
  };

  var onOptionClick = function onOptionClick(event, option) {
    if (isOptionGroup(option)) {
      setActiveOptionState(function (prevActiveOption) {
        return prevActiveOption === option ? null : option;
      });

      if (props.onOptionGroupSelect) {
        props.onOptionGroupSelect({
          originalEvent: event,
          value: option
        });
      }
    } else {
      if (props.onOptionSelect) {
        props.onOptionSelect({
          originalEvent: event,
          value: getOptionValue(option)
        });
      }
    }
  };

  var onOptionGroupSelect = function onOptionGroupSelect(event) {
    props.onOptionGroupSelect && props.onOptionGroupSelect(event);
  };

  var getOptionLabel = function getOptionLabel(option) {
    return props.optionLabel ? ObjectUtils.resolveFieldData(option, props.optionLabel) : option;
  };

  var getOptionValue = function getOptionValue(option) {
    return props.optionValue ? ObjectUtils.resolveFieldData(option, props.optionValue) : option;
  };

  var getOptionGroupLabel = function getOptionGroupLabel(optionGroup) {
    return props.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel) : null;
  };

  var getOptionGroupChildren = function getOptionGroupChildren(optionGroup) {
    return ObjectUtils.resolveFieldData(optionGroup, props.optionGroupChildren[props.level]);
  };

  var isOptionGroup = function isOptionGroup(option) {
    return Object.prototype.hasOwnProperty.call(option, props.optionGroupChildren[props.level]);
  };

  var getOptionLabelToRender = function getOptionLabelToRender(option) {
    return isOptionGroup(option) ? getOptionGroupLabel(option) : getOptionLabel(option);
  };

  useMountEffect(function () {
    if (props.selectionPath && props.options && !props.dirty) {
      var activeOption = props.options.find(function (o) {
        return props.selectionPath.includes(o);
      });
      activeOption && setActiveOptionState(activeOption);
    }

    if (!props.root) {
      position();
    }
  });
  useUpdateEffect(function () {
    setActiveOptionState(null);
  }, [props.parentActive]);

  var createSubmenu = function createSubmenu(option) {
    if (isOptionGroup(option) && activeOptionState === option) {
      var options = getOptionGroupChildren(option);
      var parentActive = activeOptionState === option;
      var level = props.level + 1;
      return /*#__PURE__*/React.createElement(CascadeSelectSub, {
        options: options,
        className: "p-cascadeselect-sublist",
        selectionPath: props.selectionPath,
        optionLabel: props.optionLabel,
        optionValue: props.optionValue,
        level: level,
        onOptionSelect: onOptionSelect,
        onOptionGroupSelect: onOptionGroupSelect,
        parentActive: parentActive,
        optionGroupLabel: props.optionGroupLabel,
        optionGroupChildren: props.optionGroupChildren,
        dirty: props.dirty,
        template: props.template,
        onPanelHide: props.onPanelHide
      });
    }

    return null;
  };

  var createOption = function createOption(option, index) {
    var className = classNames('p-cascadeselect-item', {
      'p-cascadeselect-item-group': isOptionGroup(option),
      'p-cascadeselect-item-active p-highlight': activeOptionState === option
    }, option.className);
    var submenu = createSubmenu(option);
    var content = props.template ? ObjectUtils.getJSXElement(props.template, getOptionValue(option)) : /*#__PURE__*/React.createElement("span", {
      className: "p-cascadeselect-item-text"
    }, getOptionLabelToRender(option));
    var optionGroup = isOptionGroup(option) && /*#__PURE__*/React.createElement("span", {
      className: "p-cascadeselect-group-icon pi pi-angle-right"
    });
    var key = getOptionLabelToRender(option) + '_' + index;
    return /*#__PURE__*/React.createElement("li", {
      key: key,
      className: className,
      style: option.style,
      role: "none"
    }, /*#__PURE__*/React.createElement("div", {
      className: "p-cascadeselect-item-content",
      onClick: function onClick(event) {
        return onOptionClick(event, option);
      },
      tabIndex: 0,
      onKeyDown: function onKeyDown(event) {
        return _onKeyDown(event, option);
      }
    }, content, optionGroup, /*#__PURE__*/React.createElement(Ripple, null)), submenu);
  };

  var createMenu = function createMenu() {
    return props.options ? props.options.map(createOption) : null;
  };

  var className = classNames('p-cascadeselect-panel p-cascadeselect-items', props.className);
  var submenu = createMenu();
  return /*#__PURE__*/React.createElement("ul", {
    ref: elementRef,
    className: className,
    role: "listbox",
    "aria-orientation": "horizontal"
  }, submenu);
});

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var CascadeSelect = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focusedState = _React$useState2[0],
      setFocusedState = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      overlayVisibleState = _React$useState4[0],
      setOverlayVisibleState = _React$useState4[1];

  var elementRef = React.useRef(null);
  var overlayRef = React.useRef(null);
  var inputRef = React.useRef(null);
  var labelRef = React.useRef(null);
  var dirty = React.useRef(false);
  var selectionPath = React.useRef(null);

  var _useOverlayListener = useOverlayListener({
    target: elementRef,
    overlay: overlayRef,
    listener: function listener(event, _ref) {
      var valid = _ref.valid;
      valid && hide();
    },
    when: overlayVisibleState
  }),
      _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
      bindOverlayListener = _useOverlayListener2[0],
      unbindOverlayListener = _useOverlayListener2[1];

  var onOptionSelect = function onOptionSelect(event) {
    if (props.onChange) {
      props.onChange({
        originalEvent: event,
        value: event.value
      });
    }

    updateSelectionPath();
    hide();
    DomHandler.focus(inputRef.current);
  };

  var onOptionGroupSelect = function onOptionGroupSelect(event) {
    dirty.current = true;
    props.onGroupChange && props.onGroupChange(event);
  };

  var getOptionLabel = function getOptionLabel(option) {
    var label = props.optionLabel ? ObjectUtils.resolveFieldData(option, props.optionLabel) : option;
    return label || option;
  };

  var getOptionValue = function getOptionValue(option) {
    return props.optionValue ? ObjectUtils.resolveFieldData(option, props.optionValue) : option;
  };

  var getOptionGroupChildren = function getOptionGroupChildren(optionGroup, level) {
    return ObjectUtils.resolveFieldData(optionGroup, props.optionGroupChildren[level]);
  };

  var isOptionGroup = function isOptionGroup(option, level) {
    return Object.prototype.hasOwnProperty.call(option, props.optionGroupChildren[level]);
  };

  var updateSelectionPath = function updateSelectionPath() {
    var path;

    if (props.value != null && props.options) {
      var _iterator = _createForOfIteratorHelper(props.options),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var option = _step.value;
          path = findModelOptionInGroup(option, 0);

          if (path) {
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    selectionPath.current = path;
  };

  var findModelOptionInGroup = function findModelOptionInGroup(option, level) {
    if (isOptionGroup(option, level)) {
      var selectedOption;

      var _iterator2 = _createForOfIteratorHelper(getOptionGroupChildren(option, level)),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var childOption = _step2.value;
          selectedOption = findModelOptionInGroup(childOption, level + 1);

          if (selectedOption) {
            selectedOption.unshift(option);
            return selectedOption;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    } else if (ObjectUtils.equals(props.value, getOptionValue(option), props.dataKey)) {
      return [option];
    }

    return null;
  };

  var onClick = function onClick(event) {
    if (props.disabled) {
      return;
    }

    if (!overlayRef.current || !overlayRef.current.contains(event.target)) {
      DomHandler.focus(inputRef.current);
      overlayVisibleState ? hide() : show();
    }
  };

  var onInputFocus = function onInputFocus() {
    setFocusedState(true);
  };

  var onInputBlur = function onInputBlur() {
    setFocusedState(false);
  };

  var onInputKeyDown = function onInputKeyDown(event) {
    switch (event.which) {
      //down
      case 40:
        if (overlayVisibleState) {
          DomHandler.findSingle(overlayRef.current, '.p-cascadeselect-item').children[0].focus();
        } else if (event.altKey && props.options && props.options.length) {
          show();
        }

        event.preventDefault();
        break;
      //space

      case 32:
        overlayVisibleState ? hide() : show();
        event.preventDefault();
        break;
      //tab

      case 9:
        hide();
        break;
    }
  };

  var onPanelClick = function onPanelClick(event) {
    OverlayService.emit('overlay-click', {
      originalEvent: event,
      target: elementRef.current
    });
  };

  var show = function show() {
    props.onBeforeShow && props.onBeforeShow();
    setOverlayVisibleState(true);
  };

  var hide = function hide() {
    props.onBeforeHide && props.onBeforeHide();
    setOverlayVisibleState(false);
    DomHandler.focus(inputRef.current);
  };

  var onOverlayEnter = function onOverlayEnter() {
    ZIndexUtils.set('overlay', overlayRef.current, PrimeReact.autoZIndex, PrimeReact.zIndex['overlay']);
    alignOverlay();
  };

  var onOverlayEntered = function onOverlayEntered() {
    bindOverlayListener();
    props.onShow && props.onShow();
  };

  var onOverlayExit = function onOverlayExit() {
    unbindOverlayListener();
    dirty.current = false;
  };

  var onOverlayExited = function onOverlayExited() {
    ZIndexUtils.clear(overlayRef.current);
    props.onHide && props.onHide();
  };

  var alignOverlay = function alignOverlay() {
    DomHandler.alignOverlay(overlayRef.current, labelRef.current.parentElement, props.appendTo || PrimeReact.appendTo);
  };

  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      },
      getOverlay: function getOverlay() {
        return overlayRef.current;
      },
      getInput: function getInput() {
        return inputRef.current;
      },
      getLabel: function getLabel() {
        return labelRef.current;
      }
    };
  });
  React.useEffect(function () {
    ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  useUpdateEffect(function () {
    updateSelectionPath();
  }, [props.value]);
  useUnmountEffect(function () {
    ZIndexUtils.clear(overlayRef.current);
  });

  var createKeyboardHelper = function createKeyboardHelper() {
    var value = props.value ? getOptionLabel(props.value) : undefined;
    return /*#__PURE__*/React.createElement("div", {
      className: "p-hidden-accessible"
    }, /*#__PURE__*/React.createElement("input", _extends({
      ref: inputRef,
      type: "text",
      id: props.inputId,
      name: props.name,
      defaultValue: value,
      readOnly: true,
      disabled: props.disabled,
      onFocus: onInputFocus,
      onBlur: onInputBlur,
      onKeyDown: onInputKeyDown,
      tabIndex: props.tabIndex,
      "aria-haspopup": "listbox"
    }, ariaProps)));
  };

  var createLabel = function createLabel() {
    var label = props.value ? getOptionLabel(props.value) : props.placeholder || 'p-emptylabel';
    var labelClassName = classNames('p-cascadeselect-label ', {
      'p-placeholder': label === props.placeholder,
      'p-cascadeselect-label-empty': !props.value && label === 'p-emptylabel'
    });
    return /*#__PURE__*/React.createElement("span", {
      ref: labelRef,
      className: labelClassName
    }, label);
  };

  var createDropdownIcon = function createDropdownIcon() {
    var iconClassName = classNames('p-cascadeselect-trigger-icon', props.dropdownIcon);
    return /*#__PURE__*/React.createElement("div", {
      className: "p-cascadeselect-trigger",
      role: "button",
      "aria-haspopup": "listbox",
      "aria-expanded": overlayVisibleState
    }, /*#__PURE__*/React.createElement("span", {
      className: iconClassName
    }));
  };

  var createOverlay = function createOverlay() {
    var overlay = /*#__PURE__*/React.createElement(CSSTransition, {
      nodeRef: overlayRef,
      classNames: "p-connected-overlay",
      "in": overlayVisibleState,
      timeout: {
        enter: 120,
        exit: 100
      },
      options: props.transitionOptions,
      unmountOnExit: true,
      onEnter: onOverlayEnter,
      onEntered: onOverlayEntered,
      onExit: onOverlayExit,
      onExited: onOverlayExited
    }, /*#__PURE__*/React.createElement("div", {
      ref: overlayRef,
      className: "p-cascadeselect-panel p-component",
      onClick: onPanelClick
    }, /*#__PURE__*/React.createElement("div", {
      className: "p-cascadeselect-items-wrapper"
    }, /*#__PURE__*/React.createElement(CascadeSelectSub, {
      options: props.options,
      selectionPath: selectionPath.current,
      className: 'p-cascadeselect-items',
      optionLabel: props.optionLabel,
      optionValue: props.optionValue,
      level: 0,
      optionGroupLabel: props.optionGroupLabel,
      optionGroupChildren: props.optionGroupChildren,
      onOptionSelect: onOptionSelect,
      onOptionGroupSelect: onOptionGroupSelect,
      root: true,
      template: props.itemTemplate,
      onPanelHide: hide
    }))));
    return /*#__PURE__*/React.createElement(Portal, {
      element: overlay,
      appendTo: props.appendTo
    });
  };

  var createElement = function createElement() {
    var className = classNames('p-cascadeselect p-component p-inputwrapper', {
      'p-disabled': props.disabled,
      'p-focus': focusedState,
      'p-inputwrapper-filled': props.value,
      'p-inputwrapper-focus': focusedState || overlayVisibleState
    }, props.className);
    var keyboardHelper = createKeyboardHelper();
    var labelElement = createLabel();
    var dropdownIcon = createDropdownIcon();
    var overlay = createOverlay();
    return /*#__PURE__*/React.createElement("div", _extends({
      ref: elementRef,
      id: props.id,
      className: className,
      style: props.style
    }, otherProps, {
      onClick: onClick
    }), keyboardHelper, labelElement, dropdownIcon, overlay);
  };

  var otherProps = ObjectUtils.findDiffKeys(props, CascadeSelect.defaultProps);
  ObjectUtils.reduceKeys(otherProps, DomHandler.DATA_PROPS);
  var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
  var element = createElement();
  return element;
}));
CascadeSelect.displayName = 'CascadeSelect';
CascadeSelect.defaultProps = {
  __TYPE: 'CascadeSelect',
  id: null,
  inputRef: null,
  style: null,
  className: null,
  value: null,
  name: null,
  options: null,
  optionLabel: null,
  optionValue: null,
  optionGroupLabel: null,
  optionGroupChildren: null,
  placeholder: null,
  itemTemplate: null,
  disabled: false,
  dataKey: null,
  inputId: null,
  tabIndex: null,
  ariaLabelledBy: null,
  appendTo: null,
  transitionOptions: null,
  dropdownIcon: 'pi pi-chevron-down',
  onChange: null,
  onGroupChange: null,
  onBeforeShow: null,
  onBeforeHide: null,
  onShow: null,
  onHide: null
};

export { CascadeSelect };
