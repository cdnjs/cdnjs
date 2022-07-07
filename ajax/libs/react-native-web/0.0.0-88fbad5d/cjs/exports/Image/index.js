"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _createElement = _interopRequireDefault(require("../createElement"));

var _AssetRegistry = require("../../modules/AssetRegistry");

var _preprocess = require("../StyleSheet/preprocess");

var _ImageLoader = _interopRequireDefault(require("../../modules/ImageLoader"));

var _PixelRatio = _interopRequireDefault(require("../PixelRatio"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _TextAncestorContext = _interopRequireDefault(require("../Text/TextAncestorContext"));

var _View = _interopRequireDefault(require("../View"));

var _excluded = ["accessibilityLabel", "blurRadius", "defaultSource", "draggable", "onError", "onLayout", "onLoad", "onLoadEnd", "onLoadStart", "pointerEvents", "source", "style"];
var ERRORED = 'ERRORED';
var LOADED = 'LOADED';
var LOADING = 'LOADING';
var IDLE = 'IDLE';
var _filterId = 0;
var svgDataUriPattern = /^(data:image\/svg\+xml;utf8,)(.*)/;

function createTintColorSVG(tintColor, id) {
  return tintColor && id != null ? /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      height: 0,
      visibility: 'hidden',
      width: 0
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("filter", {
    id: "tint-" + id,
    suppressHydrationWarning: true
  }, /*#__PURE__*/React.createElement("feFlood", {
    floodColor: "" + tintColor,
    key: tintColor
  }), /*#__PURE__*/React.createElement("feComposite", {
    in2: "SourceAlpha",
    operator: "atop"
  })))) : null;
}

function getFlatStyle(style, blurRadius, filterId) {
  var flatStyle = _StyleSheet.default.flatten(style);

  var filter = flatStyle.filter,
      resizeMode = flatStyle.resizeMode,
      shadowOffset = flatStyle.shadowOffset,
      tintColor = flatStyle.tintColor; // Add CSS filters
  // React Native exposes these features as props and proprietary styles

  var filters = [];
  var _filter = null;

  if (filter) {
    filters.push(filter);
  }

  if (blurRadius) {
    filters.push("blur(" + blurRadius + "px)");
  }

  if (shadowOffset) {
    var shadowString = (0, _preprocess.createBoxShadowValue)(flatStyle);

    if (shadowString) {
      filters.push("drop-shadow(" + shadowString + ")");
    }
  }

  if (tintColor && filterId != null) {
    filters.push("url(#tint-" + filterId + ")");
  }

  if (filters.length > 0) {
    _filter = filters.join(' ');
  } // These styles are converted to CSS filters applied to the
  // element displaying the background image.


  delete flatStyle.blurRadius;
  delete flatStyle.shadowColor;
  delete flatStyle.shadowOpacity;
  delete flatStyle.shadowOffset;
  delete flatStyle.shadowRadius;
  delete flatStyle.tintColor; // These styles are not supported on View

  delete flatStyle.overlayColor;
  delete flatStyle.resizeMode;
  return [flatStyle, resizeMode, _filter, tintColor];
}

function resolveAssetDimensions(source) {
  if (typeof source === 'number') {
    var _getAssetByID = (0, _AssetRegistry.getAssetByID)(source),
        _height = _getAssetByID.height,
        _width = _getAssetByID.width;

    return {
      height: _height,
      width: _width
    };
  } else if (source != null && !Array.isArray(source) && typeof source === 'object') {
    var _height2 = source.height,
        _width2 = source.width;
    return {
      height: _height2,
      width: _width2
    };
  }
}

