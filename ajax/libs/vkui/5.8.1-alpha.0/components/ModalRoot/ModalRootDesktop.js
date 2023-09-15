import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames, noop } from "@vkontakte/vkjs";
import { clamp } from "../../helpers/math";
import { useObjectMemo } from "../../hooks/useObjectMemo";
import { usePrevious } from "../../hooks/usePrevious";
import { useWaitTransitionFinish } from "../../hooks/useWaitTransitionFinish";
import { useDOM } from "../../lib/dom";
import { getNavId } from "../../lib/getNavId";
import { Platform } from "../../lib/platform";
import { warnOnce } from "../../lib/warnOnce";
import { useConfigProvider } from "../ConfigProvider/ConfigProviderContext";
import { FocusTrap } from "../FocusTrap/FocusTrap";
import { ModalRootContext } from "./ModalRootContext";
import { useModalManager } from "./useModalManager";
var warn = warnOnce("ModalRoot");
export var ModalRootDesktop = function(param) {
    var activeModalProp = param.activeModal, children = param.children, onOpen = param.onOpen, onOpened = param.onOpened, onClose = param.onClose, onClosed = param.onClosed;
    var maskElementRef = React.useRef(null);
    var maskAnimationFrame = React.useRef(undefined);
    var restoreFocusTo = React.useRef(undefined);
    var document = useDOM().document;
    var _useConfigProvider = useConfigProvider(), hasCustomPanelHeaderAfter = _useConfigProvider.hasCustomPanelHeaderAfter, platform = _useConfigProvider.platform;
    var _useModalManager = useModalManager(activeModalProp, children, onOpen, onOpened, onClose, onClosed, noop), activeModal = _useModalManager.activeModal, exitingModal = _useModalManager.exitingModal, onExit = _useModalManager.onExit, getModalState = _useModalManager.getModalState, enteringModal = _useModalManager.enteringModal, onEnter = _useModalManager.onEnter, onEntered = _useModalManager.onEntered, onExited = _useModalManager.onExited, history = _useModalManager.history, delayEnter = _useModalManager.delayEnter;
    var waitTransitionFinish = useWaitTransitionFinish().waitTransitionFinish;
    var prevProps = usePrevious({
        exitingModal: exitingModal,
        enteringModal: enteringModal,
        activeModal: activeModal
    });
    var _getModalState;
    var modalRootContext = useObjectMemo({
        updateModalHeight: function() {
            return undefined;
        },
        registerModal: function(_param) {
            var id = _param.id, data = _object_without_properties(_param, [
                "id"
            ]);
            return Object.assign((_getModalState = getModalState(id)) !== null && _getModalState !== void 0 ? _getModalState : {}, data);
        },
        onClose: onExit,
        isInsideModal: true
    });
    var timeout = platform === Platform.IOS ? 400 : 320;
    var modals = React.Children.toArray(children);
    /* Анимирует сдвиг модального окна */ var animateModalOpacity = function(modalState, display) {
        var _modalState;
        if ((_modalState = modalState) === null || _modalState === void 0 ? void 0 : _modalState.innerElement) {
            modalState.innerElement.style.transition = "";
            modalState.innerElement.style.transitionDelay = display && delayEnter ? "".concat(timeout, "ms") : "";
            modalState.innerElement.style.opacity = display ? "1" : "0";
        }
    };
    /* Устанавливает прозрачность для полупрозрачной подложки */ var setMaskOpacity = function(modalState) {
        var forceOpacity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        var _history;
        if (forceOpacity === null && ((_history = history) === null || _history === void 0 ? void 0 : _history[0]) !== modalState.id) {
            return;
        }
        if (maskAnimationFrame.current) {
            cancelAnimationFrame(maskAnimationFrame.current);
        }
        maskAnimationFrame.current = requestAnimationFrame(function() {
            if (maskElementRef.current) {
                var _modalState_translateY = modalState.translateY, translateY = _modalState_translateY === void 0 ? 0 : _modalState_translateY, _modalState_translateYCurrent = modalState.translateYCurrent, translateYCurrent = _modalState_translateYCurrent === void 0 ? 0 : _modalState_translateYCurrent;
                var opacity = forceOpacity === null ? 1 - (translateYCurrent - translateY) / (100 - translateY) || 0 : forceOpacity;
                maskElementRef.current.style.opacity = clamp(opacity, 0, 100).toString();
            }
        });
    };
    var openModal = function() {
        var _enteringState;
        if (!enteringModal || !prevProps) {
            return;
        }
        var enteringState = getModalState(enteringModal);
        onEnter();
        // Анимация открытия модального окна
        if (!prevProps.exitingModal) {
            requestAnimationFrame(function() {
                if (enteringModal === enteringModal) {
                    var _enteringState;
                    waitTransitionFinish((_enteringState = enteringState) === null || _enteringState === void 0 ? void 0 : _enteringState.innerElement, function() {
                        return onEntered(enteringModal);
                    }, timeout);
                    animateModalOpacity(enteringState, true);
                }
            });
            return;
        }
        // Переход между модальными окнами без анимации
        if ((_enteringState = enteringState) === null || _enteringState === void 0 ? void 0 : _enteringState.innerElement) {
            enteringState.innerElement.style.transition = "none";
            enteringState.innerElement.style.opacity = "1";
        }
        onEntered(enteringModal);
    };
    var closeModal = function(id) {
        var prevModalState = getModalState(id);
        if (!prevModalState) {
            return;
        }
        // Анимация закрытия модального окна
        if (!activeModal) {
            requestAnimationFrame(function() {
                var _prevModalState;
                waitTransitionFinish((_prevModalState = prevModalState) === null || _prevModalState === void 0 ? void 0 : _prevModalState.innerElement, function() {
                    return onExited(id);
                }, timeout);
                animateModalOpacity(prevModalState, false);
                setMaskOpacity(prevModalState, 0);
            });
            return;
        }
        // Переход между модальными окнами без анимации
        onExited(id);
    };
    React.useEffect(function() {
        if (!prevProps) {
            return;
        }
        // transition phase 2: animate exiting modal
        if (exitingModal && exitingModal !== prevProps.exitingModal) {
            closeModal(exitingModal);
        }
        // transition phase 3: animate entering modal
        if (enteringModal && enteringModal !== prevProps.enteringModal) {
            openModal();
        }
        // focus restoration
        if (activeModal && !prevProps.activeModal) {
            var _document;
            var _document_activeElement;
            restoreFocusTo.current = (_document_activeElement = (_document = document) === null || _document === void 0 ? void 0 : _document.activeElement) !== null && _document_activeElement !== void 0 ? _document_activeElement : undefined;
        }
        if (!activeModal && !exitingModal && restoreFocusTo.current) {
            restoreFocusTo.current.focus();
            restoreFocusTo.current = undefined;
        }
    });
    if (!activeModal && !exitingModal) {
        return null;
    }
    return /*#__PURE__*/ React.createElement(ModalRootContext.Provider, {
        value: modalRootContext
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiModalRoot", hasCustomPanelHeaderAfter && "vkuiModalRoot--hasCustomPanelHeaderAfterSlot", "vkuiModalRoot--desktop")
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiModalRoot__mask",
        ref: maskElementRef,
        onClick: onExit
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiModalRoot__viewport"
    }, modals.map(function(Modal) {
        var modalId = getNavId(Modal.props, warn);
        if (modalId !== activeModal && modalId !== exitingModal) {
            return null;
        }
        var key = "modal-".concat(modalId);
        return /*#__PURE__*/ React.createElement(FocusTrap, {
            restoreFocus: false,
            onClose: onExit,
            timeout: timeout,
            key: key,
            className: "vkuiModalRoot__modal"
        }, Modal);
    }))));
};

//# sourceMappingURL=ModalRootDesktop.js.map