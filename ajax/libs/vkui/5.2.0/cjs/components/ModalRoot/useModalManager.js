"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modalTransitionReducer = modalTransitionReducer;
exports.useModalManager = useModalManager;
exports.withModalManager = withModalManager;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var React = _interopRequireWildcard(require("react"));
var _types = require("./types");
var _warnOnce = require("../../lib/warnOnce");
var _getNavId = require("../../lib/getNavId");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _vkjs = require("@vkontakte/vkjs");
function getModals(children) {
  return React.Children.toArray(children);
}
var warn = (0, _warnOnce.warnOnce)('ModalRoot');
function modalTransitionReducer(state, action) {
  if (action.type === 'setActive' && action.id !== state.activeModal) {
    var nextModal = action.id;
    // preserve exiting modal if switching mid-transition
    var prevModal = state.exitingModal || state.activeModal;
    var history = state.history ? (0, _toConsumableArray2.default)(state.history) : [];
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
  if (action.type === 'entered' && action.id === state.enteringModal) {
    return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
      enteringModal: null
    });
  }
  if (action.type === 'exited' && action.id === state.exitingModal) {
    return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
      exitingModal: null
    });
  }
  if (action.type === 'inited' && action.id === state.activeModal) {
    return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
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
function useModalManager(activeModal, children) {
  var onOpen = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _vkjs.noop;
  var onOpened = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _vkjs.noop;
  var onClose = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _vkjs.noop;
  var onClosed = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _vkjs.noop;
  var initModal = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : _vkjs.noop;
  var modalsState = React.useRef({}).current;
  getModals(children).forEach(function (Modal) {
    var modalProps = Modal.props;
    var id = (0, _getNavId.getNavId)(modalProps, warn);
    var state = id !== undefined && modalsState[id] || {
      id: id !== null && id !== void 0 ? id : null
    };
    state.onOpen = Modal.props.onOpen;
    state.onOpened = Modal.props.onOpened;
    state.onClose = Modal.props.onClose;
    state.onClosed = Modal.props.onClosed;
    state.dynamicContentHeight = !!modalProps.dynamicContentHeight;
    // ModalPage props
    if (typeof modalProps.settlingHeight === 'number') {
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
    _React$useReducer2 = (0, _slicedToArray2.default)(_React$useReducer, 2),
    transitionState = _React$useReducer2[0],
    dispatchTransition = _React$useReducer2[1];

  // Map props to state, render activeModal for init
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    // ignore non-existent activeModal
    if (process.env.NODE_ENV === 'development' && isMissing) {
      warn("\u041F\u0435\u0440\u0435\u0445\u043E\u0434 \u043D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u0435\u043D - \u043C\u043E\u0434\u0430\u043B\u044C\u043D\u043E\u0435 \u043E\u043A\u043D\u043E (\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430) ".concat(activeModal, " \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"), 'error');
    }
    dispatchTransition({
      type: 'setActive',
      id: safeActiveModal !== null && safeActiveModal !== void 0 ? safeActiveModal : null
    });
  }, [activeModal]);

  // Init activeModal & set enteringModal
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (transitionState.activeModal) {
      initModal(modalsState[transitionState.activeModal]);
      dispatchTransition({
        type: 'inited',
        id: transitionState.activeModal
      });
    }
  }, [transitionState.activeModal]);
  var isCard = function isCard(id) {
    var _modalsState$id;
    return id != null && ((_modalsState$id = modalsState[id]) === null || _modalsState$id === void 0 ? void 0 : _modalsState$id.type) === _types.ModalType.CARD;
  };
  var onEntered = React.useCallback(function (id) {
    if (id) {
      var modalState = modalsState[id];
      if ((0, _vkjs.isFunction)(modalState.onOpened)) {
        modalState.onOpened();
      } else if ((0, _vkjs.isFunction)(onOpened)) {
        onOpened(id);
      }
    }
    dispatchTransition({
      type: 'entered',
      id: id
    });
  }, [modalsState, onOpened]);
  var onExited = React.useCallback(function (id) {
    if (id) {
      var modalState = modalsState[id];
      if ((0, _vkjs.isFunction)(modalState.onClosed)) {
        modalState.onClosed();
      } else if ((0, _vkjs.isFunction)(onClosed)) {
        onClosed(id);
      }
    }
    dispatchTransition({
      type: 'exited',
      id: id
    });
  }, [modalsState, onClosed]);
  var delayEnter = Boolean(transitionState.exitingModal && (isCard(activeModal) || isCard(transitionState.exitingModal)));
  var getModalState = React.useCallback(function (id) {
    return modalsState[id];
  }, [modalsState]);
  function onEnter() {
    var modalState = transitionState.activeModal && modalsState[transitionState.activeModal];
    if (modalState) {
      if ((0, _vkjs.isFunction)(modalState.onOpen)) {
        modalState.onOpen();
      } else if ((0, _vkjs.isFunction)(onOpen)) {
        onOpen(modalState.id);
      }
    }
  }
  function onExit() {
    var modalState = transitionState.activeModal && modalsState[transitionState.activeModal];
    if (modalState) {
      if ((0, _vkjs.isFunction)(modalState.onClose)) {
        modalState.onClose();
      } else if ((0, _vkjs.isFunction)(onClose)) {
        onClose(modalState.id);
      }
    }
  }
  return (0, _objectSpread2.default)((0, _objectSpread2.default)({
    onEnter: onEnter,
    onEntered: onEntered,
    onExit: onExit,
    onExited: onExited
  }, transitionState), {}, {
    delayEnter: delayEnter,
    getModalState: getModalState
  });
}
function withModalManager() {
  var initModal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _vkjs.noop;
  return function (Wrapped) {
    return function WithModalManager(props) {
      var transitionManager = useModalManager(props.activeModal, props.children, props.onOpen, props.onOpened, props.onClose, props.onClosed, initModal);
      return /*#__PURE__*/React.createElement(Wrapped, (0, _extends2.default)({}, props, transitionManager));
    };
  };
}
//# sourceMappingURL=useModalManager.js.map