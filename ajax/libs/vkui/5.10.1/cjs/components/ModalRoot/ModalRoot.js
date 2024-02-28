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
var _assert_this_initialized = require("@swc/helpers/_/_assert_this_initialized");
var _class_call_check = require("@swc/helpers/_/_class_call_check");
var _create_class = require("@swc/helpers/_/_create_class");
var _define_property = require("@swc/helpers/_/_define_property");
var _inherits = require("@swc/helpers/_/_inherits");
var _interop_require_default = require("@swc/helpers/_/_interop_require_default");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _to_consumable_array = require("@swc/helpers/_/_to_consumable_array");
var _create_super = require("@swc/helpers/_/_create_super");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _math = require("../../helpers/math");
var _withContext = require("../../hoc/withContext");
var _withPlatform = require("../../hoc/withPlatform");
var _dom = require("../../lib/dom");
var _getNavId = require("../../lib/getNavId");
var _platform = require("../../lib/platform");
var _styles = require("../../lib/styles");
var _supportEvents = require("../../lib/supportEvents");
var _touch = require("../../lib/touch");
var _warnOnce = require("../../lib/warnOnce");
var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
var _FocusTrap = require("../FocusTrap/FocusTrap");
var _Touch = require("../Touch/Touch");
var _TouchContext = /*#__PURE__*/ _interop_require_default._(require("../Touch/TouchContext"));
var _ModalRootContext = require("./ModalRootContext");
var _constants = require("./constants");
var _types = require("./types");
var _useModalManager = require("./useModalManager");
var warn = (0, _warnOnce.warnOnce)("ModalRoot");
function numberInRange(number, range) {
    if (!range) {
        return false;
    }
    return number >= range[0] && number <= range[1];
}
function rangeTranslate(number) {
    return (0, _math.clamp)(number, 0, 98);
}
var ModalRootTouchComponent = /*#__PURE__*/ function(_React_Component) {
    "use strict";
    _inherits._(ModalRootTouchComponent, _React_Component);
    var _super = _create_super._(ModalRootTouchComponent);
    function ModalRootTouchComponent(props) {
        _class_call_check._(this, ModalRootTouchComponent);
        var _this;
        _this = _super.call(this, props);
        _define_property._(_assert_this_initialized._(_this), "documentScrolling", false);
        _define_property._(_assert_this_initialized._(_this), "maskElementRef", void 0);
        _define_property._(_assert_this_initialized._(_this), "viewportRef", /*#__PURE__*/ _react.createRef());
        _define_property._(_assert_this_initialized._(_this), "maskAnimationFrame", undefined);
        _define_property._(_assert_this_initialized._(_this), "modalRootContext", void 0);
        _define_property._(_assert_this_initialized._(_this), "frameIds", void 0);
        _define_property._(_assert_this_initialized._(_this), "restoreFocusTo", undefined);
        _define_property._(_assert_this_initialized._(_this), "preventTouch", function(event) {
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
        _define_property._(_assert_this_initialized._(_this), "updateModalHeight", function() {
            var modalState = _this.props.getModalState(_this.props.activeModal);
            if (modalState && modalState.type === _types.ModalType.PAGE) {
                if (_this.props.enteringModal) {
                    _this.waitTransitionFinish(modalState, function() {
                        requestAnimationFrame(function() {
                            return _this.checkPageContentHeight();
                        });
                    });
                } else {
                    requestAnimationFrame(function() {
                        return _this.checkPageContentHeight();
                    });
                }
            }
        });
        _define_property._(_assert_this_initialized._(_this), "onTouchMove", function(e) {
            if (_this.props.exitingModal) {
                return;
            }
            var modalState = _this.props.getModalState(_this.props.activeModal);
            if (!modalState) {
                return;
            }
            if (modalState.type === _types.ModalType.PAGE) {
                return _this.onPageTouchMove(e, modalState);
            }
            if (modalState.type === _types.ModalType.CARD) {
                return _this.onCardTouchMove(e, modalState);
            }
        });
        _define_property._(_assert_this_initialized._(_this), "onTouchEnd", function(e) {
            var modalState = _this.props.getModalState(_this.props.activeModal);
            if ((modalState === null || modalState === void 0 ? void 0 : modalState.type) === _types.ModalType.PAGE) {
                return _this.onPageTouchEnd(e, modalState);
            }
            if ((modalState === null || modalState === void 0 ? void 0 : modalState.type) === _types.ModalType.CARD) {
                return _this.onCardTouchEnd(e, modalState);
            }
        });
        _define_property._(_assert_this_initialized._(_this), "onScroll", function(e) {
            var _modalState_contentElement;
            var activeModal = _this.props.activeModal;
            var target = e.target;
            if (!activeModal) {
                return;
            }
            var modalState = _this.props.getModalState(activeModal);
            if ((modalState === null || modalState === void 0 ? void 0 : modalState.type) === _types.ModalType.PAGE && (modalState === null || modalState === void 0 ? void 0 : (_modalState_contentElement = modalState.contentElement) === null || _modalState_contentElement === void 0 ? void 0 : _modalState_contentElement.contains(target))) {
                modalState.contentScrolled = true;
                if (modalState.contentScrollStopTimeout) {
                    clearTimeout(modalState.contentScrollStopTimeout);
                }
                modalState.contentScrollStopTimeout = setTimeout(function() {
                    if (modalState.contentScrolled) {
                        modalState.contentScrolled = false;
                    }
                }, 250);
            }
        });
        _this.state = {
            touchDown: false,
            dragging: false,
            modalOpenedLog: []
        };
        _this.maskElementRef = /*#__PURE__*/ _react.createRef();
        _this.modalRootContext = {
            updateModalHeight: _this.updateModalHeight,
            registerModal: function(_param) {
                var id = _param.id, data = _object_without_properties._(_param, [
                    "id"
                ]);
                var _this_props_getModalState;
                return Object.assign((_this_props_getModalState = _this.props.getModalState(id)) !== null && _this_props_getModalState !== void 0 ? _this_props_getModalState : {}, data);
            },
            onClose: function() {
                return _this.props.onExit();
            },
            isInsideModal: true
        };
        _this.frameIds = {};
        return _this;
    }
    _create_class._(ModalRootTouchComponent, [
        {
            key: "timeout",
            get: function get() {
                return this.props.platform === _platform.Platform.IOS ? 400 : 320;
            }
        },
        {
            key: "document",
            get: function get() {
                return this.props.document;
            }
        },
        {
            key: "window",
            get: function get() {
                return this.props.window;
            }
        },
        {
            key: "getModals",
            value: function getModals() {
                return _react.Children.toArray(this.props.children);
            }
        },
        {
            key: "componentDidMount",
            value: function componentDidMount() {
                var // Отслеживаем изменение размеров viewport
                _this_window;
                (_this_window = this.window) === null || _this_window === void 0 ? void 0 : _this_window.addEventListener("resize", this.updateModalHeight, false);
            }
        },
        {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this.toggleDocumentScrolling(true);
                this.window.removeEventListener("resize", this.updateModalHeight, false);
            }
        },
        {
            key: "componentDidUpdate",
            value: function componentDidUpdate(prevProps) {
                var _this = this;
                // transition phase 2: animate exiting modal
                if (this.props.exitingModal && this.props.exitingModal !== prevProps.exitingModal) {
                    this.closeModal(this.props.exitingModal);
                }
                // transition phase 3: animate entering modal
                if (this.props.enteringModal && this.props.enteringModal !== prevProps.enteringModal) {
                    var enteringState = this.props.getModalState(this.props.enteringModal);
                    this.props.onEnter();
                    this.waitTransitionFinish(enteringState, function() {
                        if (enteringState) {
                            if (enteringState.innerElement) {
                                enteringState.innerElement.style.transitionDelay = "";
                            }
                            _this.onEntered(enteringState);
                        }
                    });
                    if (enteringState === null || enteringState === void 0 ? void 0 : enteringState.innerElement) {
                        enteringState.innerElement.style.transitionDelay = this.props.delayEnter ? "".concat(this.timeout, "ms") : "";
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
        },
        {
            /* Отключает скролл документа */ key: "toggleDocumentScrolling",
            value: function toggleDocumentScrolling(enabled) {
                if (this.documentScrolling === enabled) {
                    return;
                }
                this.documentScrolling = enabled;
                if (enabled) {
                    // восстанавливаем значение overscroll behavior
                    // eslint-disable-next-line no-restricted-properties
                    this.document.documentElement.classList.remove("vkui--disable-overscroll-behavior");
                    // некоторые браузеры на странных вендорах типа Meizu не удаляют обработчик.
                    // https://github.com/VKCOM/VKUI/issues/444
                    this.window.removeEventListener("touchmove", this.preventTouch, {
                        // @ts-expect-error: TS2769 В интерфейсе EventListenerOptions нет поля passive
                        passive: false
                    });
                } else {
                    // отключаем нативный pull-to-refresh при открытом модальном окне
                    // чтобы он не срабатывал при закрытии модалки смахиванием вниз
                    // eslint-disable-next-line no-restricted-properties
                    this.document.documentElement.classList.add("vkui--disable-overscroll-behavior");
                    this.window.addEventListener("touchmove", this.preventTouch, {
                        passive: false
                    });
                }
            }
        },
        {
            key: "checkPageContentHeight",
            value: function checkPageContentHeight() {
                var modalState = this.props.getModalState(this.props.activeModal);
                if ((modalState === null || modalState === void 0 ? void 0 : modalState.type) === _types.ModalType.PAGE && (modalState === null || modalState === void 0 ? void 0 : modalState.modalElement)) {
                    var prevModalState = _object_spread._({}, modalState);
                    initPageModal(modalState);
                    var currentModalState = _object_spread._({}, modalState);
                    var needAnimate = false;
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
        },
        {
            key: "onEntered",
            value: function onEntered(param) {
                var id = param.id, modalElement = param.modalElement;
                if (!this.props.noFocusToDialog && modalElement && !modalElement.contains(this.document.activeElement)) {
                    modalElement.focus();
                }
                this.props.onEntered(id);
            }
        },
        {
            key: "closeModal",
            value: function closeModal(id) {
                var _this = this;
                // Сбрасываем состояния, которые могут помешать закрытию модального окна
                this.setState({
                    touchDown: false
                });
                var prevModalState = this.props.getModalState(id);
                if (!prevModalState) {
                    id && warn("closeActiveModal: модальное окно (страница) ".concat(id, " не существует"), "error");
                    return;
                }
                if (!this.state.modalOpenedLog.length) {
                    this.setState(function(prevState) {
                        return {
                            modalOpenedLog: _to_consumable_array._(prevState.modalOpenedLog).concat([
                                id
                            ])
                        };
                    });
                }
                var nextModalState = this.props.getModalState(this.props.activeModal);
                var nextIsPage = !!nextModalState && nextModalState.type === _types.ModalType.PAGE;
                var prevIsPage = !!prevModalState && prevModalState.type === _types.ModalType.PAGE;
                this.waitTransitionFinish(prevModalState, function() {
                    return _this.props.onExited(id);
                });
                var _prevModalState_translateY, _nextModalState_translateYFrom, _nextModalState_translateYFrom1;
                var exitTranslate = prevIsPage && nextIsPage && ((_prevModalState_translateY = prevModalState.translateY) !== null && _prevModalState_translateY !== void 0 ? _prevModalState_translateY : 0) <= ((_nextModalState_translateYFrom = nextModalState === null || nextModalState === void 0 ? void 0 : nextModalState.translateYFrom) !== null && _nextModalState_translateYFrom !== void 0 ? _nextModalState_translateYFrom : 0) && !this.props.isBack ? ((_nextModalState_translateYFrom1 = nextModalState === null || nextModalState === void 0 ? void 0 : nextModalState.translateYFrom) !== null && _nextModalState_translateYFrom1 !== void 0 ? _nextModalState_translateYFrom1 : 0) + 10 : 100;
                this.animateTranslate(prevModalState, exitTranslate);
                if (!nextModalState) {
                    // NOTE: was only for clean exit
                    this.setMaskOpacity(prevModalState, 0);
                    this.setState({
                        modalOpenedLog: []
                    });
                    prevModalState.translateY = undefined;
                } else if (nextModalState.id && !this.state.modalOpenedLog.includes(nextModalState.id)) {
                    nextModalState.translateY = undefined;
                    this.setState(function(prevState) {
                        return {
                            modalOpenedLog: _to_consumable_array._(prevState.modalOpenedLog).concat([
                                nextModalState.id
                            ])
                        };
                    });
                }
            }
        },
        {
            key: "onPageTouchMove",
            value: function onPageTouchMove(event, modalState) {
                var _modalState_innerElement, _modalState_headerElement;
                var shiftY = event.shiftY, originalEvent = event.originalEvent;
                var target = originalEvent.target;
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
                var expandable = modalState.expandable, contentScrolled = modalState.contentScrolled, collapsed = modalState.collapsed, expanded = modalState.expanded;
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
                    var shiftYPercent = shiftY / this.window.innerHeight * 100;
                    var shiftYCurrent = (0, _touch.rubber)(shiftYPercent, 72, 0.8, this.props.platform !== _platform.Platform.IOS);
                    modalState.touchShiftYPercent = shiftYPercent;
                    var _modalState_translateY;
                    modalState.translateYCurrent = rangeTranslate(((_modalState_translateY = modalState.translateY) !== null && _modalState_translateY !== void 0 ? _modalState_translateY : 0) + shiftYCurrent);
                    this.animateTranslate(modalState, modalState.translateYCurrent);
                    this.setMaskOpacity(modalState);
                }
            }
        },
        {
            key: "onCardTouchMove",
            value: function onCardTouchMove(event, modalState) {
                var _modalState_innerElement;
                var originalEvent = event.originalEvent, shiftY = event.shiftY;
                var target = originalEvent.target;
                if ((_modalState_innerElement = modalState.innerElement) === null || _modalState_innerElement === void 0 ? void 0 : _modalState_innerElement.contains(target)) {
                    if (!this.state.touchDown) {
                        this.setState({
                            touchDown: true,
                            dragging: true
                        });
                    }
                    var shiftYPercent = shiftY / modalState.innerElement.offsetHeight * 100;
                    var shiftYCurrent = (0, _touch.rubber)(shiftYPercent, 72, 1.2, this.props.platform !== _platform.Platform.IOS);
                    modalState.touchShiftYPercent = shiftYPercent;
                    var _modalState_translateY;
                    modalState.translateYCurrent = Math.max(0, ((_modalState_translateY = modalState.translateY) !== null && _modalState_translateY !== void 0 ? _modalState_translateY : 0) + shiftYCurrent);
                    this.animateTranslate(modalState, modalState.translateYCurrent);
                    this.setMaskOpacity(modalState);
                }
            }
        },
        {
            key: "onPageTouchEnd",
            value: function onPageTouchEnd(event, modalState) {
                var _this = this;
                var startY = event.startY, shiftY = event.shiftY;
                modalState.contentScrolled = false;
                modalState.touchMovePositive = null;
                var setStateCallback;
                if (this.state.dragging && this.window) {
                    var shiftYEndPercent = (startY + shiftY) / this.window.innerHeight * 100;
                    var _modalState_translateYCurrent;
                    var translateY = (_modalState_translateYCurrent = modalState.translateYCurrent) !== null && _modalState_translateYCurrent !== void 0 ? _modalState_translateYCurrent : 0;
                    var _modalState_touchShiftYPercent;
                    var expectTranslateY = translateY / event.duration * 240 * 0.6 * (((_modalState_touchShiftYPercent = modalState.touchShiftYPercent) !== null && _modalState_touchShiftYPercent !== void 0 ? _modalState_touchShiftYPercent : 0) < 0 ? -1 : 1);
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
                    setStateCallback = function() {
                        if (!modalState.hidden) {
                            _this.animateTranslate(modalState, modalState.translateY);
                        }
                        _this.setMaskOpacity(modalState);
                    };
                }
                this.setState({
                    touchDown: false,
                    dragging: false
                }, setStateCallback);
            }
        },
        {
            key: "onCardTouchEnd",
            value: function onCardTouchEnd(param, modalState) {
                var duration = param.duration;
                var _this = this;
                var setStateCallback;
                if (this.state.dragging) {
                    var _modalState_translateYCurrent;
                    var translateY = (_modalState_translateYCurrent = modalState.translateYCurrent) !== null && _modalState_translateYCurrent !== void 0 ? _modalState_translateYCurrent : 0;
                    var _modalState_touchShiftYPercent;
                    var expectTranslateY = translateY / duration * 240 * 0.6 * (((_modalState_touchShiftYPercent = modalState.touchShiftYPercent) !== null && _modalState_touchShiftYPercent !== void 0 ? _modalState_touchShiftYPercent : 0) < 0 ? -1 : 1);
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
                    setStateCallback = function() {
                        if (!modalState.hidden) {
                            _this.animateTranslate(modalState, modalState.translateY);
                        }
                        _this.setMaskOpacity(modalState);
                    };
                }
                this.setState({
                    touchDown: false,
                    dragging: false
                }, setStateCallback);
            }
        },
        {
            key: "waitTransitionFinish",
            value: function waitTransitionFinish(modalState, eventHandler) {
                if (_supportEvents.transitionEvent.supported) {
                    var _modalState_innerElement;
                    var onceHandler = function() {
                        var _modalState_innerElement;
                        modalState === null || modalState === void 0 ? void 0 : (_modalState_innerElement = modalState.innerElement) === null || _modalState_innerElement === void 0 ? void 0 : _modalState_innerElement.removeEventListener(_supportEvents.transitionEvent.name, onceHandler);
                        eventHandler();
                    };
                    modalState === null || modalState === void 0 ? void 0 : (_modalState_innerElement = modalState.innerElement) === null || _modalState_innerElement === void 0 ? void 0 : _modalState_innerElement.addEventListener(_supportEvents.transitionEvent.name, onceHandler);
                } else {
                    setTimeout(eventHandler, this.timeout);
                }
            }
        },
        {
            /**
   * Анимирует сдвиг модалки
   *
   * @param {ModalsStateEntry} modalState
   * @param {number} percent Процент сдвига: 0 – полностью открыта, 100 – полностью закрыта
   */ key: "animateTranslate",
            value: function animateTranslate(modalState, percent) {
                var frameId = "animateTranslateFrame".concat(modalState.id);
                cancelAnimationFrame(this.frameIds[frameId]);
                this.frameIds[frameId] = requestAnimationFrame(function() {
                    (0, _styles.setTransformStyle)(modalState.innerElement, "translate3d(0, ".concat(percent, "%, 0)"));
                });
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
                        _this.maskElementRef.current.style.opacity = (0, _math.clamp)(opacity, 0, 100).toString();
                        _this.maskElementRef.current.style.transitionDelay = opacity && _this.props.delayEnter ? "".concat(_this.timeout, "ms") : "";
                    }
                });
            }
        },
        {
            key: "render",
            value: function render() {
                var _this = this;
                var _this_props_configProvider;
                var _this_props = this.props, activeModal = _this_props.activeModal, exitingModal = _this_props.exitingModal, enteringModal = _this_props.enteringModal, modalOverlayTestId = _this_props.modalOverlayTestId;
                var _this_state = this.state, touchDown = _this_state.touchDown, dragging = _this_state.dragging;
                if (!activeModal && !exitingModal) {
                    return null;
                }
                return /*#__PURE__*/ _react.createElement(_TouchContext.default.Provider, {
                    value: true
                }, /*#__PURE__*/ _react.createElement(_ModalRootContext.ModalRootContext.Provider, {
                    value: this.modalRootContext
                }, /*#__PURE__*/ _react.createElement(_Touch.Touch, {
                    className: (0, _vkjs.classNames)("vkuiModalRoot", ((_this_props_configProvider = this.props.configProvider) === null || _this_props_configProvider === void 0 ? void 0 : _this_props_configProvider.hasCustomPanelHeaderAfter) && "vkuiModalRoot--hasCustomPanelHeaderAfterSlot", touchDown && (0, _vkjs.classNames)("vkuiModalRoot--touched", "vkuiInternalModalRoot--touched"), !!(enteringModal || exitingModal) && (0, _vkjs.classNames)("vkuiModalRoot--switching", "vkuiInternalModalRoot--switching")),
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
                }, this.getModals().map(function(Modal) {
                    var modalId = (0, _getNavId.getNavId)(Modal.props, warn);
                    var _modalState = _this.props.getModalState(modalId);
                    if (modalId !== activeModal && modalId !== exitingModal || !_modalState) {
                        return null;
                    }
                    var modalState = _object_spread._({}, _modalState);
                    var isPage = modalState.type === _types.ModalType.PAGE;
                    var key = "modal-".concat(modalId);
                    return /*#__PURE__*/ _react.createElement(_FocusTrap.FocusTrap, {
                        key: key,
                        onClose: _this.props.onExit,
                        timeout: _this.timeout,
                        className: (0, _vkjs.classNames)("vkuiModalRoot__modal", dragging && "vkuiInternalModalRoot__modal--dragging", isPage && modalState.expandable && "vkuiInternalModalRoot__modal--expandable", isPage && modalState.collapsed && "vkuiInternalModalRoot__modal--collapsed"),
                        restoreFocus: false
                    }, Modal);
                })))));
            }
        }
    ]);
    return ModalRootTouchComponent;
}(_react.Component);
var ModalRootTouch = (0, _withContext.withContext)((0, _withPlatform.withPlatform)((0, _dom.withDOM)((0, _useModalManager.withModalManager)(initModal)(ModalRootTouchComponent))), _ConfigProviderContext.ConfigProviderContext, "configProvider");
/**
 * Инициализирует модалку перед анимацией открытия
 */ function initModal(modalState) {
    switch(modalState.type){
        case _types.ModalType.PAGE:
            modalState.settlingHeight = modalState.settlingHeight || _constants.MODAL_PAGE_DEFAULT_PERCENT_HEIGHT;
            return initPageModal(modalState);
        case _types.ModalType.CARD:
            return initCardModal(modalState);
        default:
            process.env.NODE_ENV === "development" && warn('initActiveModal: modalState.type="'.concat(modalState.type, '" не поддерживается'), "error");
    }
}
function initPageModal(modalState) {
    var contentElement = modalState.contentElement, bottomInset = modalState.bottomInset;
    var contentElementHeight = calculateModalContentHeight(contentElement === null || contentElement === void 0 ? void 0 : contentElement.firstElementChild, modalState.expandable);
    var bottomInsetHeight = (bottomInset === null || bottomInset === void 0 ? void 0 : bottomInset.offsetHeight) || 0;
    var contentHeight = contentElementHeight + bottomInsetHeight;
    var prevTranslateY = modalState.translateY;
    var prevExpandable = modalState.expandable;
    var _contentElement_clientHeight;
    modalState.expandable = contentHeight > ((_contentElement_clientHeight = contentElement === null || contentElement === void 0 ? void 0 : contentElement.clientHeight) !== null && _contentElement_clientHeight !== void 0 ? _contentElement_clientHeight : 0) || modalState.settlingHeight === 100;
    var collapsed = false;
    var expanded = false;
    var translateYFrom;
    var translateY;
    var expandedRange;
    var collapsedRange;
    var hiddenRange;
    var hasCollapsedState = Boolean(modalState.expandable && modalState.settlingHeight !== 100);
    if (modalState.expandable) {
        var _modalState_settlingHeight;
        translateYFrom = 100 - ((_modalState_settlingHeight = modalState.settlingHeight) !== null && _modalState_settlingHeight !== void 0 ? _modalState_settlingHeight : 0);
        var shiftHalf = translateYFrom / 2;
        var visiblePart = 100 - translateYFrom;
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
        var headerHeight = (_modalState_headerElement_offsetHeight = (_modalState_headerElement = modalState.headerElement) === null || _modalState_headerElement === void 0 ? void 0 : _modalState_headerElement.offsetHeight) !== null && _modalState_headerElement_offsetHeight !== void 0 ? _modalState_headerElement_offsetHeight : 0;
        var height = contentHeight + headerHeight;
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
    var shouldExpand = prevExpandable && modalState.expandable;
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
   * */ var currentHeightStyle = element.style.height;
    element.style.height = "auto";
    var elementHeight = element.scrollHeight;
    element.style.height = currentHeightStyle;
    return elementHeight;
}

//# sourceMappingURL=ModalRoot.js.map