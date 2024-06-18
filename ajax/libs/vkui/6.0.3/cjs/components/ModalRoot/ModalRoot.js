"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModalRootTouch", {
    enumerable: true,
    get: function() {
        return ModalRootTouch;
    }
});
const _define_property = require("@swc/helpers/_/_define_property");
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _math = require("../../helpers/math");
const _withContext = require("../../hoc/withContext");
const _withPlatform = require("../../hoc/withPlatform");
const _dom = require("../../lib/dom");
const _getNavId = require("../../lib/getNavId");
const _styles = require("../../lib/styles");
const _supportEvents = require("../../lib/supportEvents");
const _touch = require("../../lib/touch");
const _warnOnce = require("../../lib/warnOnce");
const _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
const _FocusTrap = require("../FocusTrap/FocusTrap");
const _Touch = require("../Touch/Touch");
const _TouchContext = /*#__PURE__*/ _interop_require_default._(require("../Touch/TouchContext"));
const _ModalRootContext = require("./ModalRootContext");
const _constants = require("./constants");
const _useModalManager = require("./useModalManager");
const warn = (0, _warnOnce.warnOnce)('ModalRoot');
function numberInRange(number, range) {
    if (!range) {
        return false;
    }
    return number >= range[0] && number <= range[1];
}
function rangeTranslate(number) {
    return (0, _math.clamp)(number, 0, 98);
}
class ModalRootTouchComponent extends _react.Component {
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
        return _react.Children.toArray(this.props.children);
    }
    componentDidMount() {
        var // Отслеживаем изменение размеров viewport
        _this_window;
        (_this_window = this.window) === null || _this_window === void 0 ? void 0 : _this_window.addEventListener('resize', this.updateModalHeight, false);
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
            if (enteringState === null || enteringState === void 0 ? void 0 : enteringState.innerElement) {
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
    checkPageContentHeight() {
        const modalState = this.props.getModalState(this.props.activeModal);
        if ((modalState === null || modalState === void 0 ? void 0 : modalState.type) === 'page' && (modalState === null || modalState === void 0 ? void 0 : modalState.modalElement)) {
            const prevModalState = _object_spread._({}, modalState);
            initPageModal(modalState);
            const currentModalState = _object_spread._({}, modalState);
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
        var _prevModalState_translateY, _nextModalState_translateYFrom, _nextModalState_translateYFrom1;
        const exitTranslate = prevIsPage && nextIsPage && ((_prevModalState_translateY = prevModalState.translateY) !== null && _prevModalState_translateY !== void 0 ? _prevModalState_translateY : 0) <= ((_nextModalState_translateYFrom = nextModalState === null || nextModalState === void 0 ? void 0 : nextModalState.translateYFrom) !== null && _nextModalState_translateYFrom !== void 0 ? _nextModalState_translateYFrom : 0) && !this.props.isBack ? ((_nextModalState_translateYFrom1 = nextModalState === null || nextModalState === void 0 ? void 0 : nextModalState.translateYFrom) !== null && _nextModalState_translateYFrom1 !== void 0 ? _nextModalState_translateYFrom1 : 0) + 10 : 100;
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
    onPageTouchMove(event, modalState) {
        var _modalState_innerElement, _modalState_headerElement;
        const { shiftY, originalEvent } = event;
        const target = originalEvent.target;
        if (!event.isY) {
            var _this_viewportRef_current;
            if ((_this_viewportRef_current = this.viewportRef.current) === null || _this_viewportRef_current === void 0 ? void 0 : _this_viewportRef_current.contains(target)) {
                originalEvent.preventDefault();
            }
            return;
        }
        if (!((_modalState_innerElement = modalState.innerElement) === null || _modalState_innerElement === void 0 ? void 0 : _modalState_innerElement.contains(target))) {
            return originalEvent.preventDefault();
        }
        originalEvent.stopPropagation();
        const { expandable, contentScrolled, collapsed, expanded } = modalState;
        if (!this.state.touchDown) {
            var _modalState_contentElement;
            var _modalState_contentElement_scrollTop;
            modalState.touchStartContentScrollTop = (_modalState_contentElement_scrollTop = (_modalState_contentElement = modalState.contentElement) === null || _modalState_contentElement === void 0 ? void 0 : _modalState_contentElement.scrollTop) !== null && _modalState_contentElement_scrollTop !== void 0 ? _modalState_contentElement_scrollTop : 0;
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
        if (!modalState.expandable || collapsed || expanded && modalState.touchMovePositive && modalState.touchStartContentScrollTop === 0 || ((_modalState_headerElement = modalState.headerElement) === null || _modalState_headerElement === void 0 ? void 0 : _modalState_headerElement.contains(target))) {
            originalEvent.preventDefault();
            if (!expandable && shiftY < 0 || !this.window) {
                return;
            }
            !this.state.dragging && this.setState({
                dragging: true
            });
            const shiftYPercent = shiftY / this.window.innerHeight * 100;
            const shiftYCurrent = (0, _touch.rubber)(shiftYPercent, 72, 0.8, this.props.platform !== 'ios');
            modalState.touchShiftYPercent = shiftYPercent;
            var _modalState_translateY;
            modalState.translateYCurrent = rangeTranslate(((_modalState_translateY = modalState.translateY) !== null && _modalState_translateY !== void 0 ? _modalState_translateY : 0) + shiftYCurrent);
            this.animateTranslate(modalState, modalState.translateYCurrent);
            this.setMaskOpacity(modalState);
        }
    }
    onCardTouchMove(event, modalState) {
        var _modalState_innerElement;
        const { originalEvent, shiftY } = event;
        const target = originalEvent.target;
        if ((_modalState_innerElement = modalState.innerElement) === null || _modalState_innerElement === void 0 ? void 0 : _modalState_innerElement.contains(target)) {
            if (!this.state.touchDown) {
                this.setState({
                    touchDown: true,
                    dragging: true
                });
            }
            const shiftYPercent = shiftY / modalState.innerElement.offsetHeight * 100;
            const shiftYCurrent = (0, _touch.rubber)(shiftYPercent, 72, 1.2, this.props.platform !== 'ios');
            modalState.touchShiftYPercent = shiftYPercent;
            var _modalState_translateY;
            modalState.translateYCurrent = Math.max(0, ((_modalState_translateY = modalState.translateY) !== null && _modalState_translateY !== void 0 ? _modalState_translateY : 0) + shiftYCurrent);
            this.animateTranslate(modalState, modalState.translateYCurrent);
            this.setMaskOpacity(modalState);
        }
    }
    onPageTouchEnd(event, modalState) {
        const { startY, shiftY } = event;
        modalState.contentScrolled = false;
        modalState.touchMovePositive = null;
        let setStateCallback;
        if (this.state.dragging && this.window) {
            const shiftYEndPercent = (startY + shiftY) / this.window.innerHeight * 100;
            var _modalState_translateYCurrent;
            let translateY = (_modalState_translateYCurrent = modalState.translateYCurrent) !== null && _modalState_translateYCurrent !== void 0 ? _modalState_translateYCurrent : 0;
            var _modalState_touchShiftYPercent;
            const expectTranslateY = translateY / event.duration * 240 * 0.6 * (((_modalState_touchShiftYPercent = modalState.touchShiftYPercent) !== null && _modalState_touchShiftYPercent !== void 0 ? _modalState_touchShiftYPercent : 0) < 0 ? -1 : 1);
            translateY = rangeTranslate(translateY + expectTranslateY);
            if (modalState.settlingHeight !== 100) {
                if (numberInRange(translateY, modalState.expandedRange)) {
                    var _modalState_expandedRange;
                    var _modalState_expandedRange_;
                    translateY = (_modalState_expandedRange_ = (_modalState_expandedRange = modalState.expandedRange) === null || _modalState_expandedRange === void 0 ? void 0 : _modalState_expandedRange[0]) !== null && _modalState_expandedRange_ !== void 0 ? _modalState_expandedRange_ : 0;
                } else if (numberInRange(translateY, modalState.collapsedRange)) {
                    var _modalState_translateYFrom;
                    translateY = (_modalState_translateYFrom = modalState.translateYFrom) !== null && _modalState_translateYFrom !== void 0 ? _modalState_translateYFrom : 0;
                } else if (numberInRange(translateY, modalState.hiddenRange)) {
                    translateY = 100;
                } else {
                    var _modalState_translateYFrom1;
                    translateY = (_modalState_translateYFrom1 = modalState.translateYFrom) !== null && _modalState_translateYFrom1 !== void 0 ? _modalState_translateYFrom1 : 0;
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
            var _modalState_translateYCurrent;
            let translateY = (_modalState_translateYCurrent = modalState.translateYCurrent) !== null && _modalState_translateYCurrent !== void 0 ? _modalState_translateYCurrent : 0;
            var _modalState_touchShiftYPercent;
            const expectTranslateY = translateY / duration * 240 * 0.6 * (((_modalState_touchShiftYPercent = modalState.touchShiftYPercent) !== null && _modalState_touchShiftYPercent !== void 0 ? _modalState_touchShiftYPercent : 0) < 0 ? -1 : 1);
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
    waitTransitionFinish(modalState, eventHandler) {
        if (_supportEvents.transitionEvent.supported) {
            var _modalState_innerElement;
            const onceHandler = ()=>{
                var _modalState_innerElement;
                modalState === null || modalState === void 0 ? void 0 : (_modalState_innerElement = modalState.innerElement) === null || _modalState_innerElement === void 0 ? void 0 : _modalState_innerElement.removeEventListener(_supportEvents.transitionEvent.name, onceHandler);
                eventHandler();
            };
            modalState === null || modalState === void 0 ? void 0 : (_modalState_innerElement = modalState.innerElement) === null || _modalState_innerElement === void 0 ? void 0 : _modalState_innerElement.addEventListener(_supportEvents.transitionEvent.name, onceHandler);
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
            (0, _styles.setTransformStyle)(modalState.innerElement, `translate3d(0, ${percent}%, 0)`);
        });
    }
    /* Устанавливает прозрачность для полупрозрачной подложки */ setMaskOpacity(modalState, forceOpacity = null) {
        var _this_props_history;
        if (forceOpacity === null && ((_this_props_history = this.props.history) === null || _this_props_history === void 0 ? void 0 : _this_props_history[0]) !== modalState.id) {
            return;
        }
        if (this.maskAnimationFrame) {
            cancelAnimationFrame(this.maskAnimationFrame);
        }
        this.maskAnimationFrame = requestAnimationFrame(()=>{
            if (this.maskElementRef.current) {
                const { translateY = 0, translateYCurrent = 0 } = modalState;
                const opacity = forceOpacity === null ? 1 - (translateYCurrent - translateY) / (100 - translateY) || 0 : forceOpacity;
                this.maskElementRef.current.style.opacity = (0, _math.clamp)(opacity, 0, 100).toString();
                this.maskElementRef.current.style.transitionDelay = opacity && this.props.delayEnter ? `${this.timeout}ms` : '';
            }
        });
    }
    render() {
        var _this_props_configProvider;
        const { activeModal, exitingModal, enteringModal, modalOverlayTestId } = this.props;
        const { touchDown, dragging } = this.state;
        if (!activeModal && !exitingModal) {
            return null;
        }
        return /*#__PURE__*/ _react.createElement(_TouchContext.default.Provider, {
            value: true
        }, /*#__PURE__*/ _react.createElement(_ModalRootContext.ModalRootContext.Provider, {
            value: this.modalRootContext
        }, /*#__PURE__*/ _react.createElement(_Touch.Touch, {
            className: (0, _vkjs.classNames)("vkuiModalRoot", ((_this_props_configProvider = this.props.configProvider) === null || _this_props_configProvider === void 0 ? void 0 : _this_props_configProvider.hasCustomPanelHeaderAfter) && "vkuiModalRoot--hasCustomPanelHeaderAfterSlot", touchDown && (0, _vkjs.classNames)("vkuiModalRoot--touched", 'vkuiInternalModalRoot--touched'), !!(enteringModal || exitingModal) && (0, _vkjs.classNames)("vkuiModalRoot--switching", 'vkuiInternalModalRoot--switching')),
            onMove: this.onTouchMove,
            onEnd: this.onTouchEnd,
            onScroll: this.onScroll
        }, /*#__PURE__*/ _react.createElement("div", {
            "data-testid": modalOverlayTestId,
            className: "vkuiModalRoot__mask",
            onClick: this.props.onExit,
            ref: this.maskElementRef
        }), /*#__PURE__*/ _react.createElement("div", {
            className: "vkuiModalRoot__viewport",
            ref: this.viewportRef
        }, this.getModals().map((Modal)=>{
            const modalId = (0, _getNavId.getNavId)(Modal.props, warn);
            const _modalState = this.props.getModalState(modalId);
            if (modalId !== activeModal && modalId !== exitingModal || !_modalState) {
                return null;
            }
            const modalState = _object_spread._({}, _modalState);
            const isPage = modalState.type === 'page';
            const key = `modal-${modalId}`;
            return /*#__PURE__*/ _react.createElement(_FocusTrap.FocusTrap, {
                key: key,
                onClose: this.props.onExit,
                timeout: this.timeout,
                className: (0, _vkjs.classNames)("vkuiModalRoot__modal", dragging && 'vkuiInternalModalRoot__modal--dragging', isPage && modalState.expandable && 'vkuiInternalModalRoot__modal--expandable', isPage && modalState.collapsed && 'vkuiInternalModalRoot__modal--collapsed'),
                restoreFocus: false
            }, Modal);
        })))));
    }
    constructor(props){
        super(props);
        _define_property._(this, "documentScrolling", false);
        _define_property._(this, "maskElementRef", void 0);
        _define_property._(this, "viewportRef", /*#__PURE__*/ _react.createRef());
        _define_property._(this, "maskAnimationFrame", undefined);
        _define_property._(this, "modalRootContext", void 0);
        _define_property._(this, "frameIds", void 0);
        _define_property._(this, "restoreFocusTo", undefined);
        _define_property._(this, "preventTouch", (event)=>{
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
        });
        _define_property._(this, "updateModalHeight", ()=>{
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
        });
        _define_property._(this, "onTouchMove", (e)=>{
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
        });
        _define_property._(this, "onTouchEnd", (e)=>{
            const modalState = this.props.getModalState(this.props.activeModal);
            if ((modalState === null || modalState === void 0 ? void 0 : modalState.type) === 'page') {
                return this.onPageTouchEnd(e, modalState);
            }
            if ((modalState === null || modalState === void 0 ? void 0 : modalState.type) === 'card') {
                return this.onCardTouchEnd(e, modalState);
            }
        });
        _define_property._(this, "onScroll", (e)=>{
            var _modalState_contentElement;
            const activeModal = this.props.activeModal;
            const target = e.target;
            if (!activeModal) {
                return;
            }
            const modalState = this.props.getModalState(activeModal);
            if ((modalState === null || modalState === void 0 ? void 0 : modalState.type) === 'page' && (modalState === null || modalState === void 0 ? void 0 : (_modalState_contentElement = modalState.contentElement) === null || _modalState_contentElement === void 0 ? void 0 : _modalState_contentElement.contains(target))) {
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
        });
        this.state = {
            touchDown: false,
            dragging: false,
            modalOpenedLog: []
        };
        this.maskElementRef = /*#__PURE__*/ _react.createRef();
        this.modalRootContext = {
            updateModalHeight: this.updateModalHeight,
            registerModal: (_param)=>{
                var { id } = _param, data = _object_without_properties._(_param, [
                    "id"
                ]);
                var _this_props_getModalState;
                return Object.assign((_this_props_getModalState = this.props.getModalState(id)) !== null && _this_props_getModalState !== void 0 ? _this_props_getModalState : {}, data);
            },
            onClose: ()=>this.props.onExit(),
            isInsideModal: true
        };
        this.frameIds = {};
    }
}
const ModalRootTouch = (0, _withContext.withContext)((0, _withPlatform.withPlatform)((0, _dom.withDOM)((0, _useModalManager.withModalManager)(initModal)(ModalRootTouchComponent))), _ConfigProviderContext.ConfigProviderContext, 'configProvider');
/**
 * Инициализирует модалку перед анимацией открытия
 */ function initModal(modalState) {
    switch(modalState.type){
        case 'page':
            modalState.settlingHeight = modalState.settlingHeight || _constants.MODAL_PAGE_DEFAULT_PERCENT_HEIGHT;
            return initPageModal(modalState);
        case 'card':
            return initCardModal(modalState);
        default:
            process.env.NODE_ENV === 'development' && warn(`initActiveModal: modalState.type="${modalState.type}" не поддерживается`, 'error');
    }
}
function initPageModal(modalState) {
    const { contentElement, bottomInset } = modalState;
    const contentElementHeight = calculateModalContentHeight(contentElement === null || contentElement === void 0 ? void 0 : contentElement.firstElementChild, modalState.expandable);
    const bottomInsetHeight = (bottomInset === null || bottomInset === void 0 ? void 0 : bottomInset.offsetHeight) || 0;
    const contentHeight = contentElementHeight + bottomInsetHeight;
    let prevTranslateY = modalState.translateY;
    let prevExpandable = modalState.expandable;
    var _contentElement_clientHeight;
    modalState.expandable = contentHeight > ((_contentElement_clientHeight = contentElement === null || contentElement === void 0 ? void 0 : contentElement.clientHeight) !== null && _contentElement_clientHeight !== void 0 ? _contentElement_clientHeight : 0) || modalState.settlingHeight === 100;
    let collapsed = false;
    let expanded = false;
    let translateYFrom;
    let translateY;
    let expandedRange;
    let collapsedRange;
    let hiddenRange;
    const hasCollapsedState = Boolean(modalState.expandable && modalState.settlingHeight !== 100);
    if (modalState.expandable) {
        var _modalState_settlingHeight;
        translateYFrom = 100 - ((_modalState_settlingHeight = modalState.settlingHeight) !== null && _modalState_settlingHeight !== void 0 ? _modalState_settlingHeight : 0);
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
        var _modalState_headerElement, _modalState_innerElement_parentElement, _modalState_innerElement;
        var _modalState_headerElement_offsetHeight;
        const headerHeight = (_modalState_headerElement_offsetHeight = (_modalState_headerElement = modalState.headerElement) === null || _modalState_headerElement === void 0 ? void 0 : _modalState_headerElement.offsetHeight) !== null && _modalState_headerElement_offsetHeight !== void 0 ? _modalState_headerElement_offsetHeight : 0;
        const height = contentHeight + headerHeight;
        var _modalState_innerElement_parentElement_offsetHeight;
        translateYFrom = 100 - height / ((_modalState_innerElement_parentElement_offsetHeight = (_modalState_innerElement = modalState.innerElement) === null || _modalState_innerElement === void 0 ? void 0 : (_modalState_innerElement_parentElement = _modalState_innerElement.parentElement) === null || _modalState_innerElement_parentElement === void 0 ? void 0 : _modalState_innerElement_parentElement.offsetHeight) !== null && _modalState_innerElement_parentElement_offsetHeight !== void 0 ? _modalState_innerElement_parentElement_offsetHeight : 0) * 100;
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
    if (shouldExpand && translateY > (prevTranslateY !== null && prevTranslateY !== void 0 ? prevTranslateY : 100) || modalState.settlingHeight === 100) {
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