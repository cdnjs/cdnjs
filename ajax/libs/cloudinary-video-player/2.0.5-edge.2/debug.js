(self["cloudinaryVideoPlayerChunkLoading"] = self["cloudinaryVideoPlayerChunkLoading"] || []).push([["debug"],{

/***/ "./plugins/interaction-areas/interaction-areas.const.js":
/*!**************************************************************!*\
  !*** ./plugins/interaction-areas/interaction-areas.const.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CLOSE_INTERACTION_AREA_LAYOUT_DELAY: () => (/* binding */ CLOSE_INTERACTION_AREA_LAYOUT_DELAY),
/* harmony export */   DEFAULT_INTERACTION_ARE_TRANSITION: () => (/* binding */ DEFAULT_INTERACTION_ARE_TRANSITION),
/* harmony export */   INTERACTION_AREAS_CONTAINER_CLASS_NAME: () => (/* binding */ INTERACTION_AREAS_CONTAINER_CLASS_NAME),
/* harmony export */   INTERACTION_AREAS_PREFIX: () => (/* binding */ INTERACTION_AREAS_PREFIX),
/* harmony export */   INTERACTION_AREAS_TEMPLATE: () => (/* binding */ INTERACTION_AREAS_TEMPLATE),
/* harmony export */   INTERACTION_AREAS_THEME: () => (/* binding */ INTERACTION_AREAS_THEME),
/* harmony export */   INTERACTION_AREA_HAND_ICON: () => (/* binding */ INTERACTION_AREA_HAND_ICON),
/* harmony export */   INTERACTION_AREA_LAYOUT_LOCAL_STORAGE_NAME: () => (/* binding */ INTERACTION_AREA_LAYOUT_LOCAL_STORAGE_NAME),
/* harmony export */   TEMPLATE_INTERACTION_AREAS_VTT: () => (/* binding */ TEMPLATE_INTERACTION_AREAS_VTT)
/* harmony export */ });
const INTERACTION_AREA_LAYOUT_LOCAL_STORAGE_NAME = 'cld-ia-layout-state';
const INTERACTION_AREAS_PREFIX = 'vp-ia';
const INTERACTION_AREAS_CONTAINER_CLASS_NAME = 'interaction-areas-container';
const INTERACTION_AREAS_TEMPLATE = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
  All: 'all',
  CENTER: 'center'
};
const INTERACTION_AREAS_THEME = {
  PULSING: 'pulsing',
  SHADOWED: 'shadowed'
};
const TEMPLATE_INTERACTION_AREAS_VTT = {
  [INTERACTION_AREAS_TEMPLATE.PORTRAIT]: 'https://res.cloudinary.com/prod/raw/upload/v1623772481/video-player/vtts/portrait.vtt',
  [INTERACTION_AREAS_TEMPLATE.LANDSCAPE]: 'https://res.cloudinary.com/prod/raw/upload/v1623772303/video-player/vtts/landscape.vtt',
  [INTERACTION_AREAS_TEMPLATE.All]: 'https://res.cloudinary.com/prod/raw/upload/v1623250266/video-player/vtts/all.vtt',
  [INTERACTION_AREAS_TEMPLATE.CENTER]: 'https://res.cloudinary.com/prod/raw/upload/v1623250265/video-player/vtts/center.vtt'
};
const INTERACTION_AREA_HAND_ICON = 'https://res.cloudinary.com/prod/image/upload/v1626764643/video-player/interaction-area-hand.svg';
const CLOSE_INTERACTION_AREA_LAYOUT_DELAY = 4500;
const DEFAULT_INTERACTION_ARE_TRANSITION = 250;

/***/ }),

/***/ "./validators/validators-types.js":
/*!****************************************!*\
  !*** ./validators/validators-types.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validator: () => (/* binding */ validator)
/* harmony export */ });
/* harmony import */ var lodash_isBoolean__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isBoolean */ "../node_modules/lodash/isBoolean.js");
/* harmony import */ var lodash_isBoolean__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isBoolean__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isFunction */ "../node_modules/lodash/isFunction.js");
/* harmony import */ var lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isFunction__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isNumber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/isNumber */ "../node_modules/lodash/isNumber.js");
/* harmony import */ var lodash_isNumber__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isNumber__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/isObject */ "../node_modules/lodash/isObject.js");
/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_isObject__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_isString__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/isString */ "../node_modules/lodash/isString.js");
/* harmony import */ var lodash_isString__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_isString__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _validators_functions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./validators-functions */ "./validators/validators-functions.js");






