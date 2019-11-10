(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('glamor')) :
	typeof define === 'function' && define.amd ? define(['react', 'glamor'], factory) :
	(global.glamorous = factory(global.React,global.Glamor));
}(this, (function (React,glamor) { 'use strict';

React = 'default' in React ? React['default'] : React;

/* eslint max-lines:0, func-style:0 */
// copied from:
// https://github.com/styled-components/styled-components/tree/
// 956e8210b6277860c89404f9cb08735f97eaa7e1/src/utils/validAttr.js
/* Trying to avoid the unknown-prop errors on glamorous components
 by filtering by React's attribute whitelist.
 */

/* Logic copied from ReactDOMUnknownPropertyHook */
var reactProps = ['children', 'dangerouslySetInnerHTML', 'key', 'ref', 'autoFocus', 'defaultValue', 'valueLink', 'defaultChecked', 'checkedLink', 'innerHTML', 'suppressContentEditableWarning', 'onFocusIn', 'onFocusOut', 'className',

/* List copied from https://facebook.github.io/react/docs/events.html */
'onCopy', 'onCut', 'onPaste', 'onCompositionEnd', 'onCompositionStart', 'onCompositionUpdate', 'onKeyDown', 'onKeyPress', 'onKeyUp', 'onFocus', 'onBlur', 'onChange', 'onInput', 'onSubmit', 'onClick', 'onContextMenu', 'onDoubleClick', 'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp', 'onSelect', 'onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart', 'onScroll', 'onWheel', 'onAbort', 'onCanPlay', 'onCanPlayThrough', 'onDurationChange', 'onEmptied', 'onEncrypted', 'onEnded', 'onError', 'onLoadedData', 'onLoadedMetadata', 'onLoadStart', 'onPause', 'onPlay', 'onPlaying', 'onProgress', 'onRateChange', 'onSeeked', 'onSeeking', 'onStalled', 'onSuspend', 'onTimeUpdate', 'onVolumeChange', 'onWaiting', 'onLoad', 'onAnimationStart', 'onAnimationEnd', 'onAnimationIteration', 'onTransitionEnd', 'onCopyCapture', 'onCutCapture', 'onPasteCapture', 'onCompositionEndCapture', 'onCompositionStartCapture', 'onCompositionUpdateCapture', 'onKeyDownCapture', 'onKeyPressCapture', 'onKeyUpCapture', 'onFocusCapture', 'onBlurCapture', 'onChangeCapture', 'onInputCapture', 'onSubmitCapture', 'onClickCapture', 'onContextMenuCapture', 'onDoubleClickCapture', 'onDragCapture', 'onDragEndCapture', 'onDragEnterCapture', 'onDragExitCapture', 'onDragLeaveCapture', 'onDragOverCapture', 'onDragStartCapture', 'onDropCapture', 'onMouseDownCapture', 'onMouseEnterCapture', 'onMouseLeaveCapture', 'onMouseMoveCapture', 'onMouseOutCapture', 'onMouseOverCapture', 'onMouseUpCapture', 'onSelectCapture', 'onTouchCancelCapture', 'onTouchEndCapture', 'onTouchMoveCapture', 'onTouchStartCapture', 'onScrollCapture', 'onWheelCapture', 'onAbortCapture', 'onCanPlayCapture', 'onCanPlayThroughCapture', 'onDurationChangeCapture', 'onEmptiedCapture', 'onEncryptedCapture', 'onEndedCapture', 'onErrorCapture', 'onLoadedDataCapture', 'onLoadedMetadataCapture', 'onLoadStartCapture', 'onPauseCapture', 'onPlayCapture', 'onPlayingCapture', 'onProgressCapture', 'onRateChangeCapture', 'onSeekedCapture', 'onSeekingCapture', 'onStalledCapture', 'onSuspendCapture', 'onTimeUpdateCapture', 'onVolumeChangeCapture', 'onWaitingCapture', 'onLoadCapture', 'onAnimationStartCapture', 'onAnimationEndCapture', 'onAnimationIterationCapture', 'onTransitionEndCapture'];

/* From HTMLDOMPropertyConfig */
var htmlProps = [
/**
 * Standard Properties
 */
'accept', 'acceptCharset', 'accessKey', 'action', 'allowFullScreen', 'allowTransparency', 'alt',
// specifies target context for links with `preload` type
'as', 'async', 'autoComplete',
// autoFocus is polyfilled/normalized by AutoFocusUtils
'// autoFocus', 'autoPlay', 'capture', 'cellPadding', 'cellSpacing', 'charSet', 'challenge', 'checked', 'cite', 'classID', 'className', 'cols', 'colSpan', 'content', 'contentEditable', 'contextMenu', 'controls', 'coords', 'crossOrigin', 'data', // For `<object />` acts as `src`.
'dateTime', 'default', 'defer', 'dir', 'disabled', 'download', 'draggable', 'encType', 'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'frameBorder', 'headers', 'height', 'hidden', 'high', 'href', 'hrefLang', 'htmlFor', 'httpEquiv', 'icon', 'id', 'inputMode', 'integrity', 'is', 'keyParams', 'keyType', 'kind', 'label', 'lang', 'list', 'loop', 'low', 'manifest', 'marginHeight', 'marginWidth', 'max', 'maxLength', 'media', 'mediaGroup', 'method', 'min', 'minLength',
// Caution; `option.selected` is not updated if `select.multiple` is
// disabled with `removeAttribute`.
'multiple', 'muted', 'name', 'nonce', 'noValidate', 'open', 'optimum', 'pattern', 'placeholder', 'playsInline', 'poster', 'preload', 'profile', 'radioGroup', 'readOnly', 'referrerPolicy', 'rel', 'required', 'reversed', 'role', 'rows', 'rowSpan', 'sandbox', 'scope', 'scoped', 'scrolling', 'seamless', 'selected', 'shape', 'size', 'sizes', 'span', 'spellCheck', 'src', 'srcDoc', 'srcLang', 'srcSet', 'start', 'step', 'style', 'summary', 'tabIndex', 'target', 'title',
// Setting .type throws on non-<input> tags
'type', 'useMap', 'value', 'width', 'wmode', 'wrap',

/**
 * RDFa Properties
 */
'about', 'datatype', 'inlist', 'prefix',
// property is also supported for OpenGraph in meta tags.
'property', 'resource', 'typeof', 'vocab',

/**
 * Non-standard Properties
 */
// autoCapitalize and autoCorrect are supported in Mobile Safari for
// keyboard hints.
'autoCapitalize', 'autoCorrect',
// autoSave allows WebKit/Blink to persist values of
// input fields on page reloads
'autoSave',
// color is for Safari mask-icon link
'color',
// itemProp, itemScope, itemType are for
// Microdata support. See http://schema.org/docs/gs.html
'itemProp', 'itemScope', 'itemType',
// itemID and itemRef are for Microdata support as well but
// only specified in the WHATWG spec document. See
// https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
'itemID', 'itemRef',
// results show looking glass icon and recent searches on input
// search fields in WebKit/Blink
'results',
// IE-only attribute that specifies security restrictions on an iframe
// as an alternative to the sandbox attribute on IE<10
'security',
// IE-only attribute that controls focus behavior
'unselectable'];

var svgProps = ['accentHeight', 'accumulate', 'additive', 'alignmentBaseline', 'allowReorder', 'alphabetic', 'amplitude', 'arabicForm', 'ascent', 'attributeName', 'attributeType', 'autoReverse', 'azimuth', 'baseFrequency', 'baseProfile', 'baselineShift', 'bbox', 'begin', 'bias', 'by', 'calcMode', 'capHeight', 'clip', 'clipPath', 'clipRule', 'clipPathUnits', 'colorInterpolation', 'colorInterpolationFilters', 'colorProfile', 'colorRendering', 'contentScriptType', 'contentStyleType', 'cursor', 'cx', 'cy', 'd', 'decelerate', 'descent', 'diffuseConstant', 'direction', 'display', 'divisor', 'dominantBaseline', 'dur', 'dx', 'dy', 'edgeMode', 'elevation', 'enableBackground', 'end', 'exponent', 'externalResourcesRequired', 'fill', 'fillOpacity', 'fillRule', 'filter', 'filterRes', 'filterUnits', 'floodColor', 'floodOpacity', 'focusable', 'fontFamily', 'fontSize', 'fontSizeAdjust', 'fontStretch', 'fontStyle', 'fontVariant', 'fontWeight', 'format', 'from', 'fx', 'fy', 'g1', 'g2', 'glyphName', 'glyphOrientationHorizontal', 'glyphOrientationVertical', 'glyphRef', 'gradientTransform', 'gradientUnits', 'hanging', 'horizAdvX', 'horizOriginX', 'ideographic', 'imageRendering', 'in', 'in2', 'intercept', 'k', 'k1', 'k2', 'k3', 'k4', 'kernelMatrix', 'kernelUnitLength', 'kerning', 'keyPoints', 'keySplines', 'keyTimes', 'lengthAdjust', 'letterSpacing', 'lightingColor', 'limitingConeAngle', 'local', 'markerEnd', 'markerMid', 'markerStart', 'markerHeight', 'markerUnits', 'markerWidth', 'mask', 'maskContentUnits', 'maskUnits', 'mathematical', 'mode', 'numOctaves', 'offset', 'opacity', 'operator', 'order', 'orient', 'orientation', 'origin', 'overflow', 'overlinePosition', 'overlineThickness', 'paintOrder', 'panose1', 'pathLength', 'patternContentUnits', 'patternTransform', 'patternUnits', 'pointerEvents', 'points', 'pointsAtX', 'pointsAtY', 'pointsAtZ', 'preserveAlpha', 'preserveAspectRatio', 'primitiveUnits', 'r', 'radius', 'refX', 'refY', 'renderingIntent', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'result', 'rotate', 'rx', 'ry', 'scale', 'seed', 'shapeRendering', 'slope', 'spacing', 'specularConstant', 'specularExponent', 'speed', 'spreadMethod', 'startOffset', 'stdDeviation', 'stemh', 'stemv', 'stitchTiles', 'stopColor', 'stopOpacity', 'strikethroughPosition', 'strikethroughThickness', 'string', 'stroke', 'strokeDasharray', 'strokeDashoffset', 'strokeLinecap', 'strokeLinejoin', 'strokeMiterlimit', 'strokeOpacity', 'strokeWidth', 'surfaceScale', 'systemLanguage', 'tableValues', 'targetX', 'targetY', 'textAnchor', 'textDecoration', 'textRendering', 'textLength', 'to', 'transform', 'u1', 'u2', 'underlinePosition', 'underlineThickness', 'unicode', 'unicodeBidi', 'unicodeRange', 'unitsPerEm', 'vAlphabetic', 'vHanging', 'vIdeographic', 'vMathematical', 'values', 'vectorEffect', 'version', 'vertAdvY', 'vertOriginX', 'vertOriginY', 'viewBox', 'viewTarget', 'visibility', 'widths', 'wordSpacing', 'writingMode', 'x', 'xHeight', 'x1', 'x2', 'xChannelSelector', 'xlinkActuate', 'xlinkArcrole', 'xlinkHref', 'xlinkRole', 'xlinkShow', 'xlinkTitle', 'xlinkType', 'xmlBase', 'xmlns', 'xmlnsXlink', 'xmlLang', 'xmlSpace', 'y', 'y1', 'y2', 'yChannelSelector', 'z', 'zoomAndPan'];

// these are valid attributes that have the
// same name as CSS properties, and is used
// for css overrides API
var cssProps = ['color', 'height', 'width'];

/* From DOMProperty */
// eslint-disable-next-line max-len
var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
// eslint-disable-next-line max-len
var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
var isCustomAttribute = RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$'));

var hasItem = function hasItem(list, name) {
  return list.indexOf(name) !== -1;
};
var isHtmlProp = function isHtmlProp(name) {
  return hasItem(htmlProps, name);
};
var isCssProp = function isCssProp(name) {
  return hasItem(cssProps, name);
};
var isSvgProp = function isSvgProp(tagName, name) {
  return tagName === 'svg' && hasItem(svgProps, name);
};
var isReactProp = function isReactProp(name) {
  return hasItem(reactProps, name);
};

// eslint-disable-next-line complexity
var shouldForwardProperty = function shouldForwardProperty(tagName, name) {
  return typeof tagName !== 'string' || (isHtmlProp(name) || isSvgProp(tagName, name) || isCustomAttribute(name.toLowerCase()) || isReactProp(name)) && (tagName === 'svg' || !isCssProp(name));
};

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/*
 * This is a relatively small abstraction that's ripe for open sourcing.
 * Documentation is in the README.md
 */
var htmlTagNames = require('html-tag-names');
var svgTagNames = require('svg-tag-names');

var domElements = htmlTagNames.concat(svgTagNames).filter(function (tag, index, array) {
  return array.indexOf(tag) === index;
});

var PropTypes = React.PropTypes;

/**
 * This is the main export and the function that people
 * interact with most directly.
 *
 * It accepts a component which can be a string or a React Component and returns
 * a "glamorousComponentFactory"
 * @param {String|ReactComponent} comp the component to render
 * @param {Object} options helpful info for the GlamorousComponents
 * @return {Function} the glamorousComponentFactory
 */

function glamorous(comp) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      rootEl = _ref.rootEl,
      displayName = _ref.displayName;

  return glamorousComponentFactory;

  /**
   * This returns a React Component that renders the comp (closure)
   * with a className based on the given glamor styles object(s)
   * @param {...Object|Function} styles the styles to create with glamor.
   *   If any of these are functions, they are invoked with the component
   *   props and the return value is used.
   * @return {ReactComponent} the ReactComponent function
   */
  function glamorousComponentFactory() {
    for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
      styles[_key] = arguments[_key];
    }

    /**
     * This is a component which will render the comp (closure)
     * with the glamorous styles (closure). Forwards any valid
     * props to the underlying component.
     * @param {Object} props the props for the component. className is
     *   handled specially so any glamor-provided classNames will be
     *   merged predicably (with no regard to specificity)
     * @return {ReactElement} React.createElement
     */
    function GlamorousComponent(props) {
      var className = props.className,
          rest = _objectWithoutProperties(props, ['className']);

      var _splitProps = splitProps(rest, GlamorousComponent),
          toForward = _splitProps.toForward,
          cssOverrides = _splitProps.cssOverrides;

      // create className to apply


      var mappedArgs = GlamorousComponent.styles.map(mapToPropsCall);

      var _extractGlamorStyles = extractGlamorStyles(className),
          parentGlamorStyles = _extractGlamorStyles.glamorStyles,
          glamorlessClassName = _extractGlamorStyles.glamorlessClassName;

      var glamorClassName = glamor.css.apply(undefined, _toConsumableArray(mappedArgs).concat(_toConsumableArray(parentGlamorStyles), [cssOverrides])).toString();
      var fullClassName = joinClasses(glamorlessClassName, glamorClassName);

      return React.createElement(GlamorousComponent.comp, _extends({
        className: fullClassName
      }, toForward));

      function mapToPropsCall(glamorRules) {
        if (typeof glamorRules === 'function') {
          return glamorRules(props);
        }
        return glamorRules;
      }
    }
    GlamorousComponent.propTypes = {
      className: PropTypes.string,
      cssOverrides: PropTypes.object
    };

    Object.assign(GlamorousComponent, getGlamorousComponentMetadata({ comp: comp, styles: styles, rootEl: rootEl, displayName: displayName }));
    return GlamorousComponent;
  }
}

function getGlamorousComponentMetadata(_ref2) {
  var comp = _ref2.comp,
      styles = _ref2.styles,
      rootEl = _ref2.rootEl,
      displayName = _ref2.displayName;

  var componentsComp = comp.comp ? comp.comp : comp;
  return {
    // join styles together (for anyone doing: glamorous(glamorous.a({}), {}))
    styles: comp.styles ? comp.styles.concat(styles) : styles,
    // keep track of the ultimate rootEl to render (we never
    // actually render anything but
    // the base component, even when people wrap a glamorous
    // component in glamorous
    comp: componentsComp,
    rootEl: rootEl || componentsComp,
    // set the displayName to something that's slightly more
    // helpful than `GlamorousComponent` :)
    displayName: displayName || 'glamorous(' + getDisplayName(comp) + ')'
  };
}

function getDisplayName(comp) {
  return typeof comp === 'string' ? comp : comp.displayName || comp.name || 'unknown';
}

/*
 * This creates a glamorousComponentFactory for every DOM element so you can
 * simply do:
 * const GreenButton = glamorous.button({
 *   backgroundColor: 'green',
 *   padding: 20,
 * })
 * <GreenButton>Click Me!</GreenButton>
 */
Object.assign(glamorous, domElements.reduce(function (getters, tag) {
  getters[tag] = glamorous(tag);
  return getters;
}, {}));

/*
 * This creates a glamorous component for each DOM element so you can
 * simply do:
 * <glamorous.Div
 *   color="green"
 *   marginLeft={20}
 * >
 *   I'm green!
 * </glamorous.Div>
 */
Object.assign(glamorous, domElements.reduce(function (comps, tag) {
  var capitalTag = capitalize(tag);
  comps[capitalTag] = glamorous[tag]();
  comps[capitalTag].displayName = 'glamorous.' + capitalTag;
  comps[capitalTag].propsAreCssOverrides = true;
  return comps;
}, {}));

/**
 * This function takes a className string and gets all the
 * associated glamor styles. It's used to merge glamor styles
 * from a className to make sure that specificity is not
 * a problem when passing a className to a component.
 * @param {String} [className=''] the className string
 * @return {Object} { glamorStyles, glamorlessClassName }
 *   - glamorStyles is an array of all the glamor styles objects
 *   - glamorlessClassName is the rest of the className string
 *     without the glamor classNames
 */
function extractGlamorStyles() {
  var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return className.toString().split(' ').reduce(function (groups, name) {
    if (name.indexOf('css-') === 0) {
      var id = name.slice('css-'.length);
      var style = glamor.styleSheet.registered[id].style;

      groups.glamorStyles.push(style);
    } else {
      groups.glamorlessClassName = joinClasses(groups.glamorlessClassName, name);
    }
    return groups;
  }, { glamorlessClassName: '', glamorStyles: [] });
}

function splitProps(_ref3, _ref4) {
  var propsAreCssOverrides = _ref4.propsAreCssOverrides,
      rootEl = _ref4.rootEl;

  var _ref3$css = _ref3.css,
      cssOverrides = _ref3$css === undefined ? {} : _ref3$css,
      rest = _objectWithoutProperties(_ref3, ['css']);

  var returnValue = { toForward: {}, cssOverrides: {} };
  if (!propsAreCssOverrides) {
    returnValue.cssOverrides = cssOverrides;
  }
  return Object.keys(rest).reduce(function (split, propName) {
    if (shouldForwardProperty(rootEl, propName)) {
      split.toForward[propName] = rest[propName];
    } else if (propsAreCssOverrides) {
      split.cssOverrides[propName] = rest[propName];
    }
    return split;
  }, returnValue);
}

function capitalize(s) {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
}

function joinClasses() {
  for (var _len2 = arguments.length, classes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    classes[_key2] = arguments[_key2];
  }

  return classes.filter(Boolean).join(' ');
}

return glamorous;

})));
