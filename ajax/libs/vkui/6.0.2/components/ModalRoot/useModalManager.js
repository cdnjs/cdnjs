import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import * as React from 'react';
import { isFunction, noop } from '@vkontakte/vkjs';
import { getNavId } from '../../lib/getNavId';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { warnOnce } from '../../lib/warnOnce';
function getModals(children) {
    return React.Children.toArray(children);
}
const warn = warnOnce('ModalRoot');
export function modalTransitionReducer(state, action) {
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
        return _object_spread_props(_object_spread({}, state), {
            enteringModal: null
        });
    }
    if (action.type === 'exited' && action.id === state.exitingModal) {
        return _object_spread_props(_object_spread({}, state), {
            exitingModal: null
        });
    }
    if (action.type === 'inited' && action.id === state.activeModal) {
        return _object_spread_props(_object_spread({}, state), {
            enteringModal: action.id
        });
    }
    return state;
}
/**
 * Реализует переход модалок. При смене activeModal m1 -> m2:
 * 1. activeModal: m1, exitingModal: null, enteringModal: null, триггер перехода
 * 2. activeModal: m2, exitingModal: m1, enteringModal: null, рендерим m2 чтобы прошел init, начинаем анимацию выхода
 * одновременный переход между ModalPage:
 *   3a. activeModal: m2, exitingModal: m1, enteringModal: m2
 *   4a. exitingModal и enteringModal переходят в null в порядке завершения анимации
 * ИЛИ дожидаемся скрытия ModalCard
 *   3b. activeModal: m2, exitingModal: null, enteringModal: m2
 *   4b. enteringModal переходит в null после завершения анимации
 * 5. activeModal: m2, exitingModal: null, enteringModal: null, переход закончен
 */ export function useModalManager(activeModal, children, onOpen = noop, onOpened = noop, onClose = noop, onClosed = noop, initModal = noop) {
    const modalsState = React.useRef({}).current;
    getModals(children).forEach((Modal)=>{
        const modalProps = Modal.props;
        const id = getNavId(modalProps, warn);
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
    const [transitionState, dispatchTransition] = React.useReducer(modalTransitionReducer, {
        activeModal: safeActiveModal,
        enteringModal: null,
        exitingModal: null,
        history: safeActiveModal ? [
            safeActiveModal
        ] : [],
        isBack: false
    });
    // Map props to state, render activeModal for init
    useIsomorphicLayoutEffect(()=>{
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
    useIsomorphicLayoutEffect(()=>{
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
    const onEntered = React.useCallback((id)=>{
        if (id) {
            const modalState = modalsState[id];
            if (isFunction(modalState.onOpened)) {
                modalState.onOpened();
            } else if (isFunction(onOpened)) {
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
    const onExited = React.useCallback((id)=>{
        if (id) {
            const modalState = modalsState[id];
            if (isFunction(modalState.onClosed)) {
                modalState.onClosed();
            } else if (isFunction(onClosed)) {
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
    const getModalState = React.useCallback((id)=>id ? modalsState[id] : undefined, [
        modalsState
    ]);
    function onEnter() {
        const modalState = transitionState.activeModal && modalsState[transitionState.activeModal];
        if (modalState) {
            if (isFunction(modalState.onOpen)) {
                modalState.onOpen();
            } else if (isFunction(onOpen) && modalState.id) {
                onOpen(modalState.id);
            }
        }
    }
    function onExit() {
        const modalState = transitionState.activeModal && modalsState[transitionState.activeModal];
        if (modalState) {
            if (isFunction(modalState.onClose)) {
                modalState.onClose();
            } else if (isFunction(onClose) && modalState.id) {
                onClose(modalState.id);
            }
        }
    }
    return _object_spread_props(_object_spread({
        onEnter,
        onEntered,
        onExit,
        onExited
    }, transitionState), {
        delayEnter,
        getModalState
    });
}
export function withModalManager(initModal = noop) {
    return function(Wrapped) {
        return function WithModalManager(props) {
            const transitionManager = useModalManager(props.activeModal, props.children, props.onOpen, props.onOpened, props.onClose, props.onClosed, initModal);
            return /*#__PURE__*/ React.createElement(Wrapped, _object_spread({}, props, transitionManager));
        };
    };
}

//# sourceMappingURL=useModalManager.js.map