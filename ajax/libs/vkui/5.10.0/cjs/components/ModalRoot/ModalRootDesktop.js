"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModalRootDesktop", {
    enumerable: true,
    get: function() {
        return ModalRootDesktop;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _math = require("../../helpers/math");
var _useObjectMemo = require("../../hooks/useObjectMemo");
var _usePrevious = require("../../hooks/usePrevious");
var _useWaitTransitionFinish = require("../../hooks/useWaitTransitionFinish");
var _dom = require("../../lib/dom");
var _getNavId = require("../../lib/getNavId");
var _platform = require("../../lib/platform");
var _warnOnce = require("../../lib/warnOnce");
var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
var _FocusTrap = require("../FocusTrap/FocusTrap");
var _ModalRootContext = require("./ModalRootContext");
var _useModalManager = require("./useModalManager");
var warn = (0, _warnOnce.warnOnce)("ModalRoot");
var ModalRootDesktop = function(param) {
    var activeModalProp = param.activeModal, children = param.children, _param_noFocusToDialog = param.noFocusToDialog, noFocusToDialog = _param_noFocusToDialog === void 0 ? false : _param_noFocusToDialog, onOpen = param.onOpen, onOpened = param.onOpened, onClose = param.onClose, onClosed = param.onClosed, modalOverlayTestId = param.modalOverlayTestId;
    var maskElementRef = _react.useRef(null);
    var maskAnimationFrame = _react.useRef(undefined);
    var restoreFocusTo = _react.useRef(undefined);
    var document = (0, _dom.useDOM)().document;
    var _useConfigProvider = (0, _ConfigProviderContext.useConfigProvider)(), hasCustomPanelHeaderAfter = _useConfigProvider.hasCustomPanelHeaderAfter, platform = _useConfigProvider.platform;
    var _useModalManager1 = (0, _useModalManager.useModalManager)(activeModalProp, children, onOpen, onOpened, onClose, onClosed, _vkjs.noop), activeModal = _useModalManager1.activeModal, exitingModal = _useModalManager1.exitingModal, onExit = _useModalManager1.onExit, getModalState = _useModalManager1.getModalState, enteringModal = _useModalManager1.enteringModal, onEnter = _useModalManager1.onEnter, onEnteredProp = _useModalManager1.onEntered, onExited = _useModalManager1.onExited, history = _useModalManager1.history, delayEnter = _useModalManager1.delayEnter;
    var waitTransitionFinish = (0, _useWaitTransitionFinish.useWaitTransitionFinish)().waitTransitionFinish;
    var prevProps = (0, _usePrevious.usePrevious)({
        exitingModal: exitingModal,
        enteringModal: enteringModal,
        activeModal: activeModal
    });
    var modalRootContext = (0, _useObjectMemo.useObjectMemo)({
        updateModalHeight: function() {
            return undefined;
        },
        registerModal: function(_param) {
            var id = _param.id, data = _object_without_properties._(_param, [
                "id"
            ]);
            var _getModalState;
            return Object.assign((_getModalState = getModalState(id)) !== null && _getModalState !== void 0 ? _getModalState : {}, data);
        },
        onClose: onExit,
        isInsideModal: true
    });
    var timeout = platform === _platform.Platform.IOS ? 400 : 320;
    var modals = _react.Children.toArray(children);
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
                maskElementRef.current.style.opacity = (0, _math.clamp)(opacity, 0, 100).toString();
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
    _react.useEffect(function() {
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
    return /*#__PURE__*/ _react.createElement(_ModalRootContext.ModalRootContext.Provider, {
        value: modalRootContext
    }, /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiModalRoot", hasCustomPanelHeaderAfter && "vkuiModalRoot--hasCustomPanelHeaderAfterSlot", "vkuiModalRoot--desktop")
    }, /*#__PURE__*/ _react.createElement("div", {
        "data-testid": modalOverlayTestId,
        className: "vkuiModalRoot__mask",
        ref: maskElementRef,
        onClick: onExit
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiModalRoot__viewport"
    }, modals.map(function(Modal) {
        var modalId = (0, _getNavId.getNavId)(Modal.props, warn);
        if (modalId !== activeModal && modalId !== exitingModal) {
            return null;
        }
        var key = "modal-".concat(modalId);
        return /*#__PURE__*/ _react.createElement(_FocusTrap.FocusTrap, {
            restoreFocus: false,
            onClose: onExit,
            timeout: timeout,
            key: key,
            className: "vkuiModalRoot__modal"
        }, Modal);
    }))));
};

//# sourceMappingURL=ModalRootDesktop.js.map