import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ownerDocument from '../utils/ownerDocument';
import useForkRef from '../utils/useForkRef';
import useEventCallback from '../utils/useEventCallback';
import { elementAcceptingRef, exactProp } from '@material-ui/utils';

function mapEventPropToEvent(eventProp) {
  return eventProp.substring(2).toLowerCase();
}

function clickedRootScrollbar(event) {
  return document.documentElement.clientWidth < event.clientX || document.documentElement.clientHeight < event.clientY;
}
/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 */


function ClickAwayListener(props) {
  var children = props.children,
      _props$disableReactTr = props.disableReactTree,
      disableReactTree = _props$disableReactTr === void 0 ? false : _props$disableReactTr,
      _props$mouseEvent = props.mouseEvent,
      mouseEvent = _props$mouseEvent === void 0 ? 'onClick' : _props$mouseEvent,
      onClickAway = props.onClickAway,
      _props$touchEvent = props.touchEvent,
      touchEvent = _props$touchEvent === void 0 ? 'onTouchEnd' : _props$touchEvent;
  var movedRef = React.useRef(false);
  var nodeRef = React.useRef(null);
  var activatedRef = React.useRef(false);
  var syntheticEventRef = React.useRef(false);
  React.useEffect(function () {
    // Ensure that this component is not "activated" synchronously.
    // https://github.com/facebook/react/issues/20074
    setTimeout(function () {
      activatedRef.current = true;
    }, 0);
    return function () {
      activatedRef.current = false;
    };
  }, []); // can be removed once we drop support for non ref forwarding class components

  var handleOwnRef = React.useCallback(function (instance) {
    // #StrictMode ready
    nodeRef.current = ReactDOM.findDOMNode(instance);
  }, []);
  var handleRef = useForkRef(children.ref, handleOwnRef); // The handler doesn't take event.defaultPrevented into account:
  //
  // event.preventDefault() is meant to stop default behaviours like
  // clicking a checkbox to check it, hitting a button to submit a form,
  // and hitting left arrow to move the cursor in a text input etc.
  // Only special HTML elements have these default behaviors.

  var handleClickAway = useEventCallback(function (event) {
    // Given developers can stop the propagation of the synthetic event,
    // we can only be confident with a positive value.
    var insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false; // 1. IE 11 support, which trigger the handleClickAway even after the unbind
    // 2. The child might render null.
    // 3. Behave like a blur listener.

    if (!activatedRef.current || !nodeRef.current || clickedRootScrollbar(event)) {
      return;
    } // Do not act if user performed touchmove


    if (movedRef.current) {
      movedRef.current = false;
      return;
    }

    var insideDOM; // If not enough, can use https://github.com/DieterHolvoet/event-propagation-path/blob/master/propagationPath.js

    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      // TODO v6 remove dead logic https://caniuse.com/#search=composedPath.
      var doc = ownerDocument(nodeRef.current);
      insideDOM = !doc.documentElement.contains(event.target) || nodeRef.current.contains(event.target);
    }

    if (!insideDOM && (disableReactTree || !insideReactTree)) {
      onClickAway(event);
    }
  }); // Keep track of mouse/touch events that bubbled up through the portal.

  var createHandleSynthetic = function createHandleSynthetic(handlerName) {
    return function (event) {
      syntheticEventRef.current = true;
      var childrenPropsHandler = children.props[handlerName];

      if (childrenPropsHandler) {
        childrenPropsHandler(event);
      }
    };
  };

  var childrenProps = {
    ref: handleRef
  };

  if (touchEvent !== false) {
    childrenProps[touchEvent] = createHandleSynthetic(touchEvent);
  }

  React.useEffect(function () {
    if (touchEvent !== false) {
      var mappedTouchEvent = mapEventPropToEvent(touchEvent);
      var doc = ownerDocument(nodeRef.current);

      var handleTouchMove = function handleTouchMove() {
        movedRef.current = true;
      };

      doc.addEventListener(mappedTouchEvent, handleClickAway);
      doc.addEventListener('touchmove', handleTouchMove);
      return function () {
        doc.removeEventListener(mappedTouchEvent, handleClickAway);
        doc.removeEventListener('touchmove', handleTouchMove);
      };
    }

    return undefined;
  }, [handleClickAway, touchEvent]);

  if (mouseEvent !== false) {
    childrenProps[mouseEvent] = createHandleSynthetic(mouseEvent);
  }

  React.useEffect(function () {
    if (mouseEvent !== false) {
      var mappedMouseEvent = mapEventPropToEvent(mouseEvent);
      var doc = ownerDocument(nodeRef.current);
      doc.addEventListener(mappedMouseEvent, handleClickAway);
      return function () {
        doc.removeEventListener(mappedMouseEvent, handleClickAway);
      };
    }

    return undefined;
  }, [handleClickAway, mouseEvent]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.cloneElement(children, childrenProps));
}

process.env.NODE_ENV !== "production" ? ClickAwayListener.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The wrapped element.
   */
  children: elementAcceptingRef.isRequired,

  /**
   * If `true`, the React tree is ignored and only the DOM tree is considered.
   * This prop changes how portaled elements are handled.
   */
  disableReactTree: PropTypes.bool,

  /**
   * The mouse event to listen to. You can disable the listener by providing `false`.
   */
  mouseEvent: PropTypes.oneOf(['onClick', 'onMouseDown', 'onMouseUp', false]),

  /**
   * Callback fired when a "click away" event is detected.
   */
  onClickAway: PropTypes.func.isRequired,

  /**
   * The touch event to listen to. You can disable the listener by providing `false`.
   */
  touchEvent: PropTypes.oneOf(['onTouchEnd', 'onTouchStart', false])
} : void 0;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  ClickAwayListener['propTypes' + ''] = exactProp(ClickAwayListener.propTypes);
}

export default ClickAwayListener;