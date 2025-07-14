this.primereact = this.primereact || {};
this.primereact.mention = (function (exports, React, PrimeReact, csstransition, hooks, keyfilter, tooltip, utils, componentbase, overlayservice, portal, ripple) {
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

  var InputTextareaBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'InputTextarea',
      autoResize: false,
      keyfilter: null,
      onBlur: null,
      onFocus: null,
      onBeforeInput: null,
      onInput: null,
      onKeyDown: null,
      onKeyUp: null,
      onPaste: null,
      tooltip: null,
      tooltipOptions: null,
      validateOnly: false,
      children: undefined
    }
  });

  var InputTextarea = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var props = InputTextareaBase.getProps(inProps, context);
    var elementRef = React__namespace.useRef(ref);
    var cachedScrollHeight = React__namespace.useRef(0);
    var _InputTextareaBase$se = InputTextareaBase.setMetaData({
        props: props
      }),
      ptm = _InputTextareaBase$se.ptm;
    var onFocus = function onFocus(event) {
      if (props.autoResize) {
        resize();
      }
      props.onFocus && props.onFocus(event);
    };
    var onBlur = function onBlur(event) {
      if (props.autoResize) {
        resize();
      }
      props.onBlur && props.onBlur(event);
    };
    var onKeyUp = function onKeyUp(event) {
      if (props.autoResize) {
        resize();
      }
      props.onKeyUp && props.onKeyUp(event);
    };
    var onKeyDown = function onKeyDown(event) {
      props.onKeyDown && props.onKeyDown(event);
      if (props.keyfilter) {
        keyfilter.KeyFilter.onKeyPress(event, props.keyfilter, props.validateOnly);
      }
    };
    var onBeforeInput = function onBeforeInput(event) {
      props.onBeforeInput && props.onBeforeInput(event);
      if (props.keyfilter) {
        keyfilter.KeyFilter.onBeforeInput(event, props.keyfilter, props.validateOnly);
      }
    };
    var onPaste = function onPaste(event) {
      props.onPaste && props.onPaste(event);
      if (props.keyfilter) {
        keyfilter.KeyFilter.onPaste(event, props.keyfilter, props.validateOnly);
      }
    };
    var onInput = function onInput(event) {
      var target = event.target;
      if (props.autoResize) {
        resize(utils.ObjectUtils.isEmpty(target.value));
      }
      props.onInput && props.onInput(event);
      utils.ObjectUtils.isNotEmpty(target.value) ? utils.DomHandler.addClass(target, 'p-filled') : utils.DomHandler.removeClass(target, 'p-filled');
    };
    var resize = function resize(initial) {
      var inputEl = elementRef.current;
      if (inputEl && utils.DomHandler.isVisible(inputEl)) {
        if (!cachedScrollHeight.current) {
          cachedScrollHeight.current = inputEl.scrollHeight;
          inputEl.style.overflow = 'hidden';
        }
        if (cachedScrollHeight.current !== inputEl.scrollHeight || initial) {
          inputEl.style.height = '';
          inputEl.style.height = inputEl.scrollHeight + 'px';
          if (parseFloat(inputEl.style.height) >= parseFloat(inputEl.style.maxHeight)) {
            inputEl.style.overflowY = 'scroll';
            inputEl.style.height = inputEl.style.maxHeight;
          } else {
            inputEl.style.overflow = 'hidden';
          }
          cachedScrollHeight.current = inputEl.scrollHeight;
        }
      }
    };
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(elementRef, ref);
    }, [elementRef, ref]);
    React__namespace.useEffect(function () {
      if (props.autoResize) {
        resize(true);
      }
    }, [props.autoResize]);
    var isFilled = React__namespace.useMemo(function () {
      return utils.ObjectUtils.isNotEmpty(props.value) || utils.ObjectUtils.isNotEmpty(props.defaultValue);
    }, [props.value, props.defaultValue]);
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var className = utils.classNames('p-inputtextarea p-inputtext p-component', {
      'p-disabled': props.disabled,
      'p-filled': isFilled,
      'p-inputtextarea-resizable': props.autoResize
    }, props.className);
    var rootProps = utils.mergeProps({
      ref: elementRef,
      className: className,
      onFocus: onFocus,
      onBlur: onBlur,
      onKeyUp: onKeyUp,
      onKeyDown: onKeyDown,
      onBeforeInput: onBeforeInput,
      onInput: onInput,
      onPaste: onPaste
    }, InputTextareaBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("textarea", rootProps), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip
    }, props.tooltipOptions, {
      pt: ptm('tooltip')
    })));
  }));
  InputTextarea.displayName = 'InputTextarea';

  var MentionBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'Mention',
      autoHighlight: true,
      className: null,
      delay: 0,
      field: null,
      footerTemplate: null,
      headerTemplate: null,
      id: null,
      inputClassName: null,
      inputId: null,
      inputRef: null,
      inputStyle: null,
      itemTemplate: null,
      panelClassName: null,
      panelStyle: null,
      scrollHeight: '200px',
      style: null,
      suggestions: null,
      transitionOptions: null,
      trigger: '@',
      onBlur: null,
      onChange: null,
      onFocus: null,
      onHide: null,
      onInput: null,
      onSearch: null,
      onSelect: null,
      onShow: null,
      children: undefined
    }
  });

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var Mention = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var props = MentionBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      overlayVisibleState = _React$useState2[0],
      setOverlayVisibleState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      focusedState = _React$useState4[0],
      setFocusedState = _React$useState4[1];
    var _React$useState5 = React__namespace.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      searchingState = _React$useState6[0],
      setSearchingState = _React$useState6[1];
    var _React$useState7 = React__namespace.useState(null),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      triggerState = _React$useState8[0],
      setTriggerState = _React$useState8[1];
    var elementRef = React__namespace.useRef(null);
    var overlayRef = React__namespace.useRef(null);
    var inputRef = React__namespace.useRef(props.inputRef);
    var listRef = React__namespace.useRef(null);
    var timeout = React__namespace.useRef(null);
    var _MentionBase$setMetaD = MentionBase.setMetaData({
        props: props,
        state: {
          overlayVisible: overlayVisibleState,
          focused: focusedState,
          searching: searchingState,
          trigger: triggerState
        }
      }),
      ptm = _MentionBase$setMetaD.ptm;
    var getPTOptions = function getPTOptions(item, suggestion) {
      return ptm(suggestion, {
        context: {
          trigger: triggerState ? triggerState.key : ''
        }
      });
    };
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
    var show = function show() {
      setOverlayVisibleState(true);
    };
    var hide = function hide() {
      setOverlayVisibleState(false);
      setSearchingState(false);
      setTriggerState(null);
    };
    var onOverlayEnter = function onOverlayEnter() {
      utils.ZIndexUtils.set('overlay', overlayRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, context && context.zIndex['overlay'] || PrimeReact__default["default"].zIndex['overlay']);
      alignOverlay();
    };
    var onOverlayEntering = function onOverlayEntering() {
      if (props.autoHighlight && props.suggestions && props.suggestions.length) {
        utils.DomHandler.addClass(listRef.current.firstChild, 'p-highlight');
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
      var key = triggerState.key,
        index = triggerState.index;
      var value = inputRef.current.value;
      var position = utils.DomHandler.getCursorOffset(inputRef.current, value.substring(0, index - 1), value.substring(index), key);
      overlayRef.current.style.transformOrigin = 'top';
      overlayRef.current.style.left = "calc(".concat(position.left, "px + 1rem)");
      overlayRef.current.style.top = "calc(".concat(position.top, "px + 1.2rem)");
    };
    var onPanelClick = function onPanelClick(event) {
      overlayservice.OverlayService.emit('overlay-click', {
        originalEvent: event,
        target: elementRef.current
      });
    };
    var getTrigger = function getTrigger(value, key, start) {
      if (!triggerState) {
        var triggerKey = Array.isArray(props.trigger) ? props.trigger.find(function (t) {
          return t === key;
        }) : props.trigger === key ? props.trigger : null;
        if (triggerKey) {
          return {
            key: triggerKey,
            index: start
          };
        }
        var latestSpaceIndex = value.substring(0, start).lastIndexOf(' ');
        var latestTrigger = getLatestTrigger(value, start);
        if (latestTrigger.index > latestSpaceIndex) {
          return latestTrigger;
        }
      }
      return triggerState;
    };
    var getLatestTrigger = function getLatestTrigger(value, start) {
      if (Array.isArray(props.trigger)) {
        var latestTrigger = {};
        props.trigger.forEach(function (t) {
          var index = value.substring(0, start).lastIndexOf(t);
          if (index !== -1 && (index > latestTrigger.index || !latestTrigger.index)) {
            latestTrigger = {
              key: t,
              index: index !== -1 ? index + 1 : -1
            };
          }
        });
        return latestTrigger;
      }
      var index = value.substring(0, start).lastIndexOf(props.trigger);
      return {
        key: props.trigger,
        index: index !== -1 ? index + 1 : -1
      };
    };
    var onSearch = function onSearch(event) {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      var _event$target = event.target,
        value = _event$target.value,
        selectionStart = _event$target.selectionStart;
      var key = value.substring(selectionStart - 1, selectionStart);
      if (key === ' ') {
        hide();
        return;
      }
      var currentTrigger = getTrigger(value, key, selectionStart);
      if (currentTrigger && currentTrigger.index > -1) {
        var query = value.substring(currentTrigger.index, selectionStart);
        timeout.current = setTimeout(function () {
          search(event, query, currentTrigger);
        }, props.delay);
      }
    };
    var search = function search(event, query, trigger) {
      if (props.onSearch) {
        setSearchingState(true);
        setTriggerState(trigger);
        props.onSearch({
          originalEvent: event,
          trigger: trigger.key,
          query: query
        });
      }
    };
    var selectItem = function selectItem(event, suggestion) {
      var value = inputRef.current.value;
      var selectionStart = event.target.selectionStart;
      var spaceIndex = value.indexOf(' ', triggerState.index);
      var currentText = value.substring(triggerState.index, spaceIndex > -1 ? spaceIndex : selectionStart);
      var selectedText = formatValue(suggestion).replace(/\s+/g, '');
      if (currentText.trim() !== selectedText) {
        var prevText = value.substring(0, triggerState.index);
        var nextText = value.substring(triggerState.index + currentText.length);
        inputRef.current.value = "".concat(prevText).concat(selectedText, " ").concat(nextText);
        event.target = inputRef.current;
        props.onChange && props.onChange(event);
      }
      var cursorStart = triggerState.index + selectedText.length + 1;
      inputRef.current.setSelectionRange(cursorStart, cursorStart);
      hide();
      props.onSelect && props.onSelect({
        originalEvent: event,
        suggestion: suggestion
      });
    };
    var formatValue = function formatValue(value) {
      if (value) {
        var field = Array.isArray(props.field) ? props.field[props.trigger.findIndex(function (f) {
          return f === triggerState.key;
        })] : props.field;
        return field ? utils.ObjectUtils.resolveFieldData(value, field) : value;
      }
      return '';
    };
    var onItemClick = function onItemClick(event, suggestion) {
      utils.DomHandler.focus(inputRef.current);
      selectItem(event, suggestion);
    };
    var onFocus = function onFocus(event) {
      setFocusedState(true);
      props.onFocus && props.onFocus(event);
    };
    var onBlur = function onBlur(event) {
      setFocusedState(false);
      props.onBlur && props.onBlur(event);
    };
    var onInput = function onInput(event) {
      props.onInput && props.onInput(event);
      if (event.target.value.length > 0) utils.DomHandler.addClass(elementRef.current, 'p-inputwrapper-filled');else utils.DomHandler.removeClass(elementRef.current, 'p-inputwrapper-filled');
    };
    var onKeyUp = function onKeyUp(event) {
      if (event.which === 37 || event.which === 39) {
        onSearch(event);
      }
    };
    var onChange = function onChange(event) {
      props.onChange && props.onChange(event);
      onSearch(event);
    };
    var onKeyDown = function onKeyDown(event) {
      if (overlayVisibleState) {
        var highlightItem = utils.DomHandler.findSingle(overlayRef.current, 'li.p-highlight');
        switch (event.which) {
          //down
          case 40:
            if (highlightItem) {
              var nextElement = highlightItem.nextElementSibling;
              if (nextElement) {
                utils.DomHandler.addClass(nextElement, 'p-highlight');
                utils.DomHandler.removeClass(highlightItem, 'p-highlight');
                utils.DomHandler.scrollInView(overlayRef.current, nextElement);
              }
            } else {
              highlightItem = utils.DomHandler.findSingle(overlayRef.current, 'li');
              if (highlightItem) {
                utils.DomHandler.addClass(highlightItem, 'p-highlight');
              }
            }
            event.preventDefault();
            break;

          //up
          case 38:
            if (highlightItem) {
              var previousElement = highlightItem.previousElementSibling;
              if (previousElement) {
                utils.DomHandler.addClass(previousElement, 'p-highlight');
                utils.DomHandler.removeClass(highlightItem, 'p-highlight');
                utils.DomHandler.scrollInView(overlayRef.current, previousElement);
              }
            }
            event.preventDefault();
            break;

          //backspace
          case 8:
            var _event$target2 = event.target,
              value = _event$target2.value,
              selectionStart = _event$target2.selectionStart;
            var key = value.substring(selectionStart - 1, selectionStart);
            if (key === triggerState.key) {
              hide();
            }
            break;

          //enter
          case 13:
            if (highlightItem) {
              selectItem(event, props.suggestions[utils.DomHandler.index(highlightItem)]);
            }
            event.preventDefault();
            break;

          //escape
          case 27:
            hide();
            event.preventDefault();
            break;
        }
      }
    };
    var currentValue = inputRef.current && inputRef.current.value;
    var isFilled = React__namespace.useMemo(function () {
      return utils.ObjectUtils.isNotEmpty(props.value) || utils.ObjectUtils.isNotEmpty(props.defaultValue) || utils.ObjectUtils.isNotEmpty(currentValue);
    }, [props.value, props.defaultValue, currentValue]);
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
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
        }
      };
    });
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(inputRef, props.inputRef);
    }, [inputRef, props.inputRef]);
    hooks.useUpdateEffect(function () {
      if (searchingState) {
        props.suggestions && props.suggestions.length ? show() : hide();
        overlayVisibleState && alignOverlay();
        setSearchingState(false);
      }
    }, [props.suggestions]);
    hooks.useUpdateEffect(function () {
      if (!isFilled && utils.DomHandler.hasClass(elementRef.current, 'p-inputwrapper-filled')) {
        utils.DomHandler.removeClass(elementRef.current, 'p-inputwrapper-filled');
      }
    }, [isFilled]);
    hooks.useUnmountEffect(function () {
      utils.ZIndexUtils.clear(overlayRef.current);
    });
    var createItem = function createItem(suggestion, index) {
      var key = index + '_item';
      var content = props.itemTemplate ? utils.ObjectUtils.getJSXElement(props.itemTemplate, suggestion, {
        trigger: triggerState ? triggerState.key : '',
        index: index
      }) : formatValue(suggestion);
      var itemProps = utils.mergeProps({
        key: key,
        className: 'p-mention-item',
        onClick: function onClick(e) {
          return onItemClick(e, suggestion);
        }
      }, getPTOptions(suggestion, 'item'));
      return /*#__PURE__*/React__namespace.createElement("li", itemProps, content, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    };
    var createList = function createList() {
      var itemsProps = utils.mergeProps({
        ref: listRef,
        className: 'p-mention-items'
      }, ptm('items'));
      if (props.suggestions) {
        var items = props.suggestions.map(createItem);
        return /*#__PURE__*/React__namespace.createElement("ul", itemsProps, items);
      }
      return null;
    };
    var createPanel = function createPanel() {
      var panelClassName = utils.classNames('p-mention-panel p-component', props.panelClassName);
      var panelStyle = _objectSpread({
        maxHeight: props.scrollHeight
      }, props.panelStyle);
      var header = utils.ObjectUtils.getJSXElement(props.headerTemplate, props);
      var footer = utils.ObjectUtils.getJSXElement(props.footerTemplate, props);
      var list = createList();
      var panelProps = utils.mergeProps({
        ref: overlayRef,
        className: panelClassName,
        style: panelStyle,
        onClick: onPanelClick
      }, ptm('panel'));
      var panel = /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
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
        onEntering: onOverlayEntering,
        onEntered: onOverlayEntered,
        onExit: onOverlayExit,
        onExited: onOverlayExited
      }, /*#__PURE__*/React__namespace.createElement("div", panelProps, header, list, footer));
      return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
        element: panel,
        appendTo: "self"
      });
    };
    var className = utils.classNames('p-mention p-component p-inputwrapper', {
      'p-inputwrapper-filled': isFilled,
      'p-inputwrapper-focus': focusedState
    }, props.className);
    var inputClassName = utils.classNames('p-mention-input', props.inputClassName);
    var inputProps = MentionBase.getOtherProps(props);
    var panel = createPanel();
    var inputMentionProps = utils.mergeProps(_objectSpread(_objectSpread({
      ref: inputRef,
      id: props.inputId,
      className: inputClassName,
      style: props.inputStyle
    }, inputProps), {}, {
      onFocus: onFocus,
      onBlur: onBlur,
      onKeyDown: onKeyDown,
      onInput: onInput,
      onKeyUp: onKeyUp,
      onChange: onChange
    }), ptm('input'));
    var rootProps = utils.mergeProps({
      ref: elementRef,
      id: props.id,
      className: className,
      style: props.style
    }, MentionBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement(InputTextarea, inputMentionProps), panel);
  }));
  Mention.displayName = 'Mention';

  exports.Mention = Mention;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.csstransition, primereact.hooks, primereact.keyfilter, primereact.tooltip, primereact.utils, primereact.componentbase, primereact.overlayservice, primereact.portal, primereact.ripple);
