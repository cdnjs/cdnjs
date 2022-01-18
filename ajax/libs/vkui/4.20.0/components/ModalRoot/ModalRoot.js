import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _createSuper from "@babel/runtime/helpers/createSuper";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["id"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { Touch } from "../Touch/Touch";
import TouchRootContext from "../Touch/TouchContext";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { setTransformStyle } from "../../lib/styles";
import { rubber } from "../../lib/touch";
import { isFunction } from "../../lib/utils";
import { ANDROID, IOS, VKCOM } from "../../lib/platform";
import { transitionEvent } from "../../lib/supportEvents";
import { withPlatform } from "../../hoc/withPlatform";
import { withContext } from "../../hoc/withContext";
import ModalRootContext from "./ModalRootContext";
import { ConfigProviderContext, WebviewType } from "../ConfigProvider/ConfigProviderContext";
import { ModalType } from "./types";
import { MODAL_PAGE_DEFAULT_PERCENT_HEIGHT } from "./constants";
import { withDOM } from "../../lib/dom";
import { getNavId } from "../../lib/getNavId";
import { warnOnce } from "../../lib/warnOnce";
import { FocusTrap } from "../FocusTrap/FocusTrap";
var warn = warnOnce('ModalRoot');
var IS_DEV = process.env.NODE_ENV === 'development';

function numberInRange(number, range) {
  return number >= range[0] && number <= range[1];
}

function rangeTranslate(number) {
  return Math.max(0, Math.min(98, number));
}

var ModalRootTouchComponent = /*#__PURE__*/function (_React$Component) {
  _inherits(ModalRootTouchComponent, _React$Component);

  var _super = _createSuper(ModalRootTouchComponent);

  function ModalRootTouchComponent(props) {
    var _this;

    _classCallCheck(this, ModalRootTouchComponent);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "modalsState", void 0);

    _defineProperty(_assertThisInitialized(_this), "documentScrolling", void 0);

    _defineProperty(_assertThisInitialized(_this), "activeTransitions", void 0);

    _defineProperty(_assertThisInitialized(_this), "maskElementRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "viewportRef", /*#__PURE__*/React.createRef());

    _defineProperty(_assertThisInitialized(_this), "maskAnimationFrame", void 0);

    _defineProperty(_assertThisInitialized(_this), "modalRootContext", void 0);

    _defineProperty(_assertThisInitialized(_this), "frameIds", void 0);

    _defineProperty(_assertThisInitialized(_this), "restoreFocusTo", void 0);

    _defineProperty(_assertThisInitialized(_this), "preventTouch", function (event) {
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

    _defineProperty(_assertThisInitialized(_this), "updateModalTranslate", function () {
      var activeModal = _this.state.activeModal || _this.state.nextModal;

      if (!activeModal) {
        return;
      }

      var modalState = _this.modalsState[activeModal];

      _this.animateTranslate(modalState, modalState.translateY);
    });

    _defineProperty(_assertThisInitialized(_this), "updateModalHeight", function () {
      var _this$state = _this.state,
          activeModal = _this$state.activeModal,
          nextModal = _this$state.nextModal;
      var modalId = activeModal || nextModal;
      var modalState = modalId ? _this.modalsState[modalId] : undefined;

      if (modalState && modalState.type === ModalType.PAGE && modalState.dynamicContentHeight) {
        if (_this.state.switching) {
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

    _defineProperty(_assertThisInitialized(_this), "onTouchMove", function (e) {
      if (_this.state.switching) {
        return;
      }

      var activeModal = _this.state.activeModal || _this.state.nextModal;

      if (!activeModal) {
        return;
      }

      var modalState = _this.modalsState[activeModal];

      if (modalState.type === ModalType.PAGE) {
        return _this.onPageTouchMove(e, modalState);
      }

      if (modalState.type === ModalType.CARD) {
        return _this.onCardTouchMove(e, modalState);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onTouchEnd", function (e) {
      var activeModal = _this.state.activeModal || _this.state.nextModal;

      if (!activeModal) {
        return;
      }

      var modalState = _this.modalsState[activeModal];

      if (modalState.type === ModalType.PAGE) {
        return _this.onPageTouchEnd(e, modalState);
      }

      if (modalState.type === ModalType.CARD) {
        return _this.onCardTouchEnd(e, modalState);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onScroll", function (e) {
      var activeModal = _this.state.activeModal;
      var target = e.target;

      if (!activeModal) {
        return;
      }

      var modalState = _this.modalsState[activeModal];

      if (modalState.type === ModalType.PAGE && modalState.contentElement.contains(target)) {
        modalState.contentScrolled = true;
        clearTimeout(modalState.contentScrollStopTimeout);
        modalState.contentScrollStopTimeout = setTimeout(function () {
          if (modalState.contentScrolled) {
            modalState.contentScrolled = false;
          }
        }, 250);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "prevNextSwitchEndHandler", function () {
      _this.activeTransitions = Math.max(0, _this.activeTransitions - 1);

      if (_this.activeTransitions > 0) {
        return;
      }

      var activeModal = _this.state.nextModal;
      var newState = {
        prevModal: null,
        nextModal: null,
        visibleModals: [activeModal],
        activeModal: activeModal,
        animated: false,
        switching: false
      };

      if (!activeModal) {
        newState.history = [];

        if (_this.restoreFocusTo) {
          _this.restoreFocusTo.focus();
        }
      }

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "triggerActiveModalClose", function () {
      var activeModalState = _this.modalsState[_this.state.activeModal];

      if (activeModalState) {
        _this.doCloseModal(activeModalState);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "doCloseModal", function (modalState) {
      // Сбрасываем состояния, которые могут помешать закрытию модального окна
      _this.setState({
        touchDown: false,
        switching: false
      });

      if (isFunction(modalState.onClose)) {
        modalState.onClose();
      } else if (isFunction(_this.props.onClose)) {
        _this.props.onClose(modalState.id);
      } else if (IS_DEV) {
        warn('onClose is undefined');
      }
    });

    var _activeModal = props.activeModal;
    _this.state = {
      activeModal: null,
      prevModal: null,
      nextModal: _activeModal,
      visibleModals: _activeModal ? [_activeModal] : [],
      animated: !!_activeModal,
      switching: false,
      history: _activeModal ? [_activeModal] : [],
      isBack: false,
      inited: false,
      touchDown: false,
      dragging: false
    };
    _this.activeTransitions = 0;
    _this.maskElementRef = /*#__PURE__*/React.createRef();

    _this.initModalsState();

    _this.modalRootContext = {
      updateModalHeight: _this.updateModalHeight,
      registerModal: function registerModal(_ref) {
        var id = _ref.id,
            data = _objectWithoutProperties(_ref, _excluded);

        return Object.assign(_this.modalsState[id], data);
      },
      onClose: _this.triggerActiveModalClose,
      isInsideModal: true
    };
    _this.frameIds = {};
    return _this;
  }

  _createClass(ModalRootTouchComponent, [{
    key: "timeout",
    get: function get() {
      return this.props.platform === ANDROID || this.props.platform === VKCOM ? 320 : 400;
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
    key: "getModals",
    value: function getModals() {
      return React.Children.toArray(this.props.children);
    }
  }, {
    key: "initModalsState",
    value: function initModalsState() {
      this.modalsState = this.getModals().reduce(function (acc, Modal) {
        var modalProps = Modal.props;
        var state = {
          id: getNavId(modalProps, warn),
          onClose: Modal.props.onClose,
          dynamicContentHeight: !!modalProps.dynamicContentHeight
        }; // ModalPage props

        if (typeof modalProps.settlingHeight === 'number') {
          state.settlingHeight = modalProps.settlingHeight;
        }

        acc[state.id] = state;
        return acc;
      }, {});
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initActiveModal();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.toggleDocumentScrolling(true);

      if (this.props.platform === IOS) {
        this.window.removeEventListener('resize', this.updateModalTranslate, false);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      if (this.props.activeModal !== prevProps.activeModal && !this.state.switching) {
        var nextModal = this.props.activeModal;
        var prevModal = prevProps.activeModal;

        if (IS_DEV && nextModal !== null && !this.modalsState[nextModal]) {
          return warn("[componentDidUpdate] nextModal ".concat(nextModal, " not found"));
        }

        var history = _toConsumableArray(this.state.history);

        var isBack = false;

        if (nextModal === null) {
          history = [];
        } else if (history.includes(nextModal)) {
          history = history.splice(0, history.indexOf(nextModal) + 1);
          isBack = true;
        } else {
          history.push(nextModal);
        }

        return this.setState({
          activeModal: null,
          nextModal: nextModal,
          prevModal: prevModal,
          visibleModals: [nextModal, prevModal],
          history: history,
          isBack: isBack,
          animated: true,
          inited: false,
          switching: false
        }, function () {
          if (nextModal === null) {
            _this2.closeActiveModal();
          } else {
            _this2.initActiveModal();
          }
        });
      }

      if (this.state.switching && !prevState.switching) {
        requestAnimationFrame(function () {
          return _this2.switchPrevNext();
        });
      }

      if (!this.state.activeModal && !this.state.prevModal && !this.state.nextModal) {
        this.toggleDocumentScrolling(true);
      } else {
        this.toggleDocumentScrolling(false);
      }
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
        // @ts-ignore (В интерфейсе EventListenerOptions нет поля passive)
        this.window.removeEventListener('touchmove', this.preventTouch, {
          passive: false
        });
      } else {
        this.window.addEventListener('touchmove', this.preventTouch, {
          passive: false
        });
      }
    }
  }, {
    key: "initActiveModal",
    value:
    /**
     * Инициализирует модалку перед анимацией открытия
     */
    function initActiveModal() {
      var activeModal = this.state.activeModal || this.state.nextModal;

      if (!activeModal) {
        return;
      }

      var modalState = this.modalsState[activeModal]; // Отслеживаем изменение размеров viewport (Необходимо для iOS)

      if (this.props.platform === IOS) {
        this.window.addEventListener('resize', this.updateModalTranslate, false);
      }

      switch (modalState.type) {
        case ModalType.PAGE:
          modalState.settlingHeight = modalState.settlingHeight || MODAL_PAGE_DEFAULT_PERCENT_HEIGHT;
          this.initPageModal(modalState);
          break;

        case ModalType.CARD:
          this.initCardModal(modalState);
          break;

        default:
          if (IS_DEV) {
            warn('[initActiveModal] modalState.type is unknown');
          }

      }

      this.setState({
        inited: true,
        switching: true
      });
    }
  }, {
    key: "initPageModal",
    value: function initPageModal(modalState) {
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
  }, {
    key: "initCardModal",
    value: function initCardModal(modalState) {
      modalState.translateY = 0;
    }
  }, {
    key: "checkPageContentHeight",
    value: function checkPageContentHeight() {
      var _this$state2 = this.state,
          activeModal = _this$state2.activeModal,
          nextModal = _this$state2.nextModal;
      var modalId = activeModal || nextModal;
      var modalState = this.modalsState[modalId];

      if ((modalState === null || modalState === void 0 ? void 0 : modalState.type) === ModalType.PAGE && modalState !== null && modalState !== void 0 && modalState.modalElement) {
        var prevModalState = _objectSpread({}, modalState);

        this.initPageModal(modalState);

        var currentModalState = _objectSpread({}, modalState);

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
    key: "closeActiveModal",
    value: function closeActiveModal() {
      // Сбрасываем состояния, которые могут помешать закрытию модального окна
      this.setState({
        touchDown: false,
        switching: false
      });

      if (this.props.platform === IOS) {
        this.window.removeEventListener('resize', this.updateModalTranslate, false);
      }

      var prevModal = this.state.prevModal;

      if (!prevModal) {
        return warn("[closeActiveModal] prevModal is ".concat(prevModal));
      }

      var prevModalState = this.modalsState[prevModal];
      this.waitTransitionFinish(prevModalState, this.prevNextSwitchEndHandler);
      this.animateTranslate(prevModalState, 100);
      this.setMaskOpacity(prevModalState, 0);
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
        var shiftYCurrent = rubber(shiftYPercent, 72, 0.8, this.props.platform === ANDROID || this.props.platform === VKCOM);
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
        var shiftYCurrent = rubber(shiftYPercent, 72, 1.2, this.props.platform === ANDROID || this.props.platform === VKCOM);
        modalState.touchShiftYPercent = shiftYPercent;
        modalState.translateYCurrent = Math.max(0, modalState.translateY + shiftYCurrent);
        this.animateTranslate(modalState, modalState.translateYCurrent);
        this.setMaskOpacity(modalState);
      }
    }
  }, {
    key: "onPageTouchEnd",
    value: function onPageTouchEnd(event, modalState) {
      var _this3 = this;

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
          this.doCloseModal(modalState);
        }

        setStateCallback = function setStateCallback() {
          if (!modalState.hidden) {
            _this3.animateTranslate(modalState, modalState.translateY);
          }

          _this3.setMaskOpacity(modalState);
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
      var _this4 = this;

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
          this.doCloseModal(modalState);
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
    key: "waitTransitionFinish",
    value: function waitTransitionFinish(modalState, eventHandler) {
      if (transitionEvent.supported) {
        var onceHandler = function onceHandler() {
          modalState.innerElement.removeEventListener(transitionEvent.name, onceHandler);
          eventHandler();
        };

        modalState.innerElement.addEventListener(transitionEvent.name, onceHandler);
      } else {
        setTimeout(eventHandler, this.timeout);
      }
    }
  }, {
    key: "switchPrevNext",
    value: function switchPrevNext() {
      var _this5 = this;

      var _this$state3 = this.state,
          prevModal = _this$state3.prevModal,
          nextModal = _this$state3.nextModal;
      var prevModalState = this.modalsState[prevModal];
      var nextModalState = this.modalsState[nextModal];

      if (IS_DEV && !prevModalState && !nextModalState) {
        return warn("[switchPrevNext] prevModal is ".concat(prevModal, ", nextModal is ").concat(nextModal));
      }

      var prevIsPage = !!prevModalState && prevModalState.type === ModalType.PAGE;
      var prevIsCard = !!prevModalState && prevModalState.type === ModalType.CARD;
      var nextIsPage = !!nextModalState && nextModalState.type === ModalType.PAGE;
      var nextIsCard = !!nextModalState && nextModalState.type === ModalType.CARD; // Ждём полного скрытия предыдущей модалки

      if (prevModalState && (nextIsCard || prevIsCard && nextIsPage)) {
        this.waitTransitionFinish(prevModalState, function () {
          _this5.activeTransitions += 1;

          _this5.waitTransitionFinish(nextModalState, _this5.prevNextSwitchEndHandler);

          _this5.animateTranslate(nextModalState, nextModalState.translateY);
        });
        return this.animateTranslate(prevModalState, 100);
      }

      if (prevModalState && nextIsPage) {
        this.activeTransitions += 1;
        this.waitTransitionFinish(prevModalState, this.prevNextSwitchEndHandler);

        if (prevIsPage && prevModalState.translateY <= nextModalState.translateYFrom && !this.state.isBack) {
          this.animateTranslate(prevModalState, nextModalState.translateYFrom + 10);
        } else {
          this.animateTranslate(prevModalState, 100);
        }
      }

      if (!prevModal && this.document.activeElement) {
        this.restoreFocusTo = this.document.activeElement;
      }

      this.activeTransitions += 1;
      this.waitTransitionFinish(nextModalState, this.prevNextSwitchEndHandler);
      this.animateTranslate(nextModalState, nextModalState.translateY);
    }
  }, {
    key: "animateTranslate",
    value:
    /**
     * Анимирует сдвиг модалки
     *
     * @param {ModalsStateEntry} modalState
     * @param {number} percent Процент сдвига: 0 – полностью открыта, 100 – полностью закрыта
     */
    function animateTranslate(modalState, percent) {
      var frameId = "animateTranslateFrame".concat(modalState.id);
      cancelAnimationFrame(this.frameIds[frameId]);
      this.frameIds[frameId] = requestAnimationFrame(function () {
        setTransformStyle(modalState.innerElement, "translate3d(0, ".concat(percent, "%, 0)"));

        if (modalState.type === ModalType.PAGE && modalState.footerElement) {
          var footerHeight = modalState.footerElement.offsetHeight;
          var factor = modalState.innerElement.offsetHeight * (percent / 100);
          setTransformStyle(modalState.footerElement, "translateY(calc(".concat(footerHeight, "px * -").concat(factor / footerHeight, "))"));
        }
      });
    }
    /* Устанавливает прозрачность для полупрозрачной подложки */

  }, {
    key: "setMaskOpacity",
    value: function setMaskOpacity(modalState) {
      var _this6 = this;

      var forceOpacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (forceOpacity === null && this.state.history[0] !== modalState.id) {
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
    /**
     * Закрывает текущую модалку
     */

  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var _this$state4 = this.state,
          prevModal = _this$state4.prevModal,
          activeModal = _this$state4.activeModal,
          nextModal = _this$state4.nextModal,
          visibleModals = _this$state4.visibleModals,
          animated = _this$state4.animated,
          touchDown = _this$state4.touchDown,
          dragging = _this$state4.dragging,
          switching = _this$state4.switching;

      if (!activeModal && !prevModal && !nextModal && !animated) {
        return null;
      }

      return createScopedElement(TouchRootContext.Provider, {
        value: true
      }, createScopedElement(ModalRootContext.Provider, {
        value: this.modalRootContext
      }, createScopedElement(Touch, {
        vkuiClass: classNames(getClassName('ModalRoot', this.props.platform), {
          'ModalRoot--vkapps': this.props.configProvider.webviewType === WebviewType.VKAPPS,
          'ModalRoot--touched': touchDown,
          'ModalRoot--switching': switching
        }),
        onMove: this.onTouchMove,
        onEnd: this.onTouchEnd,
        onScroll: this.onScroll
      }, createScopedElement("div", {
        vkuiClass: "ModalRoot__mask",
        onClick: this.triggerActiveModalClose,
        ref: this.maskElementRef
      }), createScopedElement("div", {
        vkuiClass: "ModalRoot__viewport",
        ref: this.viewportRef
      }, this.getModals().map(function (Modal) {
        var modalId = getNavId(Modal.props, warn);

        if (!visibleModals.includes(modalId)) {
          return null;
        }

        var modalState = _objectSpread({}, _this7.modalsState[modalId]);

        var isPage = modalState.type === ModalType.PAGE;
        var key = "modal-".concat(modalId);
        return createScopedElement(FocusTrap, {
          key: key,
          getRootRef: function getRootRef(e) {
            return _this7.modalsState[modalId].modalElement = e;
          },
          onClose: _this7.triggerActiveModalClose,
          timeout: _this7.timeout,
          vkuiClass: classNames('ModalRoot__modal', {
            'ModalRoot__modal--active': modalId === activeModal,
            'ModalRoot__modal--prev': modalId === prevModal,
            'ModalRoot__modal--next': modalId === nextModal,
            'ModalRoot__modal--dragging': dragging,
            'ModalRoot__modal--expandable': isPage && modalState.expandable,
            'ModalRoot__modal--expanded': isPage && modalState.expanded,
            'ModalRoot__modal--collapsed': isPage && modalState.collapsed
          }),
          restoreFocus: false
        }, Modal);
      })))));
    }
  }]);

  return ModalRootTouchComponent;
}(React.Component);

export var ModalRootTouch = withContext(withPlatform(withDOM(ModalRootTouchComponent)), ConfigProviderContext, 'configProvider');
//# sourceMappingURL=ModalRoot.js.map