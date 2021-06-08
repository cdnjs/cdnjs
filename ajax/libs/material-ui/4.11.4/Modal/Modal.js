"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/styles");

var _utils = require("@material-ui/utils");

var _ownerDocument = _interopRequireDefault(require("../utils/ownerDocument"));

var _Portal = _interopRequireDefault(require("../Portal"));

var _createChainedFunction = _interopRequireDefault(require("../utils/createChainedFunction"));

var _useForkRef = _interopRequireDefault(require("../utils/useForkRef"));

var _useEventCallback = _interopRequireDefault(require("../utils/useEventCallback"));

var _zIndex = _interopRequireDefault(require("../styles/zIndex"));

var _ModalManager = _interopRequireWildcard(require("./ModalManager"));

var _Unstable_TrapFocus = _interopRequireDefault(require("../Unstable_TrapFocus"));

var _SimpleBackdrop = _interopRequireDefault(require("./SimpleBackdrop"));

function getContainer(container) {
  container = typeof container === 'function' ? container() : container;
  return ReactDOM.findDOMNode(container);
}

function getHasTransition(props) {
  return props.children ? props.children.props.hasOwnProperty('in') : false;
} // A modal manager used to track and manage the state of open Modals.
// Modals don't open on the server so this won't conflict with concurrent requests.


var defaultManager = new _ModalManager.default();

var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      position: 'fixed',
      zIndex: theme.zIndex.modal,
      right: 0,
      bottom: 0,
      top: 0,
      left: 0
    },

    /* Styles applied to the root element if the `Modal` has exited. */
    hidden: {
      visibility: 'hidden'
    }
  };
};
/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * - [Dialog](/api/dialog/)
 * - [Drawer](/api/drawer/)
 * - [Menu](/api/menu/)
 * - [Popover](/api/popover/)
 *
 * If you are creating a modal dialog, you probably want to use the [Dialog](/api/dialog/) component
 * rather than directly using Modal.
 *
 * This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
 */


