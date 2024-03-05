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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _getNavId = require("../../lib/getNavId");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _warnOnce = require("../../lib/warnOnce");
function getModals(children) {
    return _react.Children.toArray(children);
}
const warn = (0, _warnOnce.warnOnce)('ModalRoot');
function modalTransitionReducer(state, action) {
    if (action.type === 'setActive' && action.id !== state.activeModal) {
        const nextModal = action.id;
        // preserve exiting modal if switching mid-transition
        const prevModal = state.exitingModal || state.activeModal;
        let history = state.history ? [
            ...state.history
        ] : [];
        const isBack = Boolean(nextModal && history.includes(nextModal));
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
            history,
            isBack
        };
    }
    if (action.type === 'entered' && action.id === state.enteringModal) {
        return _object_spread_props._(_object_spread._({}, state), {
            enteringModal: null
        });
    }
    if (action.type === 'exited' && action.id === state.exitingModal) {
        return _object_spread_props._(_object_spread._({}, state), {
            exitingModal: null
        });
    }
    if (action.type === 'inited' && action.id === state.activeModal) {
        return _object_spread_props._(_object_spread._({}, state), {
            enteringModal: action.id
        });
    }
    return state;
}
function useModalManager(activeModal, children, onOpen = _vkjs.noop, onOpened = _vkjs.noop, onClose = _vkjs.noop, onClosed = _vkjs.noop, initModal = _vkjs.noop) {
    const modalsState = _react.useRef({}).current;
    getModals(children).forEach((Modal)=>{
        const modalProps = Modal.props;
        const id = (0, _getNavId.getNavId)(modalProps, warn);
        const state = id !== undefined && modalsState[id] || {
            id: id !== null && id !== void 0 ? id : null
        };
        state.onOpen = Modal.props.onOpen;
        state.onOpened = Modal.props.onOpened;
        state.onClose = Modal.props.onClose;
        state.onClosed = Modal.props.onClosed;
        // ModalPage props
        if (typeof modalProps.settlingHeight === 'number') {
            state.settlingHeight = modalProps.settlingHeight;
        }
        if (state.id !== null) {
            modalsState[state.id] = state;
        }
    });
    const isMissing = activeModal && !modalsState[activeModal];
    const safeActiveModal = isMissing ? null : activeModal;
    const [transitionState, dispatchTransition] = _react.useReducer(modalTransitionReducer, {
        activeModal: safeActiveModal,
        enteringModal: null,
        exitingModal: null,
        history: safeActiveModal ? [
            safeActiveModal
        ] : [],
        isBack: false
    });
    // Map props to state, render activeModal for init
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        // ignore non-existent activeModal
        if (process.env.NODE_ENV === 'development' && isMissing) {
            warn(`Переход невозможен - модальное окно (страница) ${activeModal} не существует`, 'error');
        }
        dispatchTransition({
            type: 'setActive',
            id: safeActiveModal !== null && safeActiveModal !== void 0 ? safeActiveModal : null
        });
    }, [
        activeModal
    ]);
    // Init activeModal & set enteringModal
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (transitionState.activeModal) {
            initModal(modalsState[transitionState.activeModal]);
            dispatchTransition({
                type: 'inited',
                id: transitionState.activeModal
            });
        }
    }, [
        transitionState.activeModal
    ]);
    const isCard = (id)=>{
        var _modalsState_id;
        return id != null && ((_modalsState_id = modalsState[id]) === null || _modalsState_id === void 0 ? void 0 : _modalsState_id.type) === 'card';
    };
    const onEntered = _react.useCallback((id)=>{
        if (id) {
            const modalState = modalsState[id];
            if ((0, _vkjs.isFunction)(modalState.onOpened)) {
                modalState.onOpened();
            } else if ((0, _vkjs.isFunction)(onOpened)) {
                onOpened(id);
            }
        }
        dispatchTransition({
            type: 'entered',
            id
        });
    }, [
        modalsState,
        onOpened
    ]);
    const onExited = _react.useCallback((id)=>{
        if (id) {
            const modalState = modalsState[id];
            if ((0, _vkjs.isFunction)(modalState.onClosed)) {
                modalState.onClosed();
            } else if ((0, _vkjs.isFunction)(onClosed)) {
                onClosed(id);
            }
        }
        dispatchTransition({
            type: 'exited',
            id
        });
    }, [
        modalsState,
        onClosed
    ]);
    const delayEnter = Boolean(transitionState.exitingModal && (isCard(activeModal) || isCard(transitionState.exitingModal)));
    const getModalState = _react.useCallback((id)=>id ? modalsState[id] : undefined, [
        modalsState
    ]);
    function onEnter() {
        const modalState = transitionState.activeModal && modalsState[transitionState.activeModal];
        if (modalState) {
            if ((0, _vkjs.isFunction)(modalState.onOpen)) {
                modalState.onOpen();
            } else if ((0, _vkjs.isFunction)(onOpen) && modalState.id) {
                onOpen(modalState.id);
            }
        }
    }
    function onExit() {
        const modalState = transitionState.activeModal && modalsState[transitionState.activeModal];
        if (modalState) {
            if ((0, _vkjs.isFunction)(modalState.onClose)) {
                modalState.onClose();
            } else if ((0, _vkjs.isFunction)(onClose) && modalState.id) {
                onClose(modalState.id);
            }
        }
    }
    return _object_spread_props._(_object_spread._({
        onEnter,
        onEntered,
        onExit,
        onExited
    }, transitionState), {
        delayEnter,
        getModalState
    });
}
function withModalManager(initModal = _vkjs.noop) {
    return function(Wrapped) {
        return function WithModalManager(props) {
            const transitionManager = useModalManager(props.activeModal, props.children, props.onOpen, props.onOpened, props.onClose, props.onClosed, initModal);
            return /*#__PURE__*/ _react.createElement(Wrapped, _object_spread._({}, props, transitionManager));
        };
    };
}

//# sourceMappingURL=useModalManager.js.map