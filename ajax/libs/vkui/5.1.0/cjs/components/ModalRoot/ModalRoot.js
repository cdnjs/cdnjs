"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalRootTouch = void 0;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var React = _interopRequireWildcard(require("react"));
var _Touch = require("../Touch/Touch");
var _TouchContext = _interopRequireDefault(require("../Touch/TouchContext"));
var _vkjs = require("@vkontakte/vkjs");
var _styles = require("../../lib/styles");
var _touch = require("../../lib/touch");
var _platform = require("../../lib/platform");
var _supportEvents = require("../../lib/supportEvents");
var _withPlatform = require("../../hoc/withPlatform");
var _withContext = require("../../hoc/withContext");
var _ModalRootContext = require("./ModalRootContext");
var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
var _types = require("./types");
var _constants = require("./constants");
var _dom = require("../../lib/dom");
var _getNavId = require("../../lib/getNavId");
var _warnOnce = require("../../lib/warnOnce");
var _FocusTrap = require("../FocusTrap/FocusTrap");
var _useModalManager = require("./useModalManager");
var _math = require("../../helpers/math");
var _excluded = ["id"];
var warn = (0, _warnOnce.warnOnce)('ModalRoot');
var IS_DEV = process.env.NODE_ENV === 'development';
function numberInRange(number, range) {
  if (!range) {
    return false;
  }
  return number >= range[0] && number <= range[1];
}
function rangeTranslate(number) {
  return (0, _math.clamp)(number, 0, 98);
}
var ModalRootTouchComponent = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(ModalRootTouchComponent, _React$Component);
  var _super = (0, _createSuper2.default)(ModalRootTouchComponent);
  function ModalRootTouchComponent(props) {
    var _this;
    (0, _classCallCheck2.default)(this, ModalRootTouchComponent);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "documentScrolling", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "maskElementRef", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "viewportRef", /*#__PURE__*/React.createRef());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "maskAnimationFrame", undefined);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "modalRootContext", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "frameIds", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "restoreFocusTo", undefined);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "preventTouch", function (event) {
      if (!event) {
        return false;
      }
      while (event.originalEvent) {
        event = event.originalEvent;
      }
      if (event.preventDefault) {
        event.preventDefault();
      }
      return false;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "updateModalTranslate", function () {
      var modalState = _this.getModalState(_this.props.activeModal);
      modalState && _this.animateTranslate(modalState, modalState.translateY);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "updateModalHeight", function () {
      var modalState = _this.getModalState(_this.props.activeModal);
      if (modalState && modalState.type === _types.ModalType.PAGE && modalState.dynamicContentHeight) {
        if (_this.props.enteringModal) {
          _this.waitTransitionFinish(modalState, function () {
            requestAnimationFrame(function () {
              return _this.checkPageContentHeight();
            });
          });
        } else {
          requestAnimationFrame(function () {
            return _this.checkPageContentHeight();
          });
        }
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onTouchMove", function (e) {
      if (_this.props.exitingModal) {
        return;
      }
      var modalState = _this.getModalState(_this.props.activeModal);
      if (!modalState) {
        return;
      }
      if (modalState.type === _types.ModalType.PAGE) {
        return _this.onPageTouchMove(e, modalState);
      }
      if (modalState.type === _types.ModalType.CARD) {
        return _this.onCardTouchMove(e, modalState);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onTouchEnd", function (e) {
      var modalState = _this.getModalState(_this.props.activeModal);
      if ((modalState === null || modalState === void 0 ? void 0 : modalState.type) === _types.ModalType.PAGE) {
        return _this.onPageTouchEnd(e, modalState);
      }
      if ((modalState === null || modalState === void 0 ? void 0 : modalState.type) === _types.ModalType.CARD) {
        return _this.onCardTouchEnd(e, modalState);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onScroll", function (e) {
      var _modalState$contentEl;
      var activeModal = _this.props.activeModal;
      var target = e.target;
      if (!activeModal) {
        return;
      }
      var modalState = _this.getModalState(activeModal);
      if ((modalState === null || modalState === void 0 ? void 0 : modalState.type) === _types.ModalType.PAGE && modalState !== null && modalState !== void 0 && (_modalState$contentEl = modalState.contentElement) !== null && _modalState$contentEl !== void 0 && _modalState$contentEl.contains(target)) {
        modalState.contentScrolled = true;
        if (modalState.contentScrollStopTimeout) {
          clearTimeout(modalState.contentScrollStopTimeout);
        }
        modalState.contentScrollStopTimeout = setTimeout(function () {
          if (modalState.contentScrolled) {
            modalState.contentScrolled = false;
          }
        }, 250);
      }
    });
    _this.state = {
      touchDown: false,
      dragging: false
    };
    _this.maskElementRef = /*#__PURE__*/React.createRef();
    _this.modalRootContext = {
      updateModalHeight: _this.updateModalHeight,
      registerModal: function registerModal(_ref) {
        var _this$getModalState;
        var id = _ref.id,
          data = (0, _objectWithoutProperties2.default)(_ref, _excluded);
        return Object.assign((_this$getModalState = _this.getModalState(id)) !== null && _this$getModalState !== void 0 ? _this$getModalState : {}, data);
      },
      onClose: function onClose() {
        return _this.props.onExit();
      },
      isInsideModal: true
    };
    _this.frameIds = {};
    return _this;
  }
  (0, _createClass2.default)(ModalRootTouchComponent, [{
    key: "timeout",
    get: function get() {
      return this.props.platform === _platform.Platform.IOS ? 400 : 320;
    }
  }, {
    key: "document",
    get: function get() {
      return this.props.document;
    }
  }, {
    key: "window",
    get: function get() {
      return this.props.window;
    }
  }, {
    key: "getModalState",
    value: function getModalState(id) {
      if (!id) {
        return undefined;
      }
      return this.props.getModalState(id);
    }
  }, {
    key: "getModals",
    value: function getModals() {
      return React.Children.toArray(this.props.children);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // Отслеживаем изменение размеров viewport (Необходимо для iOS)
      if (this.props.platform === _platform.Platform.IOS) {
        var _this$window;
        (_this$window = this.window) === null || _this$window === void 0 ? void 0 : _this$window.addEventListener('resize', this.updateModalTranslate, false);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.toggleDocumentScrolling(true);
      this.window.removeEventListener('resize', this.updateModalTranslate, false);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;
      // transition phase 2: animate exiting modal
      if (this.props.exitingModal && this.props.exitingModal !== prevProps.exitingModal) {
        this.closeModal(this.props.exitingModal);
      }

      // transition phase 3: animate entering modal
      if (this.props.enteringModal && this.props.enteringModal !== prevProps.enteringModal) {
        var enteringModal = this.props.enteringModal;
        var enteringState = this.getModalState(enteringModal);
        this.props.onEnter();
        this.waitTransitionFinish(enteringState, function () {
          if (enteringState !== null && enteringState !== void 0 && enteringState.innerElement) {
            enteringState.innerElement.style.transitionDelay = '';
          }
          _this2.props.onEntered(enteringModal);
        });
        if (enteringState !== null && enteringState !== void 0 && enteringState.innerElement) {
          enteringState.innerElement.style.transitionDelay = this.props.delayEnter ? "".concat(this.timeout, "ms") : '';
          this.animateTranslate(enteringState, enteringState.translateY);
        }
      }

      // focus restoration
      if (this.props.activeModal && !prevProps.activeModal) {
        this.restoreFocusTo = this.document.activeElement;
      }
      if (!this.props.activeModal && !this.props.exitingModal && this.restoreFocusTo) {
        this.restoreFocusTo.focus();
        this.restoreFocusTo = null;
      }
      this.toggleDocumentScrolling(!this.props.activeModal && !this.props.exitingModal);
    }

    /* Отключает скролл документа */
  }, {
    key: "toggleDocumentScrolling",
    value: function toggleDocumentScrolling(enabled) {
      if (this.documentScrolling === enabled) {
        return;
      }
      this.documentScrolling = enabled;
      if (enabled) {
        // Здесь нужен последний аргумент с такими же параметрами, потому что
        // некоторые браузеры на странных вендорах типа Meizu не удаляют обработчик.
        // https://github.com/VKCOM/VKUI/issues/444
        this.window.removeEventListener('touchmove', this.preventTouch, {
          // @ts-expect-error: TS2769 В интерфейсе EventListenerOptions нет поля passive
          passive: false
        });
      } else {
        this.window.addEventListener('touchmove', this.preventTouch, {
          passive: false
        });
      }
    }
  }, {
    key: "checkPageContentHeight",
    value: function checkPageContentHeight() {
      var modalState = this.getModalState(this.props.activeModal);
      if ((modalState === null || modalState === void 0 ? void 0 : modalState.type) === _types.ModalType.PAGE && modalState !== null && modalState !== void 0 && modalState.modalElement) {
        var prevModalState = (0, _objectSpread2.default)({}, modalState);
        initPageModal(modalState);
        var currentModalState = (0, _objectSpread2.default)({}, modalState);
        var needAnimate = false;
        if (prevModalState.expandable === currentModalState.expandable) {
          if (prevModalState.translateYFrom !== currentModalState.translateYFrom) {
            needAnimate = true;
          }
        } else {
          needAnimate = true;
        }
        if (needAnimate) {
          this.animateTranslate(modalState, modalState.translateY);
        }
      }
    }
  }, {
    key: "closeModal",
    value: function closeModal(id) {
      var _this3 = this,
        _prevModalState$trans,
        _nextModalState$trans,
        _nextModalState$trans2;
      // Сбрасываем состояния, которые могут помешать закрытию модального окна
      this.setState({
        touchDown: false
      });
      var prevModalState = this.getModalState(id);
      if (!prevModalState) {
        id && warn("closeActiveModal: \u043C\u043E\u0434\u0430\u043B\u044C\u043D\u043E\u0435 \u043E\u043A\u043D\u043E (\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430) ".concat(id, " \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"), 'error');
        return;
      }
      var nextModalState = this.getModalState(this.props.activeModal);
      var nextIsPage = !!nextModalState && nextModalState.type === _types.ModalType.PAGE;
      var prevIsPage = !!prevModalState && prevModalState.type === _types.ModalType.PAGE;
      this.waitTransitionFinish(prevModalState, function () {
        return _this3.props.onExited(id);
      });
      var exitTranslate = prevIsPage && nextIsPage && ((_prevModalState$trans = prevModalState.translateY) !== null && _prevModalState$trans !== void 0 ? _prevModalState$trans : 0) <= ((_nextModalState$trans = nextModalState === null || nextModalState === void 0 ? void 0 : nextModalState.translateYFrom) !== null && _nextModalState$trans !== void 0 ? _nextModalState$trans : 0) && !this.props.isBack ? ((_nextModalState$trans2 = nextModalState === null || nextModalState === void 0 ? void 0 : nextModalState.translateYFrom) !== null && _nextModalState$trans2 !== void 0 ? _nextModalState$trans2 : 0) + 10 : 100;
      this.animateTranslate(prevModalState, exitTranslate);
      if (!nextModalState) {
        // NOTE: was only for clean exit
        this.setMaskOpacity(prevModalState, 0);
      }
    }
  }, {
    key: "onPageTouchMove",
    value: function onPageTouchMove(event, modalState) {
      var _modalState$innerElem, _modalState$headerEle;
      var shiftY = event.shiftY,
        originalEvent = event.originalEvent;
      var target = originalEvent.target;
      if (!event.isY) {
        var _this$viewportRef$cur;
        if ((_this$viewportRef$cur = this.viewportRef.current) !== null && _this$viewportRef$cur !== void 0 && _this$viewportRef$cur.contains(target)) {
          originalEvent.preventDefault();
        }
        return;
      }
      if (!((_modalState$innerElem = modalState.innerElement) !== null && _modalState$innerElem !== void 0 && _modalState$innerElem.contains(target))) {
        return originalEvent.preventDefault();
      }
      originalEvent.stopPropagation();
      var expandable = modalState.expandable,
        contentScrolled = modalState.contentScrolled,
        collapsed = modalState.collapsed,
        expanded = modalState.expanded;
      if (!this.state.touchDown) {
        var _modalState$contentEl2, _modalState$contentEl3;
        modalState.touchStartContentScrollTop = (_modalState$contentEl2 = (_modalState$contentEl3 = modalState.contentElement) === null || _modalState$contentEl3 === void 0 ? void 0 : _modalState$contentEl3.scrollTop) !== null && _modalState$contentEl2 !== void 0 ? _modalState$contentEl2 : 0;
        this.setState({
          touchDown: true
        });
      }
      if (contentScrolled) {
        return;
      }
      if (modalState.touchMovePositive === null) {
        modalState.touchMovePositive = shiftY > 0;
      }
      if (!modalState.expandable || collapsed || expanded && modalState.touchMovePositive && modalState.touchStartContentScrollTop === 0 || (_modalState$headerEle = modalState.headerElement) !== null && _modalState$headerEle !== void 0 && _modalState$headerEle.contains(target)) {
        var _modalState$translate;
        originalEvent.preventDefault();
        if (!expandable && shiftY < 0 || !this.window) {
          return;
        }
        !this.state.dragging && this.setState({
          dragging: true
        });
        var shiftYPercent = shiftY / this.window.innerHeight * 100;
        var shiftYCurrent = (0, _touch.rubber)(shiftYPercent, 72, 0.8, this.props.platform !== _platform.Platform.IOS);
        modalState.touchShiftYPercent = shiftYPercent;
        modalState.translateYCurrent = rangeTranslate(((_modalState$translate = modalState.translateY) !== null && _modalState$translate !== void 0 ? _modalState$translate : 0) + shiftYCurrent);
        this.animateTranslate(modalState, modalState.translateYCurrent);
        this.setMaskOpacity(modalState);
      }
    }
  }, {
    key: "onCardTouchMove",
    value: function onCardTouchMove(event, modalState) {
      var _modalState$innerElem2;
      var originalEvent = event.originalEvent,
        shiftY = event.shiftY;
      var target = originalEvent.target;
      if ((_modalState$innerElem2 = modalState.innerElement) !== null && _modalState$innerElem2 !== void 0 && _modalState$innerElem2.contains(target)) {
        var _modalState$translate2;
        if (!this.state.touchDown) {
          this.setState({
            touchDown: true,
            dragging: true
          });
        }
        var shiftYPercent = shiftY / modalState.innerElement.offsetHeight * 100;
        var shiftYCurrent = (0, _touch.rubber)(shiftYPercent, 72, 1.2, this.props.platform !== _platform.Platform.IOS);
        modalState.touchShiftYPercent = shiftYPercent;
        modalState.translateYCurrent = Math.max(0, ((_modalState$translate2 = modalState.translateY) !== null && _modalState$translate2 !== void 0 ? _modalState$translate2 : 0) + shiftYCurrent);
        this.animateTranslate(modalState, modalState.translateYCurrent);
        this.setMaskOpacity(modalState);
      }
    }
  }, {
    key: "onPageTouchEnd",
    value: function onPageTouchEnd(event, modalState) {
      var _this4 = this;
      var startY = event.startY,
        shiftY = event.shiftY;
      modalState.contentScrolled = false;
      modalState.touchMovePositive = null;
      var setStateCallback;
      if (this.state.dragging && this.window) {
        var _modalState$translate3, _modalState$touchShif;
        var shiftYEndPercent = (startY + shiftY) / this.window.innerHeight * 100;
        var translateY = (_modalState$translate3 = modalState.translateYCurrent) !== null && _modalState$translate3 !== void 0 ? _modalState$translate3 : 0;
        var expectTranslateY = translateY / event.duration * 240 * 0.6 * (((_modalState$touchShif = modalState.touchShiftYPercent) !== null && _modalState$touchShif !== void 0 ? _modalState$touchShif : 0) < 0 ? -1 : 1);
        translateY = rangeTranslate(translateY + expectTranslateY);
        if (modalState.settlingHeight !== 100) {
          if (numberInRange(translateY, modalState.expandedRange)) {
            var _modalState$expandedR, _modalState$expandedR2;
            translateY = (_modalState$expandedR = (_modalState$expandedR2 = modalState.expandedRange) === null || _modalState$expandedR2 === void 0 ? void 0 : _modalState$expandedR2[0]) !== null && _modalState$expandedR !== void 0 ? _modalState$expandedR : 0;
          } else if (numberInRange(translateY, modalState.collapsedRange)) {
            var _modalState$translate4;
            translateY = (_modalState$translate4 = modalState.translateYFrom) !== null && _modalState$translate4 !== void 0 ? _modalState$translate4 : 0;
          } else if (numberInRange(translateY, modalState.hiddenRange)) {
            translateY = 100;
          } else {
            var _modalState$translate5;
            translateY = (_modalState$translate5 = modalState.translateYFrom) !== null && _modalState$translate5 !== void 0 ? _modalState$translate5 : 0;
          }
        } else {
          if (numberInRange(translateY, [0, 25])) {
            translateY = 0;
          } else {
            translateY = 100;
          }
        }
        if (translateY !== 100 && shiftYEndPercent >= 75) {
          translateY = 100;
        }
        modalState.translateY = translateY;
        modalState.translateYCurrent = translateY;
        modalState.collapsed = translateY > 0 && translateY < shiftYEndPercent;
        modalState.expanded = translateY === 0;
        modalState.hidden = translateY === 100;
        if (modalState.hidden) {
          this.props.onExit();
        }
        setStateCallback = function setStateCallback() {
          if (!modalState.hidden) {
            _this4.animateTranslate(modalState, modalState.translateY);
          }
          _this4.setMaskOpacity(modalState);
        };
      }
      this.setState({
        touchDown: false,
        dragging: false
      }, setStateCallback);
    }
  }, {
    key: "onCardTouchEnd",
    value: function onCardTouchEnd(_ref2, modalState) {
      var _this5 = this;
      var duration = _ref2.duration;
      var setStateCallback;
      if (this.state.dragging) {
        var _modalState$translate6, _modalState$touchShif2;
        var translateY = (_modalState$translate6 = modalState.translateYCurrent) !== null && _modalState$translate6 !== void 0 ? _modalState$translate6 : 0;
        var expectTranslateY = translateY / duration * 240 * 0.6 * (((_modalState$touchShif2 = modalState.touchShiftYPercent) !== null && _modalState$touchShif2 !== void 0 ? _modalState$touchShif2 : 0) < 0 ? -1 : 1);
        translateY = Math.max(0, translateY + expectTranslateY);
        if (translateY >= 30) {
          translateY = 100;
        } else {
          translateY = 0;
        }
        modalState.translateY = translateY;
        modalState.hidden = translateY === 100;
        if (modalState.hidden) {
          this.props.onExit();
        }
        setStateCallback = function setStateCallback() {
          if (!modalState.hidden) {
            _this5.animateTranslate(modalState, modalState.translateY);
          }
          _this5.setMaskOpacity(modalState);
        };
      }
      this.setState({
        touchDown: false,
        dragging: false
      }, setStateCallback);
    }
  }, {
    key: "waitTransitionFinish",
    value: function waitTransitionFinish(modalState, eventHandler) {
      if (_supportEvents.transitionEvent.supported) {
        var _modalState$innerElem4;
        var onceHandler = function onceHandler() {
          var _modalState$innerElem3;
          modalState === null || modalState === void 0 ? void 0 : (_modalState$innerElem3 = modalState.innerElement) === null || _modalState$innerElem3 === void 0 ? void 0 : _modalState$innerElem3.removeEventListener(_supportEvents.transitionEvent.name, onceHandler);
          eventHandler();
        };
        modalState === null || modalState === void 0 ? void 0 : (_modalState$innerElem4 = modalState.innerElement) === null || _modalState$innerElem4 === void 0 ? void 0 : _modalState$innerElem4.addEventListener(_supportEvents.transitionEvent.name, onceHandler);
      } else {
        setTimeout(eventHandler, this.timeout);
      }
    }

    /**
     * Анимирует сдвиг модалки
     *
     * @param {ModalsStateEntry} modalState
     * @param {number} percent Процент сдвига: 0 – полностью открыта, 100 – полностью закрыта
     */
  }, {
    key: "animateTranslate",
    value: function animateTranslate(modalState, percent) {
      var frameId = "animateTranslateFrame".concat(modalState.id);
      cancelAnimationFrame(this.frameIds[frameId]);
      this.frameIds[frameId] = requestAnimationFrame(function () {
        (0, _styles.setTransformStyle)(modalState.innerElement, "translate3d(0, ".concat(percent, "%, 0)"));
      });
    }

    /* Устанавливает прозрачность для полупрозрачной подложки */
  }, {
    key: "setMaskOpacity",
    value: function setMaskOpacity(modalState) {
      var _this$props$history,
        _this6 = this;
      var forceOpacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (forceOpacity === null && ((_this$props$history = this.props.history) === null || _this$props$history === void 0 ? void 0 : _this$props$history[0]) !== modalState.id) {
        return;
      }
      if (this.maskAnimationFrame) {
        cancelAnimationFrame(this.maskAnimationFrame);
      }
      this.maskAnimationFrame = requestAnimationFrame(function () {
        if (_this6.maskElementRef.current) {
          var _modalState$translate7 = modalState.translateY,
            translateY = _modalState$translate7 === void 0 ? 0 : _modalState$translate7,
            _modalState$translate8 = modalState.translateYCurrent,
            translateYCurrent = _modalState$translate8 === void 0 ? 0 : _modalState$translate8;
          var opacity = forceOpacity === null ? 1 - (translateYCurrent - translateY) / (100 - translateY) || 0 : forceOpacity;
          _this6.maskElementRef.current.style.opacity = (0, _math.clamp)(opacity, 0, 100).toString();
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$configPro,
        _this7 = this;
      var _this$props = this.props,
        activeModal = _this$props.activeModal,
        exitingModal = _this$props.exitingModal,
        enteringModal = _this$props.enteringModal;
      var _this$state = this.state,
        touchDown = _this$state.touchDown,
        dragging = _this$state.dragging;
      if (!activeModal && !exitingModal) {
        return null;
      }
      return /*#__PURE__*/React.createElement(_TouchContext.default.Provider, {
        value: true
      }, /*#__PURE__*/React.createElement(_ModalRootContext.ModalRootContext.Provider, {
        value: this.modalRootContext
      }, /*#__PURE__*/React.createElement(_Touch.Touch, {
        className: (0, _vkjs.classNames)("vkuiModalRoot", ((_this$props$configPro = this.props.configProvider) === null || _this$props$configPro === void 0 ? void 0 : _this$props$configPro.webviewType) === _ConfigProviderContext.WebviewType.VKAPPS && "vkuiModalRoot--vkapps", touchDown && "vkuiModalRoot--touched", !!(enteringModal || exitingModal) && "vkuiModalRoot--switching"),
        onMove: this.onTouchMove,
        onEnd: this.onTouchEnd,
        onScroll: this.onScroll
      }, /*#__PURE__*/React.createElement("div", {
        className: "vkuiModalRoot__mask",
        onClick: this.props.onExit,
        ref: this.maskElementRef
      }), /*#__PURE__*/React.createElement("div", {
        className: "vkuiModalRoot__viewport",
        ref: this.viewportRef
      }, this.getModals().map(function (Modal) {
        var modalId = (0, _getNavId.getNavId)(Modal.props, warn);
        var _modalState = _this7.getModalState(modalId);
        if (modalId !== activeModal && modalId !== exitingModal || !_modalState) {
          return null;
        }
        var modalState = (0, _objectSpread2.default)({}, _modalState);
        var isPage = modalState.type === _types.ModalType.PAGE;
        var key = "modal-".concat(modalId);
        return /*#__PURE__*/React.createElement(_FocusTrap.FocusTrap, {
          key: key,
          getRootRef: function getRootRef(e) {
            var modalState = _this7.getModalState(modalId);
            if (modalState) {
              modalState.modalElement = e;
            }
          },
          onClose: _this7.props.onExit,
          timeout: _this7.timeout,
          className: (0, _vkjs.classNames)("vkuiModalRoot__modal", dragging && "vkuiModalRoot__modal--dragging", isPage && modalState.expandable && "vkuiModalRoot__modal--expandable", isPage && modalState.collapsed && "vkuiModalRoot__modal--collapsed"),
          restoreFocus: false
        }, Modal);
      })))));
    }
  }]);
  return ModalRootTouchComponent;
}(React.Component);
var ModalRootTouch = (0, _withContext.withContext)((0, _withPlatform.withPlatform)((0, _dom.withDOM)((0, _useModalManager.withModalManager)(initModal)(ModalRootTouchComponent))), _ConfigProviderContext.ConfigProviderContext, 'configProvider');

/**
 * Инициализирует модалку перед анимацией открытия
 */
exports.ModalRootTouch = ModalRootTouch;
function initModal(modalState) {
  switch (modalState.type) {
    case _types.ModalType.PAGE:
      modalState.settlingHeight = modalState.settlingHeight || _constants.MODAL_PAGE_DEFAULT_PERCENT_HEIGHT;
      return initPageModal(modalState);
    case _types.ModalType.CARD:
      return initCardModal(modalState);
    default:
      IS_DEV && warn("initActiveModal: modalState.type=\"".concat(modalState.type, "\" \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F"), 'error');
  }
}
function initPageModal(modalState) {
  var _contentElement$clien;
  var contentElement = modalState.contentElement;
  var contentHeight = (contentElement === null || contentElement === void 0 ? void 0 : contentElement.firstElementChild).offsetHeight;
  var prevTranslateY = modalState.translateY;
  modalState.expandable = contentHeight > ((_contentElement$clien = contentElement === null || contentElement === void 0 ? void 0 : contentElement.clientHeight) !== null && _contentElement$clien !== void 0 ? _contentElement$clien : 0) || modalState.settlingHeight === 100;
  var collapsed = false;
  var expanded = false;
  var translateYFrom;
  var translateY;
  var expandedRange;
  var collapsedRange;
  var hiddenRange;
  if (modalState.expandable) {
    var _modalState$settlingH;
    translateYFrom = 100 - ((_modalState$settlingH = modalState.settlingHeight) !== null && _modalState$settlingH !== void 0 ? _modalState$settlingH : 0);
    var shiftHalf = translateYFrom / 2;
    var visiblePart = 100 - translateYFrom;
    expandedRange = [0, shiftHalf];
    collapsedRange = [shiftHalf, translateYFrom + visiblePart / 4];
    hiddenRange = [translateYFrom + visiblePart / 4, 100];
    collapsed = translateYFrom > 0;
    expanded = translateYFrom <= 0;
    translateY = translateYFrom;
  } else {
    var _modalState$headerEle2, _modalState$headerEle3, _modalState$innerElem5, _modalState$innerElem6, _modalState$innerElem7;
    var headerHeight = (_modalState$headerEle2 = (_modalState$headerEle3 = modalState.headerElement) === null || _modalState$headerEle3 === void 0 ? void 0 : _modalState$headerEle3.offsetHeight) !== null && _modalState$headerEle2 !== void 0 ? _modalState$headerEle2 : 0;
    var height = contentHeight + headerHeight;
    translateYFrom = 100 - height / ((_modalState$innerElem5 = (_modalState$innerElem6 = modalState.innerElement) === null || _modalState$innerElem6 === void 0 ? void 0 : (_modalState$innerElem7 = _modalState$innerElem6.parentElement) === null || _modalState$innerElem7 === void 0 ? void 0 : _modalState$innerElem7.offsetHeight) !== null && _modalState$innerElem5 !== void 0 ? _modalState$innerElem5 : 0) * 100;
    translateY = translateYFrom;
    expandedRange = [translateY, translateY + 25];
    collapsedRange = [translateY + 25, translateY + 25];
    hiddenRange = [translateY + 25, translateY + 100];
  }

  // Если модалка может открываться на весь экран, и новый сдвиг больше предыдущего, то откроем её на весь экран
  if (modalState.expandable && translateY > (prevTranslateY !== null && prevTranslateY !== void 0 ? prevTranslateY : 100) || modalState.settlingHeight === 100) {
    translateY = 0;
  }

  // Если модалка уже раскрыта обновляем состояния
  if (translateY === 0) {
    expanded = true;
    collapsed = false;
  }
  modalState.expandedRange = expandedRange;
  modalState.collapsedRange = collapsedRange;
  modalState.hiddenRange = hiddenRange;
  modalState.translateY = translateY;
  modalState.translateYFrom = translateYFrom;
  modalState.collapsed = collapsed;
  modalState.expanded = expanded;
}
function initCardModal(modalState) {
  modalState.translateY = 0;
}
//# sourceMappingURL=ModalRoot.js.map