import _assert_this_initialized from "@swc/helpers/src/_assert_this_initialized.mjs";
import _class_call_check from "@swc/helpers/src/_class_call_check.mjs";
import _create_class from "@swc/helpers/src/_create_class.mjs";
import _define_property from "@swc/helpers/src/_define_property.mjs";
import _inherits from "@swc/helpers/src/_inherits.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import _create_super from "@swc/helpers/src/_create_super.mjs";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { clamp } from "../../helpers/math";
import { withContext } from "../../hoc/withContext";
import { withPlatform } from "../../hoc/withPlatform";
import { withDOM } from "../../lib/dom";
import { getNavId } from "../../lib/getNavId";
import { Platform } from "../../lib/platform";
import { transitionEvent } from "../../lib/supportEvents";
import { warnOnce } from "../../lib/warnOnce";
import { ConfigProviderContext, WebviewType } from "../ConfigProvider/ConfigProviderContext";
import { FocusTrap } from "../FocusTrap/FocusTrap";
import { ModalRootContext } from "./ModalRootContext";
import { withModalManager } from "./useModalManager";
var warn = warnOnce("ModalRoot");
var ModalRootDesktopComponent = /*#__PURE__*/ function(_React_Component) {
    "use strict";
    _inherits(ModalRootDesktopComponent, _React_Component);
    var _super = _create_super(ModalRootDesktopComponent);
    function ModalRootDesktopComponent(props) {
        _class_call_check(this, ModalRootDesktopComponent);
        var _this;
        _this = _super.call(this, props);
        _define_property(_assert_this_initialized(_this), "maskElementRef", void 0);
        _define_property(_assert_this_initialized(_this), "maskAnimationFrame", undefined);
        _define_property(_assert_this_initialized(_this), "modalRootContext", void 0);
        _define_property(_assert_this_initialized(_this), "restoreFocusTo", undefined);
        _this.maskElementRef = /*#__PURE__*/ React.createRef();
        var _this_getModalState;
        _this.modalRootContext = {
            updateModalHeight: function() {
                return undefined;
            },
            registerModal: function(_param) {
                var id = _param.id, data = _object_without_properties(_param, [
                    "id"
                ]);
                return Object.assign((_this_getModalState = _this.getModalState(id)) !== null && _this_getModalState !== void 0 ? _this_getModalState : {}, data);
            },
            onClose: function() {
                return _this.props.onExit();
            },
            isInsideModal: true
        };
        return _this;
    }
    _create_class(ModalRootDesktopComponent, [
        {
            key: "timeout",
            get: function get() {
                return this.props.platform === Platform.IOS ? 400 : 320;
            }
        },
        {
            key: "modals",
            get: function get() {
                return React.Children.toArray(this.props.children);
            }
        },
        {
            key: "getModalState",
            value: function getModalState(id) {
                if (id === null) {
                    return undefined;
                }
                return this.props.getModalState(id);
            }
        },
        {
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
                    var _this_props_document;
                    var _this_props_document_activeElement;
                    this.restoreFocusTo = (_this_props_document_activeElement = (_this_props_document = this.props.document) === null || _this_props_document === void 0 ? void 0 : _this_props_document.activeElement) !== null && _this_props_document_activeElement !== void 0 ? _this_props_document_activeElement : undefined;
                }
                if (!this.props.activeModal && !this.props.exitingModal && this.restoreFocusTo) {
                    this.restoreFocusTo.focus();
                    this.restoreFocusTo = undefined;
                }
            }
        },
        {
            key: "openModal",
            value: function openModal(prevProps) {
                var _this = this;
                var enteringModal = this.props.enteringModal;
                if (!enteringModal) {
                    return;
                }
                var enteringState = this.getModalState(enteringModal);
                this.props.onEnter();
                // Анимация открытия модального окна
                if (!prevProps.exitingModal) {
                    requestAnimationFrame(function() {
                        if (_this.props.enteringModal === enteringModal) {
                            _this.waitTransitionFinish(enteringState, function() {
                                return _this.props.onEntered(enteringModal);
                            });
                            _this.animateModalOpacity(enteringState, true);
                        }
                    });
                    return;
                }
                // Переход между модальными окнами без анимации
                if (enteringState === null || enteringState === void 0 ? void 0 : enteringState.innerElement) {
                    enteringState.innerElement.style.transition = "none";
                    enteringState.innerElement.style.opacity = "1";
                }
                this.props.onEntered(enteringModal);
            }
        },
        {
            key: "closeModal",
            value: function closeModal(id) {
                var _this = this;
                var prevModalState = this.getModalState(id);
                if (!prevModalState) {
                    return;
                }
                // Анимация закрытия модального окна
                if (!this.props.activeModal) {
                    requestAnimationFrame(function() {
                        _this.waitTransitionFinish(prevModalState, function() {
                            return _this.props.onExited(id);
                        });
                        _this.animateModalOpacity(prevModalState, false);
                        _this.setMaskOpacity(prevModalState, 0);
                    });
                    return;
                }
                // Переход между модальными окнами без анимации
                this.props.onExited(id);
            }
        },
        {
            key: "waitTransitionFinish",
            value: function waitTransitionFinish(modalState, eventHandler) {
                if (transitionEvent.supported) {
                    var _modalState_innerElement;
                    var onceHandler = function() {
                        var _modalState_innerElement;
                        modalState === null || modalState === void 0 ? void 0 : (_modalState_innerElement = modalState.innerElement) === null || _modalState_innerElement === void 0 ? void 0 : _modalState_innerElement.removeEventListener(transitionEvent.name, onceHandler);
                        eventHandler();
                    };
                    modalState === null || modalState === void 0 ? void 0 : (_modalState_innerElement = modalState.innerElement) === null || _modalState_innerElement === void 0 ? void 0 : _modalState_innerElement.addEventListener(transitionEvent.name, onceHandler);
                } else {
                    setTimeout(eventHandler, this.timeout);
                }
            }
        },
        {
            /* Анимирует сдвиг модалки */ key: "animateModalOpacity",
            value: function animateModalOpacity(modalState, display) {
                if (modalState === null || modalState === void 0 ? void 0 : modalState.innerElement) {
                    modalState.innerElement.style.transition = "";
                    modalState.innerElement.style.transitionDelay = display && this.props.delayEnter ? "".concat(this.timeout, "ms") : "";
                    modalState.innerElement.style.opacity = display ? "1" : "0";
                }
            }
        },
        {
            /* Устанавливает прозрачность для полупрозрачной подложки */ key: "setMaskOpacity",
            value: function setMaskOpacity(modalState) {
                var forceOpacity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
                var _this = this;
                var _this_props_history;
                if (forceOpacity === null && ((_this_props_history = this.props.history) === null || _this_props_history === void 0 ? void 0 : _this_props_history[0]) !== modalState.id) {
                    return;
                }
                if (this.maskAnimationFrame) {
                    cancelAnimationFrame(this.maskAnimationFrame);
                }
                this.maskAnimationFrame = requestAnimationFrame(function() {
                    if (_this.maskElementRef.current) {
                        var _modalState_translateY = modalState.translateY, translateY = _modalState_translateY === void 0 ? 0 : _modalState_translateY, _modalState_translateYCurrent = modalState.translateYCurrent, translateYCurrent = _modalState_translateYCurrent === void 0 ? 0 : _modalState_translateYCurrent;
                        var opacity = forceOpacity === null ? 1 - (translateYCurrent - translateY) / (100 - translateY) || 0 : forceOpacity;
                        _this.maskElementRef.current.style.opacity = clamp(opacity, 0, 100).toString();
                    }
                });
            }
        },
        {
            key: "render",
            value: function render() {
                var _this = this;
                var _this_props_configProvider;
                var _this_props = this.props, exitingModal = _this_props.exitingModal, activeModal = _this_props.activeModal;
                if (!activeModal && !exitingModal) {
                    return null;
                }
                return /*#__PURE__*/ React.createElement(ModalRootContext.Provider, {
                    value: this.modalRootContext
                }, /*#__PURE__*/ React.createElement("div", {
                    className: classNames("vkuiModalRoot", ((_this_props_configProvider = this.props.configProvider) === null || _this_props_configProvider === void 0 ? void 0 : _this_props_configProvider.webviewType) === WebviewType.VKAPPS && "vkuiModalRoot--vkapps", "vkuiModalRoot--desktop")
                }, /*#__PURE__*/ React.createElement("div", {
                    className: "vkuiModalRoot__mask",
                    ref: this.maskElementRef,
                    onClick: this.props.onExit
                }), /*#__PURE__*/ React.createElement("div", {
                    className: "vkuiModalRoot__viewport"
                }, this.modals.map(function(Modal) {
                    var modalId = getNavId(Modal.props, warn);
                    if (modalId !== activeModal && modalId !== exitingModal) {
                        return null;
                    }
                    var key = "modal-".concat(modalId);
                    return /*#__PURE__*/ React.createElement(FocusTrap, {
                        restoreFocus: false,
                        onClose: _this.props.onExit,
                        timeout: _this.timeout,
                        key: key,
                        className: "vkuiModalRoot__modal"
                    }, Modal);
                }))));
            }
        }
    ]);
    return ModalRootDesktopComponent;
}(React.Component);
export var ModalRootDesktop = withContext(withPlatform(withDOM(withModalManager()(ModalRootDesktopComponent))), ConfigProviderContext, "configProvider");

//# sourceMappingURL=ModalRootDesktop.js.map