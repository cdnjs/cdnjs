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
    var activeModalProp = param.activeModal, children = param.children, _param_noFocusToDialog = param.noFocusToDialog, noFocusToDialog = _param_noFocusToDialog === void 0 ? false : _param_noFocusToDialog, onOpen = param.onOpen, onOpened = param.onOpened, onClose = param.onClose, onClosed = param.onClosed, modalOverlayTestId = param.modalOverlayTestId;
    var maskElementRef = React.useRef(null);
    var maskAnimationFrame = React.useRef(undefined);
    var restoreFocusTo = React.useRef(undefined);
    var document = useDOM().document;
    var _useConfigProvider = useConfigProvider(), hasCustomPanelHeaderAfter = _useConfigProvider.hasCustomPanelHeaderAfter, platform = _useConfigProvider.platform;
    var _useModalManager = useModalManager(activeModalProp, children, onOpen, onOpened, onClose, onClosed, noop), activeModal = _useModalManager.activeModal, exitingModal = _useModalManager.exitingModal, onExit = _useModalManager.onExit, getModalState = _useModalManager.getModalState, enteringModal = _useModalManager.enteringModal, onEnter = _useModalManager.onEnter, onEnteredProp = _useModalManager.onEntered, onExited = _useModalManager.onExited, history = _useModalManager.history, delayEnter = _useModalManager.delayEnter;
    var waitTransitionFinish = useWaitTransitionFinish().waitTransitionFinish;
    var prevProps = usePrevious({
        exitingModal: exitingModal,
        enteringModal: enteringModal,
        activeModal: activeModal
    });
    var modalRootContext = useObjectMemo({
        updateModalHeight: function() {
            return undefined;
        },
        registerModal: function(_param) {
            var id = _param.id, data = _object_without_properties(_param, [
                "id"
            ]);
            var _getModalState;
            return Object.assign((_getModalState = getModalState(id)) !== null && _getModalState !== void 0 ? _getModalState : {}, data);
        },
        onClose: onExit,
        isInsideModal: true
    });
    var timeout = platform === Platform.IOS ? 400 : 320;
    var modals = React.Children.toArray(children);
    /* Анимирует сдвиг модального окна */ var animateModalOpacity = function(modalState, display) {
        if (modalState === null || modalState === void 0 ? void 0 : modalState.innerElement) {
            modalState.innerElement.style.transition = "";
            modalState.innerElement.style.transitionDelay = display && delayEnter ? "".concat(timeout, "ms") : "";
            modalState.innerElement.style.opacity = display ? "1" : "0";
        }
    };
    /* Устанавливает прозрачность для полупрозрачной подложки */ var setMaskOpacity = function(modalState) {
        var forceOpacity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        if (forceOpacity === null && (history === null || history === void 0 ? void 0 : history[0]) !== modalState.id) {
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
    var onEntered = function(param) {
        var id = param.id, modalElement = param.modalElement;
        if (!noFocusToDialog && modalElement && !modalElement.contains(document.activeElement)) {
            modalElement.focus();
        }
        onEnteredProp(id);
    };
    var openModal = function() {
        if (!enteringModal || !prevProps) {
            return;
        }
        var enteringState = getModalState(enteringModal);
        onEnter();
        // Анимация открытия модального окна
        if (!prevProps.exitingModal) {
            requestAnimationFrame(function() {
                if (enteringModal === enteringModal && enteringState) {
                    waitTransitionFinish(enteringState.innerElement, function() {
                        return onEntered(enteringState);
                    }, timeout);
                    animateModalOpacity(enteringState, true);
                    setMaskOpacity(enteringState, 1);
                }
            });
            return;
        }
        // Переход между модальными окнами без анимации
        requestAnimationFrame(function() {
            if (enteringState === null || enteringState === void 0 ? void 0 : enteringState.innerElement) {
                enteringState.innerElement.style.transition = "none";
                enteringState.innerElement.style.opacity = "1";
                setMaskOpacity(enteringState, 1);
            }
        });
        if (enteringState) {
            onEntered(enteringState);
        }
    };
    var closeModal = function(id) {
        var prevModalState = getModalState(id);
        if (!prevModalState) {
            return;
        }
        // Анимация закрытия модального окна
        if (!activeModal) {
            requestAnimationFrame(function() {
                waitTransitionFinish(prevModalState === null || prevModalState === void 0 ? void 0 : prevModalState.innerElement, function() {
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
            var _document_activeElement;
            restoreFocusTo.current = (_document_activeElement = document === null || document === void 0 ? void 0 : document.activeElement) !== null && _document_activeElement !== void 0 ? _document_activeElement : undefined;
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
        "data-testid": modalOverlayTestId,
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