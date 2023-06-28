import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { clamp } from '../../helpers/math';
import { withContext } from '../../hoc/withContext';
import { withPlatform } from '../../hoc/withPlatform';
import { withDOM } from '../../lib/dom';
import { getNavId } from '../../lib/getNavId';
import { Platform } from '../../lib/platform';
import { transitionEvent } from '../../lib/supportEvents';
import { warnOnce } from '../../lib/warnOnce';
import { ConfigProviderContext, WebviewType } from '../ConfigProvider/ConfigProviderContext';
import { FocusTrap } from '../FocusTrap/FocusTrap';
import { ModalRootContext } from './ModalRootContext';
import { withModalManager } from './useModalManager';
import styles from './ModalRoot.module.css';
const warn = warnOnce('ModalRoot');
class ModalRootDesktopComponent extends React.Component {
    constructor(props){
        super(props);
        this.maskElementRef = /*#__PURE__*/ React.createRef();
        this.modalRootContext = {
            updateModalHeight: ()=>undefined,
            registerModal: ({ id , ...data })=>Object.assign(this.getModalState(id) ?? {}, data),
            onClose: ()=>this.props.onExit(),
            isInsideModal: true
        };
    }
    maskElementRef;
    maskAnimationFrame = undefined;
    modalRootContext;
    restoreFocusTo = undefined;
    get timeout() {
        return this.props.platform === Platform.IOS ? 400 : 320;
    }
    get modals() {
        return React.Children.toArray(this.props.children);
    }
    getModalState(id) {
        if (id === null) {
            return undefined;
        }
        return this.props.getModalState(id);
    }
    componentDidUpdate(prevProps) {
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
            this.restoreFocusTo = this.props.document?.activeElement ?? undefined;
        }
        if (!this.props.activeModal && !this.props.exitingModal && this.restoreFocusTo) {
            this.restoreFocusTo.focus();
            this.restoreFocusTo = undefined;
        }
    }
    openModal(prevProps) {
        const { enteringModal  } = this.props;
        if (!enteringModal) {
            return;
        }
        const enteringState = this.getModalState(enteringModal);
        this.props.onEnter();
        // Анимация открытия модального окна
        if (!prevProps.exitingModal) {
            requestAnimationFrame(()=>{
                if (this.props.enteringModal === enteringModal) {
                    this.waitTransitionFinish(enteringState, ()=>this.props.onEntered(enteringModal));
                    this.animateModalOpacity(enteringState, true);
                }
            });
            return;
        }
        // Переход между модальными окнами без анимации
        if (enteringState?.innerElement) {
            enteringState.innerElement.style.transition = 'none';
            enteringState.innerElement.style.opacity = '1';
        }
        this.props.onEntered(enteringModal);
    }
    closeModal(id) {
        const prevModalState = this.getModalState(id);
        if (!prevModalState) {
            return;
        }
        // Анимация закрытия модального окна
        if (!this.props.activeModal) {
            requestAnimationFrame(()=>{
                this.waitTransitionFinish(prevModalState, ()=>this.props.onExited(id));
                this.animateModalOpacity(prevModalState, false);
                this.setMaskOpacity(prevModalState, 0);
            });
            return;
        }
        // Переход между модальными окнами без анимации
        this.props.onExited(id);
    }
    waitTransitionFinish(modalState, eventHandler) {
        if (transitionEvent.supported) {
            const onceHandler = ()=>{
                modalState?.innerElement?.removeEventListener(transitionEvent.name, onceHandler);
                eventHandler();
            };
            modalState?.innerElement?.addEventListener(transitionEvent.name, onceHandler);
        } else {
            setTimeout(eventHandler, this.timeout);
        }
    }
    /* Анимирует сдвиг модалки */ animateModalOpacity(modalState, display) {
        if (modalState?.innerElement) {
            modalState.innerElement.style.transition = '';
            modalState.innerElement.style.transitionDelay = display && this.props.delayEnter ? `${this.timeout}ms` : '';
            modalState.innerElement.style.opacity = display ? '1' : '0';
        }
    }
    /* Устанавливает прозрачность для полупрозрачной подложки */ setMaskOpacity(modalState, forceOpacity = null) {
        if (forceOpacity === null && this.props.history?.[0] !== modalState.id) {
            return;
        }
        if (this.maskAnimationFrame) {
            cancelAnimationFrame(this.maskAnimationFrame);
        }
        this.maskAnimationFrame = requestAnimationFrame(()=>{
            if (this.maskElementRef.current) {
                const { translateY =0 , translateYCurrent =0  } = modalState;
                const opacity = forceOpacity === null ? 1 - (translateYCurrent - translateY) / (100 - translateY) || 0 : forceOpacity;
                this.maskElementRef.current.style.opacity = clamp(opacity, 0, 100).toString();
            }
        });
    }
    render() {
        const { exitingModal , activeModal  } = this.props;
        if (!activeModal && !exitingModal) {
            return null;
        }
        return /*#__PURE__*/ React.createElement(ModalRootContext.Provider, {
            value: this.modalRootContext
        }, /*#__PURE__*/ React.createElement("div", {
            className: classNames(styles['ModalRoot'], this.props.configProvider?.webviewType === WebviewType.VKAPPS && styles['ModalRoot--vkapps'], styles['ModalRoot--desktop'])
        }, /*#__PURE__*/ React.createElement("div", {
            className: styles['ModalRoot__mask'],
            ref: this.maskElementRef,
            onClick: this.props.onExit
        }), /*#__PURE__*/ React.createElement("div", {
            className: styles['ModalRoot__viewport']
        }, this.modals.map((Modal)=>{
            const modalId = getNavId(Modal.props, warn);
            if (modalId !== activeModal && modalId !== exitingModal) {
                return null;
            }
            const key = `modal-${modalId}`;
            return /*#__PURE__*/ React.createElement(FocusTrap, {
                restoreFocus: false,
                onClose: this.props.onExit,
                timeout: this.timeout,
                key: key,
                className: styles['ModalRoot__modal']
            }, Modal);
        }))));
    }
}
export const ModalRootDesktop = withContext(withPlatform(withDOM(withModalManager()(ModalRootDesktopComponent))), ConfigProviderContext, 'configProvider');

//# sourceMappingURL=ModalRootDesktop.js.map