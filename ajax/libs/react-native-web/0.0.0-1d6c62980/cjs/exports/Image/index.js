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

const _excluded = ["accessibilityLabel", "blurRadius", "defaultSource", "draggable", "onError", "onLayout", "onLoad", "onLoadEnd", "onLoadStart", "pointerEvents", "source", "style"];
const ERRORED = 'ERRORED';
const LOADED = 'LOADED';
const LOADING = 'LOADING';
const IDLE = 'IDLE';
let _filterId = 0;
const svgDataUriPattern = /^(data:image\/svg\+xml;utf8,)(.*)/;

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
  const flatStyle = _StyleSheet.default.flatten(style);

  const filter = flatStyle.filter,
        resizeMode = flatStyle.resizeMode,
        shadowOffset = flatStyle.shadowOffset,
        tintColor = flatStyle.tintColor; // Add CSS filters
  // React Native exposes these features as props and proprietary styles

  const filters = [];
  let _filter = null;

  if (filter) {
    filters.push(filter);
  }

  if (blurRadius) {
    filters.push("blur(" + blurRadius + "px)");
  }

  if (shadowOffset) {
    const shadowString = (0, _preprocess.createBoxShadowValue)(flatStyle);

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
    const _getAssetByID = (0, _AssetRegistry.getAssetByID)(source),
          height = _getAssetByID.height,
          width = _getAssetByID.width;

    return {
      height,
      width
    };
  } else if (source != null && !Array.isArray(source) && typeof source === 'object') {
    const height = source.height,
          width = source.width;
    return {
      height,
      width
    };
  }
}

function resolveAssetUri(source) {
  let uri = null;

  if (typeof source === 'number') {
    // get the URI from the packager
    const asset = (0, _AssetRegistry.getAssetByID)(source);
    let scale = asset.scales[0];

    if (asset.scales.length > 1) {
      const preferredScale = _PixelRatio.default.get(); // Get the scale which is closest to the preferred scale


      scale = asset.scales.reduce((prev, curr) => Math.abs(curr - preferredScale) < Math.abs(prev - preferredScale) ? curr : prev);
    }

    const scaleSuffix = scale !== 1 ? "@" + scale + "x" : '';
    uri = asset ? asset.httpServerLocation + "/" + asset.name + scaleSuffix + "." + asset.type : '';
  } else if (typeof source === 'string') {
    uri = source;
  } else if (source && typeof source.uri === 'string') {
    uri = source.uri;
  }

  if (uri) {
    const match = uri.match(svgDataUriPattern); // inline SVG markup may contain characters (e.g., #, ") that need to be escaped

    if (match) {
      const prefix = match[1],
            svg = match[2];
      const encodedSvg = encodeURIComponent(svg);
      return "" + prefix + encodedSvg;
    }
  }

  return uri;
}

const Image = /*#__PURE__*/React.forwardRef((props, ref) => {
  const accessibilityLabel = props.accessibilityLabel,
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

  const _React$useState = React.useState(() => {
    const uri = resolveAssetUri(source);

    if (uri != null) {
      const isLoaded = _ImageLoader.default.has(uri);

      if (isLoaded) {
        return LOADED;
      }
    }

    return IDLE;
  }),
        state = _React$useState[0],
        updateState = _React$useState[1];

  const _React$useState2 = React.useState({}),
        layout = _React$useState2[0],
        updateLayout = _React$useState2[1];

  const hasTextAncestor = React.useContext(_TextAncestorContext.default);
  const hiddenImageRef = React.useRef(null);
  const filterRef = React.useRef(_filterId++);
  const requestRef = React.useRef(null);
  const shouldDisplaySource = state === LOADED || state === LOADING && defaultSource == null;

  const _getFlatStyle = getFlatStyle(style, blurRadius, filterRef.current),
        flatStyle = _getFlatStyle[0],
        _resizeMode = _getFlatStyle[1],
        filter = _getFlatStyle[2],
        tintColor = _getFlatStyle[3];

  const resizeMode = props.resizeMode || _resizeMode || 'cover';
  const selectedSource = shouldDisplaySource ? source : defaultSource;
  const displayImageUri = resolveAssetUri(selectedSource);
  const imageSizeStyle = resolveAssetDimensions(selectedSource);
  const backgroundImage = displayImageUri ? "url(\"" + displayImageUri + "\")" : null;
  const backgroundSize = getBackgroundSize(); // Accessibility image allows users to trigger the browser's image context menu

  const hiddenImage = displayImageUri ? (0, _createElement.default)('img', {
    alt: accessibilityLabel || '',
    style: styles.accessibilityImage$raw,
    draggable: draggable || false,
    ref: hiddenImageRef,
    src: displayImageUri
  }) : null;

  function getBackgroundSize() {
    if (hiddenImageRef.current != null && (resizeMode === 'center' || resizeMode === 'repeat')) {
      const _hiddenImageRef$curre = hiddenImageRef.current,
            naturalHeight = _hiddenImageRef$curre.naturalHeight,
            naturalWidth = _hiddenImageRef$curre.naturalWidth;
      const height = layout.height,
            width = layout.width;

      if (naturalHeight && naturalWidth && height && width) {
        const scaleFactor = Math.min(1, width / naturalWidth, height / naturalHeight);
        const x = Math.ceil(scaleFactor * naturalWidth);
        const y = Math.ceil(scaleFactor * naturalHeight);
        return x + "px " + y + "px";
      }
    }
  }

  function handleLayout(e) {
    if (resizeMode === 'center' || resizeMode === 'repeat' || onLayout) {
      const layout = e.nativeEvent.layout;
      onLayout && onLayout(e);
      updateLayout(layout);
    }
  } // Image loading


  const uri = resolveAssetUri(source);
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

const ImageWithStatics = Image;

ImageWithStatics.getSize = function (uri, success, failure) {
  _ImageLoader.default.getSize(uri, success, failure);
};

ImageWithStatics.prefetch = function (uri) {
  return _ImageLoader.default.prefetch(uri);
};

ImageWithStatics.queryCache = function (uris) {
  return _ImageLoader.default.queryCache(uris);
};

const styles = _StyleSheet.default.create({
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

const resizeModeStyles = _StyleSheet.default.create({
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