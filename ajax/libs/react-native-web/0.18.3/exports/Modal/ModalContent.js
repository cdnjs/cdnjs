function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import * as React from 'react';
import View from '../View';
import StyleSheet from '../StyleSheet';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
var canUseDOM = ExecutionEnvironment.canUseDOM;
var ModalContent = /*#__PURE__*/React.forwardRef(function (props, forwardedRef) {
  var active = props.active,
      children = props.children,
      onRequestClose = props.onRequestClose,
      transparent = props.transparent,
      rest = _objectWithoutPropertiesLoose(props, ["active", "children", "onRequestClose", "transparent"]);

  React.useEffect(function () {
    if (canUseDOM) {
      var closeOnEscape = function closeOnEscape(e) {
        if (active && e.key === 'Escape') {
          e.stopPropagation();

          if (onRequestClose) {
            onRequestClose();
          }
        }
      };

      document.addEventListener('keyup', closeOnEscape, false);
      return function () {
        return document.removeEventListener('keyup', closeOnEscape, false);
      };
    }
  }, [active, onRequestClose]);
  var style = React.useMemo(function () {
    return [styles.modal, transparent ? styles.modalTransparent : styles.modalOpaque];
  }, [transparent]);
  return /*#__PURE__*/React.createElement(View, _extends({}, rest, {
    accessibilityModal: true,
    accessibilityRole: active ? 'dialog' : null,
    ref: forwardedRef,
    style: style
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, children));
});
var styles = StyleSheet.create({
  modal: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  modalTransparent: {
    backgroundColor: 'transparent'
  },
  modalOpaque: {
    backgroundColor: 'white'
  },
  container: {
    top: 0,
    flex: 1
  }
});
export default ModalContent;