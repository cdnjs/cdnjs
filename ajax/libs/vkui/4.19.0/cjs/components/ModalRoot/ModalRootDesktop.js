"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalRootDesktop = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _classNames = require("../../lib/classNames");

var _utils = require("../../lib/utils");

var _supportEvents = require("../../lib/supportEvents");

var _withPlatform = require("../../hoc/withPlatform");

var _withContext = require("../../hoc/withContext");

var _ModalRootContext = _interopRequireDefault(require("./ModalRootContext"));

var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");

var _types = require("./types");

var _platform = require("../../lib/platform");

var _getClassName = require("../../helpers/getClassName");

var _dom = require("../../lib/dom");

var _getNavId = require("../../lib/getNavId");

var _warnOnce = require("../../lib/warnOnce");

var _excluded = ["id"];
var warn = (0, _warnOnce.warnOnce)('ModalRoot');
var IS_DEV = process.env.NODE_ENV === 'development';

var ModalRootDesktopComponent = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(ModalRootDesktopComponent, _React$Component);

  var _super = (0, _createSuper2.default)(ModalRootDesktopComponent);

  function ModalRootDesktopComponent(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ModalRootDesktopComponent);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "modalsState", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "maskElementRef", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "maskAnimationFrame", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "modalRootContext", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "activeTransitions", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleKeyDownEsc", function (e) {
      if (e.key === 'Escape') {
        _this.triggerActiveModalClose();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "componentWillUnmount", function () {
      _this.props.document.removeEventListener('keydown', _this.handleKeyDownEsc);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "prevNextSwitchEndHandler", function () {
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
      }

      _this.setState(newState);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "triggerActiveModalClose", function () {
      var activeModalState = _this.modalsState[_this.state.activeModal];

      if (activeModalState) {
        _this.doCloseModal(activeModalState);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "doCloseModal", function (modalState) {
      if ((0, _utils.isFunction)(modalState.onClose)) {
        modalState.onClose();
      } else if ((0, _utils.isFunction)(_this.props.onClose)) {
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
      inited: false
    };
    _this.maskElementRef = /*#__PURE__*/React.createRef();
    _this.activeTransitions = 0;

    _this.initModalsState();

    _this.modalRootContext = {
      updateModalHeight: function updateModalHeight() {
        return undefined;
      },
      registerModal: function registerModal(_ref) {
        var id = _ref.id,
            data = (0, _objectWithoutProperties2.default)(_ref, _excluded);
        return Object.assign(_this.modalsState[id], data);
      },
      onClose: _this.triggerActiveModalClose,
      isInsideModal: true
    };
    return _this;
  }

  (0, _createClass2.default)(ModalRootDesktopComponent, [{
    key: "modals",
    get: function get() {
      return React.Children.toArray(this.props.children);
    }
  }, {
    key: "initModalsState",
    value: function initModalsState() {
      this.modalsState = this.modals.reduce(function (acc, Modal) {
        var modalProps = Modal.props;
        var state = {
          id: (0, _getNavId.getNavId)(Modal.props, warn),
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
      this.props.document.addEventListener('keydown', this.handleKeyDownEsc);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      if (this.props.activeModal !== prevProps.activeModal) {
        var nextModal = this.props.activeModal;
        var prevModal = prevProps.activeModal;

        if (IS_DEV && nextModal !== null && !this.modalsState[nextModal]) {
          return warn("[ModalRoot.componentDidUpdate] nextModal ".concat(nextModal, " not found"));
        }

        var history = (0, _toConsumableArray2.default)(this.state.history);
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
    }
    /**
     * Инициализирует модалку перед анимацией открытия
     */

  }, {
    key: "initActiveModal",
    value: function initActiveModal() {
      var activeModal = this.state.activeModal || this.state.nextModal;

      if (!activeModal) {
        return;
      }

      var modalState = this.modalsState[activeModal];

      switch (modalState.type) {
        case _types.ModalType.PAGE:
          modalState.settlingHeight = modalState.settlingHeight || 75;
          break;

        case _types.ModalType.CARD:
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
    key: "closeActiveModal",
    value: function closeActiveModal() {
      var prevModal = this.state.prevModal;

      if (IS_DEV && !prevModal) {
        return warn("[closeActiveModal] prevModal is ".concat(prevModal));
      }

      var prevModalState = this.modalsState[prevModal];
      this.waitTransitionFinish(prevModalState, this.prevNextSwitchEndHandler);
      this.animateModalOpacity(prevModalState, false);
      this.setMaskOpacity(prevModalState, 0);
    }
  }, {
    key: "waitTransitionFinish",
    value: function waitTransitionFinish(modalState, eventHandler) {
      if (_supportEvents.transitionEvent.supported) {
        var onceHandler = function onceHandler() {
          modalState.innerElement.removeEventListener(_supportEvents.transitionEvent.name, onceHandler);
          eventHandler();
        };

        modalState.innerElement.addEventListener(_supportEvents.transitionEvent.name, onceHandler);
      } else {
        setTimeout(eventHandler, this.props.platform === _platform.ANDROID || this.props.platform === _platform.VKCOM ? 320 : 400);
      }
    }
  }, {
    key: "switchPrevNext",
    value: function switchPrevNext() {
      var _this3 = this;

      var _this$state = this.state,
          prevModal = _this$state.prevModal,
          nextModal = _this$state.nextModal;
      var prevModalState = this.modalsState[prevModal];
      var nextModalState = this.modalsState[nextModal];

      if (IS_DEV && !prevModalState && !nextModalState) {
        return warn("[switchPrevNext] prevModal is ".concat(prevModal, ", nextModal is ").concat(nextModal));
      }

      var prevIsCard = !!prevModalState && prevModalState.type === _types.ModalType.CARD;
      var nextIsPage = !!nextModalState && nextModalState.type === _types.ModalType.PAGE;
      var nextIsCard = !!nextModalState && nextModalState.type === _types.ModalType.CARD; // Ждём полного скрытия предыдущей модалки

      if (prevModalState && (nextIsCard || prevIsCard && nextIsPage)) {
        this.activeTransitions += 1;
        this.waitTransitionFinish(prevModalState, function () {
          _this3.waitTransitionFinish(nextModalState, _this3.prevNextSwitchEndHandler);

          _this3.animateModalOpacity(nextModalState, true);
        });
        requestAnimationFrame(function () {
          _this3.animateModalOpacity(prevModalState, false);
        });
        return;
      }

      if (prevModalState && nextIsPage) {
        this.activeTransitions += 1;
        this.waitTransitionFinish(prevModalState, this.prevNextSwitchEndHandler);
        requestAnimationFrame(function () {
          _this3.animateModalOpacity(prevModalState, false);
        });
      }

      this.activeTransitions += 1;
      this.waitTransitionFinish(nextModalState, this.prevNextSwitchEndHandler);
      requestAnimationFrame(function () {
        _this3.animateModalOpacity(nextModalState, true);
      });
    }
  }, {
    key: "animateModalOpacity",
    value:
    /* Анимирует сдивг модалки */
    function animateModalOpacity(modalState, display) {
      modalState.innerElement.style.opacity = display ? '1' : '0';
    }
    /* Устанавливает прозрачность для полупрозрачной подложки */

  }, {
    key: "setMaskOpacity",
    value: function setMaskOpacity(modalState) {
      var _this4 = this;

      var forceOpacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (forceOpacity === null && this.state.history[0] !== modalState.id) {
        return;
      }

      cancelAnimationFrame(this.maskAnimationFrame);
      this.maskAnimationFrame = requestAnimationFrame(function () {
        if (_this4.maskElementRef.current) {
          var translateY = modalState.translateY,
              translateYCurrent = modalState.translateYCurrent;
          var opacity = forceOpacity === null ? 1 - (translateYCurrent - translateY) / (100 - translateY) || 0 : forceOpacity;
          _this4.maskElementRef.current.style.opacity = Math.max(0, Math.min(100, opacity)).toString();
        }
      });
    }
    /**
     * Закрывает текущую модалку
     */

  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          prevModal = _this$state2.prevModal,
          activeModal = _this$state2.activeModal,
          nextModal = _this$state2.nextModal,
          visibleModals = _this$state2.visibleModals,
          animated = _this$state2.animated;

      if (!activeModal && !prevModal && !nextModal && !animated) {
        return null;
      }

      return (0, _jsxRuntime.createScopedElement)(_ModalRootContext.default.Provider, {
        value: this.modalRootContext
      }, (0, _jsxRuntime.createScopedElement)("div", {
        vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('ModalRoot', this.props.platform), {
          'ModalRoot--vkapps': this.props.configProvider.webviewType === _ConfigProviderContext.WebviewType.VKAPPS
        }, 'ModalRoot--desktop')
      }, (0, _jsxRuntime.createScopedElement)("div", {
        vkuiClass: "ModalRoot__mask",
        onClick: this.triggerActiveModalClose,
        ref: this.maskElementRef
      }), (0, _jsxRuntime.createScopedElement)("div", {
        vkuiClass: "ModalRoot__viewport"
      }, this.modals.map(function (Modal) {
        var modalId = (0, _getNavId.getNavId)(Modal.props, warn);

        if (!visibleModals.includes(modalId)) {
          return null;
        }

        var key = "modal-".concat(modalId);
        return (0, _jsxRuntime.createScopedElement)("div", {
          key: key,
          vkuiClass: (0, _classNames.classNames)('ModalRoot__modal', {
            'ModalRoot__modal--active': modalId === activeModal,
            'ModalRoot__modal--prev': modalId === prevModal,
            'ModalRoot__modal--next': modalId === nextModal
          })
        }, Modal);
      }))));
    }
  }]);
  return ModalRootDesktopComponent;
}(React.Component);

var ModalRootDesktop = (0, _withContext.withContext)((0, _withPlatform.withPlatform)((0, _dom.withDOM)(ModalRootDesktopComponent)), _ConfigProviderContext.ConfigProviderContext, 'configProvider');
exports.ModalRootDesktop = ModalRootDesktop;
//# sourceMappingURL=ModalRootDesktop.js.map