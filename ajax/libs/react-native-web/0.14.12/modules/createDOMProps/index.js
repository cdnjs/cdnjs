function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import AccessibilityUtil from '../AccessibilityUtil';
import css from '../../exports/StyleSheet/css';
import StyleSheet from '../../exports/StyleSheet';
import styleResolver from '../../exports/StyleSheet/styleResolver';
import { STYLE_GROUPS } from '../../exports/StyleSheet/constants';
var emptyObject = {};
var hasOwnProperty = Object.prototype.hasOwnProperty; // Reset styles for heading, link, and list DOM elements

var classes = css.create({
  reset: {
    backgroundColor: 'transparent',
    color: 'inherit',
    font: 'inherit',
    listStyle: 'none',
    margin: 0,
    textAlign: 'inherit',
    textDecoration: 'none'
  },
  cursor: {
    cursor: 'pointer'
  }
}, STYLE_GROUPS.classicReset);
var pointerEventsStyles = StyleSheet.create({
  auto: {
    pointerEvents: 'auto'
  },
  'box-none': {
    pointerEvents: 'box-none'
  },
  'box-only': {
    pointerEvents: 'box-only'
  },
  none: {
    pointerEvents: 'none'
  }
});

var createDOMProps = function createDOMProps(component, props) {
  if (!props) {
    props = emptyObject;
  }

  var _props = props,
      accessibilityLabel = _props.accessibilityLabel,
      accessibilityLiveRegion = _props.accessibilityLiveRegion,
      accessibilityState = _props.accessibilityState,
      accessibilityValue = _props.accessibilityValue,
      accessible = _props.accessible,
      classList = _props.classList,
      dataSet = _props.dataSet,
      providedDisabled = _props.disabled,
      importantForAccessibility = _props.importantForAccessibility,
      nativeID = _props.nativeID,
      pointerEvents = _props.pointerEvents,
      providedStyle = _props.style,
      testID = _props.testID,
      accessibilityRole = _props.accessibilityRole,
      domProps = _objectWithoutPropertiesLoose(_props, ["accessibilityLabel", "accessibilityLiveRegion", "accessibilityState", "accessibilityValue", "accessible", "classList", "dataSet", "disabled", "importantForAccessibility", "nativeID", "pointerEvents", "style", "testID", "accessibilityRole"]);

  var disabled = accessibilityState != null && accessibilityState.disabled === true || providedDisabled;
  var role = AccessibilityUtil.propsToAriaRole(props);
  var isNativeInteractiveElement = role === 'link' || component === 'a' || component === 'button' || component === 'input' || component === 'select' || component === 'textarea' || domProps.contentEditable != null; // dataSet

  if (dataSet != null) {
    for (var prop in dataSet) {
      if (hasOwnProperty.call(dataSet, prop)) {
        var value = dataSet[prop];

        if (value != null) {
          domProps["data-" + prop] = value;
        }
      }
    }
  } // accessibilityLabel


  if (accessibilityLabel != null) {
    domProps['aria-label'] = accessibilityLabel;
  } // accessibilityLiveRegion


  if (accessibilityLiveRegion != null) {
    domProps['aria-live'] = accessibilityLiveRegion === 'none' ? 'off' : accessibilityLiveRegion;
  } // accessibilityRole


  if (role != null) {
    domProps.role = role;
  } // accessibilityState


  if (accessibilityState != null) {
    for (var _prop in accessibilityState) {
      var _value = accessibilityState[_prop];

      if (_value != null) {
        if (_prop === 'disabled' || _prop === 'hidden') {
          if (_value === true) {
            domProps["aria-" + _prop] = _value; // also set prop directly to pick up host component behaviour

            domProps[_prop] = _value;
          }
        } else {
          domProps["aria-" + _prop] = _value;
        }
      }
    }
  } // accessibilityValue


  if (accessibilityValue != null) {
    for (var _prop2 in accessibilityValue) {
      var _value2 = accessibilityValue[_prop2];

      if (_value2 != null) {
        domProps["aria-value" + _prop2] = _value2;
      }
    }
  } // legacy fallbacks


  if (importantForAccessibility === 'no-hide-descendants') {
    domProps['aria-hidden'] = true;
  }

  if (disabled === true) {
    domProps['aria-disabled'] = true;
    domProps.disabled = true;
  } // FOCUS
  // Assume that 'link' is focusable by default (uses <a>).
  // Assume that 'button' is not (uses <div role='button'>) but must be treated as such.


  var focusable = !disabled && importantForAccessibility !== 'no' && importantForAccessibility !== 'no-hide-descendants';

  if (isNativeInteractiveElement) {
    if (accessible === false || !focusable) {
      domProps.tabIndex = '-1';
    } else {
      domProps['data-focusable'] = true;
    }
  } else if (role === 'button' || role === 'menuitem' || role === 'textbox') {
    if (accessible !== false && focusable) {
      domProps['data-focusable'] = true;
      domProps.tabIndex = '0';
    }
  } else {
    if (accessible === true && focusable) {
      domProps['data-focusable'] = true;
      domProps.tabIndex = '0';
    }
  } // STYLE


  var reactNativeStyle = StyleSheet.compose(pointerEvents && pointerEventsStyles[pointerEvents], providedStyle); // Additional style resets for interactive elements

  var needsCursor = (role === 'button' || role === 'link') && !disabled;
  var needsReset = component === 'a' || component === 'button' || component === 'li' || component === 'ul' || role === 'heading'; // Classic CSS styles

  var finalClassList = [needsReset && classes.reset, needsCursor && classes.cursor, classList]; // Resolve styles

  var _styleResolver$resolv = styleResolver.resolve(reactNativeStyle, finalClassList),
      className = _styleResolver$resolv.className,
      style = _styleResolver$resolv.style;

  if (className != null && className !== '') {
    domProps.className = className;
  }

  if (style) {
    domProps.style = style;
  } // OTHER
  // Native element ID


  if (nativeID != null) {
    domProps.id = nativeID;
  } // Link security
  // https://mathiasbynens.github.io/rel-noopener/
  // Note: using "noreferrer" doesn't impact referrer tracking for https
  // transfers (i.e., from https to https).


  if (component === 'a' && domProps.target === '_blank') {
    domProps.rel = (domProps.rel || '') + " noopener noreferrer";
  } // Automated test IDs


  if (testID != null) {
    domProps['data-testid'] = testID;
  } // Keyboard accessibility
  // Button-like roles should trigger 'onClick' if SPACE key is pressed.
  // Button-like roles should not trigger 'onClick' if they are disabled.


  if (isNativeInteractiveElement || role === 'button' || role === 'menuitem' || accessible === true && focusable) {
    var onClick = domProps.onClick;

    if (onClick != null) {
      if (disabled) {
        // Prevent click propagating if the element is disabled. See #1757
        domProps.onClick = function (e) {
          e.stopPropagation();
        };
      } else if (!isNativeInteractiveElement) {
        // For native elements that are focusable but don't dispatch 'click' events
        // for keyboards.
        var onKeyDown = domProps.onKeyDown;

        domProps.onKeyDown = function (e) {
          var key = e.key,
              repeat = e.repeat;
          var isSpacebarKey = key === ' ' || key === 'Spacebar';
          var isButtonRole = role === 'button' || role === 'menuitem';

          if (onKeyDown != null) {
            onKeyDown(e);
          }

          if (!repeat && key === 'Enter') {
            onClick(e);
          } else if (isSpacebarKey && isButtonRole) {
            if (!repeat) {
              onClick(e);
            } // Prevent spacebar scrolling the window


            e.preventDefault();
          }
        };
      }
    }
  }

  return domProps;
};

export default createDOMProps;