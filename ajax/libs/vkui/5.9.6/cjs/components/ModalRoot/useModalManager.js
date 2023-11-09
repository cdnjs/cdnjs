"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    modalTransitionReducer: function() {
        return modalTransitionReducer;
    },
    useModalManager: function() {
        return useModalManager;
    },
    withModalManager: function() {
        return withModalManager;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _to_consumable_array = require("@swc/helpers/_/_to_consumable_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _getNavId = require("../../lib/getNavId");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _warnOnce = require("../../lib/warnOnce");
var _types = require("./types");
function getModals(children) {
    return _react.Children.toArray(children);
}
var warn = (0, _warnOnce.warnOnce)("ModalRoot");
function modalTransitionReducer(state, action) {
    if (action.type === "setActive" && action.id !== state.activeModal) {
        var nextModal = action.id;
        // preserve exiting modal if switching mid-transition
        var prevModal = state.exitingModal || state.activeModal;
        var history = state.history ? _to_consumable_array._(state.history) : [];
        var isBack = Boolean(nextModal && history.includes(nextModal));
        if (nextModal === null) {
            history = [];
        } else if (isBack) {
            history = history.splice(0, history.indexOf(nextModal) + 1);
        } else {
            history.push(nextModal);
        }
        return {
            activeModal: nextModal,
            // not entering yet
            enteringModal: null,
            exitingModal: prevModal,
            history: history,
            isBack: isBack
        };
    }
    if (action.type === "entered" && action.id === state.enteringModal) {
        return _object_spread_props._(_object_spread._({}, state), {
            enteringModal: null
        });
    }
    if (action.type === "exited" && action.id === state.exitingModal) {
        return _object_spread_props._(_object_spread._({}, state), {
            exitingModal: null
        });
    }
    if (action.type === "inited" && action.id === state.activeModal) {
        return _object_spread_props._(_object_spread._({}, state), {
            enteringModal: action.id
        });
    }
    return state;
}
function useModalManager(activeModal, children) {
    var onOpen = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _vkjs.noop, onOpened = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : _vkjs.noop, onClose = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : _vkjs.noop, onClosed = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : _vkjs.noop, initModal = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : _vkjs.noop;
    var modalsState = _react.useRef({}).current;
    getModals(children).forEach(function(Modal) {
        var modalProps = Modal.props;
        var id = (0, _getNavId.getNavId)(modalProps, warn);
        var state = id !== undefined && modalsState[id] || {
            id: id !== null && id !== void 0 ? id : null
        };
        state.onOpen = Modal.props.onOpen;
        state.onOpened = Modal.props.onOpened;
        state.onClose = Modal.props.onClose;
        state.onClosed = Modal.props.onClosed;
        // ModalPage props
        if (typeof modalProps.settlingHeight === "number") {
            state.settlingHeight = modalProps.settlingHeight;
        }
        if (state.id !== null) {
            modalsState[state.id] = state;
        }
    });
    var isMissing = activeModal && !modalsState[activeModal];
    var safeActiveModal = isMissing ? null : activeModal;
    var _React_useReducer = _sliced_to_array._(_react.useReducer(modalTransitionReducer, {
        activeModal: safeActiveModal,
        enteringModal: null,
        exitingModal: null,
        history: safeActiveModal ? [
            safeActiveModal
        ] : [],
        isBack: false
    }), 2), transitionState = _React_useReducer[0], dispatchTransition = _React_useReducer[1];
    // Map props to state, render activeModal for init
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        // ignore non-existent activeModal
        if (process.env.NODE_ENV === "development" && isMissing) {
            warn("Переход невозможен - модальное окно (страница) ".concat(activeModal, " не существует"), "error");
        }
        dispatchTransition({
            type: "setActive",
            id: safeActiveModal !== null && safeActiveModal !== void 0 ? safeActiveModal : null
        });
    }, [
        activeModal
    ]);
    // Init activeModal & set enteringModal
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        if (transitionState.activeModal) {
            initModal(modalsState[transitionState.activeModal]);
            dispatchTransition({
                type: "inited",
                id: transitionState.activeModal
            });
        }
    }, [
        transitionState.activeModal
    ]);
    var isCard = function(id) {
        var _modalsState_id;
        return id != null && ((_modalsState_id = modalsState[id]) === null || _modalsState_id === void 0 ? void 0 : _modalsState_id.type) === _types.ModalType.CARD;
    };
    var onEntered = _react.useCallback(function(id) {
        if (id) {
            var modalState = modalsState[id];
            if ((0, _vkjs.isFunction)(modalState.onOpened)) {
                modalState.onOpened();
            } else if ((0, _vkjs.isFunction)(onOpened)) {
                onOpened(id);
            }
        }
        dispatchTransition({
            type: "entered",
            id: id
        });
    }, [
        modalsState,
        onOpened
    ]);
    var onExited = _react.useCallback(function(id) {
        if (id) {
            var modalState = modalsState[id];
            if ((0, _vkjs.isFunction)(modalState.onClosed)) {
                modalState.onClosed();
            } else if ((0, _vkjs.isFunction)(onClosed)) {
                onClosed(id);
            }
        }
        dispatchTransition({
            type: "exited",
            id: id
        });
    }, [
        modalsState,
        onClosed
    ]);
    var delayEnter = Boolean(transitionState.exitingModal && (isCard(activeModal) || isCard(transitionState.exitingModal)));
    var getModalState = _react.useCallback(function(id) {
        return id ? modalsState[id] : undefined;
    }, [
        modalsState
    ]);
    function onEnter() {
        var modalState = transitionState.activeModal && modalsState[transitionState.activeModal];
        if (modalState) {
            if ((0, _vkjs.isFunction)(modalState.onOpen)) {
                modalState.onOpen();
            } else if ((0, _vkjs.isFunction)(onOpen) && modalState.id) {
                onOpen(modalState.id);
            }
        }
    }
    function onExit() {
        var modalState = transitionState.activeModal && modalsState[transitionState.activeModal];
        if (modalState) {
            if ((0, _vkjs.isFunction)(modalState.onClose)) {
                modalState.onClose();
            } else if ((0, _vkjs.isFunction)(onClose) && modalState.id) {
                onClose(modalState.id);
            }
        }
    }
    return _object_spread_props._(_object_spread._({
        onEnter: onEnter,
        onEntered: onEntered,
        onExit: onExit,
        onExited: onExited
    }, transitionState), {
        delayEnter: delayEnter,
        getModalState: getModalState
    });
}
function withModalManager() {
    var initModal = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : _vkjs.noop;
    return function(Wrapped) {
        return function WithModalManager(props) {
            var transitionManager = useModalManager(props.activeModal, props.children, props.onOpen, props.onOpened, props.onClose, props.onClosed, initModal);
            return /*#__PURE__*/ _react.createElement(Wrapped, _object_spread._({}, props, transitionManager));
        };
    };
}

//# sourceMappingURL=useModalManager.js.map