function resolveAssetUri(source) {
  var uri = null;

  if (typeof source === 'number') {
    // get the URI from the packager
    var asset = (0, _AssetRegistry.getAssetByID)(source);
    var scale = asset.scales[0];

    if (asset.scales.length > 1) {
      var preferredScale = _PixelRatio.default.get(); // Get the scale which is closest to the preferred scale


      scale = asset.scales.reduce((prev, curr) => Math.abs(curr - preferredScale) < Math.abs(prev - preferredScale) ? curr : prev);
    }

    var scaleSuffix = scale !== 1 ? "@" + scale + "x" : '';
    uri = asset ? asset.httpServerLocation + "/" + asset.name + scaleSuffix + "." + asset.type : '';
  } else if (typeof source === 'string') {
    uri = source;
  } else if (source && typeof source.uri === 'string') {
    uri = source.uri;
  }

  if (uri) {
    var match = uri.match(svgDataUriPattern); // inline SVG markup may contain characters (e.g., #, ") that need to be escaped

    if (match) {
      var prefix = match[1],
          svg = match[2];
      var encodedSvg = encodeURIComponent(svg);
      return "" + prefix + encodedSvg;
    }
  }

  return uri;
}

var Image = /*#__PURE__*/React.forwardRef((props, ref) => {
  var accessibilityLabel = props.accessibilityLabel,
      blurRadius = props.blurRadius,
      defaultSource = props.defaultSource,
      draggable = props.draggable,
      onError = props.onError,
      onLayout = props.onLayout,
      onLoad = props.onLoad,
      onLoadEnd = props.onLoadEnd,
      onLoadStart = props.onLoadStart,
      pointerEvents = props.pointerEvents,
      source = props.source,
      style = props.style,
      rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);

  if (process.env.NODE_ENV !== 'production') {
    if (props.children) {
      throw new Error('The <Image> component cannot contain children. If you want to render content on top of the image, consider using the <ImageBackground> component or absolute positioning.');
    }
  }

  var _React$useState = React.useState(() => {
    var uri = resolveAssetUri(source);

    if (uri != null) {
      var isLoaded = _ImageLoader.default.has(uri);

      if (isLoaded) {
        return LOADED;
      }
    }

    return IDLE;
  }),
      state = _React$useState[0],
      updateState = _React$useState[1];

  var _React$useState2 = React.useState({}),
      layout = _React$useState2[0],
      updateLayout = _React$useState2[1];

  var hasTextAncestor = React.useContext(_TextAncestorContext.default);
  var hiddenImageRef = React.useRef(null);
  var filterRef = React.useRef(_filterId++);
  var requestRef = React.useRef(null);
  var shouldDisplaySource = state === LOADED || state === LOADING && defaultSource == null;

  var _getFlatStyle = getFlatStyle(style, blurRadius, filterRef.current),
      flatStyle = _getFlatStyle[0],
      _resizeMode = _getFlatStyle[1],
      filter = _getFlatStyle[2],
      tintColor = _getFlatStyle[3];

  var resizeMode = props.resizeMode || _resizeMode || 'cover';
  var selectedSource = shouldDisplaySource ? source : defaultSource;
  var displayImageUri = resolveAssetUri(selectedSource);
  var imageSizeStyle = resolveAssetDimensions(selectedSource);
  var backgroundImage = displayImageUri ? "url(\"" + displayImageUri + "\")" : null;
  var backgroundSize = getBackgroundSize(); // Accessibility image allows users to trigger the browser's image context menu

  var hiddenImage = displayImageUri ? (0, _createElement.default)('img', {
    alt: accessibilityLabel || '',
    style: styles.accessibilityImage$raw,
    draggable: draggable || false,
    ref: hiddenImageRef,
    src: displayImageUri
  }) : null;

  function getBackgroundSize() {
    if (hiddenImageRef.current != null && (resizeMode === 'center' || resizeMode === 'repeat')) {
      var _hiddenImageRef$curre = hiddenImageRef.current,
          naturalHeight = _hiddenImageRef$curre.naturalHeight,
          naturalWidth = _hiddenImageRef$curre.naturalWidth;
      var _height3 = layout.height,
          _width3 = layout.width;

      if (naturalHeight && naturalWidth && _height3 && _width3) {
        var scaleFactor = Math.min(1, _width3 / naturalWidth, _height3 / naturalHeight);
        var x = Math.ceil(scaleFactor * naturalWidth);
        var y = Math.ceil(scaleFactor * naturalHeight);
        return x + "px " + y + "px";
      }
    }
  }

  function handleLayout(e) {
    if (resizeMode === 'center' || resizeMode === 'repeat' || onLayout) {
      var _layout = e.nativeEvent.layout;
      onLayout && onLayout(e);
      updateLayout(_layout);
    }
  } // Image loading


  var uri = resolveAssetUri(source);
  React.useEffect(() => {
    abortPendingRequest();

    if (uri != null) {
      updateState(LOADING);

      if (onLoadStart) {
        onLoadStart();
      }

      requestRef.current = _ImageLoader.default.load(uri, function load(e) {
        updateState(LOADED);

        if (onLoad) {
          onLoad(e);
        }

        if (onLoadEnd) {
          onLoadEnd();
        }
      }, function error() {
        updateState(ERRORED);

        if (onError) {
          onError({
            nativeEvent: {
              error: "Failed to load resource " + uri + " (404)"
            }
          });
        }

        if (onLoadEnd) {
          onLoadEnd();
        }
      });
    }

    function abortPendingRequest() {
      if (requestRef.current != null) {
        _ImageLoader.default.abort(requestRef.current);

        requestRef.current = null;
      }
    }

    return abortPendingRequest;
  }, [uri, requestRef, updateState, onError, onLoad, onLoadEnd, onLoadStart]);
  return /*#__PURE__*/React.createElement(_View.default, (0, _extends2.default)({}, rest, {
    accessibilityLabel: accessibilityLabel,
    onLayout: handleLayout,
    pointerEvents: pointerEvents,
    ref: ref,
    style: [styles.root, hasTextAncestor && styles.inline, imageSizeStyle, flatStyle]
  }), /*#__PURE__*/React.createElement(_View.default, {
    style: [styles.image, resizeModeStyles[resizeMode], {
      backgroundImage,
      filter
    }, backgroundSize != null && {
      backgroundSize
    }],
    suppressHydrationWarning: true
  }), hiddenImage, createTintColorSVG(tintColor, filterRef.current));
});
Image.displayName = 'Image'; // $FlowIgnore: This is the correct type, but casting makes it unhappy since the variables aren't defined yet

