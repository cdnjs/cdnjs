this.primereact = this.primereact || {};
this.primereact.cascadeselect = (function (exports, React, PrimeReact, componentbase, csstransition, hooks, chevrondown, spinner, overlayservice, portal, utils, angleright, ripple) {
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

  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
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

  var classes = {
    root: function root(_ref) {
      var props = _ref.props,
        focusedState = _ref.focusedState,
        overlayVisibleState = _ref.overlayVisibleState,
        context = _ref.context;
      return utils.classNames('p-cascadeselect p-component p-inputwrapper', {
        'p-disabled': props.disabled,
        'p-invalid': props.invalid,
        'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled',
        'p-focus': focusedState,
        'p-inputwrapper-filled': props.value,
        'p-inputwrapper-focus': focusedState || overlayVisibleState
      });
    },
    label: function label(_ref2) {
      var props = _ref2.props,
        _label = _ref2.label;
      return utils.classNames('p-cascadeselect-label ', {
        'p-placeholder': _label === props.placeholder,
        'p-cascadeselect-label-empty': !props.value && _label === 'p-emptylabel'
      });
    },
    list: 'p-cascadeselect-panel p-cascadeselect-items',
    sublistWrapper: 'p-cascadeselect-sublist-wrapper',
    sublist: 'p-cascadeselect-panel p-cascadeselect-items p-cascadeselect-sublist',
    item: function item(_ref3) {
      _ref3.option;
        var isGroup = _ref3.isGroup,
        isSelected = _ref3.isSelected;
      return utils.classNames('p-cascadeselect-item', {
        'p-cascadeselect-item-group': isGroup,
        'p-cascadeselect-item-active p-highlight': isSelected
      });
    },
    dropdownIcon: 'p-cascadeselect-trigger-icon',
    loadingIcon: 'p-cascadeselect-trigger-icon',
    dropdownButton: 'p-cascadeselect-trigger',
    loadingButton: 'p-cascadeselect-trigger',
    wrapper: 'p-cascadeselect-items-wrapper',
    panel: 'p-cascadeselect-panel p-component',
    content: 'p-cascadeselect-item-content',
    optionGroupIcon: 'p-cascadeselect-group-icon',
    text: 'p-cascadeselect-item-text',
    transition: 'p-connected-overlay'
  };
  var styles = "\n@layer primereact {\n    .p-cascadeselect {\n        display: inline-flex;\n        cursor: pointer;\n        position: relative;\n        user-select: none;\n    }\n    \n    .p-cascadeselect-trigger {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n    }\n    \n    .p-cascadeselect-label {\n        display: block;\n        white-space: nowrap;\n        overflow: hidden;\n        flex: 1 1 auto;\n        width: 1%;\n        text-overflow: ellipsis;\n        cursor: pointer;\n    }\n    \n    .p-cascadeselect-label-empty {\n        overflow: hidden;\n        visibility: hidden;\n    }\n    \n    .p-cascadeselect .p-cascadeselect-panel {\n        min-width: 100%;\n    }\n    \n    .p-cascadeselect-item {\n        cursor: pointer;\n        font-weight: normal;\n        white-space: nowrap;\n    }\n    \n    .p-cascadeselect-item-content {\n        display: flex;\n        align-items: center;\n        overflow: hidden;\n        position: relative;\n    }\n    \n    .p-cascadeselect-group-icon {\n        margin-left: auto;\n    }\n    \n    .p-cascadeselect-items {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n        min-width: 100%;\n    }\n    \n    .p-fluid .p-cascadeselect {\n        display: flex;\n    }\n    \n    .p-fluid .p-cascadeselect .p-cascadeselect-label {\n        width: 1%;\n    }\n    \n    .p-cascadeselect-sublist-wrapper {\n        position: absolute;\n        min-width: 100%;\n        z-index: 1;\n        display: none;\n    }\n    \n    .p-cascadeselect-item-active {\n        overflow: visible;\n    }\n    \n    .p-cascadeselect-item-active > .p-cascadeselect-sublist-wrapper {\n        display: block;\n        left: 100%;\n        top: 0;\n    }\n}\n";
  var CascadeSelectBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'CascadeSelect',
      appendTo: null,
      ariaLabelledBy: null,
      autoFocus: false,
      breakpoint: undefined,
      className: null,
      dataKey: null,
      disabled: false,
      loadingIcon: null,
      dropdownIcon: null,
      id: null,
      inputId: null,
      inputRef: null,
      invalid: false,
      variant: null,
      itemTemplate: null,
      name: null,
      onBeforeHide: null,
      onBeforeShow: null,
      onChange: null,
      onGroupChange: null,
      onHide: null,
      onShow: null,
      optionGroupChildren: null,
      optionGroupIcon: null,
      optionGroupLabel: null,
      optionLabel: null,
      optionValue: null,
      options: null,
      placeholder: null,
      scrollHeight: '400px',
      style: null,
      tabIndex: null,
      transitionOptions: null,
      value: null,
      children: undefined
    },
    css: {
      classes: classes,
      styles: styles
    }
  });

  function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var CascadeSelectSub = /*#__PURE__*/React__namespace.memo(function (props) {
    var mergeProps = hooks.useMergeProps();
    var _React$useState = React__namespace.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      activeOptionState = _React$useState2[0],
      setActiveOptionState = _React$useState2[1];
    var elementRef = React__namespace.useRef(null);
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var ptm = props.ptm,
      cx = props.cx;
    var getPTOptions = function getPTOptions(key, options) {
      return ptm(key, {
        hostName: props.hostName,
        state: _objectSpread$1({}, options)
      });
    };
    var position = function position() {
      var parentItem = elementRef.current.parentElement.parentElement;
      var containerOffset = utils.DomHandler.getOffset(parentItem);
      var viewport = utils.DomHandler.getViewport();
      var sublistWidth = elementRef.current.offsetParent ? elementRef.current.offsetWidth : utils.DomHandler.getHiddenElementOuterWidth(element);
      var itemOuterWidth = utils.DomHandler.getOuterWidth(parentItem.children[0]);
      if (parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - utils.DomHandler.calculateScrollbarWidth()) {
        elementRef.current.parentElement.style.left = '-100%';
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
      return nextItem ? utils.DomHandler.hasClass(nextItem, 'p-disabled') || !utils.DomHandler.hasClass(nextItem, 'p-cascadeselect-item') ? findNextItem(nextItem) : nextItem : null;
    };
    var findPrevItem = function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      return prevItem ? utils.DomHandler.hasClass(prevItem, 'p-disabled') || !utils.DomHandler.hasClass(prevItem, 'p-cascadeselect-item') ? findPrevItem(prevItem) : prevItem : null;
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
      } else if (props.onOptionSelect) {
        props.onOptionSelect({
          originalEvent: event,
          value: getOptionValue(option)
        });
      }
    };
    var onOptionGroupSelect = function onOptionGroupSelect(event) {
      props.onOptionGroupSelect && props.onOptionGroupSelect(event);
    };
    var getOptionLabel = function getOptionLabel(option) {
      return props.optionLabel ? utils.ObjectUtils.resolveFieldData(option, props.optionLabel) : option;
    };
    var getOptionValue = function getOptionValue(option) {
      return props.optionValue ? utils.ObjectUtils.resolveFieldData(option, props.optionValue) : option;
    };
    var getOptionGroupLabel = function getOptionGroupLabel(optionGroup) {
      return props.optionGroupLabel ? utils.ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel) : null;
    };
    var getOptionGroupChildren = function getOptionGroupChildren(optionGroup) {
      return utils.ObjectUtils.resolveFieldData(optionGroup, props.optionGroupChildren[props.level]);
    };
    var isOptionGroup = function isOptionGroup(option) {
      return Object.prototype.hasOwnProperty.call(option, props.optionGroupChildren[props.level]);
    };
    var getOptionLabelToRender = function getOptionLabelToRender(option) {
      return isOptionGroup(option) ? getOptionGroupLabel(option) : getOptionLabel(option);
    };
    hooks.useMountEffect(function () {
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
    hooks.useUpdateEffect(function () {
      if (!props.parentActive) {
        setActiveOptionState(null);
      }
    }, [props.parentActive]);
    var createSubmenu = function createSubmenu(option) {
      if (isOptionGroup(option) && activeOptionState === option) {
        var options = getOptionGroupChildren(option);
        var parentActive = activeOptionState === option;
        var level = props.level + 1;
        return /*#__PURE__*/React__namespace.createElement(CascadeSelectSub, {
          hostName: props.hostName,
          options: options,
          className: cx('sublist'),
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
          onPanelHide: props.onPanelHide,
          ptm: ptm,
          cx: cx
        });
      }
      return null;
    };
    var createOption = function createOption(option, index) {
      var submenu = createSubmenu(option);
      var textProps = mergeProps({
        className: cx('text')
      }, getPTOptions('text'));
      var content = props.template ? utils.ObjectUtils.getJSXElement(props.template, getOptionValue(option)) : /*#__PURE__*/React__namespace.createElement("span", textProps, getOptionLabelToRender(option));
      var optionGroupIconProps = mergeProps({
        className: cx('optionGroupIcon')
      }, getPTOptions('optionGroupIcon'));
      var icon = props.optionGroupIcon || /*#__PURE__*/React__namespace.createElement(angleright.AngleRightIcon, optionGroupIconProps);
      var optionGroup = isOptionGroup(option) && utils.IconUtils.getJSXIcon(icon, _objectSpread$1({}, optionGroupIconProps), {
        props: props
      });
      var key = getOptionLabelToRender(option) + '_' + index;
      var contentProps = mergeProps({
        className: cx('content'),
        onClick: function onClick(event) {
          return onOptionClick(event, option);
        },
        tabIndex: 0,
        onKeyDown: function onKeyDown(event) {
          return _onKeyDown(event, option);
        }
      }, getPTOptions('content'));
      var isSelected = activeOptionState === option;
      var isGroup = isOptionGroup(option);
      var itemProps = mergeProps({
        className: utils.classNames(option.className, cx('item', {
          option: option,
          isGroup: isGroup,
          isSelected: isSelected
        })),
        style: option.style,
        role: 'none',
        'data-p-item-group': isGroup,
        'data-p-highlight': isSelected
      }, getPTOptions('item', {
        selected: isSelected,
        group: isGroup
      }));
      return /*#__PURE__*/React__namespace.createElement("li", _extends({
        key: key
      }, itemProps), /*#__PURE__*/React__namespace.createElement("div", contentProps, content, optionGroup, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), submenu);
    };
    var createMenu = function createMenu() {
      return props.options ? props.options.map(createOption) : null;
    };
    var createList = function createList() {
      var listProps = mergeProps({
        ref: elementRef,
        className: cx(props.level === 0 ? 'list' : 'sublist', {
          context: context
        }),
        role: 'listbox',
        'aria-orientation': 'horizontal'
      }, props.level === 0 ? getPTOptions('list') : getPTOptions('sublist'));
      var submenu = createMenu();
      return /*#__PURE__*/React__namespace.createElement("ul", listProps, submenu);
    };
    var createElement = function createElement() {
      var list = createList();
      var listWrapperProps = mergeProps({
        className: cx('sublistWrapper')
      }, getPTOptions('sublistWrapper'));
      return props.level === 0 ? list : /*#__PURE__*/React__namespace.createElement("div", listWrapperProps, list);
    };
    var element = createElement();
    return element;
  });

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var CascadeSelect = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var props = CascadeSelectBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focusedState = _React$useState2[0],
      setFocusedState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      overlayVisibleState = _React$useState4[0],
      setOverlayVisibleState = _React$useState4[1];
    var _React$useState5 = React__namespace.useState(null),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      attributeSelectorState = _React$useState6[0],
      setAttributeSelectorState = _React$useState6[1];
    var _CascadeSelectBase$se = CascadeSelectBase.setMetaData({
        props: props,
        state: {
          focused: focusedState,
          overlayVisible: overlayVisibleState,
          attributeSelector: attributeSelectorState
        },
        context: _objectSpread({}, context)
      }),
      ptm = _CascadeSelectBase$se.ptm,
      cx = _CascadeSelectBase$se.cx,
      isUnstyled = _CascadeSelectBase$se.isUnstyled;
    componentbase.useHandleStyle(CascadeSelectBase.css.styles, isUnstyled, {
      name: 'cascadeselect'
    });
    var elementRef = React__namespace.useRef(null);
    var overlayRef = React__namespace.useRef(null);
    var inputRef = React__namespace.useRef(null);
    var labelRef = React__namespace.useRef(null);
    var styleElementRef = React__namespace.useRef(null);
    var dirty = React__namespace.useRef(false);
    var selectionPath = React__namespace.useRef(null);
    var _useOverlayListener = hooks.useOverlayListener({
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
    var cascadeSelectOverlayDisplayOrder = hooks.useDisplayOrder('cascade-select', overlayVisibleState);
    hooks.useGlobalOnEscapeKey({
      callback: function callback() {
        hide();
      },
      when: overlayVisibleState && cascadeSelectOverlayDisplayOrder,
      priority: [hooks.ESC_KEY_HANDLING_PRIORITIES.CASCADE_SELECT, cascadeSelectOverlayDisplayOrder]
    });
    var onOptionSelect = function onOptionSelect(event) {
      if (props.onChange) {
        props.onChange({
          originalEvent: event,
          value: event.value
        });
      }
      updateSelectionPath();
      hide();
      utils.DomHandler.focus(inputRef.current);
    };
    var onOptionGroupSelect = function onOptionGroupSelect(event) {
      dirty.current = true;
      props.onGroupChange && props.onGroupChange(event);
    };
    var getOptionLabel = function getOptionLabel(option) {
      var label = props.optionLabel ? utils.ObjectUtils.resolveFieldData(option, props.optionLabel) : option;
      return label || option;
    };
    var getOptionValue = function getOptionValue(option) {
      return props.optionValue ? utils.ObjectUtils.resolveFieldData(option, props.optionValue) : option;
    };
    var getOptionGroupChildren = function getOptionGroupChildren(optionGroup, level) {
      return utils.ObjectUtils.resolveFieldData(optionGroup, props.optionGroupChildren[level]);
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
      } else if (utils.ObjectUtils.equals(props.value, getOptionValue(option), props.dataKey)) {
        return [option];
      }
      return null;
    };
    var _onClick = function onClick(event) {
      if (props.disabled || props.loading) {
        return;
      }
      if (!overlayRef.current || !overlayRef.current.contains(event.target)) {
        utils.DomHandler.focus(inputRef.current);
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
            utils.DomHandler.findSingle(overlayRef.current, '[data-pc-section="item"]').children[0].focus();
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
      overlayservice.OverlayService.emit('overlay-click', {
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
      utils.DomHandler.focus(inputRef.current);
    };
    var onOverlayEnter = function onOverlayEnter() {
      utils.ZIndexUtils.set('overlay', overlayRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, context && context.zIndex.overlay || PrimeReact__default["default"].zIndex.overlay);
      utils.DomHandler.addStyles(overlayRef.current, {
        position: 'absolute',
        top: '0',
        left: '0'
      });
      alignOverlay();
      if (attributeSelectorState && props.breakpoint) {
        overlayRef.current.setAttribute(attributeSelectorState + '_panel', '');
        createStyle();
      }
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
      utils.ZIndexUtils.clear(overlayRef.current);
      props.onHide && props.onHide();
      destroyStyle();
    };
    var alignOverlay = function alignOverlay() {
      utils.DomHandler.alignOverlay(overlayRef.current, labelRef.current.parentElement, props.appendTo || context && context.appendTo || PrimeReact__default["default"].appendTo);
    };
    var createStyle = function createStyle() {
      if (!styleElementRef.current) {
        styleElementRef.current = utils.DomHandler.createInlineStyle(context && context.nonce || PrimeReact__default["default"].nonce, context && context.styleContainer);
        var selector = "".concat(attributeSelectorState, "_panel");
        var innerHTML = "\n@media screen and (max-width: ".concat(props.breakpoint, ") {\n    .p-cascadeselect-panel[").concat(selector, "] .p-cascadeselect-items-wrapper > ul {\n        max-height: ").concat(props.scrollHeight, ";\n        overflow: ").concat(props.scrollHeight ? 'auto' : '', ";\n    }\n\n    .p-cascadeselect-panel[").concat(selector, "] .p-cascadeselect-sublist-wrapper {\n        position:relative;\n        left:0 !important;\n    }\n\n    .p-cascadeselect-panel[").concat(selector, "] .p-cascadeselect-sublist {\n        overflow: hidden !important;\n    }\n\n    .p-cascadeselect-panel[").concat(selector, "] .p-cascadeselect-item-active  .p-cascadeselect-sublist {\n        left: 0;\n        box-shadow: none;\n        border-radius: 0;\n        padding: 0 0 0 calc(var(--inline-spacing) * 2); /* @todo */\n    }\n\n    .p-cascadeselect-panel[").concat(selector, "] .p-cascadeselect-group-icon:before {\n        content: \"\\e930\";\n    }\n}\n");
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
        },
        getOverlay: function getOverlay() {
          return overlayRef.current;
        },
        getInput: function getInput() {
          return inputRef.current;
        },
        getLabel: function getLabel() {
          return labelRef.current;
        },
        focus: function focus() {
          return utils.DomHandler.focus(inputRef.current);
        }
      };
    });
    hooks.useMountEffect(function () {
      if (props.breakpoint) {
        !attributeSelectorState && setAttributeSelectorState(utils.UniqueComponentId());
      }
      if (props.autoFocus) {
        utils.DomHandler.focus(inputRef.current, props.autoFocus);
      }
      alignOverlay();
    });
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(inputRef, props.inputRef);
    }, [inputRef, props.inputRef]);
    hooks.useUpdateEffect(function () {
      updateSelectionPath();
    }, [props.value]);
    hooks.useUnmountEffect(function () {
      utils.ZIndexUtils.clear(overlayRef.current);
    });
    var createKeyboardHelper = function createKeyboardHelper() {
      var value = props.value ? getOptionLabel(props.value) : undefined;
      var hiddenSelectedMessageProps = mergeProps({
        className: 'p-hidden-accessible'
      }, ptm('hiddenSelectedMessage'));
      var inputProps = mergeProps(_objectSpread({
        ref: inputRef,
        type: 'text',
        id: props.inputId,
        name: props.name,
        defaultValue: value,
        readOnly: true,
        disabled: props.disabled,
        onFocus: onInputFocus,
        onBlur: onInputBlur,
        onKeyDown: function onKeyDown(e) {
          return onInputKeyDown(e);
        },
        tabIndex: props.tabIndex,
        'aria-haspopup': 'listbox'
      }, ariaProps), ptm('input'));
      return /*#__PURE__*/React__namespace.createElement("div", hiddenSelectedMessageProps, /*#__PURE__*/React__namespace.createElement("input", inputProps));
    };
    var createLabel = function createLabel() {
      var label = props.value ? getOptionLabel(props.value) : props.placeholder || 'p-emptylabel';
      var labelProps = mergeProps({
        ref: labelRef,
        className: cx('label', {
          label: label
        })
      }, ptm('label', {
        context: _objectSpread({
          label: label
        }, context)
      }));
      return /*#__PURE__*/React__namespace.createElement("span", labelProps, label);
    };
    var createLoadingIcon = function createLoadingIcon() {
      var loadingIconProps = mergeProps({
        className: cx('loadingIcon')
      }, ptm('loadingIcon'));
      var icon = props.loadingIcon || /*#__PURE__*/React__namespace.createElement(spinner.SpinnerIcon, {
        spin: true
      });
      var loadingIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, loadingIconProps), {
        props: props
      });
      var loadingButtonProps = mergeProps({
        className: cx('loadingButton'),
        role: 'button',
        'aria-haspopup': 'listbox',
        'aria-expanded': overlayVisibleState
      }, ptm('dropdownButton'));
      return /*#__PURE__*/React__namespace.createElement("div", loadingButtonProps, loadingIcon);
    };
    var createDropdownIcon = function createDropdownIcon() {
      var dropdownIconProps = mergeProps({
        className: cx('dropdownIcon')
      }, ptm('dropdownIcon'));
      var icon = props.dropdownIcon || /*#__PURE__*/React__namespace.createElement(chevrondown.ChevronDownIcon, dropdownIconProps);
      var dropdownIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, dropdownIconProps), {
        props: props
      });
      var dropdownButtonProps = mergeProps({
        className: cx('dropdownButton'),
        role: 'button',
        'aria-haspopup': 'listbox',
        'aria-expanded': overlayVisibleState
      }, ptm('dropdownButton'));
      return /*#__PURE__*/React__namespace.createElement("div", dropdownButtonProps, dropdownIcon);
    };
    var wrapperProps = mergeProps({
      className: cx('wrapper')
    }, ptm('wrapper'));
    var panelProps = mergeProps({
      ref: overlayRef,
      className: cx('panel'),
      onClick: function onClick(e) {
        return onPanelClick(e);
      }
    }, ptm('panel'));
    var createOverlay = function createOverlay() {
      var transitionProps = mergeProps({
        classNames: cx('transition'),
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
      }, ptm('transition'));
      var overlay = /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, _extends({
        nodeRef: overlayRef
      }, transitionProps), /*#__PURE__*/React__namespace.createElement("div", panelProps, /*#__PURE__*/React__namespace.createElement("div", wrapperProps, /*#__PURE__*/React__namespace.createElement(CascadeSelectSub, {
        hostName: "CascadeSelect",
        options: props.options,
        selectionPath: selectionPath.current,
        optionGroupIcon: props.optionGroupIcon,
        optionLabel: props.optionLabel,
        optionValue: props.optionValue,
        parentActive: props.value != null,
        level: 0,
        optionGroupLabel: props.optionGroupLabel,
        optionGroupChildren: props.optionGroupChildren,
        onOptionSelect: onOptionSelect,
        onOptionGroupSelect: onOptionGroupSelect,
        root: true,
        template: props.itemTemplate,
        onPanelHide: hide,
        ptm: ptm,
        cx: cx
      }))));
      return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
        element: overlay,
        appendTo: props.appendTo
      });
    };
    var createElement = function createElement() {
      var keyboardHelper = createKeyboardHelper();
      var labelElement = createLabel();
      var dropdownIcon = props.loading ? createLoadingIcon() : createDropdownIcon();
      var overlay = createOverlay();
      var rootProps = mergeProps({
        id: props.id,
        ref: elementRef,
        className: utils.classNames(props.className, cx('root', {
          focusedState: focusedState,
          overlayVisibleState: overlayVisibleState,
          context: context
        })),
        style: props.style,
        onClick: function onClick(e) {
          return _onClick(e);
        }
      }, otherProps, ptm('root'));
      return /*#__PURE__*/React__namespace.createElement("div", rootProps, keyboardHelper, labelElement, dropdownIcon, overlay);
    };
    var otherProps = CascadeSelectBase.getOtherProps(props);
    utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.DATA_PROPS);
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var element = createElement();
    return element;
  }));
  CascadeSelect.displayName = 'CascadeSelect';

  exports.CascadeSelect = CascadeSelect;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.csstransition, primereact.hooks, primereact.icons.chevrondown, primereact.icons.spinner, primereact.overlayservice, primereact.portal, primereact.utils, primereact.icons.angleright, primereact.ripple);
