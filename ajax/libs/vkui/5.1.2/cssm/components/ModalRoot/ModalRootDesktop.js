import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _createSuper from "@babel/runtime/helpers/createSuper";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["id"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { transitionEvent } from '../../lib/supportEvents';
import { withPlatform } from '../../hoc/withPlatform';
import { withContext } from '../../hoc/withContext';
import { ModalRootContext } from './ModalRootContext';
import { ConfigProviderContext, WebviewType } from '../ConfigProvider/ConfigProviderContext';
import { Platform } from '../../lib/platform';
import { withDOM } from '../../lib/dom';
import { getNavId } from '../../lib/getNavId';
import { warnOnce } from '../../lib/warnOnce';
import { FocusTrap } from '../FocusTrap/FocusTrap';
import { withModalManager } from './useModalManager';
import { clamp } from '../../helpers/math';
import "./ModalRoot.module.css";
var warn = warnOnce('ModalRoot');
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
        var _this$getModalState;
        var id = _ref.id,
          data = _objectWithoutProperties(_ref, _excluded);
        return Object.assign((_this$getModalState = _this.getModalState(id)) !== null && _this$getModalState !== void 0 ? _this$getModalState : {}, data);
      },
      onClose: function onClose() {
        return _this.props.onExit();
      },
      isInsideModal: true
    };
    return _this;
  }
  _createClass(ModalRootDesktopComponent, [{
    key: "timeout",
    get: function get() {
      return this.props.platform === Platform.IOS ? 400 : 320;
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
          _this4.maskElementRef.current.style.opacity = clamp(opacity, 0, 100).toString();
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
      return /*#__PURE__*/React.createElement(ModalRootContext.Provider, {
        value: this.modalRootContext
      }, /*#__PURE__*/React.createElement("div", {
        className: classNames("vkuiModalRoot", ((_this$props$configPro = this.props.configProvider) === null || _this$props$configPro === void 0 ? void 0 : _this$props$configPro.webviewType) === WebviewType.VKAPPS && "vkuiModalRoot--vkapps", "vkuiModalRoot--desktop")
      }, /*#__PURE__*/React.createElement("div", {
        className: "vkuiModalRoot__mask",
        ref: this.maskElementRef,
        onClick: this.props.onExit
      }), /*#__PURE__*/React.createElement("div", {
        className: "vkuiModalRoot__viewport"
      }, this.modals.map(function (Modal) {
        var modalId = getNavId(Modal.props, warn);
        if (modalId !== activeModal && modalId !== exitingModal) {
          return null;
        }
        var key = "modal-".concat(modalId);
        return /*#__PURE__*/React.createElement(FocusTrap, {
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
export var ModalRootDesktop = withContext(withPlatform(withDOM(withModalManager()(ModalRootDesktopComponent))), ConfigProviderContext, 'configProvider');
//# sourceMappingURL=ModalRootDesktop.js.map