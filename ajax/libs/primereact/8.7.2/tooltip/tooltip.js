this.primereact = this.primereact || {};
this.primereact.tooltip = (function (exports, React, PrimeReact, hooks, portal, utils) {
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

  function _defineProperty(obj, key, value) {
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

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

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

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  var Tooltip = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var _React$useState = React__namespace.useState(false),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        visibleState = _React$useState2[0],
        setVisibleState = _React$useState2[1];

    var _React$useState3 = React__namespace.useState(props.position),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        positionState = _React$useState4[0],
        setPositionState = _React$useState4[1];

    var _React$useState5 = React__namespace.useState(''),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        classNameState = _React$useState6[0],
        setClassNameState = _React$useState6[1];

    var elementRef = React__namespace.useRef(null);
    var textRef = React__namespace.useRef(null);
    var currentTargetRef = React__namespace.useRef(null);
    var containerSize = React__namespace.useRef(null);
    var allowHide = React__namespace.useRef(true);
    var timeouts = React__namespace.useRef({});
    var currentMouseEvent = React__namespace.useRef(null);

    var _useResizeListener = hooks.useResizeListener({
      listener: function listener(event) {
        !utils.DomHandler.isTouchDevice() && hide(event);
      }
    }),
        _useResizeListener2 = _slicedToArray(_useResizeListener, 2),
        bindWindowResizeListener = _useResizeListener2[0],
        unbindWindowResizeListener = _useResizeListener2[1];

    var _useOverlayScrollList = hooks.useOverlayScrollListener({
      target: currentTargetRef.current,
      listener: function listener(event) {
        hide(event);
      },
      when: visibleState
    }),
        _useOverlayScrollList2 = _slicedToArray(_useOverlayScrollList, 2),
        bindOverlayScrollListener = _useOverlayScrollList2[0],
        unbindOverlayScrollListener = _useOverlayScrollList2[1];

    var isTargetContentEmpty = function isTargetContentEmpty(target) {
      return !(props.content || getTargetOption(target, 'tooltip'));
    };

    var isContentEmpty = function isContentEmpty(target) {
      return !(props.content || getTargetOption(target, 'tooltip') || props.children);
    };

    var isMouseTrack = function isMouseTrack(target) {
      return getTargetOption(target, 'mousetrack') || props.mouseTrack;
    };

    var isDisabled = function isDisabled(target) {
      return getTargetOption(target, 'disabled') === 'true' || hasTargetOption(target, 'disabled') || props.disabled;
    };

    var isShowOnDisabled = function isShowOnDisabled(target) {
      return getTargetOption(target, 'showondisabled') || props.showOnDisabled;
    };

    var isAutoHide = function isAutoHide() {
      return getTargetOption(currentTargetRef.current, 'autohide') || props.autoHide;
    };

    var getTargetOption = function getTargetOption(target, option) {
      return hasTargetOption(target, "data-pr-".concat(option)) ? target.getAttribute("data-pr-".concat(option)) : null;
    };

    var hasTargetOption = function hasTargetOption(target, option) {
      return target && target.hasAttribute(option);
    };

    var getEvents = function getEvents(target) {
      var showEvents = [getTargetOption(target, 'showevent') || props.showEvent];
      var hideEvents = [getTargetOption(target, 'hideevent') || props.hideEvent];

      if (isMouseTrack(target)) {
        showEvents = ['mousemove'];
        hideEvents = ['mouseleave'];
      } else {
        var event = getTargetOption(target, 'event') || props.event;

        if (event === 'focus') {
          showEvents = ['focus'];
          hideEvents = ['blur'];
        }

        if (event === 'both') {
          showEvents = ['focus', 'mouseenter'];
          hideEvents = ['blur', 'mouseleave'];
        }
      }

      return {
        showEvents: showEvents,
        hideEvents: hideEvents
      };
    };

    var getPosition = function getPosition(target) {
      return getTargetOption(target, 'position') || positionState;
    };

    var getMouseTrackPosition = function getMouseTrackPosition(target) {
      var top = getTargetOption(target, 'mousetracktop') || props.mouseTrackTop;
      var left = getTargetOption(target, 'mousetrackleft') || props.mouseTrackLeft;
      return {
        top: top,
        left: left
      };
    };

    var updateText = function updateText(target, callback) {
      if (textRef.current) {
        var content = getTargetOption(target, 'tooltip') || props.content;

        if (content) {
          textRef.current.innerHTML = ''; // remove children

          textRef.current.appendChild(document.createTextNode(content));
          callback();
        } else if (props.children) {
          callback();
        }
      }
    };

    var updateTooltipState = function updateTooltipState(position) {
      updateText(currentTargetRef.current, function () {
        var _currentMouseEvent$cu = currentMouseEvent.current,
            x = _currentMouseEvent$cu.pageX,
            y = _currentMouseEvent$cu.pageY;

        if (props.autoZIndex && !utils.ZIndexUtils.get(elementRef.current)) {
          utils.ZIndexUtils.set('tooltip', elementRef.current, PrimeReact__default["default"].autoZIndex, props.baseZIndex || PrimeReact__default["default"].zIndex['tooltip']);
        }

        elementRef.current.style.left = '';
        elementRef.current.style.top = ''; // GitHub #2695 disable pointer events when autohiding

        if (isAutoHide()) {
          elementRef.current.style.pointerEvents = 'none';
        }

        if (isMouseTrack(currentTargetRef.current) && !containerSize.current) {
          containerSize.current = {
            width: utils.DomHandler.getOuterWidth(elementRef.current),
            height: utils.DomHandler.getOuterHeight(elementRef.current)
          };
        }

        align(currentTargetRef.current, {
          x: x,
          y: y
        }, position);
      });
    };

    var show = function show(e) {
      currentTargetRef.current = e.currentTarget;
      var disabled = isDisabled(currentTargetRef.current);
      var empty = isContentEmpty(isShowOnDisabled(currentTargetRef.current) && disabled ? currentTargetRef.current.firstChild : currentTargetRef.current);

      if (empty || disabled) {
        return;
      }

      currentMouseEvent.current = e;

      if (visibleState) {
        applyDelay('updateDelay', updateTooltipState);
      } else {
        // #2653 give the callback a chance to return false and not continue with display
        var success = sendCallback(props.onBeforeShow, {
          originalEvent: e,
          target: currentTargetRef.current
        });

        if (success) {
          applyDelay('showDelay', function () {
            setVisibleState(true);
            sendCallback(props.onShow, {
              originalEvent: e,
              target: currentTargetRef.current
            });
          });
        }
      }
    };

    var hide = function hide(e) {
      clearTimeouts();

      if (visibleState) {
        var success = sendCallback(props.onBeforeHide, {
          originalEvent: e,
          target: currentTargetRef.current
        });

        if (success) {
          applyDelay('hideDelay', function () {
            if (!isAutoHide() && allowHide.current === false) {
              return;
            }

            utils.ZIndexUtils.clear(elementRef.current);
            utils.DomHandler.removeClass(elementRef.current, 'p-tooltip-active');
            setVisibleState(false);
            sendCallback(props.onHide, {
              originalEvent: e,
              target: currentTargetRef.current
            });
          });
        }
      }
    };

    var align = function align(target, coordinate, position) {
      var left = 0,
          top = 0,
          currentPosition = position || positionState;

      if (isMouseTrack(target) && coordinate) {
        var _containerSize = {
          width: utils.DomHandler.getOuterWidth(elementRef.current),
          height: utils.DomHandler.getOuterHeight(elementRef.current)
        };
        left = coordinate.x;
        top = coordinate.y;

        var _getMouseTrackPositio = getMouseTrackPosition(target),
            mouseTrackTop = _getMouseTrackPositio.top,
            mouseTrackLeft = _getMouseTrackPositio.left;

        switch (currentPosition) {
          case 'left':
            left -= _containerSize.width + mouseTrackLeft;
            top -= _containerSize.height / 2 - mouseTrackTop;
            break;

          case 'right':
            left += mouseTrackLeft;
            top -= _containerSize.height / 2 - mouseTrackTop;
            break;

          case 'top':
            left -= _containerSize.width / 2 - mouseTrackLeft;
            top -= _containerSize.height + mouseTrackTop;
            break;

          case 'bottom':
            left -= _containerSize.width / 2 - mouseTrackLeft;
            top += mouseTrackTop;
            break;
        }

        if (left <= 0 || containerSize.current.width > _containerSize.width) {
          elementRef.current.style.left = '0px';
          elementRef.current.style.right = window.innerWidth - _containerSize.width - left + 'px';
        } else {
          elementRef.current.style.right = '';
          elementRef.current.style.left = left + 'px';
        }

        elementRef.current.style.top = top + 'px';
        utils.DomHandler.addClass(elementRef.current, 'p-tooltip-active');
      } else {
        var pos = utils.DomHandler.findCollisionPosition(currentPosition);
        var my = getTargetOption(target, 'my') || props.my || pos.my;
        var at = getTargetOption(target, 'at') || props.at || pos.at;
        elementRef.current.style.padding = '0px';
        utils.DomHandler.flipfitCollision(elementRef.current, target, my, at, function (calculatedPosition) {
          var _calculatedPosition$a = calculatedPosition.at,
              atX = _calculatedPosition$a.x,
              atY = _calculatedPosition$a.y;
          var myX = calculatedPosition.my.x;
          var newPosition = props.at ? atX !== 'center' && atX !== myX ? atX : atY : calculatedPosition.at["".concat(pos.axis)];
          elementRef.current.style.padding = '';
          setPositionState(newPosition);
          updateContainerPosition(newPosition);
          utils.DomHandler.addClass(elementRef.current, 'p-tooltip-active');
        });
      }
    };

    var updateContainerPosition = function updateContainerPosition(position) {
      if (elementRef.current) {
        var style = getComputedStyle(elementRef.current);
        if (position === 'left') elementRef.current.style.left = parseFloat(style.left) - parseFloat(style.paddingLeft) * 2 + 'px';else if (position === 'top') elementRef.current.style.top = parseFloat(style.top) - parseFloat(style.paddingTop) * 2 + 'px';
      }
    };

    var onMouseEnter = function onMouseEnter() {
      if (!isAutoHide()) {
        allowHide.current = false;
      }
    };

    var onMouseLeave = function onMouseLeave(e) {
      if (!isAutoHide()) {
        allowHide.current = true;
        hide(e);
      }
    };

    var bindTargetEvent = function bindTargetEvent(target) {
      if (target) {
        var _getEvents = getEvents(target),
            showEvents = _getEvents.showEvents,
            hideEvents = _getEvents.hideEvents;

        var currentTarget = getTarget(target);
        showEvents.forEach(function (event) {
          return currentTarget.addEventListener(event, show);
        });
        hideEvents.forEach(function (event) {
          return currentTarget.addEventListener(event, hide);
        });
      }
    };

    var unbindTargetEvent = function unbindTargetEvent(target) {
      if (target) {
        var _getEvents2 = getEvents(target),
            showEvents = _getEvents2.showEvents,
            hideEvents = _getEvents2.hideEvents;

        var currentTarget = getTarget(target);
        showEvents.forEach(function (event) {
          return currentTarget.removeEventListener(event, show);
        });
        hideEvents.forEach(function (event) {
          return currentTarget.removeEventListener(event, hide);
        });
      }
    };

    var applyDelay = function applyDelay(delayProp, callback) {
      clearTimeouts();
      var delay = getTargetOption(currentTargetRef.current, delayProp.toLowerCase()) || props[delayProp];
      !!delay ? timeouts.current["".concat(delayProp)] = setTimeout(function () {
        return callback();
      }, delay) : callback();
    };

    var sendCallback = function sendCallback(callback) {
      if (callback) {
        for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          params[_key - 1] = arguments[_key];
        }

        var result = callback.apply(void 0, params);

        if (result === undefined) {
          result = true;
        }

        return result;
      }

      return true;
    };

    var clearTimeouts = function clearTimeouts() {
      Object.values(timeouts.current).forEach(function (t) {
        return clearTimeout(t);
      });
    };

    var getTarget = function getTarget(target) {
      if (target) {
        if (isShowOnDisabled(target)) {
          if (!target.hasWrapper) {
            var wrapper = document.createElement('span');
            target.parentNode.insertBefore(wrapper, target);
            wrapper.appendChild(target);
            target.hasWrapper = true;
            return wrapper;
          } else {
            return target.parentElement;
          }
        } else if (target.hasWrapper) {
          var _target$parentElement;

          (_target$parentElement = target.parentElement).replaceWith.apply(_target$parentElement, _toConsumableArray(target.parentElement.childNodes));

          delete target.hasWrapper;
        }

        return target;
      }

      return null;
    };

    var updateTargetEvents = function updateTargetEvents(target) {
      unloadTargetEvents(target);
      loadTargetEvents(target);
    };

    var loadTargetEvents = function loadTargetEvents(target) {
      setTargetEventOperations(target || props.target, bindTargetEvent);
    };

    var unloadTargetEvents = function unloadTargetEvents(target) {
      setTargetEventOperations(target || props.target, unbindTargetEvent);
    };

    var setTargetEventOperations = function setTargetEventOperations(target, operation) {
      target = utils.ObjectUtils.getRefElement(target);

      if (target) {
        if (utils.DomHandler.isElement(target)) {
          operation(target);
        } else {
          var setEvent = function setEvent(target) {
            var element = utils.DomHandler.find(document, target);
            element.forEach(function (el) {
              operation(el);
            });
          };

          if (target instanceof Array) {
            target.forEach(function (t) {
              setEvent(t);
            });
          } else {
            setEvent(target);
          }
        }
      }
    };

    hooks.useMountEffect(function () {
      loadTargetEvents();

      if (visibleState && currentTargetRef.current && isDisabled(currentTargetRef.current)) {
        hide();
      }
    });
    hooks.useUpdateEffect(function () {
      loadTargetEvents();
      return function () {
        unloadTargetEvents();
      };
    }, [show, hide, props.target]);
    hooks.useUpdateEffect(function () {
      if (visibleState) {
        var position = getPosition(currentTargetRef.current);
        var classname = getTargetOption(currentTargetRef.current, 'classname');
        setPositionState(position);
        setClassNameState(classname);
        updateTooltipState(position);
        bindWindowResizeListener();
        bindOverlayScrollListener();
      } else {
        setPositionState(props.position);
        setClassNameState('');
        currentTargetRef.current = null;
        containerSize.current = null;
        allowHide.current = true;
      }

      return function () {
        unbindWindowResizeListener();
        unbindOverlayScrollListener();
      };
    }, [visibleState]);
    hooks.useUpdateEffect(function () {
      if (visibleState) {
        applyDelay('updateDelay', function () {
          updateText(currentTargetRef.current, function () {
            align(currentTargetRef.current);
          });
        });
      }
    }, [props.content]);
    hooks.useUnmountEffect(function () {
      clearTimeouts();
      unloadTargetEvents();
      utils.ZIndexUtils.clear(elementRef.current);
    });
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        updateTargetEvents: updateTargetEvents,
        loadTargetEvents: loadTargetEvents,
        unloadTargetEvents: unloadTargetEvents,
        show: show,
        hide: hide,
        getElement: function getElement() {
          return elementRef.current;
        },
        getTarget: function getTarget() {
          return currentTargetRef.current;
        }
      };
    });

    var createElement = function createElement() {
      var otherProps = utils.ObjectUtils.findDiffKeys(props, Tooltip.defaultProps);
      var tooltipClassName = utils.classNames('p-tooltip p-component', _defineProperty({}, "p-tooltip-".concat(positionState), true), props.className, classNameState);
      var empty = isTargetContentEmpty(currentTargetRef.current);
      return /*#__PURE__*/React__namespace.createElement("div", _extends({
        id: props.id,
        ref: elementRef,
        className: tooltipClassName,
        style: props.style,
        role: "tooltip",
        "aria-hidden": visibleState
      }, otherProps, {
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave
      }), /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-tooltip-arrow"
      }), /*#__PURE__*/React__namespace.createElement("div", {
        ref: textRef,
        className: "p-tooltip-text"
      }, empty && props.children));
    };

    if (visibleState) {
      var element = createElement();
      return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
        element: element,
        appendTo: props.appendTo,
        visible: true
      });
    }

    return null;
  }));
  Tooltip.displayName = 'Tooltip';
  Tooltip.defaultProps = {
    __TYPE: 'Tooltip',
    id: null,
    target: null,
    content: null,
    disabled: false,
    className: null,
    style: null,
    appendTo: null,
    position: 'right',
    my: null,
    at: null,
    event: null,
    showEvent: 'mouseenter',
    hideEvent: 'mouseleave',
    autoZIndex: true,
    baseZIndex: 0,
    mouseTrack: false,
    mouseTrackTop: 5,
    mouseTrackLeft: 5,
    showDelay: 0,
    updateDelay: 0,
    hideDelay: 0,
    autoHide: true,
    showOnDisabled: false,
    onBeforeShow: null,
    onBeforeHide: null,
    onShow: null,
    onHide: null
  };

  exports.Tooltip = Tooltip;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.hooks, primereact.portal, primereact.utils);
