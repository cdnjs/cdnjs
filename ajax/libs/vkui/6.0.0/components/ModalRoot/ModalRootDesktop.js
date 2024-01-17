import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { clamp } from '../../helpers/math';
import { useObjectMemo } from '../../hooks/useObjectMemo';
import { usePrevious } from '../../hooks/usePrevious';
import { useWaitTransitionFinish } from '../../hooks/useWaitTransitionFinish';
import { useDOM } from '../../lib/dom';
import { getNavId } from '../../lib/getNavId';
import { warnOnce } from '../../lib/warnOnce';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { FocusTrap } from '../FocusTrap/FocusTrap';
import { ModalRootContext } from './ModalRootContext';
import { useModalManager } from './useModalManager';
const warn = warnOnce('ModalRoot');
export const ModalRootDesktop = ({ activeModal: activeModalProp, children, noFocusToDialog = false, onOpen, onOpened, onClose, onClosed, modalOverlayTestId })=>{
    const maskElementRef = React.useRef(null);
    const maskAnimationFrame = React.useRef(undefined);
    const restoreFocusTo = React.useRef(undefined);
    const { document } = useDOM();
    const { hasCustomPanelHeaderAfter, platform } = useConfigProvider();
    const { activeModal, exitingModal, onExit, getModalState, enteringModal, onEnter, onEntered: onEnteredProp, onExited, history, delayEnter } = useModalManager(activeModalProp, children, onOpen, onOpened, onClose, onClosed, noop);
    const { waitTransitionFinish } = useWaitTransitionFinish();
    const prevProps = usePrevious({
        exitingModal,
        enteringModal,
        activeModal
    });
    const modalRootContext = useObjectMemo({
        updateModalHeight: ()=>undefined,
        registerModal: (_param)=>{
            var { id } = _param, data = _object_without_properties(_param, [
                "id"
            ]);
            var _getModalState;
            return Object.assign((_getModalState = getModalState(id)) !== null && _getModalState !== void 0 ? _getModalState : {}, data);
        },
        onClose: onExit,
        isInsideModal: true
    });
    const timeout = platform === 'ios' ? 400 : 320;
    const modals = React.Children.toArray(children);
    /* Анимирует сдвиг модального окна */ const animateModalOpacity = (modalState, display)=>{
        if (modalState === null || modalState === void 0 ? void 0 : modalState.innerElement) {
            modalState.innerElement.style.transition = '';
            modalState.innerElement.style.transitionDelay = display && delayEnter ? `${timeout}ms` : '';
            modalState.innerElement.style.opacity = display ? '1' : '0';
        }
    };
    /* Устанавливает прозрачность для полупрозрачной подложки */ const setMaskOpacity = (modalState, forceOpacity = null)=>{
        if (forceOpacity === null && (history === null || history === void 0 ? void 0 : history[0]) !== modalState.id) {
            return;
        }
        if (maskAnimationFrame.current) {
            cancelAnimationFrame(maskAnimationFrame.current);
        }
        maskAnimationFrame.current = requestAnimationFrame(()=>{
            if (maskElementRef.current) {
                const { translateY = 0, translateYCurrent = 0 } = modalState;
                const opacity = forceOpacity === null ? 1 - (translateYCurrent - translateY) / (100 - translateY) || 0 : forceOpacity;
                maskElementRef.current.style.opacity = clamp(opacity, 0, 100).toString();
            }
        });
    };
    const onEntered = ({ id, modalElement })=>{
        if (!noFocusToDialog && modalElement && !modalElement.contains(document.activeElement)) {
            modalElement.focus();
        }
        onEnteredProp(id);
    };
    const openModal = ()=>{
        if (!enteringModal || !prevProps) {
            return;
        }
        const enteringState = getModalState(enteringModal);
        onEnter();
        // Анимация открытия модального окна
        if (!prevProps.exitingModal) {
            requestAnimationFrame(()=>{
                if (enteringModal === enteringModal && enteringState) {
                    waitTransitionFinish(enteringState.innerElement, ()=>onEntered(enteringState), timeout);
                    animateModalOpacity(enteringState, true);
                    setMaskOpacity(enteringState, 1);
                }
            });
            return;
        }
        // Переход между модальными окнами без анимации
        requestAnimationFrame(()=>{
            if (enteringState === null || enteringState === void 0 ? void 0 : enteringState.innerElement) {
                enteringState.innerElement.style.transition = 'none';
                enteringState.innerElement.style.opacity = '1';
                setMaskOpacity(enteringState, 1);
            }
        });
        if (enteringState) {
            onEntered(enteringState);
        }
    };
    const closeModal = (id)=>{
        const prevModalState = getModalState(id);
        if (!prevModalState) {
            return;
        }
        // Анимация закрытия модального окна
        if (!activeModal) {
            requestAnimationFrame(()=>{
                waitTransitionFinish(prevModalState === null || prevModalState === void 0 ? void 0 : prevModalState.innerElement, ()=>onExited(id), timeout);
                animateModalOpacity(prevModalState, false);
                setMaskOpacity(prevModalState, 0);
            });
            return;
        }
        // Переход между модальными окнами без анимации
        onExited(id);
    };
    React.useEffect(()=>{
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
    }, modals.map((Modal)=>{
        const modalId = getNavId(Modal.props, warn);
        if (modalId !== activeModal && modalId !== exitingModal) {
            return null;
        }
        const key = `modal-${modalId}`;
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