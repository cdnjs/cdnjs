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
var _assertThisInitialized = require("@swc/helpers/lib/_assert_this_initialized.js").default;
var _classCallCheck = require("@swc/helpers/lib/_class_call_check.js").default;
var _createClass = require("@swc/helpers/lib/_create_class.js").default;
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _inherits = require("@swc/helpers/lib/_inherits.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _createSuper = require("@swc/helpers/lib/_create_super.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _math = require("../../helpers/math");
var _withContext = require("../../hoc/withContext");
var _withPlatform = require("../../hoc/withPlatform");
var _dom = require("../../lib/dom");
var _getNavId = require("../../lib/getNavId");
var _platform = require("../../lib/platform");
var _supportEvents = require("../../lib/supportEvents");
var _warnOnce = require("../../lib/warnOnce");
var _configProviderContext = require("../ConfigProvider/ConfigProviderContext");
var _focusTrap = require("../FocusTrap/FocusTrap");
var _modalRootContext = require("./ModalRootContext");
var _useModalManager = require("./useModalManager");
var warn = (0, _warnOnce.warnOnce)("ModalRoot");
var ModalRootDesktopComponent = /*#__PURE__*/ function(_React_Component) {
    "use strict";
    _inherits(ModalRootDesktopComponent, _React_Component);
    var _super = _createSuper(ModalRootDesktopComponent);
    function ModalRootDesktopComponent(props) {
        _classCallCheck(this, ModalRootDesktopComponent);
        var _this;
        _this = _super.call(this, props);
        _defineProperty(_assertThisInitialized(_this), "maskElementRef", void 0);
        _defineProperty(_assertThisInitialized(_this), "maskAnimationFrame", undefined);
        _defineProperty(_assertThisInitialized(_this), "modalRootContext", void 0);
        _defineProperty(_assertThisInitialized(_this), "restoreFocusTo", undefined);
        _this.maskElementRef = /*#__PURE__*/ _react.createRef();
        var _this_getModalState;
        _this.modalRootContext = {
            updateModalHeight: function() {
                return undefined;
            },
            registerModal: function(_param) {
                var id = _param.id, data = _objectWithoutProperties(_param, [
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
    _createClass(ModalRootDesktopComponent, [
        {
            key: "timeout",
            get: function get() {
                return this.props.platform === _platform.Platform.IOS ? 400 : 320;
            }
        },
        {
            key: "modals",
            get: function get() {
                return _react.Children.toArray(this.props.children);
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
                        _this.maskElementRef.current.style.opacity = (0, _math.clamp)(opacity, 0, 100).toString();
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
                return /*#__PURE__*/ _react.createElement(_modalRootContext.ModalRootContext.Provider, {
                    value: this.modalRootContext
                }, /*#__PURE__*/ _react.createElement("div", {
                    className: (0, _vkjs.classNames)("vkuiModalRoot", ((_this_props_configProvider = this.props.configProvider) === null || _this_props_configProvider === void 0 ? void 0 : _this_props_configProvider.webviewType) === _configProviderContext.WebviewType.VKAPPS && "vkuiModalRoot--vkapps", "vkuiModalRoot--desktop")
                }, /*#__PURE__*/ _react.createElement("div", {
                    className: "vkuiModalRoot__mask",
                    ref: this.maskElementRef,
                    onClick: this.props.onExit
                }), /*#__PURE__*/ _react.createElement("div", {
                    className: "vkuiModalRoot__viewport"
                }, this.modals.map(function(Modal) {
                    var modalId = (0, _getNavId.getNavId)(Modal.props, warn);
                    if (modalId !== activeModal && modalId !== exitingModal) {
                        return null;
                    }
                    var key = "modal-".concat(modalId);
                    return /*#__PURE__*/ _react.createElement(_focusTrap.FocusTrap, {
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
}(_react.Component);
var ModalRootDesktop = (0, _withContext.withContext)((0, _withPlatform.withPlatform)((0, _dom.withDOM)((0, _useModalManager.withModalManager)()(ModalRootDesktopComponent))), _configProviderContext.ConfigProviderContext, "configProvider");

//# sourceMappingURL=ModalRootDesktop.js.map