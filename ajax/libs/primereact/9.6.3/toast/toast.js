this.primereact = this.primereact || {};
this.primereact.toast = (function (exports, React, reactTransitionGroup, PrimeReact$1, csstransition, hooks, portal, utils, componentbase, check, exclamationtriangle, infocircle, times, timescircle, ripple) {
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
  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact$1);

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

  var ToastBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'Toast',
      id: null,
      className: null,
      style: null,
      baseZIndex: 0,
      position: 'top-right',
      transitionOptions: null,
      appendTo: 'self',
      onClick: null,
      onRemove: null,
      onShow: null,
      onHide: null,
      onMouseEnter: null,
      onMouseLeave: null,
      children: undefined
    }
  });

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
    (_linkElement$parentNo = linkElement.parentNode) === null || _linkElement$parentNo === void 0 ? void 0 : _linkElement$parentNo.insertBefore(cloneLinkElement, linkElement.nextSibling);
  });

  var locales = {
    en: {
      startsWith: 'Starts with',
      contains: 'Contains',
      notContains: 'Not contains',
      endsWith: 'Ends with',
      equals: 'Equals',
      notEquals: 'Not equals',
      noFilter: 'No Filter',
      filter: 'Filter',
      lt: 'Less than',
      lte: 'Less than or equal to',
      gt: 'Greater than',
      gte: 'Greater than or equal to',
      dateIs: 'Date is',
      dateIsNot: 'Date is not',
      dateBefore: 'Date is before',
      dateAfter: 'Date is after',
      custom: 'Custom',
      clear: 'Clear',
      close: 'Close',
      apply: 'Apply',
      matchAll: 'Match All',
      matchAny: 'Match Any',
      addRule: 'Add Rule',
      removeRule: 'Remove Rule',
      accept: 'Yes',
      reject: 'No',
      choose: 'Choose',
      upload: 'Upload',
      cancel: 'Cancel',
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Today',
      weekHeader: 'Wk',
      firstDayOfWeek: 0,
      dateFormat: 'mm/dd/yy',
      weak: 'Weak',
      medium: 'Medium',
      strong: 'Strong',
      passwordPrompt: 'Enter a password',
      emptyFilterMessage: 'No available options',
      emptyMessage: 'No results found',
      aria: {
        trueLabel: 'True',
        falseLabel: 'False',
        nullLabel: 'Not Selected',
        star: '1 star',
        stars: '{star} stars',
        selectAll: 'All items selected',
        unselectAll: 'All items unselected',
        close: 'Close',
        previous: 'Previous',
        next: 'Next',
        navigation: 'Navigation',
        scrollTop: 'Scroll Top',
        moveTop: 'Move Top',
        moveUp: 'Move Up',
        moveDown: 'Move Down',
        moveBottom: 'Move Bottom',
        moveToTarget: 'Move to Target',
        moveToSource: 'Move to Source',
        moveAllToTarget: 'Move All to Target',
        moveAllToSource: 'Move All to Source',
        pageLabel: 'Page',
        firstPageLabel: 'First Page',
        lastPageLabel: 'Last Page',
        nextPageLabel: 'Next Page',
        previousPageLabel: 'Previous Page',
        rowsPerPageLabel: 'Rows per page',
        jumpToPageDropdownLabel: 'Jump to Page Dropdown',
        jumpToPageInputLabel: 'Jump to Page Input',
        selectRow: 'Row Selected',
        unselectRow: 'Row Unselected',
        expandRow: 'Row Expanded',
        collapseRow: 'Row Collapsed',
        showFilterMenu: 'Show Filter Menu',
        hideFilterMenu: 'Hide Filter Menu',
        filterOperator: 'Filter Operator',
        filterConstraint: 'Filter Constraint',
        editRow: 'Row Edit',
        saveEdit: 'Save Edit',
        cancelEdit: 'Cancel Edit',
        listView: 'List View',
        gridView: 'Grid View',
        slide: 'Slide',
        slideNumber: '{slideNumber}',
        zoomImage: 'Zoom Image',
        zoomIn: 'Zoom In',
        zoomOut: 'Zoom Out',
        rotateRight: 'Rotate Right',
        rotateLeft: 'Rotate Left',
        selectLabel: 'Select',
        unselectLabel: 'Unselect',
        expandLabel: 'Expand',
        collapseLabel: 'Collapse'
      }
    }
  };
  function localeOption(key, locale) {
    var _locale = locale || PrimeReact.locale;
    try {
      return localeOptions(_locale)[key];
    } catch (error) {
      throw new Error("The ".concat(key, " option is not found in the current locale('").concat(_locale, "')."));
    }
  }
  function localeOptions(locale) {
    var _locale = locale || PrimeReact.locale;
    return locales[_locale];
  }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var ToastMessage = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var messageInfo = props.messageInfo,
      parentMetaData = props.metaData,
      _props$ptCallbacks = props.ptCallbacks,
      ptm = _props$ptCallbacks.ptm,
      ptmo = _props$ptCallbacks.ptmo,
      index = props.index;
    var _messageInfo$message = messageInfo.message,
      severity = _messageInfo$message.severity,
      content = _messageInfo$message.content,
      summary = _messageInfo$message.summary,
      detail = _messageInfo$message.detail,
      closable = _messageInfo$message.closable,
      life = _messageInfo$message.life,
      sticky = _messageInfo$message.sticky,
      _className = _messageInfo$message.className,
      style = _messageInfo$message.style,
      _contentClassName = _messageInfo$message.contentClassName,
      contentStyle = _messageInfo$message.contentStyle,
      _icon = _messageInfo$message.icon,
      _closeIcon = _messageInfo$message.closeIcon,
      pt = _messageInfo$message.pt;
    var params = {
      index: index
    };
    var parentParams = _objectSpread(_objectSpread({}, parentMetaData), params);
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focused = _React$useState2[0],
      setFocused = _React$useState2[1];
    var _useTimeout = hooks.useTimeout(function () {
        onClose();
      }, life || 3000, !sticky && !focused),
      _useTimeout2 = _slicedToArray(_useTimeout, 1),
      clearTimer = _useTimeout2[0];
    var onClose = function onClose() {
      clearTimer();
      props.onClose && props.onClose(messageInfo);
    };
    var onClick = function onClick(event) {
      if (props.onClick && !(utils.DomHandler.hasClass(event.target, 'p-toast-icon-close') || utils.DomHandler.hasClass(event.target, 'p-toast-icon-close-icon'))) {
        props.onClick(messageInfo.message);
      }
    };
    var onMouseEnter = function onMouseEnter(event) {
      props.onMouseEnter && props.onMouseEnter(event);

      // do not continue if the user has canceled the event
      if (event.defaultPrevented) {
        return;
      }

      // stop timer while user has focused message
      if (!sticky) {
        clearTimer();
        setFocused(true);
      }
    };
    var onMouseLeave = function onMouseLeave(event) {
      props.onMouseLeave && props.onMouseLeave(event);

      // do not continue if the user has canceled the event
      if (event.defaultPrevented) {
        return;
      }

      // restart timer when user has left message
      if (!sticky) {
        setFocused(false);
      }
    };
    var createCloseIcon = function createCloseIcon() {
      var iconClassName = 'p-toast-icon-close-icon';
      var buttonIconProps = utils.mergeProps({
        className: iconClassName
      }, ptm('buttonicon', parentParams), ptmo(pt, 'buttonicon', params));
      var icon = _closeIcon || /*#__PURE__*/React__namespace.createElement(times.TimesIcon, buttonIconProps);
      var closeIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, buttonIconProps), {
        props: props
      });
      var ariaLabel = props.ariaCloseLabel || localeOption('close');
      var buttonProps = utils.mergeProps({
        type: 'button',
        className: 'p-toast-icon-close p-link',
        onClick: onClose,
        'aria-label': ariaLabel
      }, ptm('button', parentParams), ptmo(pt, 'button', params));
      if (closable !== false) {
        return /*#__PURE__*/React__namespace.createElement("div", null, /*#__PURE__*/React__namespace.createElement("button", buttonProps, closeIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)));
      }
      return null;
    };
    var createMessage = function createMessage() {
      if (messageInfo) {
        var contentEl = utils.ObjectUtils.getJSXElement(content, {
          message: messageInfo.message,
          onClick: onClick,
          onClose: onClose
        });
        var iconClassName = 'p-toast-message-icon';
        var iconProps = utils.mergeProps({
          className: iconClassName
        }, ptm('icon', parentParams), ptmo(pt, 'icon', params));
        var icon = _icon;
        if (!_icon) {
          switch (severity) {
            case 'info':
              icon = /*#__PURE__*/React__namespace.createElement(infocircle.InfoCircleIcon, iconProps);
              break;
            case 'warn':
              icon = /*#__PURE__*/React__namespace.createElement(exclamationtriangle.ExclamationTriangleIcon, iconProps);
              break;
            case 'error':
              icon = /*#__PURE__*/React__namespace.createElement(timescircle.TimesCircleIcon, iconProps);
              break;
            case 'success':
              icon = /*#__PURE__*/React__namespace.createElement(check.CheckIcon, iconProps);
              break;
          }
        }
        var messageIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, iconProps), {
          props: props
        });
        var textProps = utils.mergeProps({
          className: 'p-toast-message-text'
        }, ptm('text', parentParams), ptmo(pt, 'text', params));
        var summaryProps = utils.mergeProps({
          className: 'p-toast-summary'
        }, ptm('summary', parentParams), ptmo(pt, 'summary', params));
        var detailProps = utils.mergeProps({
          className: 'p-toast-detail'
        }, ptm('detail', parentParams), ptmo(pt, 'detail', params));
        return contentEl || /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, messageIcon, /*#__PURE__*/React__namespace.createElement("div", textProps, /*#__PURE__*/React__namespace.createElement("span", summaryProps, summary), detail && /*#__PURE__*/React__namespace.createElement("div", detailProps, detail)));
      }
      return null;
    };
    var className = utils.classNames('p-toast-message', _defineProperty({}, "p-toast-message-".concat(severity), severity), _className);
    var contentClassName = utils.classNames('p-toast-message-content', _contentClassName);
    var message = createMessage();
    var closeIcon = createCloseIcon();
    var messageProps = utils.mergeProps({
      ref: ref,
      className: className,
      style: style,
      role: 'alert',
      'aria-live': 'assertive',
      'aria-atomic': 'true',
      onClick: onClick,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave
    }, ptm('message', parentParams), ptmo(pt, 'root', params));
    var contentProps = utils.mergeProps({
      className: contentClassName,
      style: contentStyle
    }, ptm('content', parentParams), ptmo(pt, 'content', params));
    return /*#__PURE__*/React__namespace.createElement("div", messageProps, /*#__PURE__*/React__namespace.createElement("div", contentProps, message, closeIcon));
  }));
  ToastMessage.displayName = 'ToastMessage';

  var messageIdx = 0;
  var Toast = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var context = React__namespace.useContext(PrimeReact$1.PrimeReactContext);
    var props = ToastBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      messagesState = _React$useState2[0],
      setMessagesState = _React$useState2[1];
    var containerRef = React__namespace.useRef(null);
    var metaData = {
      props: props,
      state: {
        messages: messagesState
      }
    };
    var ptCallbacks = ToastBase.setMetaData(metaData);
    var show = function show(messageInfo) {
      if (messageInfo) {
        setMessagesState(function (prev) {
          return assignIdentifiers(prev, messageInfo, true);
        });
      }
    };
    var assignIdentifiers = function assignIdentifiers(currentState, messageInfo, copy) {
      var messages;
      if (Array.isArray(messageInfo)) {
        var multipleMessages = messageInfo.reduce(function (acc, message) {
          acc.push({
            _pId: messageIdx++,
            message: message
          });
          return acc;
        }, []);
        if (copy) {
          messages = currentState ? [].concat(_toConsumableArray(currentState), _toConsumableArray(multipleMessages)) : multipleMessages;
        } else {
          messages = multipleMessages;
        }
      } else {
        var message = {
          _pId: messageIdx++,
          message: messageInfo
        };
        if (copy) {
          messages = currentState ? [].concat(_toConsumableArray(currentState), [message]) : [message];
        } else {
          messages = [message];
        }
      }
      return messages;
    };
    var clear = function clear() {
      utils.ZIndexUtils.clear(containerRef.current);
      setMessagesState([]);
    };
    var replace = function replace(messageInfo) {
      setMessagesState(function (previousMessagesState) {
        return assignIdentifiers(previousMessagesState, messageInfo, false);
      });
    };
    var remove = function remove(messageInfo) {
      setMessagesState(function (m) {
        return m.filter(function (msg) {
          return msg._pId !== messageInfo._pId;
        });
      });
      props.onRemove && props.onRemove(messageInfo.message);
    };
    var onClose = function onClose(messageInfo) {
      remove(messageInfo);
    };
    var onEntered = function onEntered() {
      props.onShow && props.onShow();
    };
    var onExited = function onExited() {
      messagesState.length === 1 && utils.ZIndexUtils.clear(containerRef.current);
      props.onHide && props.onHide();
    };
    hooks.useUpdateEffect(function () {
      utils.ZIndexUtils.set('toast', containerRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, props.baseZIndex || context && context.zIndex['toast'] || PrimeReact__default["default"].zIndex['toast']);
    }, [messagesState, props.baseZIndex]);
    hooks.useUnmountEffect(function () {
      utils.ZIndexUtils.clear(containerRef.current);
    });
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        show: show,
        replace: replace,
        remove: remove,
        clear: clear,
        getElement: function getElement() {
          return containerRef.current;
        }
      };
    });
    var createElement = function createElement() {
      var className = utils.classNames('p-toast p-component p-toast-' + props.position, props.className, {
        'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact__default["default"].inputStyle === 'filled',
        'p-ripple-disabled': context && context.ripple === false || PrimeReact__default["default"].ripple === false
      });
      var rootProps = utils.mergeProps({
        ref: containerRef,
        id: props.id,
        className: className,
        style: props.style
      }, ToastBase.getOtherProps(props), ptCallbacks.ptm('root'));
      return /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement(reactTransitionGroup.TransitionGroup, null, messagesState && messagesState.map(function (messageInfo, index) {
        var messageRef = /*#__PURE__*/React__namespace.createRef();
        return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
          nodeRef: messageRef,
          key: messageInfo._pId,
          classNames: "p-toast-message",
          unmountOnExit: true,
          timeout: {
            enter: 300,
            exit: 300
          },
          onEntered: onEntered,
          onExited: onExited,
          options: props.transitionOptions
        }, /*#__PURE__*/React__namespace.createElement(ToastMessage, {
          ref: messageRef,
          messageInfo: messageInfo,
          index: index,
          onClick: props.onClick,
          onClose: onClose,
          onMouseEnter: props.onMouseEnter,
          onMouseLeave: props.onMouseLeave,
          closeIcon: props.closeIcon,
          ptCallbacks: ptCallbacks,
          metaData: metaData
        }));
      })));
    };
    var element = createElement();
    return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
      element: element,
      appendTo: props.appendTo
    });
  }));
  Toast.displayName = 'Toast';

  exports.Toast = Toast;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, ReactTransitionGroup, primereact.api, primereact.csstransition, primereact.hooks, primereact.portal, primereact.utils, primereact.componentbase, primereact.icons.check, primereact.icons.exclamationtriangle, primereact.icons.infocircle, primereact.icons.times, primereact.icons.timescircle, primereact.ripple);
