"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalRootTouch = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

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

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _styles = require("../../lib/styles");

var _touch = require("../../lib/touch");

var _platform = require("../../lib/platform");

var _supportEvents = require("../../lib/supportEvents");

var _withPlatform = require("../../hoc/withPlatform");

var _withContext = require("../../hoc/withContext");

var _ModalRootContext = _interopRequireDefault(require("./ModalRootContext"));

var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");

var _types = require("./types");

var _constants = require("./constants");

var _dom = require("../../lib/dom");

var _getNavId = require("../../lib/getNavId");

var _warnOnce = require("../../lib/warnOnce");

var _FocusTrap = require("../FocusTrap/FocusTrap");

var _useModalManager = require("./useModalManager");

var _excluded = ["id"];
var warn = (0, _warnOnce.warnOnce)("ModalRoot");
var IS_DEV = process.env.NODE_ENV === "development";

function numberInRange(number, range) {
  return number >= range[0] && number <= range[1];
}

function rangeTranslate(number) {
  return Math.max(0, Math.min(98, number));
}

var ModalRootTouchComponent = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(ModalRootTouchComponent, _React$Component);

  var _super = (0, _createSuper2.default)(ModalRootTouchComponent);

  function ModalRootTouchComponent(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ModalRootTouchComponent);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "documentScrolling", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "maskElementRef", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "viewportRef", /*#__PURE__*/React.createRef());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "maskAnimationFrame", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "modalRootContext", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "frameIds", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "restoreFocusTo", void 0);
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

      if (modalState.type === _types.ModalType.PAGE) {
        return _this.onPageTouchEnd(e, modalState);
      }

      if (modalState.type === _types.ModalType.CARD) {
        return _this.onCardTouchEnd(e, modalState);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onScroll", function (e) {
      var activeModal = _this.props.activeModal;
      var target = e.target;

      if (!activeModal) {
        return;
      }

      var modalState = _this.getModalState(activeModal);

      if (modalState.type === _types.ModalType.PAGE && modalState.contentElement.contains(target)) {
        modalState.contentScrolled = true;
        clearTimeout(modalState.contentScrollStopTimeout);
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
        var id = _ref.id,
            data = (0, _objectWithoutProperties2.default)(_ref, _excluded);
        return Object.assign(_this.getModalState(id), data);
      },
      onClose: function onClose() {
        return _this.props.closeActiveModal();
      },
      isInsideModal: true
    };
    _this.frameIds = {};
    return _this;
  }

  (0, _createClass2.default)(ModalRootTouchComponent, [{
    key: "timeout",
    get: function get() {
      return this.props.platform === _platform.ANDROID || this.props.platform === _platform.VKCOM ? 320 : 400;
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
      if (this.props.platform === _platform.IOS) {
        this.window.addEventListener("resize", this.updateModalTranslate, false);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.toggleDocumentScrolling(true);
      this.window.removeEventListener("resize", this.updateModalTranslate, false);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      // transition phase 2: animate exiting modal
      if (this.props.exitingModal && this.props.exitingModal !== prevProps.exitingModal) {
        this.closeModal(this.props.exitingModal);
      } // transition phase 3: animate entering modal


      if (this.props.enteringModal && this.props.enteringModal !== prevProps.enteringModal) {
        var enteringModal = this.props.enteringModal;
        var enteringState = this.getModalState(enteringModal);
        this.waitTransitionFinish(enteringState, function () {
          enteringState.innerElement.style.transitionDelay = null;

          _this2.props.onEnter(enteringModal);
        });
        enteringState.innerElement.style.transitionDelay = this.props.delayEnter ? "".concat(this.timeout, "ms") : null;
        this.animateTranslate(enteringState, enteringState.translateY);
      } // focus restoration


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
        this.window.removeEventListener("touchmove", this.preventTouch, {
          // @ts-ignore (В интерфейсе EventListenerOptions нет поля passive)
          passive: false
        });
      } else {
        this.window.addEventListener("touchmove", this.preventTouch, {
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
      var _this3 = this;

      // Сбрасываем состояния, которые могут помешать закрытию модального окна
      this.setState({
        touchDown: false
      });
      var prevModalState = this.getModalState(id);

      if (!prevModalState) {
        id && warn("[closeActiveModal] Modal ".concat(id, " does not exist - not closing"));
        return;
      }

      var nextModalState = this.getModalState(this.props.activeModal);
      var nextIsPage = !!nextModalState && nextModalState.type === _types.ModalType.PAGE;
      var prevIsPage = !!prevModalState && prevModalState.type === _types.ModalType.PAGE;
      this.waitTransitionFinish(prevModalState, function () {
        return _this3.props.onExit(id);
      });
      var exitTranslate = prevIsPage && nextIsPage && prevModalState.translateY <= nextModalState.translateYFrom && !this.props.isBack ? nextModalState.translateYFrom + 10 : 100;
      this.animateTranslate(prevModalState, exitTranslate);

      if (!nextModalState) {
        // NOTE: was only for clean exit
        this.setMaskOpacity(prevModalState, 0);
      }
    }
  }, {
    key: "onPageTouchMove",
    value: function onPageTouchMove(event, modalState) {
      var shiftY = event.shiftY,
          originalEvent = event.originalEvent;
      var target = originalEvent.target;

      if (!event.isY) {
        if (this.viewportRef.current.contains(target)) {
          originalEvent.preventDefault();
        }

        return;
      }

      if (!modalState.innerElement.contains(target)) {
        return originalEvent.preventDefault();
      }

      originalEvent.stopPropagation();
      var expandable = modalState.expandable,
          contentScrolled = modalState.contentScrolled,
          collapsed = modalState.collapsed,
          expanded = modalState.expanded;

      if (!this.state.touchDown) {
        modalState.touchStartContentScrollTop = modalState.contentElement.scrollTop;
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

      if (!modalState.expandable || collapsed || expanded && modalState.touchMovePositive && modalState.touchStartContentScrollTop === 0 || modalState.headerElement.contains(target)) {
        originalEvent.preventDefault();

        if (!expandable && shiftY < 0) {
          return;
        }

        !this.state.dragging && this.setState({
          dragging: true
        });
        var shiftYPercent = shiftY / this.window.innerHeight * 100;
        var shiftYCurrent = (0, _touch.rubber)(shiftYPercent, 72, 0.8, this.props.platform === _platform.ANDROID || this.props.platform === _platform.VKCOM);
        modalState.touchShiftYPercent = shiftYPercent;
        modalState.translateYCurrent = rangeTranslate(modalState.translateY + shiftYCurrent);
        this.animateTranslate(modalState, modalState.translateYCurrent);
        this.setMaskOpacity(modalState);
      }
    }
  }, {
    key: "onCardTouchMove",
    value: function onCardTouchMove(event, modalState) {
      var originalEvent = event.originalEvent,
          shiftY = event.shiftY;
      var target = originalEvent.target;

      if (modalState.innerElement.contains(target)) {
        if (!this.state.touchDown) {
          this.setState({
            touchDown: true,
            dragging: true
          });
        }

        var shiftYPercent = shiftY / modalState.innerElement.offsetHeight * 100;
        var shiftYCurrent = (0, _touch.rubber)(shiftYPercent, 72, 1.2, this.props.platform === _platform.ANDROID || this.props.platform === _platform.VKCOM);
        modalState.touchShiftYPercent = shiftYPercent;
        modalState.translateYCurrent = Math.max(0, modalState.translateY + shiftYCurrent);
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

      if (this.state.dragging) {
        var shiftYEndPercent = (startY + shiftY) / this.window.innerHeight * 100;
        var translateY = modalState.translateYCurrent;
        var expectTranslateY = translateY / event.duration * 240 * 0.6 * (modalState.touchShiftYPercent < 0 ? -1 : 1);
        translateY = rangeTranslate(translateY + expectTranslateY);

        if (modalState.settlingHeight !== 100) {
          if (numberInRange(translateY, modalState.expandedRange)) {
            translateY = modalState.expandedRange[0];
          } else if (numberInRange(translateY, modalState.collapsedRange)) {
            translateY = modalState.translateYFrom;
          } else if (numberInRange(translateY, modalState.hiddenRange)) {
            translateY = 100;
          } else {
            translateY = modalState.translateYFrom;
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
          this.props.closeActiveModal();
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
        var translateY = modalState.translateYCurrent;
        var expectTranslateY = translateY / duration * 240 * 0.6 * (modalState.touchShiftYPercent < 0 ? -1 : 1);
        translateY = Math.max(0, translateY + expectTranslateY);

        if (translateY >= 30) {
          translateY = 100;
        } else {
          translateY = 0;
        }

        modalState.translateY = translateY;
        modalState.hidden = translateY === 100;

        if (modalState.hidden) {
          this.props.closeActiveModal();
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
        var onceHandler = function onceHandler() {
          modalState === null || modalState === void 0 ? void 0 : modalState.innerElement.removeEventListener(_supportEvents.transitionEvent.name, onceHandler);
          eventHandler();
        };

        modalState === null || modalState === void 0 ? void 0 : modalState.innerElement.addEventListener(_supportEvents.transitionEvent.name, onceHandler);
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
      var _this6 = this;

      var forceOpacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (forceOpacity === null && this.props.history[0] !== modalState.id) {
        return;
      }

      cancelAnimationFrame(this.maskAnimationFrame);
      this.maskAnimationFrame = requestAnimationFrame(function () {
        if (_this6.maskElementRef.current) {
          var translateY = modalState.translateY,
              translateYCurrent = modalState.translateYCurrent;
          var opacity = forceOpacity === null ? 1 - (translateYCurrent - translateY) / (100 - translateY) || 0 : forceOpacity;
          _this6.maskElementRef.current.style.opacity = Math.max(0, Math.min(100, opacity)).toString();
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

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

      return (0, _jsxRuntime.createScopedElement)(_TouchContext.default.Provider, {
        value: true
      }, (0, _jsxRuntime.createScopedElement)(_ModalRootContext.default.Provider, {
        value: this.modalRootContext
      }, (0, _jsxRuntime.createScopedElement)(_Touch.Touch, {
        vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("ModalRoot", this.props.platform), {
          "ModalRoot--vkapps": this.props.configProvider.webviewType === _ConfigProviderContext.WebviewType.VKAPPS,
          "ModalRoot--touched": touchDown,
          "ModalRoot--switching": !!(enteringModal || exitingModal)
        }),
        onMove: this.onTouchMove,
        onEnd: this.onTouchEnd,
        onScroll: this.onScroll
      }, (0, _jsxRuntime.createScopedElement)("div", {
        vkuiClass: "ModalRoot__mask",
        onClick: this.props.closeActiveModal,
        ref: this.maskElementRef
      }), (0, _jsxRuntime.createScopedElement)("div", {
        vkuiClass: "ModalRoot__viewport",
        ref: this.viewportRef
      }, this.getModals().map(function (Modal) {
        var modalId = (0, _getNavId.getNavId)(Modal.props, warn);

        if (modalId !== activeModal && modalId !== exitingModal) {
          return null;
        }

        var modalState = (0, _objectSpread2.default)({}, _this7.getModalState(modalId));
        var isPage = modalState.type === _types.ModalType.PAGE;
        var key = "modal-".concat(modalId);
        return (0, _jsxRuntime.createScopedElement)(_FocusTrap.FocusTrap, {
          key: key,
          getRootRef: function getRootRef(e) {
            return _this7.getModalState(modalId).modalElement = e;
          },
          onClose: _this7.props.closeActiveModal,
          timeout: _this7.timeout,
          vkuiClass: (0, _classNames.classNames)("ModalRoot__modal", {
            "ModalRoot__modal--active": modalId === activeModal,
            "ModalRoot__modal--prev": modalId === exitingModal,
            "ModalRoot__modal--next": exitingModal && modalId === activeModal || modalId === enteringModal,
            "ModalRoot__modal--dragging": dragging,
            "ModalRoot__modal--expandable": isPage && modalState.expandable,
            "ModalRoot__modal--expanded": isPage && modalState.expanded,
            "ModalRoot__modal--collapsed": isPage && modalState.collapsed
          }),
          restoreFocus: false
        }, Modal);
      })))));
    }
  }]);
  return ModalRootTouchComponent;
}(React.Component);

var ModalRootTouch = (0, _withContext.withContext)((0, _withPlatform.withPlatform)((0, _dom.withDOM)((0, _useModalManager.withModalManager)(initModal)(ModalRootTouchComponent))), _ConfigProviderContext.ConfigProviderContext, "configProvider");
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
      IS_DEV && warn("[initActiveModal] modalState.type is unknown");
  }
}

function initPageModal(modalState) {
  var contentElement = modalState.contentElement;
  var contentHeight = contentElement.firstElementChild.offsetHeight;
  var prevTranslateY = modalState.translateY;
  modalState.expandable = contentHeight > contentElement.clientHeight || modalState.settlingHeight === 100;
  var collapsed = false;
  var expanded = false;
  var translateYFrom;
  var translateY;
  var expandedRange;
  var collapsedRange;
  var hiddenRange;

  if (modalState.expandable) {
    translateYFrom = 100 - modalState.settlingHeight;
    var shiftHalf = translateYFrom / 2;
    var visiblePart = 100 - translateYFrom;
    expandedRange = [0, shiftHalf];
    collapsedRange = [shiftHalf, translateYFrom + visiblePart / 4];
    hiddenRange = [translateYFrom + visiblePart / 4, 100];
    collapsed = translateYFrom > 0;
    expanded = translateYFrom <= 0;
    translateY = translateYFrom;
  } else {
    var headerHeight = modalState.headerElement.offsetHeight;
    var height = contentHeight + headerHeight;
    translateYFrom = 100 - height / modalState.innerElement.parentElement.offsetHeight * 100;
    translateY = translateYFrom;
    expandedRange = [translateY, translateY + 25];
    collapsedRange = [translateY + 25, translateY + 25];
    hiddenRange = [translateY + 25, translateY + 100];
  } // Если модалка может открываться на весь экран, и новый сдвиг больше предыдущего, то откроем её на весь экран


  if (modalState.expandable && translateY > prevTranslateY || modalState.settlingHeight === 100) {
    translateY = 0;
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