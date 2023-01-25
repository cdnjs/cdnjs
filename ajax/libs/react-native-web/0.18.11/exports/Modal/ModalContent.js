import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["active", "children", "onRequestClose", "transparent"];

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
import canUseDOM from '../../modules/canUseDom';
var ModalContent = /*#__PURE__*/React.forwardRef((props, forwardedRef) => {
  var active = props.active,
      children = props.children,
      onRequestClose = props.onRequestClose,
      transparent = props.transparent,
      rest = _objectWithoutPropertiesLoose(props, _excluded);

  React.useEffect(() => {
    if (canUseDOM) {
      var closeOnEscape = e => {
        if (active && e.key === 'Escape') {
          e.stopPropagation();

          if (onRequestClose) {
            onRequestClose();
          }
        }
      };

      document.addEventListener('keyup', closeOnEscape, false);
      return () => document.removeEventListener('keyup', closeOnEscape, false);
    }
  }, [active, onRequestClose]);
  var style = React.useMemo(() => {
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