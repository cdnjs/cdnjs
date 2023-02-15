"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalRootDesktop = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _supportEvents = require("../../lib/supportEvents");
var _withPlatform = require("../../hoc/withPlatform");
var _withContext = require("../../hoc/withContext");
var _ModalRootContext = require("./ModalRootContext");
var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
var _platform = require("../../lib/platform");
var _dom = require("../../lib/dom");
var _getNavId = require("../../lib/getNavId");
var _warnOnce = require("../../lib/warnOnce");
var _FocusTrap = require("../FocusTrap/FocusTrap");
var _useModalManager = require("./useModalManager");
var _math = require("../../helpers/math");
var _excluded = ["id"];
var warn = (0, _warnOnce.warnOnce)('ModalRoot');
var ModalRootDesktopComponent = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(ModalRootDesktopComponent, _React$Component);
  var _super = (0, _createSuper2.default)(ModalRootDesktopComponent);
  function ModalRootDesktopComponent(props) {
    var _this;
    (0, _classCallCheck2.default)(this, ModalRootDesktopComponent);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "maskElementRef", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "maskAnimationFrame", undefined);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "modalRootContext", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "restoreFocusTo", undefined);
    _this.maskElementRef = /*#__PURE__*/React.createRef();
    _this.modalRootContext = {
      updateModalHeight: function updateModalHeight() {
        return undefined;
      },
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
    return _this;
  }
  (0, _createClass2.default)(ModalRootDesktopComponent, [{
    key: "timeout",
    get: function get() {
      return this.props.platform === _platform.Platform.IOS ? 400 : 320;
    }
  }, {
    key: "modals",
    get: function get() {
      return React.Children.toArray(this.props.children);
    }
  }, {
    key: "getModalState",
    value: function getModalState(id) {
      if (id === null) {
        return undefined;
      }
      return this.props.getModalState(id);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // transition phase 2: animate exiting modal
      if (this.props.exitingModal && this.props.exitingModal !== prevProps.exitingModal) {
        this.closeModal(this.props.exitingModal);
      }

      // transition phase 3: animate entering modal
      if (this.props.enteringModal && this.props.enteringModal !== prevProps.enteringModal) {
        this.openModal(prevProps);
      }

      // focus restoration
      if (this.props.activeModal && !prevProps.activeModal) {
        var _this$props$document$, _this$props$document;
        this.restoreFocusTo = (_this$props$document$ = (_this$props$document = this.props.document) === null || _this$props$document === void 0 ? void 0 : _this$props$document.activeElement) !== null && _this$props$document$ !== void 0 ? _this$props$document$ : undefined;
      }
      if (!this.props.activeModal && !this.props.exitingModal && this.restoreFocusTo) {
        this.restoreFocusTo.focus();
        this.restoreFocusTo = undefined;
      }
    }
  }, {
    key: "openModal",
    value: function openModal(prevProps) {
      var _this2 = this;
      var enteringModal = this.props.enteringModal;
      if (!enteringModal) {
        return;
      }
      var enteringState = this.getModalState(enteringModal);
      this.props.onEnter();

      // Анимация открытия модального окна
      if (!prevProps.exitingModal) {
        requestAnimationFrame(function () {
          if (_this2.props.enteringModal === enteringModal) {
            _this2.waitTransitionFinish(enteringState, function () {
              return _this2.props.onEntered(enteringModal);
            });
            _this2.animateModalOpacity(enteringState, true);
          }
        });
        return;
      }

      // Переход между модальными окнами без анимации
      if (enteringState !== null && enteringState !== void 0 && enteringState.innerElement) {
        enteringState.innerElement.style.transition = 'none';
        enteringState.innerElement.style.opacity = '1';
      }
      this.props.onEntered(enteringModal);
    }
  }, {
    key: "closeModal",
    value: function closeModal(id) {
      var _this3 = this;
      var prevModalState = this.getModalState(id);
      if (!prevModalState) {
        return;
      }

      // Анимация закрытия модального окна
      if (!this.props.activeModal) {
        requestAnimationFrame(function () {
          _this3.waitTransitionFinish(prevModalState, function () {
            return _this3.props.onExited(id);
          });
          _this3.animateModalOpacity(prevModalState, false);
          _this3.setMaskOpacity(prevModalState, 0);
        });
        return;
      }

      // Переход между модальными окнами без анимации
      this.props.onExited(id);
    }
  }, {
    key: "waitTransitionFinish",
    value: function waitTransitionFinish(modalState, eventHandler) {
      if (_supportEvents.transitionEvent.supported) {
        var _modalState$innerElem2;
        var onceHandler = function onceHandler() {
          var _modalState$innerElem;
          modalState === null || modalState === void 0 ? void 0 : (_modalState$innerElem = modalState.innerElement) === null || _modalState$innerElem === void 0 ? void 0 : _modalState$innerElem.removeEventListener(_supportEvents.transitionEvent.name, onceHandler);
          eventHandler();
        };
        modalState === null || modalState === void 0 ? void 0 : (_modalState$innerElem2 = modalState.innerElement) === null || _modalState$innerElem2 === void 0 ? void 0 : _modalState$innerElem2.addEventListener(_supportEvents.transitionEvent.name, onceHandler);
      } else {
        setTimeout(eventHandler, this.timeout);
      }
    }

    /* Анимирует сдвиг модалки */
  }, {
    key: "animateModalOpacity",
    value: function animateModalOpacity(modalState, display) {
      if (modalState !== null && modalState !== void 0 && modalState.innerElement) {
        modalState.innerElement.style.transition = '';
        modalState.innerElement.style.transitionDelay = display && this.props.delayEnter ? "".concat(this.timeout, "ms") : '';
        modalState.innerElement.style.opacity = display ? '1' : '0';
      }
    }

    /* Устанавливает прозрачность для полупрозрачной подложки */
  }, {
    key: "setMaskOpacity",
    value: function setMaskOpacity(modalState) {
      var _this$props$history,
        _this4 = this;
      var forceOpacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (forceOpacity === null && ((_this$props$history = this.props.history) === null || _this$props$history === void 0 ? void 0 : _this$props$history[0]) !== modalState.id) {
        return;
      }
      if (this.maskAnimationFrame) {
        cancelAnimationFrame(this.maskAnimationFrame);
      }
      this.maskAnimationFrame = requestAnimationFrame(function () {
        if (_this4.maskElementRef.current) {
          var _modalState$translate = modalState.translateY,
            translateY = _modalState$translate === void 0 ? 0 : _modalState$translate,
            _modalState$translate2 = modalState.translateYCurrent,
            translateYCurrent = _modalState$translate2 === void 0 ? 0 : _modalState$translate2;
          var opacity = forceOpacity === null ? 1 - (translateYCurrent - translateY) / (100 - translateY) || 0 : forceOpacity;
          _this4.maskElementRef.current.style.opacity = (0, _math.clamp)(opacity, 0, 100).toString();
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$configPro,
        _this5 = this;
      var _this$props = this.props,
        exitingModal = _this$props.exitingModal,
        activeModal = _this$props.activeModal;
      if (!activeModal && !exitingModal) {
        return null;
      }
      return /*#__PURE__*/React.createElement(_ModalRootContext.ModalRootContext.Provider, {
        value: this.modalRootContext
      }, /*#__PURE__*/React.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiModalRoot", ((_this$props$configPro = this.props.configProvider) === null || _this$props$configPro === void 0 ? void 0 : _this$props$configPro.webviewType) === _ConfigProviderContext.WebviewType.VKAPPS && "vkuiModalRoot--vkapps", "vkuiModalRoot--desktop")
      }, /*#__PURE__*/React.createElement("div", {
        className: "vkuiModalRoot__mask",
        ref: this.maskElementRef,
        onClick: this.props.onExit
      }), /*#__PURE__*/React.createElement("div", {
        className: "vkuiModalRoot__viewport"
      }, this.modals.map(function (Modal) {
        var modalId = (0, _getNavId.getNavId)(Modal.props, warn);
        if (modalId !== activeModal && modalId !== exitingModal) {
          return null;
        }
        var key = "modal-".concat(modalId);
        return /*#__PURE__*/React.createElement(_FocusTrap.FocusTrap, {
          restoreFocus: false,
          onClose: _this5.props.onExit,
          timeout: _this5.timeout,
          key: key,
          className: "vkuiModalRoot__modal"
        }, Modal);
      }))));
    }
  }]);
  return ModalRootDesktopComponent;
}(React.Component);
var ModalRootDesktop = (0, _withContext.withContext)((0, _withPlatform.withPlatform)((0, _dom.withDOM)((0, _useModalManager.withModalManager)()(ModalRootDesktopComponent))), _ConfigProviderContext.ConfigProviderContext, 'configProvider');
exports.ModalRootDesktop = ModalRootDesktop;
//# sourceMappingURL=ModalRootDesktop.js.map