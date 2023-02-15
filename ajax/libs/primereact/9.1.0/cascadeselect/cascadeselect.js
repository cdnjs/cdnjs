this.primereact = this.primereact || {};
this.primereact.cascadeselect = (function (exports, React, PrimeReact, csstransition, hooks, overlayservice, portal, utils, ripple) {
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

  var CascadeSelectBase = {
    defaultProps: {
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
      breakpoint: undefined,
      inputId: null,
      tabIndex: null,
      ariaLabelledBy: null,
      appendTo: null,
      transitionOptions: null,
      dropdownIcon: 'pi pi-chevron-down',
      scrollHeight: '400px',
      onChange: null,
      onGroupChange: null,
      onBeforeShow: null,
      onBeforeHide: null,
      onShow: null,
      onHide: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, CascadeSelectBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, CascadeSelectBase.defaultProps);
    }
  };

  var CascadeSelectSub = /*#__PURE__*/React__namespace.memo(function (props) {
    var _React$useState = React__namespace.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      activeOptionState = _React$useState2[0],
      setActiveOptionState = _React$useState2[1];
    var elementRef = React__namespace.useRef(null);
    var position = function position() {
      var parentItem = elementRef.current.parentElement;
      var containerOffset = utils.DomHandler.getOffset(parentItem);
      var viewport = utils.DomHandler.getViewport();
      var sublistWidth = elementRef.current.offsetParent ? elementRef.current.offsetWidth : utils.DomHandler.getHiddenElementOuterWidth(element);
      var itemOuterWidth = utils.DomHandler.getOuterWidth(parentItem.children[0]);
      if (parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - utils.DomHandler.calculateScrollbarWidth()) {
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
      setActiveOptionState(null);
    }, [props.parentActive]);
    var createSubmenu = function createSubmenu(option) {
      if (isOptionGroup(option) && activeOptionState === option) {
        var options = getOptionGroupChildren(option);
        var parentActive = activeOptionState === option;
        var level = props.level + 1;
        return /*#__PURE__*/React__namespace.createElement(CascadeSelectSub, {
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
      var className = utils.classNames('p-cascadeselect-item', {
        'p-cascadeselect-item-group': isOptionGroup(option),
        'p-cascadeselect-item-active p-highlight': activeOptionState === option
      }, option.className);
      var submenu = createSubmenu(option);
      var content = props.template ? utils.ObjectUtils.getJSXElement(props.template, getOptionValue(option)) : /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-cascadeselect-item-text"
      }, getOptionLabelToRender(option));
      var optionGroup = isOptionGroup(option) && /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-cascadeselect-group-icon pi pi-angle-right"
      });
      var key = getOptionLabelToRender(option) + '_' + index;
      return /*#__PURE__*/React__namespace.createElement("li", {
        key: key,
        className: className,
        style: option.style,
        role: "none"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-cascadeselect-item-content",
        onClick: function onClick(event) {
          return onOptionClick(event, option);
        },
        tabIndex: 0,
        onKeyDown: function onKeyDown(event) {
          return _onKeyDown(event, option);
        }
      }, content, optionGroup, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), submenu);
    };
    var createMenu = function createMenu() {
      return props.options ? props.options.map(createOption) : null;
    };
    var className = utils.classNames('p-cascadeselect-panel p-cascadeselect-items', props.className, {
      'p-input-filled': PrimeReact__default["default"].inputStyle === 'filled',
      'p-ripple-disabled': PrimeReact__default["default"].ripple === false
    });
    var submenu = createMenu();
    return /*#__PURE__*/React__namespace.createElement("ul", {
      ref: elementRef,
      className: className,
      role: "listbox",
      "aria-orientation": "horizontal"
    }, submenu);
  });

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  var CascadeSelect = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var props = CascadeSelectBase.getProps(inProps);
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
    var onClick = function onClick(event) {
      if (props.disabled) {
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
            utils.DomHandler.findSingle(overlayRef.current, '.p-cascadeselect-item').children[0].focus();
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
      utils.ZIndexUtils.set('overlay', overlayRef.current, PrimeReact__default["default"].autoZIndex, PrimeReact__default["default"].zIndex['overlay']);
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
      utils.DomHandler.alignOverlay(overlayRef.current, labelRef.current.parentElement, props.appendTo || PrimeReact__default["default"].appendTo);
    };
    var createStyle = function createStyle() {
      if (!styleElementRef.current) {
        styleElementRef.current = utils.DomHandler.createInlineStyle(PrimeReact__default["default"].nonce);
        var selector = "".concat(attributeSelectorState, "_panel");
        var innerHTML = "\n@media screen and (max-width: ".concat(props.breakpoint, ") {\n    .p-cascadeselect-panel[").concat(selector, "] .p-cascadeselect-items-wrapper > ul {\n        max-height: ").concat(props.scrollHeight, ";\n        overflow: ").concat(props.scrollHeight ? 'auto' : '', ";\n    }\n\n    .p-cascadeselect-panel[").concat(selector, "] .p-cascadeselect-sublist {\n        position: relative;\n    }\n\n    .p-cascadeselect-panel[").concat(selector, "] .p-cascadeselect-item-active > .p-cascadeselect-sublist {\n        left: 0 !important;\n        box-shadow: none;\n        border-radius: 0;\n        padding: 0 0 0 calc(var(--inline-spacing) * 2); /* @todo */\n    }\n\n    .p-cascadeselect-panel[").concat(selector, "] .p-cascadeselect-group-icon:before {\n        content: \"\\e930\";\n    }\n}\n");
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
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-hidden-accessible"
      }, /*#__PURE__*/React__namespace.createElement("input", _extends({
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
      var labelClassName = utils.classNames('p-cascadeselect-label ', {
        'p-placeholder': label === props.placeholder,
        'p-cascadeselect-label-empty': !props.value && label === 'p-emptylabel'
      });
      return /*#__PURE__*/React__namespace.createElement("span", {
        ref: labelRef,
        className: labelClassName
      }, label);
    };
    var createDropdownIcon = function createDropdownIcon() {
      var iconClassName = utils.classNames('p-cascadeselect-trigger-icon', props.dropdownIcon);
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-cascadeselect-trigger",
        role: "button",
        "aria-haspopup": "listbox",
        "aria-expanded": overlayVisibleState
      }, /*#__PURE__*/React__namespace.createElement("span", {
        className: iconClassName
      }));
    };
    var createOverlay = function createOverlay() {
      var overlay = /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
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
      }, /*#__PURE__*/React__namespace.createElement("div", {
        ref: overlayRef,
        className: "p-cascadeselect-panel p-component",
        onClick: onPanelClick
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-cascadeselect-items-wrapper"
      }, /*#__PURE__*/React__namespace.createElement(CascadeSelectSub, {
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
      return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
        element: overlay,
        appendTo: props.appendTo
      });
    };
    var createElement = function createElement() {
      var className = utils.classNames('p-cascadeselect p-component p-inputwrapper', {
        'p-disabled': props.disabled,
        'p-focus': focusedState,
        'p-inputwrapper-filled': props.value,
        'p-inputwrapper-focus': focusedState || overlayVisibleState
      }, props.className);
      var keyboardHelper = createKeyboardHelper();
      var labelElement = createLabel();
      var dropdownIcon = createDropdownIcon();
      var overlay = createOverlay();
      return /*#__PURE__*/React__namespace.createElement("div", _extends({
        ref: elementRef,
        id: props.id,
        className: className,
        style: props.style
      }, otherProps, {
        onClick: onClick
      }), keyboardHelper, labelElement, dropdownIcon, overlay);
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

})({}, React, primereact.api, primereact.csstransition, primereact.hooks, primereact.overlayservice, primereact.portal, primereact.utils, primereact.ripple);