var ImageWithStatics = Image;

ImageWithStatics.getSize = function (uri, success, failure) {
  _ImageLoader.default.getSize(uri, success, failure);
};

ImageWithStatics.prefetch = function (uri) {
  return _ImageLoader.default.prefetch(uri);
};

ImageWithStatics.queryCache = function (uris) {
  return _ImageLoader.default.queryCache(uris);
};

var styles = _StyleSheet.default.create({
  root: {
    flexBasis: 'auto',
    overflow: 'hidden',
    zIndex: 0
  },
  inline: {
    display: 'inline-flex'
  },
  image: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, _StyleSheet.default.absoluteFillObject), {}, {
    backgroundColor: 'transparent',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    width: '100%',
    zIndex: -1
  }),
  accessibilityImage$raw: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, _StyleSheet.default.absoluteFillObject), {}, {
    height: '100%',
    opacity: 0,
    width: '100%',
    zIndex: -1
  })
});

var resizeModeStyles = _StyleSheet.default.create({
  center: {
    backgroundSize: 'auto'
  },
  contain: {
    backgroundSize: 'contain'
  },
  cover: {
    backgroundSize: 'cover'
  },
  none: {
    backgroundPosition: '0',
    backgroundSize: 'auto'
  },
  repeat: {
    backgroundPosition: '0',
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto'
  },
  stretch: {
    backgroundSize: '100% 100%'
  }
});

var _default = ImageWithStatics;
exports.default = _default;
module.exports = exports.default;