const getOptionsString = options => lodash_isObject__WEBPACK_IMPORTED_MODULE_3___default()(options) ? ":(".concat(Object.values(options).join('/'), ")") : '';
const arrayOfStringsValidator = () => ({
  value: arr => Array.isArray(arr) && arr.every((lodash_isString__WEBPACK_IMPORTED_MODULE_4___default())),
  message: key => "'".concat(key, "' should be an array of strings")
});
const arrayOfNumbersValidator = () => ({
  value: arr => Array.isArray(arr) && arr.every((lodash_isNumber__WEBPACK_IMPORTED_MODULE_2___default())),
  message: key => "'".concat(key, "' should be an array of numbers")
});
const arrayOfObjectsValidator = options => ({
  value: arr => {
    return arr.every(item => {
      for (let key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          const value = item[key];
          const validator = options[key];
          const isValid = validator && (0,_validators_functions__WEBPACK_IMPORTED_MODULE_5__.isValueValid)(validator(value), value, key);
          if (!isValid) {
            return false;
          }
        }
      }
      return true;
    });
  },
  message: () => 'invalid array'
});
const orValidator = function () {
  for (var _len = arguments.length, validators = new Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }
  return () => ({
    value: value => validators.some(validator => (0,_validators_functions__WEBPACK_IMPORTED_MODULE_5__.getValidatorItem)(validator).value(value)),
    message: configPropertyName => validators.map(validator => (0,_validators_functions__WEBPACK_IMPORTED_MODULE_5__.getValidatorItem)(validator).message(configPropertyName)).join(' or ')
  });
};
const validator = {
  isString: options => ({
    value: (lodash_isString__WEBPACK_IMPORTED_MODULE_4___default()),
    message: key => "'".concat(key, "' should be a string").concat(getOptionsString(options))
  }),
  isNumber: options => ({
    value: (lodash_isNumber__WEBPACK_IMPORTED_MODULE_2___default()),
    message: key => "'".concat(key, "' should be a number").concat(getOptionsString(options))
  }),
  isBoolean: () => ({
    value: (lodash_isBoolean__WEBPACK_IMPORTED_MODULE_0___default()),
    message: key => "'".concat(key, "' should be a boolean")
  }),
  isFunction: () => ({
    value: (lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()),
    message: key => "'".concat(key, "' should be a function")
  }),
  isPlainObject: () => ({
    value: (lodash_isObject__WEBPACK_IMPORTED_MODULE_3___default()),
    message: key => "'".concat(key, "' should be an object")
  }),
  isObject: () => ({
    value: value => value && typeof value === 'object',
    message: key => "'".concat(key, "' should be an object")
  }),
  isArray: () => ({
    value: Array.isArray,
    message: key => "'".concat(key, "' should be an array")
  }),
  isArrayOfNumbers: arrayOfNumbersValidator,
  isArrayOfStrings: arrayOfStringsValidator,
  isArrayOfObjects: arrayOfObjectsValidator,
  or: orValidator
};

/***/ }),

/***/ "./validators/validators.js":
/*!**********************************!*\
  !*** ./validators/validators.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   playerValidators: () => (/* binding */ playerValidators),
/* harmony export */   sourceValidators: () => (/* binding */ sourceValidators)
/* harmony export */ });
/* harmony import */ var _video_player_const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../video-player.const */ "./video-player.const.js");
/* harmony import */ var _plugins_interaction_areas_interaction_areas_const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../plugins/interaction-areas/interaction-areas.const */ "./plugins/interaction-areas/interaction-areas.const.js");
/* harmony import */ var _validators_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validators-types */ "./validators/validators-types.js");



