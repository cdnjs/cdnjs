import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _createSuper from "@babel/runtime/helpers/createSuper";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["id"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { transitionEvent } from "../../lib/supportEvents";
import { withPlatform } from "../../hoc/withPlatform";
import { withContext } from "../../hoc/withContext";
import ModalRootContext from "./ModalRootContext";
import { ConfigProviderContext, WebviewType } from "../ConfigProvider/ConfigProviderContext";
import { ANDROID, VKCOM } from "../../lib/platform";
import { getClassName } from "../../helpers/getClassName";
import { withDOM } from "../../lib/dom";
import { getNavId } from "../../lib/getNavId";
import { warnOnce } from "../../lib/warnOnce";
import { FocusTrap } from "../FocusTrap/FocusTrap";
import { withModalManager } from "./useModalManager";
import "./ModalRoot.css";
var warn = warnOnce("ModalRoot");

var ModalRootDesktopComponent = /*#__PURE__*/function (_React$Component) {
  _inherits(ModalRootDesktopComponent, _React$Component);

  var _super = _createSuper(ModalRootDesktopComponent);

  function ModalRootDesktopComponent(props) {
    var _this;

    _classCallCheck(this, ModalRootDesktopComponent);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "maskElementRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "maskAnimationFrame", undefined);

    _defineProperty(_assertThisInitialized(_this), "modalRootContext", void 0);

    _defineProperty(_assertThisInitialized(_this), "restoreFocusTo", undefined);

    _this.maskElementRef = /*#__PURE__*/React.createRef();
    _this.modalRootContext = {
      updateModalHeight: function updateModalHeight() {
        return undefined;
      },
      registerModal: function registerModal(_ref) {
        var id = _ref.id,
            data = _objectWithoutProperties(_ref, _excluded);

        return Object.assign(_this.getModalState(id), data);
      },
      onClose: function onClose() {
        return _this.props.closeActiveModal();
      },
      isInsideModal: true
    };
    return _this;
  }

  _createClass(ModalRootDesktopComponent, [{
    key: "timeout",
    get: function get() {
      return this.props.platform === ANDROID || this.props.platform === VKCOM ? 320 : 400;
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
      var _this2 = this;

      // transition phase 2: animate exiting modal
      if (this.props.exitingModal && this.props.exitingModal !== prevProps.exitingModal) {
        this.closeModal(this.props.exitingModal);
      } // transition phase 3: animate entering modal


      if (this.props.enteringModal && this.props.enteringModal !== prevProps.enteringModal) {
        var enteringModal = this.props.enteringModal;
        var enteringState = this.getModalState(enteringModal);
        requestAnimationFrame(function () {
          if (_this2.props.enteringModal === enteringModal) {
            _this2.waitTransitionFinish(enteringState, function () {
              return _this2.props.onEnter(enteringModal);
            });

            _this2.animateModalOpacity(enteringState, true);
          }
        });
      } // focus restoration


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
    key: "closeModal",
    value: function closeModal(id) {
      var _this3 = this;

      var prevModalState = this.getModalState(id);

      if (!prevModalState) {
        return;
      }

      this.waitTransitionFinish(prevModalState, function () {
        return _this3.props.onExit(id);
      });
      this.animateModalOpacity(prevModalState, false);

      if (!this.props.activeModal) {
        this.setMaskOpacity(prevModalState, 0);
      }
    }
  }, {
    key: "waitTransitionFinish",
    value: function waitTransitionFinish(modalState, eventHandler) {
      if (transitionEvent.supported) {
        var _modalState$innerElem2;

        var onceHandler = function onceHandler() {
          var _modalState$innerElem;

          modalState === null || modalState === void 0 ? void 0 : (_modalState$innerElem = modalState.innerElement) === null || _modalState$innerElem === void 0 ? void 0 : _modalState$innerElem.removeEventListener(transitionEvent.name, onceHandler);
          eventHandler();
        };

        modalState === null || modalState === void 0 ? void 0 : (_modalState$innerElem2 = modalState.innerElement) === null || _modalState$innerElem2 === void 0 ? void 0 : _modalState$innerElem2.addEventListener(transitionEvent.name, onceHandler);
      } else {
        setTimeout(eventHandler, this.timeout);
      }
    }
    /* Анимирует сдивг модалки */

  }, {
    key: "animateModalOpacity",
    value: function animateModalOpacity(modalState, display) {
      if (modalState !== null && modalState !== void 0 && modalState.innerElement) {
        modalState.innerElement.style.transitionDelay = display && this.props.delayEnter ? "".concat(this.timeout, "ms") : "";
        modalState.innerElement.style.opacity = display ? "1" : "0";
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
          _this4.maskElementRef.current.style.opacity = Math.max(0, Math.min(100, opacity)).toString();
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
          activeModal = _this$props.activeModal,
          enteringModal = _this$props.enteringModal;

      if (!activeModal && !exitingModal) {
        return null;
      }

      return createScopedElement(ModalRootContext.Provider, {
        value: this.modalRootContext
      }, createScopedElement("div", {
        vkuiClass: classNames(getClassName("ModalRoot", this.props.platform), {
          "ModalRoot--vkapps": ((_this$props$configPro = this.props.configProvider) === null || _this$props$configPro === void 0 ? void 0 : _this$props$configPro.webviewType) === WebviewType.VKAPPS
        }, "ModalRoot--desktop")
      }, createScopedElement("div", {
        vkuiClass: "ModalRoot__mask",
        ref: this.maskElementRef,
        onClick: this.props.closeActiveModal
      }), createScopedElement("div", {
        vkuiClass: "ModalRoot__viewport"
      }, this.modals.map(function (Modal) {
        var modalId = getNavId(Modal.props, warn);

        if (modalId !== activeModal && modalId !== exitingModal) {
          return null;
        }

        var key = "modal-".concat(modalId);
        return createScopedElement(FocusTrap, {
          restoreFocus: false,
          onClose: _this5.props.closeActiveModal,
          timeout: _this5.timeout,
          key: key,
          vkuiClass: classNames("ModalRoot__modal", {
            "ModalRoot__modal--active": !exitingModal && !enteringModal && modalId === activeModal,
            "ModalRoot__modal--prev": modalId === exitingModal,
            "ModalRoot__modal--next": Boolean(exitingModal) && modalId === activeModal
          })
        }, Modal);
      }))));
    }
  }]);

  return ModalRootDesktopComponent;
}(React.Component);

export var ModalRootDesktop = withContext(withPlatform(withDOM(withModalManager()(ModalRootDesktopComponent))), ConfigProviderContext, "configProvider");
//# sourceMappingURL=ModalRootDesktop.js.map