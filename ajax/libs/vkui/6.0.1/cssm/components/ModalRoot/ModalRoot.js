import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { clamp } from '../../helpers/math';
import { withContext } from '../../hoc/withContext';
import { withPlatform } from '../../hoc/withPlatform';
import { withDOM } from '../../lib/dom';
import { getNavId } from '../../lib/getNavId';
import { setTransformStyle } from '../../lib/styles';
import { transitionEvent } from '../../lib/supportEvents';
import { rubber } from '../../lib/touch';
import { warnOnce } from '../../lib/warnOnce';
import { ConfigProviderContext } from '../ConfigProvider/ConfigProviderContext';
import { FocusTrap } from '../FocusTrap/FocusTrap';
import { Touch } from '../Touch/Touch';
import TouchRootContext from '../Touch/TouchContext';
import { ModalRootContext } from './ModalRootContext';
import { MODAL_PAGE_DEFAULT_PERCENT_HEIGHT } from './constants';
import { withModalManager } from './useModalManager';
import styles from './ModalRoot.module.css';
const warn = warnOnce('ModalRoot');
function numberInRange(number, range) {
    if (!range) {
        return false;
    }
    return number >= range[0] && number <= range[1];
}
function rangeTranslate(number) {
    return clamp(number, 0, 98);
}
class ModalRootTouchComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            touchDown: false,
            dragging: false,
            modalOpenedLog: []
        };
        this.maskElementRef = /*#__PURE__*/ React.createRef();
        this.modalRootContext = {
            updateModalHeight: this.updateModalHeight,
            registerModal: ({ id, ...data })=>Object.assign(this.props.getModalState(id) ?? {}, data),
            onClose: ()=>this.props.onExit(),
            isInsideModal: true
        };
        this.frameIds = {};
    }
    documentScrolling = false;
    maskElementRef;
    viewportRef = /*#__PURE__*/ React.createRef();
    maskAnimationFrame = undefined;
    modalRootContext;
    frameIds;
    restoreFocusTo = undefined;
    get timeout() {
        return this.props.platform === 'ios' ? 400 : 320;
    }
    get document() {
        return this.props.document;
    }
    get window() {
        return this.props.window;
    }
    getModals() {
        return React.Children.toArray(this.props.children);
    }
    componentDidMount() {
        // Отслеживаем изменение размеров viewport
        this.window?.addEventListener('resize', this.updateModalHeight, false);
    }
    componentWillUnmount() {
        this.toggleDocumentScrolling(true);
        this.window.removeEventListener('resize', this.updateModalHeight, false);
    }
    componentDidUpdate(prevProps) {
        // transition phase 2: animate exiting modal
        if (this.props.exitingModal && this.props.exitingModal !== prevProps.exitingModal) {
            this.closeModal(this.props.exitingModal);
        }
        // transition phase 3: animate entering modal
        if (this.props.enteringModal && this.props.enteringModal !== prevProps.enteringModal) {
            const enteringState = this.props.getModalState(this.props.enteringModal);
            this.props.onEnter();
            this.waitTransitionFinish(enteringState, ()=>{
                if (enteringState) {
                    if (enteringState.innerElement) {
                        enteringState.innerElement.style.transitionDelay = '';
                    }
                    this.onEntered(enteringState);
                }
            });
            if (enteringState?.innerElement) {
                enteringState.innerElement.style.transitionDelay = this.props.delayEnter ? `${this.timeout}ms` : '';
                this.animateTranslate(enteringState, enteringState.translateY);
                this.setMaskOpacity(enteringState, 1);
            }
        }
        // focus restoration
        if (this.props.activeModal && !prevProps.activeModal) {
            this.restoreFocusTo = this.document.activeElement;
        }
        if (!this.props.activeModal && !this.props.exitingModal && this.restoreFocusTo) {
            this.restoreFocusTo.focus();
            this.restoreFocusTo = null;
        }
        this.toggleDocumentScrolling(!this.props.activeModal && !this.props.exitingModal);
    }
    /* Отключает скролл документа */ toggleDocumentScrolling(enabled) {
        if (this.documentScrolling === enabled) {
            return;
        }
        this.documentScrolling = enabled;
        if (enabled) {
            // восстанавливаем значение overscroll behavior
            // eslint-disable-next-line no-restricted-properties
            this.document.documentElement.classList.remove('vkui--disable-overscroll-behavior');
            // некоторые браузеры на странных вендорах типа Meizu не удаляют обработчик.
            // https://github.com/VKCOM/VKUI/issues/444
            this.window.removeEventListener('touchmove', this.preventTouch, {
                // @ts-expect-error: TS2769 В интерфейсе EventListenerOptions нет поля passive
                passive: false
            });
        } else {
            // отключаем нативный pull-to-refresh при открытом модальном окне
            // чтобы он не срабатывал при закрытии модалки смахиванием вниз
            // eslint-disable-next-line no-restricted-properties
            this.document.documentElement.classList.add('vkui--disable-overscroll-behavior');
            this.window.addEventListener('touchmove', this.preventTouch, {
                passive: false
            });
        }
    }
    preventTouch = (event)=>{
        if (!event) {
            return false;
        }
        while(event.originalEvent){
            event = event.originalEvent;
        }
        if (event.preventDefault) {
            event.preventDefault();
        }
        return false;
    };
    checkPageContentHeight() {
        const modalState = this.props.getModalState(this.props.activeModal);
        if (modalState?.type === 'page' && modalState?.modalElement) {
            const prevModalState = {
                ...modalState
            };
            initPageModal(modalState);
            const currentModalState = {
                ...modalState
            };
            let needAnimate = false;
            if (prevModalState.expandable === currentModalState.expandable) {
                if (prevModalState.translateYFrom !== currentModalState.translateYFrom) {
                    needAnimate = true;
                }
            } else {
                needAnimate = true;
            }
            if (needAnimate) {
                this.animateTranslate(modalState, modalState.translateY);
            }
        }
    }
    updateModalHeight = ()=>{
        const modalState = this.props.getModalState(this.props.activeModal);
        if (modalState && modalState.type === 'page') {
            if (this.props.enteringModal) {
                this.waitTransitionFinish(modalState, ()=>{
                    requestAnimationFrame(()=>this.checkPageContentHeight());
                });
            } else {
                requestAnimationFrame(()=>this.checkPageContentHeight());
            }
        }
    };
    onEntered({ id, modalElement }) {
        if (!this.props.noFocusToDialog && modalElement && !modalElement.contains(this.document.activeElement)) {
            modalElement.focus();
        }
        this.props.onEntered(id);
    }
    closeModal(id) {
        // Сбрасываем состояния, которые могут помешать закрытию модального окна
        this.setState({
            touchDown: false
        });
        const prevModalState = this.props.getModalState(id);
        if (!prevModalState) {
            id && warn(`closeActiveModal: модальное окно (страница) ${id} не существует`, 'error');
            return;
        }
        if (!this.state.modalOpenedLog.length) {
            this.setState((prevState)=>({
                    modalOpenedLog: [
                        ...prevState.modalOpenedLog,
                        id
                    ]
                }));
        }
        const nextModalState = this.props.getModalState(this.props.activeModal);
        const nextIsPage = !!nextModalState && nextModalState.type === 'page';
        const prevIsPage = !!prevModalState && prevModalState.type === 'page';
        this.waitTransitionFinish(prevModalState, ()=>this.props.onExited(id));
        const exitTranslate = prevIsPage && nextIsPage && (prevModalState.translateY ?? 0) <= (nextModalState?.translateYFrom ?? 0) && !this.props.isBack ? (nextModalState?.translateYFrom ?? 0) + 10 : 100;
        this.animateTranslate(prevModalState, exitTranslate);
        if (!nextModalState) {
            // NOTE: was only for clean exit
            this.setMaskOpacity(prevModalState, 0);
            this.setState({
                modalOpenedLog: []
            });
            prevModalState.translateY = undefined;
            prevModalState.expandable = undefined;
        } else if (nextModalState.id && !this.state.modalOpenedLog.includes(nextModalState.id)) {
            nextModalState.translateY = undefined;
            this.setState((prevState)=>({
                    modalOpenedLog: [
                        ...prevState.modalOpenedLog,
                        nextModalState.id
                    ]
                }));
        }
    }
    onTouchMove = (e)=>{
        if (this.props.exitingModal) {
            return;
        }
        const modalState = this.props.getModalState(this.props.activeModal);
        if (!modalState) {
            return;
        }
        if (modalState.type === 'page') {
            return this.onPageTouchMove(e, modalState);
        }
        if (modalState.type === 'card') {
            return this.onCardTouchMove(e, modalState);
        }
    };
    onPageTouchMove(event, modalState) {
        const { shiftY, originalEvent } = event;
        const target = originalEvent.target;
        if (!event.isY) {
            if (this.viewportRef.current?.contains(target)) {
                originalEvent.preventDefault();
            }
            return;
        }
        if (!modalState.innerElement?.contains(target)) {
            return originalEvent.preventDefault();
        }
        originalEvent.stopPropagation();
        const { expandable, contentScrolled, collapsed, expanded } = modalState;
        if (!this.state.touchDown) {
            modalState.touchStartContentScrollTop = modalState.contentElement?.scrollTop ?? 0;
            this.setState({
                touchDown: true
            });
        }
        if (contentScrolled) {
            return;
        }
        if (modalState.touchMovePositive === null) {
            modalState.touchMovePositive = shiftY > 0;
        }
        if (!modalState.expandable || collapsed || expanded && modalState.touchMovePositive && modalState.touchStartContentScrollTop === 0 || modalState.headerElement?.contains(target)) {
            originalEvent.preventDefault();
            if (!expandable && shiftY < 0 || !this.window) {
                return;
            }
            !this.state.dragging && this.setState({
                dragging: true
            });
            const shiftYPercent = shiftY / this.window.innerHeight * 100;
            const shiftYCurrent = rubber(shiftYPercent, 72, 0.8, this.props.platform !== 'ios');
            modalState.touchShiftYPercent = shiftYPercent;
            modalState.translateYCurrent = rangeTranslate((modalState.translateY ?? 0) + shiftYCurrent);
            this.animateTranslate(modalState, modalState.translateYCurrent);
            this.setMaskOpacity(modalState);
        }
    }
    onCardTouchMove(event, modalState) {
        const { originalEvent, shiftY } = event;
        const target = originalEvent.target;
        if (modalState.innerElement?.contains(target)) {
            if (!this.state.touchDown) {
                this.setState({
                    touchDown: true,
                    dragging: true
                });
            }
            const shiftYPercent = shiftY / modalState.innerElement.offsetHeight * 100;
            const shiftYCurrent = rubber(shiftYPercent, 72, 1.2, this.props.platform !== 'ios');
            modalState.touchShiftYPercent = shiftYPercent;
            modalState.translateYCurrent = Math.max(0, (modalState.translateY ?? 0) + shiftYCurrent);
            this.animateTranslate(modalState, modalState.translateYCurrent);
            this.setMaskOpacity(modalState);
        }
    }
    onTouchEnd = (e)=>{
        const modalState = this.props.getModalState(this.props.activeModal);
        if (modalState?.type === 'page') {
            return this.onPageTouchEnd(e, modalState);
        }
        if (modalState?.type === 'card') {
            return this.onCardTouchEnd(e, modalState);
        }
    };
    onPageTouchEnd(event, modalState) {
        const { startY, shiftY } = event;
        modalState.contentScrolled = false;
        modalState.touchMovePositive = null;
        let setStateCallback;
        if (this.state.dragging && this.window) {
            const shiftYEndPercent = (startY + shiftY) / this.window.innerHeight * 100;
            let translateY = modalState.translateYCurrent ?? 0;
            const expectTranslateY = translateY / event.duration * 240 * 0.6 * ((modalState.touchShiftYPercent ?? 0) < 0 ? -1 : 1);
            translateY = rangeTranslate(translateY + expectTranslateY);
            if (modalState.settlingHeight !== 100) {
                if (numberInRange(translateY, modalState.expandedRange)) {
                    translateY = modalState.expandedRange?.[0] ?? 0;
                } else if (numberInRange(translateY, modalState.collapsedRange)) {
                    translateY = modalState.translateYFrom ?? 0;
                } else if (numberInRange(translateY, modalState.hiddenRange)) {
                    translateY = 100;
                } else {
                    translateY = modalState.translateYFrom ?? 0;
                }
            } else {
                if (numberInRange(translateY, [
                    0,
                    25
                ])) {
                    translateY = 0;
                } else {
                    translateY = 100;
                }
            }
            if (translateY !== 100 && shiftYEndPercent >= 75) {
                translateY = 100;
            }
            modalState.translateY = translateY;
            modalState.translateYCurrent = translateY;
            modalState.collapsed = numberInRange(translateY, modalState.collapsedRange);
            modalState.expanded = translateY === 0;
            modalState.hidden = translateY === 100;
            if (modalState.hidden) {
                this.props.onExit();
            }
            setStateCallback = ()=>{
                if (!modalState.hidden) {
                    this.animateTranslate(modalState, modalState.translateY);
                }
                this.setMaskOpacity(modalState);
            };
        }
        this.setState({
            touchDown: false,
            dragging: false
        }, setStateCallback);
    }
    onCardTouchEnd({ duration }, modalState) {
        let setStateCallback;
        if (this.state.dragging) {
            let translateY = modalState.translateYCurrent ?? 0;
            const expectTranslateY = translateY / duration * 240 * 0.6 * ((modalState.touchShiftYPercent ?? 0) < 0 ? -1 : 1);
            translateY = Math.max(0, translateY + expectTranslateY);
            if (translateY >= 30) {
                translateY = 100;
            } else {
                translateY = 0;
            }
            modalState.translateY = translateY;
            modalState.hidden = translateY === 100;
            if (modalState.hidden) {
                this.props.onExit();
            }
            setStateCallback = ()=>{
                if (!modalState.hidden) {
                    this.animateTranslate(modalState, modalState.translateY);
                }
                this.setMaskOpacity(modalState);
            };
        }
        this.setState({
            touchDown: false,
            dragging: false
        }, setStateCallback);
    }
    onScroll = (e)=>{
        const activeModal = this.props.activeModal;
        const target = e.target;
        if (!activeModal) {
            return;
        }
        const modalState = this.props.getModalState(activeModal);
        if (modalState?.type === 'page' && modalState?.contentElement?.contains(target)) {
            modalState.contentScrolled = true;
            if (modalState.contentScrollStopTimeout) {
                clearTimeout(modalState.contentScrollStopTimeout);
            }
            modalState.contentScrollStopTimeout = setTimeout(()=>{
                if (modalState.contentScrolled) {
                    modalState.contentScrolled = false;
                }
            }, 250);
        }
    };
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
    /**
   * Анимирует сдвиг модалки
   *
   * @param {ModalsStateEntry} modalState
   * @param {number} percent Процент сдвига: 0 – полностью открыта, 100 – полностью закрыта
   */ animateTranslate(modalState, percent) {
        const frameId = `animateTranslateFrame${modalState.id}`;
        cancelAnimationFrame(this.frameIds[frameId]);
        this.frameIds[frameId] = requestAnimationFrame(()=>{
            setTransformStyle(modalState.innerElement, `translate3d(0, ${percent}%, 0)`);
        });
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
                const { translateY = 0, translateYCurrent = 0 } = modalState;
                const opacity = forceOpacity === null ? 1 - (translateYCurrent - translateY) / (100 - translateY) || 0 : forceOpacity;
                this.maskElementRef.current.style.opacity = clamp(opacity, 0, 100).toString();
                this.maskElementRef.current.style.transitionDelay = opacity && this.props.delayEnter ? `${this.timeout}ms` : '';
            }
        });
    }
    render() {
        const { activeModal, exitingModal, enteringModal, modalOverlayTestId } = this.props;
        const { touchDown, dragging } = this.state;
        if (!activeModal && !exitingModal) {
            return null;
        }
        return /*#__PURE__*/ React.createElement(TouchRootContext.Provider, {
            value: true
        }, /*#__PURE__*/ React.createElement(ModalRootContext.Provider, {
            value: this.modalRootContext
        }, /*#__PURE__*/ React.createElement(Touch, {
            className: classNames(styles['ModalRoot'], this.props.configProvider?.hasCustomPanelHeaderAfter && styles['ModalRoot--hasCustomPanelHeaderAfterSlot'], touchDown && classNames(styles['ModalRoot--touched'], 'vkuiInternalModalRoot--touched'), !!(enteringModal || exitingModal) && classNames(styles['ModalRoot--switching'], 'vkuiInternalModalRoot--switching')),
            onMove: this.onTouchMove,
            onEnd: this.onTouchEnd,
            onScroll: this.onScroll
        }, /*#__PURE__*/ React.createElement("div", {
            "data-testid": modalOverlayTestId,
            className: styles['ModalRoot__mask'],
            onClick: this.props.onExit,
            ref: this.maskElementRef
        }), /*#__PURE__*/ React.createElement("div", {
            className: styles['ModalRoot__viewport'],
            ref: this.viewportRef
        }, this.getModals().map((Modal)=>{
            const modalId = getNavId(Modal.props, warn);
            const _modalState = this.props.getModalState(modalId);
            if (modalId !== activeModal && modalId !== exitingModal || !_modalState) {
                return null;
            }
            const modalState = {
                ..._modalState
            };
            const isPage = modalState.type === 'page';
            const key = `modal-${modalId}`;
            return /*#__PURE__*/ React.createElement(FocusTrap, {
                key: key,
                onClose: this.props.onExit,
                timeout: this.timeout,
                className: classNames(styles['ModalRoot__modal'], dragging && 'vkuiInternalModalRoot__modal--dragging', isPage && modalState.expandable && 'vkuiInternalModalRoot__modal--expandable', isPage && modalState.collapsed && 'vkuiInternalModalRoot__modal--collapsed'),
                restoreFocus: false
            }, Modal);
        })))));
    }
}
export const ModalRootTouch = withContext(withPlatform(withDOM(withModalManager(initModal)(ModalRootTouchComponent))), ConfigProviderContext, 'configProvider');
/**
 * Инициализирует модалку перед анимацией открытия
 */ function initModal(modalState) {
    switch(modalState.type){
        case 'page':
            modalState.settlingHeight = modalState.settlingHeight || MODAL_PAGE_DEFAULT_PERCENT_HEIGHT;
            return initPageModal(modalState);
        case 'card':
            return initCardModal(modalState);
        default:
            process.env.NODE_ENV === 'development' && warn(`initActiveModal: modalState.type="${modalState.type}" не поддерживается`, 'error');
    }
}
function initPageModal(modalState) {
    const { contentElement, bottomInset } = modalState;
    const contentElementHeight = calculateModalContentHeight(contentElement?.firstElementChild, modalState.expandable);
    const bottomInsetHeight = bottomInset?.offsetHeight || 0;
    const contentHeight = contentElementHeight + bottomInsetHeight;
    let prevTranslateY = modalState.translateY;
    let prevExpandable = modalState.expandable;
    modalState.expandable = contentHeight > (contentElement?.clientHeight ?? 0) || modalState.settlingHeight === 100;
    let collapsed = false;
    let expanded = false;
    let translateYFrom;
    let translateY;
    let expandedRange;
    let collapsedRange;
    let hiddenRange;
    const hasCollapsedState = Boolean(modalState.expandable && modalState.settlingHeight !== 100);
    if (modalState.expandable) {
        translateYFrom = 100 - (modalState.settlingHeight ?? 0);
        const shiftHalf = translateYFrom / 2;
        const visiblePart = 100 - translateYFrom;
        expandedRange = [
            0,
            shiftHalf
        ];
        collapsedRange = hasCollapsedState ? [
            shiftHalf,
            translateYFrom + visiblePart / 4
        ] : undefined;
        hiddenRange = [
            translateYFrom + visiblePart / 4,
            100
        ];
        collapsed = hasCollapsedState && translateYFrom > 0;
        expanded = translateYFrom <= 0;
        translateY = translateYFrom;
    } else {
        const headerHeight = modalState.headerElement?.offsetHeight ?? 0;
        const height = contentHeight + headerHeight;
        translateYFrom = 100 - height / (modalState.innerElement?.parentElement?.offsetHeight ?? 0) * 100;
        translateY = translateYFrom;
        expandedRange = [
            translateY,
            translateY + 25
        ];
        collapsedRange = undefined;
        hiddenRange = [
            translateY + 25,
            translateY + 100
        ];
    }
    // Свойство expandable может измениться из-за высоты контента, в таком случае на всю высоту не разворачиваем
    const shouldExpand = prevExpandable && modalState.expandable;
    // Если модалка может открываться на весь экран, и новый сдвиг больше предыдущего, то откроем её на весь экран
    if (shouldExpand && translateY > (prevTranslateY ?? 100) || modalState.settlingHeight === 100) {
        translateY = 0;
    }
    // Если модалка уже раскрыта обновляем состояния
    if (translateY === 0) {
        expanded = true;
        collapsed = false;
    }
    modalState.expandedRange = expandedRange;
    modalState.collapsedRange = collapsedRange;
    modalState.hiddenRange = hiddenRange;
    modalState.translateY = translateY;
    modalState.translateYFrom = translateYFrom;
    modalState.collapsed = collapsed;
    modalState.expanded = expanded;
}
function initCardModal(modalState) {
    modalState.translateY = 0;
}
function calculateModalContentHeight(element, isExpandable) {
    if (!isExpandable) {
        return element.scrollHeight;
    }
    /*
   * В режиме expandable мы назначаем контейнеру контента высоту 100%, что не даёт
   * получить реальную высоту контента.
   * Поэтому мы пересчитываем высоту, временно устанавливая height: auto;
   * */ const currentHeightStyle = element.style.height;
    element.style.height = 'auto';
    const elementHeight = element.scrollHeight;
    element.style.height = currentHeightStyle;
    return elementHeight;
}

//# sourceMappingURL=ModalRoot.js.map