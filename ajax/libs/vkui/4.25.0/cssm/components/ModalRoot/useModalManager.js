import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { ModalType } from "./types";
import { warnOnce } from "../../lib/warnOnce";
import { getNavId } from "../../lib/getNavId";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { noop, isFunction } from "../../lib/utils";

function getModals(children) {
  return React.Children.toArray(children);
}

var warn = warnOnce("ModalRoot");
export function modalTransitionReducer(state, action) {
  if (action.type === "setActive" && action.id !== state.activeModal) {
    var nextModal = action.id; // preserve exiting modal if switching mid-transition

    var prevModal = state.exitingModal || state.activeModal;
    var history = state.history ? _toConsumableArray(state.history) : [];
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
    return _objectSpread(_objectSpread({}, state), {}, {
      enteringModal: null
    });
  }

  if (action.type === "exited" && action.id === state.exitingModal) {
    return _objectSpread(_objectSpread({}, state), {}, {
      exitingModal: null
    });
  }

  if (action.type === "inited" && action.id === state.activeModal) {
    return _objectSpread(_objectSpread({}, state), {}, {
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
 */

export function useModalManager(activeModal, children, onClose) {
  var initModal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
  var modalsState = React.useRef({}).current;
  getModals(children).forEach(function (Modal) {
    var modalProps = Modal.props;
    var id = getNavId(modalProps, warn);
    var state = id !== undefined && modalsState[id] || {
      id: id !== null && id !== void 0 ? id : null
    };
    state.onClose = Modal.props.onClose;
    state.dynamicContentHeight = !!modalProps.dynamicContentHeight; // ModalPage props

    if (typeof modalProps.settlingHeight === "number") {
      state.settlingHeight = modalProps.settlingHeight;
    }

    if (state.id !== null) {
      modalsState[state.id] = state;
    }
  });
  var isMissing = activeModal && !modalsState[activeModal];
  var safeActiveModal = isMissing ? null : activeModal;

  var _React$useReducer = React.useReducer(modalTransitionReducer, {
    activeModal: safeActiveModal,
    enteringModal: null,
    exitingModal: null,
    history: safeActiveModal ? [safeActiveModal] : [],
    isBack: false
  }),
      _React$useReducer2 = _slicedToArray(_React$useReducer, 2),
      transitionState = _React$useReducer2[0],
      dispatchTransition = _React$useReducer2[1]; // Map props to state, render activeModal for init


  useIsomorphicLayoutEffect(function () {
    // ignore non-existent activeModal
    if (process.env.NODE_ENV === "development" && isMissing) {
      warn("Can't transition - modal ".concat(activeModal, " not found"));
    }

    dispatchTransition({
      type: "setActive",
      id: safeActiveModal !== null && safeActiveModal !== void 0 ? safeActiveModal : null
    });
  }, [activeModal]); // Init activeModal & set enteringModal

  useIsomorphicLayoutEffect(function () {
    if (transitionState.activeModal) {
      initModal(modalsState[transitionState.activeModal]);
      dispatchTransition({
        type: "inited",
        id: transitionState.activeModal
      });
    }
  }, [transitionState.activeModal]);

  var isCard = function isCard(id) {
    var _modalsState$id;

    return id != null && ((_modalsState$id = modalsState[id]) === null || _modalsState$id === void 0 ? void 0 : _modalsState$id.type) === ModalType.CARD;
  };

  var onEnter = React.useCallback(function (id) {
    return dispatchTransition({
      type: "entered",
      id: id
    });
  }, []);
  var onExit = React.useCallback(function (id) {
    return dispatchTransition({
      type: "exited",
      id: id
    });
  }, []);
  var delayEnter = Boolean(transitionState.exitingModal && (isCard(activeModal) || isCard(transitionState.exitingModal)));
  var getModalState = React.useCallback(function (id) {
    return modalsState[id];
  }, [modalsState]);

  function closeActiveModal() {
    var modalState = transitionState.activeModal && modalsState[transitionState.activeModal];

    if (modalState) {
      if (isFunction(modalState.onClose)) {
        modalState.onClose();
      } else if (isFunction(onClose)) {
        onClose(modalState.id);
      } else if (process.env.NODE_ENV === "development") {
        warn("onClose is undefined");
      }
    }
  }

  return _objectSpread(_objectSpread({
    onEnter: onEnter,
    onExit: onExit
  }, transitionState), {}, {
    delayEnter: delayEnter,
    getModalState: getModalState,
    closeActiveModal: closeActiveModal
  });
}
export function withModalManager() {
  var initModal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;
  return function (Wrapped) {
    return function WithModalManager(props) {
      var transitionManager = useModalManager(props.activeModal, props.children, props.onClose, initModal);
      return createScopedElement(Wrapped, _extends({}, props, transitionManager));
    };
  };
}
//# sourceMappingURL=useModalManager.js.map