const playerValidators = {
  videojsOptions: {
    loop: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
    controls: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
    autoplay: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
    autoplayMode: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString(_video_player_const__WEBPACK_IMPORTED_MODULE_0__.AUTO_PLAY_MODE),
    bigPlayButton: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
    playbackRates: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isArray,
    showLogo: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
    logoImageUrl: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
    logoOnclickUrl: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
    videoJS: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isPlainObject,
    maxTries: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isNumber,
    muted: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
    playsinline: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
    videoTimeout: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isNumber,
    preload: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
    sourceTransformation: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isPlainObject,
    allowUsageReport: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
    interactionAreas: {
      theme: {
        template: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString(_plugins_interaction_areas_interaction_areas_const__WEBPACK_IMPORTED_MODULE_1__.INTERACTION_AREAS_THEME)
      },
      layout: {
        enable: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
        showAgain: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean
      }
    }
  },
  playerOptions: {
    debug: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
    queryParams: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isPlainObject,
    publicId: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
    fluid: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
    withCredentials: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
    analytics: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
    cloudinaryAnalytics: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
    hideContextMenu: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
    playedEventPercents: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isArrayOfNumbers,
    showJumpControls: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
    chaptersButton: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
    pictureInPictureToggle: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
    seekThumbnails: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
    aiHighlightsGraph: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
    floatingWhenNotVisible: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString(_video_player_const__WEBPACK_IMPORTED_MODULE_0__.FLOATING_TO),
    playedEventTimes: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isArray,
    playlistWidget: {
      direction: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
      total: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isNumber
    },
    colors: {
      base: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
      accent: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
      text: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString
    },
    ads: {
      adTagUrl: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
      showCountdown: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
      adLabel: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
      locale: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
      prerollTimeout: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isNumber,
      postrollTimeout: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isNumber,
      adsInPlaylist: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString(_video_player_const__WEBPACK_IMPORTED_MODULE_0__.ADS_IN_PLAYLIST)
    },
    cloudinary: {
      autoShowRecommendations: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
      sourceTypes: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isArrayOfStrings,
      transformation: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isObject,
      fontFace: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
      posterOptions: {
        publicId: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
        transformation: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isObject
      }
    }
  }
};
const sourceValidators = {
  raw_transformation: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
  shoppable: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isPlainObject,
  chapters: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.or(_validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean, _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isPlainObject),
  interactionAreas: {
    enable: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
    template: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.or(_validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString(_plugins_interaction_areas_interaction_areas_const__WEBPACK_IMPORTED_MODULE_1__.INTERACTION_AREAS_TEMPLATE), _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isArray),
    vttUrl: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
    onClick: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isFunction
  },
  textTracks: {
    options: {
      theme: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
      fontFace: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
      fontSize: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
      gravity: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
      box: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isPlainObject,
      style: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isPlainObject,
      wordHighlightStyle: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isPlainObject
    },
    captions: {
      label: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
      language: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
      default: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
      url: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
      maxWords: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isNumber,
      wordHighlight: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
      timeOffset: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isNumber
    },
    subtitles: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isArrayOfObjects({
      label: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
      language: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
      default: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
      url: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
      maxWords: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isNumber,
      wordHighlight: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isBoolean,
      timeOffset: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isNumber
    })
  },
  info: {
    title: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
    subtitle: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString,
    description: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isString
  },
  cloudinary: {
    sourceTypes: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isArrayOfStrings,
    transformation: _validators_types__WEBPACK_IMPORTED_MODULE_2__.validator.isObject
  }
};

/***/ }),

/***/ "../node_modules/lodash/isBoolean.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/isBoolean.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var boolTag = '[object Boolean]';

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */
function isBoolean(value) {
  return value === true || value === false ||
    (isObjectLike(value) && baseGetTag(value) == boolTag);
}

module.exports = isBoolean;


/***/ }),

/***/ "../node_modules/lodash/isNumber.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/isNumber.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var numberTag = '[object Number]';

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
 * classified as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
 * @example
 *
 * _.isNumber(3);
 * // => true
 *
 * _.isNumber(Number.MIN_VALUE);
 * // => true
 *
 * _.isNumber(Infinity);
 * // => true
 *
 * _.isNumber('3');
 * // => false
 */
function isNumber(value) {
  return typeof value == 'number' ||
    (isObjectLike(value) && baseGetTag(value) == numberTag);
}

module.exports = isNumber;


/***/ })

}]);
//# sourceMappingURL=debug.js.map