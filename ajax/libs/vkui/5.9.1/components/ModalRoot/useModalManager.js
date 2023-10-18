import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import * as React from "react";
import { isFunction, noop } from "@vkontakte/vkjs";
import { getNavId } from "../../lib/getNavId";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { warnOnce } from "../../lib/warnOnce";
import { ModalType } from "./types";
function getModals(children) {
    return React.Children.toArray(children);
}
var warn = warnOnce("ModalRoot");
export function modalTransitionReducer(state, action) {
    if (action.type === "setActive" && action.id !== state.activeModal) {
        var nextModal = action.id;
        // preserve exiting modal if switching mid-transition
        var prevModal = state.exitingModal || state.activeModal;
        var history = state.history ? _to_consumable_array(state.history) : [];
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
        return _object_spread_props(_object_spread({}, state), {
            enteringModal: null
        });
    }
    if (action.type === "exited" && action.id === state.exitingModal) {
        return _object_spread_props(_object_spread({}, state), {
            exitingModal: null
        });
    }
    if (action.type === "inited" && action.id === state.activeModal) {
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
 */ export function useModalManager(activeModal, children) {
    var onOpen = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : noop, onOpened = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : noop, onClose = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : noop, onClosed = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : noop, initModal = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : noop;
    var modalsState = React.useRef({}).current;
    getModals(children).forEach(function(Modal) {
        var modalProps = Modal.props;
        var id = getNavId(modalProps, warn);
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
    var _React_useReducer = _sliced_to_array(React.useReducer(modalTransitionReducer, {
        activeModal: safeActiveModal,
        enteringModal: null,
        exitingModal: null,
        history: safeActiveModal ? [
            safeActiveModal
        ] : [],
        isBack: false
    }), 2), transitionState = _React_useReducer[0], dispatchTransition = _React_useReducer[1];
    // Map props to state, render activeModal for init
    useIsomorphicLayoutEffect(function() {
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
    useIsomorphicLayoutEffect(function() {
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
        return id != null && ((_modalsState_id = modalsState[id]) === null || _modalsState_id === void 0 ? void 0 : _modalsState_id.type) === ModalType.CARD;
    };
    var onEntered = React.useCallback(function(id) {
        if (id) {
            var modalState = modalsState[id];
            if (isFunction(modalState.onOpened)) {
                modalState.onOpened();
            } else if (isFunction(onOpened)) {
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
    var onExited = React.useCallback(function(id) {
        if (id) {
            var modalState = modalsState[id];
            if (isFunction(modalState.onClosed)) {
                modalState.onClosed();
            } else if (isFunction(onClosed)) {
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
    var getModalState = React.useCallback(function(id) {
        return id ? modalsState[id] : undefined;
    }, [
        modalsState
    ]);
    function onEnter() {
        var modalState = transitionState.activeModal && modalsState[transitionState.activeModal];
        if (modalState) {
            if (isFunction(modalState.onOpen)) {
                modalState.onOpen();
            } else if (isFunction(onOpen) && modalState.id) {
                onOpen(modalState.id);
            }
        }
    }
    function onExit() {
        var modalState = transitionState.activeModal && modalsState[transitionState.activeModal];
        if (modalState) {
            if (isFunction(modalState.onClose)) {
                modalState.onClose();
            } else if (isFunction(onClose) && modalState.id) {
                onClose(modalState.id);
            }
        }
    }
    return _object_spread_props(_object_spread({
        onEnter: onEnter,
        onEntered: onEntered,
        onExit: onExit,
        onExited: onExited
    }, transitionState), {
        delayEnter: delayEnter,
        getModalState: getModalState
    });
}
export function withModalManager() {
    var initModal = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : noop;
    return function(Wrapped) {
        return function WithModalManager(props) {
            var transitionManager = useModalManager(props.activeModal, props.children, props.onOpen, props.onOpened, props.onClose, props.onClosed, initModal);
            return /*#__PURE__*/ React.createElement(Wrapped, _object_spread({}, props, transitionManager));
        };
    };
}

//# sourceMappingURL=useModalManager.js.map