exports.styles = styles;
var Modal = /*#__PURE__*/React.forwardRef(function Modal(inProps, ref) {
  var theme = (0, _styles.useTheme)();
  var props = (0, _styles.getThemeProps)({
    name: 'MuiModal',
    props: (0, _extends2.default)({}, inProps),
    theme: theme
  });
  var _props$BackdropCompon = props.BackdropComponent,
      BackdropComponent = _props$BackdropCompon === void 0 ? _SimpleBackdrop.default : _props$BackdropCompon,
      BackdropProps = props.BackdropProps,
      children = props.children,
      _props$closeAfterTran = props.closeAfterTransition,
      closeAfterTransition = _props$closeAfterTran === void 0 ? false : _props$closeAfterTran,
      container = props.container,
      _props$disableAutoFoc = props.disableAutoFocus,
      disableAutoFocus = _props$disableAutoFoc === void 0 ? false : _props$disableAutoFoc,
      _props$disableBackdro = props.disableBackdropClick,
      disableBackdropClick = _props$disableBackdro === void 0 ? false : _props$disableBackdro,
      _props$disableEnforce = props.disableEnforceFocus,
      disableEnforceFocus = _props$disableEnforce === void 0 ? false : _props$disableEnforce,
      _props$disableEscapeK = props.disableEscapeKeyDown,
      disableEscapeKeyDown = _props$disableEscapeK === void 0 ? false : _props$disableEscapeK,
      _props$disablePortal = props.disablePortal,
      disablePortal = _props$disablePortal === void 0 ? false : _props$disablePortal,
      _props$disableRestore = props.disableRestoreFocus,
      disableRestoreFocus = _props$disableRestore === void 0 ? false : _props$disableRestore,
      _props$disableScrollL = props.disableScrollLock,
      disableScrollLock = _props$disableScrollL === void 0 ? false : _props$disableScrollL,
      _props$hideBackdrop = props.hideBackdrop,
      hideBackdrop = _props$hideBackdrop === void 0 ? false : _props$hideBackdrop,
      _props$keepMounted = props.keepMounted,
      keepMounted = _props$keepMounted === void 0 ? false : _props$keepMounted,
      _props$manager = props.manager,
      manager = _props$manager === void 0 ? defaultManager : _props$manager,
      onBackdropClick = props.onBackdropClick,
      onClose = props.onClose,
      onEscapeKeyDown = props.onEscapeKeyDown,
      onRendered = props.onRendered,
      open = props.open,
      other = (0, _objectWithoutProperties2.default)(props, ["BackdropComponent", "BackdropProps", "children", "closeAfterTransition", "container", "disableAutoFocus", "disableBackdropClick", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "manager", "onBackdropClick", "onClose", "onEscapeKeyDown", "onRendered", "open"]);

  var _React$useState = React.useState(true),
      exited = _React$useState[0],
      setExited = _React$useState[1];

  var modal = React.useRef({});
  var mountNodeRef = React.useRef(null);
  var modalRef = React.useRef(null);
  var handleRef = (0, _useForkRef.default)(modalRef, ref);
  var hasTransition = getHasTransition(props);

  var getDoc = function getDoc() {
    return (0, _ownerDocument.default)(mountNodeRef.current);
  };

  var getModal = function getModal() {
    modal.current.modalRef = modalRef.current;
    modal.current.mountNode = mountNodeRef.current;
    return modal.current;
  };

  var handleMounted = function handleMounted() {
    manager.mount(getModal(), {
      disableScrollLock: disableScrollLock
    }); // Fix a bug on Chrome where the scroll isn't initially 0.

    modalRef.current.scrollTop = 0;
  };

  var handleOpen = (0, _useEventCallback.default)(function () {
    var resolvedContainer = getContainer(container) || getDoc().body;
    manager.add(getModal(), resolvedContainer); // The element was already mounted.

    if (modalRef.current) {
      handleMounted();
    }
  });
  var isTopModal = React.useCallback(function () {
    return manager.isTopModal(getModal());
  }, [manager]);
  var handlePortalRef = (0, _useEventCallback.default)(function (node) {
    mountNodeRef.current = node;

    if (!node) {
      return;
    }

    if (onRendered) {
      onRendered();
    }

    if (open && isTopModal()) {
      handleMounted();
    } else {
      (0, _ModalManager.ariaHidden)(modalRef.current, true);
    }
  });
  var handleClose = React.useCallback(function () {
    manager.remove(getModal());
  }, [manager]);
  React.useEffect(function () {
    return function () {
      handleClose();
    };
  }, [handleClose]);
  React.useEffect(function () {
    if (open) {
      handleOpen();
    } else if (!hasTransition || !closeAfterTransition) {
      handleClose();
    }
  }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);

  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }

  var handleEnter = function handleEnter() {
    setExited(false);
  };

  var handleExited = function handleExited() {
    setExited(true);

    if (closeAfterTransition) {
      handleClose();
    }
  };

  var handleBackdropClick = function handleBackdropClick(event) {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (onBackdropClick) {
      onBackdropClick(event);
    }

    if (!disableBackdropClick && onClose) {
      onClose(event, 'backdropClick');
    }
  };

  var handleKeyDown = function handleKeyDown(event) {
    // The handler doesn't take event.defaultPrevented into account:
    //
    // event.preventDefault() is meant to stop default behaviours like
    // clicking a checkbox to check it, hitting a button to submit a form,
    // and hitting left arrow to move the cursor in a text input etc.
    // Only special HTML elements have these default behaviors.
    if (event.key !== 'Escape' || !isTopModal()) {
      return;
    }

    if (onEscapeKeyDown) {
      onEscapeKeyDown(event);
    }

    if (!disableEscapeKeyDown) {
      // Swallow the event, in case someone is listening for the escape key on the body.
      event.stopPropagation();

      if (onClose) {
        onClose(event, 'escapeKeyDown');
      }
    }
  };

  var inlineStyle = styles(theme || {
    zIndex: _zIndex.default
  });
  var childProps = {};

  if (children.props.tabIndex === undefined) {
    childProps.tabIndex = children.props.tabIndex || '-1';
  } // It's a Transition like component


  if (hasTransition) {
    childProps.onEnter = (0, _createChainedFunction.default)(handleEnter, children.props.onEnter);
    childProps.onExited = (0, _createChainedFunction.default)(handleExited, children.props.onExited);
  }

  return /*#__PURE__*/React.createElement(_Portal.default, {
    ref: handlePortalRef,
    container: container,
    disablePortal: disablePortal
  }, /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    ref: handleRef,
    onKeyDown: handleKeyDown,
    role: "presentation"
  }, other, {
    style: (0, _extends2.default)({}, inlineStyle.root, !open && exited ? inlineStyle.hidden : {}, other.style)
  }), hideBackdrop ? null : /*#__PURE__*/React.createElement(BackdropComponent, (0, _extends2.default)({
    open: open,
    onClick: handleBackdropClick
  }, BackdropProps)), /*#__PURE__*/React.createElement(_Unstable_TrapFocus.default, {
    disableEnforceFocus: disableEnforceFocus,
    disableAutoFocus: disableAutoFocus,
    disableRestoreFocus: disableRestoreFocus,
    getDoc: getDoc,
    isEnabled: isTopModal,
    open: open
  }, /*#__PURE__*/React.cloneElement(children, childProps))));
});
process.env.NODE_ENV !== "production" ? Modal.propTypes = {
  /**
   * A backdrop component. This prop enables custom backdrop rendering.
   */
  BackdropComponent: _propTypes.default.elementType,

  /**
   * Props applied to the [`Backdrop`](/api/backdrop/) element.
   */
  BackdropProps: _propTypes.default.object,

  /**
   * A single child content element.
   */
  children: _utils.elementAcceptingRef.isRequired,

  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   */
  closeAfterTransition: _propTypes.default.bool,

  /**
   * A HTML element, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_utils.HTMLElementType, _propTypes.default.instanceOf(React.Component), _propTypes.default.func]),

  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   */
  disableAutoFocus: _propTypes.default.bool,

  /**
   * If `true`, clicking the backdrop will not fire `onClose`.
   */
  disableBackdropClick: _propTypes.default.bool,

  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   */
  disableEnforceFocus: _propTypes.default.bool,

  /**
   * If `true`, hitting escape will not fire `onClose`.
   */
  disableEscapeKeyDown: _propTypes.default.bool,

  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: _propTypes.default.bool,

  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden.
   */
  disableRestoreFocus: _propTypes.default.bool,

  /**
   * Disable the scroll lock behavior.
   */
  disableScrollLock: _propTypes.default.bool,

  /**
   * If `true`, the backdrop is not rendered.
   */
  hideBackdrop: _propTypes.default.bool,

  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   */
  keepMounted: _propTypes.default.bool,

  /**
   * @ignore
   */
  manager: _propTypes.default.object,

  /**
   * Callback fired when the backdrop is clicked.
   */
  onBackdropClick: _propTypes.default.func,

  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: _propTypes.default.func,

  /**
   * Callback fired when the escape key is pressed,
   * `disableEscapeKeyDown` is false and the modal is in focus.
   */
  onEscapeKeyDown: _propTypes.default.func,

  /**
   * Callback fired once the children has been mounted into the `container`.
   * It signals that the `open={true}` prop took effect.
   *
   * This prop will be deprecated and removed in v5, the ref can be used instead.
   */
  onRendered: _propTypes.default.func,

  /**
   * If `true`, the modal is open.
   */
  open: _propTypes.default.bool.isRequired
} : void 0;
var _default = Modal;
exports.default = _default;