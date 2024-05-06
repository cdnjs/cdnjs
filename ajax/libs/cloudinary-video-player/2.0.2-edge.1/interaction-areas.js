(self["cloudinaryVideoPlayerChunkLoading"] = self["cloudinaryVideoPlayerChunkLoading"] || []).push([["interaction-areas"],{

/***/ "./components/themeButton/themedButton.const.js":
/*!******************************************************!*\
  !*** ./components/themeButton/themedButton.const.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BUTTON_THEME: () => (/* binding */ BUTTON_THEME)
/* harmony export */ });
const BUTTON_THEME = {
  TRANSPARENT_WHITE: 'transparent-white'
};

/***/ }),

/***/ "./components/themeButton/themedButton.js":
/*!************************************************!*\
  !*** ./components/themeButton/themedButton.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   themedButton: () => (/* binding */ themedButton)
/* harmony export */ });
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/dom */ "./utils/dom.js");

const themedButton = _ref => {
  let {
    text,
    onClick,
    theme = '',
    loadingDelay = 0
  } = _ref;
  return (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.elementsCreator)({
    tag: 'button',
    attr: {
      class: "vp-theme-button theme-".concat(theme)
    },
    onClick,
    children: [{
      tag: 'div',
      attr: {
        class: 'vp-loading-bar'
      },
      style: {
        'animation-duration': "".concat(loadingDelay, "ms")
      }
    }, {
      tag: 'div',
      attr: {
        class: 'content'
      },
      children: text
    }]
  });
};

/***/ }),

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

/***/ "./plugins/interaction-areas/interaction-areas.service.js":
/*!****************************************************************!*\
  !*** ./plugins/interaction-areas/interaction-areas.service.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   interactionAreasService: () => (/* binding */ interactionAreasService)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/video.es-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/throttle */ "../node_modules/lodash/throttle.js");
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_throttle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_noop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/noop */ "../node_modules/lodash/noop.js");
/* harmony import */ var lodash_noop__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_noop__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _interaction_areas_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./interaction-areas.const */ "./plugins/interaction-areas/interaction-areas.const.js");
/* harmony import */ var _interaction_areas_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./interaction-areas.utils */ "./plugins/interaction-areas/interaction-areas.utils.js");
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/dom */ "./utils/dom.js");
/* harmony import */ var _video_player_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../video-player.utils */ "./video-player.utils.js");
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/consts */ "./utils/consts.js");
/* harmony import */ var _interaction_areas_scss_style_loader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./interaction-areas.scss?style-loader */ "./plugins/interaction-areas/interaction-areas.scss?style-loader");










const interactionAreasService = (player, playerOptions, videojsOptions) => {
  let isZoomed = false;
  let currentSource = null;
  let currentTrack = null;
  let unZoom = (lodash_noop__WEBPACK_IMPORTED_MODULE_3___default());
  const shouldLayoutMessage = () => (0,_interaction_areas_utils__WEBPACK_IMPORTED_MODULE_5__.shouldShowAreaLayoutMessage)(videojsOptions.interactionDisplay);
  const getIsSyncOffsetTime = () => {
    const interactionAreasConfig = getInteractionAreasConfig();
    return interactionAreasConfig && interactionAreasConfig.syncOffsetTime !== undefined ? interactionAreasConfig.syncOffsetTime : false;
  };
  function isInteractionAreasEnabled() {
    let enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    const interactionAreasConfig = getInteractionAreasConfig();
    return enabled || interactionAreasConfig && interactionAreasConfig.enable;
  }
  function setAreasPositionListener() {
    currentTrack && player.videojs.removeRemoteTextTrack(currentTrack);
    const isEnabled = isInteractionAreasEnabled();
    const interactionAreasConfig = getInteractionAreasConfig();
    if (!isEnabled || isZoomed) {
      return null;
    }
    if (Array.isArray(interactionAreasConfig.template)) {
      addInteractionAreasItems(interactionAreasConfig.template);
      setContainerSize();
    } else {
      const vttUrl = interactionAreasConfig.vttUrl || _interaction_areas_const__WEBPACK_IMPORTED_MODULE_4__.TEMPLATE_INTERACTION_AREAS_VTT[interactionAreasConfig.template];
      if (vttUrl) {
        currentTrack = (0,_video_player_utils__WEBPACK_IMPORTED_MODULE_7__.addMetadataTrack)(player.videojs, vttUrl);
        addCueListener(currentTrack);
      }
    }
  }
  function setGoBackButton() {
    const button = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_6__.createElement)('div', {
      'class': 'go-back-button'
    });
    button.addEventListener('click', () => {
      unZoom();
    }, false);
    const tracksContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_6__.createElement)('div', {
      'class': _interaction_areas_const__WEBPACK_IMPORTED_MODULE_4__.INTERACTION_AREAS_CONTAINER_CLASS_NAME
    }, button);
    (0,_interaction_areas_utils__WEBPACK_IMPORTED_MODULE_5__.setInteractionAreasContainer)(player.videojs, tracksContainer);
  }
  function getInteractionAreasConfig() {
    const {
      cldSrc
    } = currentSource;
    return cldSrc && cldSrc.getInteractionAreas();
  }
  function removeLayoutMessage() {
    (0,_interaction_areas_utils__WEBPACK_IMPORTED_MODULE_5__.removeInteractionAreasContainer)(player.videojs);
    setAreasPositionListener();
    player.play();
  }
  function setLayoutMessage() {
    if (!isInteractionAreasEnabled()) {
      return;
    }
    if (shouldLayoutMessage()) {
      let layoutMessageTimout = null;
      const showItAgainCheckbox = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(videojsOptions, 'interactionDisplay.layout.showAgain', false);
      player.pause();
      (0,_interaction_areas_utils__WEBPACK_IMPORTED_MODULE_5__.createInteractionAreaLayoutMessage)(player.videojs, () => {
        clearTimeout(layoutMessageTimout);
        removeLayoutMessage();
      }, showItAgainCheckbox);
      if (!showItAgainCheckbox) {
        layoutMessageTimout = setTimeout(removeLayoutMessage, _interaction_areas_const__WEBPACK_IMPORTED_MODULE_4__.CLOSE_INTERACTION_AREA_LAYOUT_DELAY);
      }
    } else {
      removeLayoutMessage();
    }
  }
  function handleAds() {
    player.on('adsready', () => {
      player.videojs.ima.addEventListener(window.google.ima.AdEvent.Type.ALL_ADS_COMPLETED, setLayoutMessage);
    });
  }
  function init() {
    currentSource = currentSource || player.videojs.currentSource();
    if (isInteractionAreasEnabled()) {
      player.videojs.el().classList.add('interaction-areas');
      player.videojs.one(_utils_consts__WEBPACK_IMPORTED_MODULE_8__.PLAYER_EVENT.PLAY, () => {
        if (typeof player.videojs.ima === 'object') {
          handleAds();
        } else {
          setLayoutMessage();
        }
      });
      const setInteractionAreasContainerSize = lodash_throttle__WEBPACK_IMPORTED_MODULE_2___default()(setContainerSize, 100);
      player.videojs.on(_utils_consts__WEBPACK_IMPORTED_MODULE_8__.PLAYER_EVENT.FULL_SCREEN_CHANGE, () => {
        // waiting for fullscreen will end
        setTimeout(setInteractionAreasContainerSize, 100);
      });
      const resizeDestroy = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_6__.addEventListener)(window, 'resize', setContainerSize, false);
      player.videojs.on(_utils_consts__WEBPACK_IMPORTED_MODULE_8__.PLAYER_EVENT.DISPOSE, resizeDestroy);
    }
    player.videojs.on(_utils_consts__WEBPACK_IMPORTED_MODULE_8__.PLAYER_EVENT.ENDED, () => {
      unZoom();
    });
    player.videojs.on(_utils_consts__WEBPACK_IMPORTED_MODULE_8__.PLAYER_EVENT.ERROR, () => {
      player.pause();
    });
  }
  function onZoom(src, newOption, item) {
    const originalCurrentTime = player.currentTime();
    const isSyncOffsetTime = getIsSyncOffsetTime();
    const {
      cldSrc
    } = currentSource;
    const currentSrcOptions = cldSrc.getInitOptions();
    const option = newOption || {
      transformation: currentSrcOptions.transformation
    };
    const transformation = !src && (0,_interaction_areas_utils__WEBPACK_IMPORTED_MODULE_5__.getZoomTransformation)(player.videoElement, item);
    const sourceOptions = transformation ? video_js__WEBPACK_IMPORTED_MODULE_0___default().obj.merge({
      transformation
    }, option) : option;
    const newSource = cldSrc.isRawUrl ? currentSource.src : {
      publicId: cldSrc.publicId()
    };
    player.source(transformation ? {
      publicId: cldSrc.publicId()
    } : src, sourceOptions).play();
    isSyncOffsetTime && player.currentTime(originalCurrentTime);
    isZoomed = true;
    setGoBackButton();
    unZoom = () => {
      if (isZoomed) {
        isZoomed = false;
        const currentZoomedTime = player.currentTime();
        const duration = player.duration();
        player.source(newSource, currentSrcOptions).play();
        isSyncOffsetTime && currentZoomedTime < duration && player.currentTime(currentZoomedTime);
        setAreasPositionListener();
      }
    };
  }
  function onInteractionAreasClick(_ref) {
    let {
      event,
      item,
      index
    } = _ref;
    const interactionAreasConfig = getInteractionAreasConfig();
    interactionAreasConfig.onClick && interactionAreasConfig.onClick({
      item,
      index,
      event,
      zoom: (source, option) => {
        onZoom(source, option, item);
      }
    });
  }
  function addInteractionAreasItems(interactionAreasData, previousInteractionAreasData) {
    let durationTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    const configs = {
      playerOptions: playerOptions,
      videojsOptions: videojsOptions
    };
    if (previousInteractionAreasData) {
      (0,_interaction_areas_utils__WEBPACK_IMPORTED_MODULE_5__.updateInteractionAreasItem)(player.videojs, configs, interactionAreasData, previousInteractionAreasData, durationTime, onInteractionAreasClick);
    } else {
      const interactionAreasItems = interactionAreasData.map((item, index) => {
        return (0,_interaction_areas_utils__WEBPACK_IMPORTED_MODULE_5__.getInteractionAreaItem)(configs, item, index, durationTime, event => {
          onInteractionAreasClick({
            event,
            item,
            index
          });
        });
      });
      (0,_interaction_areas_utils__WEBPACK_IMPORTED_MODULE_5__.setInteractionAreasContainer)(player.videojs, (0,_utils_dom__WEBPACK_IMPORTED_MODULE_6__.createElement)('div', {
        'class': _interaction_areas_const__WEBPACK_IMPORTED_MODULE_4__.INTERACTION_AREAS_CONTAINER_CLASS_NAME
      }, interactionAreasItems));
    }
  }
  function setContainerSize() {
    if (isInteractionAreasEnabled()) {
      (0,_interaction_areas_utils__WEBPACK_IMPORTED_MODULE_5__.setInteractionAreasContainerSize)(player.videojs, player.videoElement);
    }
  }
  function addCueListener(track) {
    if (!track) {
      return;
    }
    let previousTracksData = null;
    track.addEventListener('cuechange', () => {
      const activeCue = track.activeCues && track.activeCues[0];
      if (activeCue) {
        const durationTime = Math.max(Math.floor((activeCue.endTime - activeCue.startTime) * 1000), _interaction_areas_const__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_INTERACTION_ARE_TRANSITION);
        const tracksData = JSON.parse(activeCue.text);
        addInteractionAreasItems(tracksData, previousTracksData, durationTime);
        !previousTracksData && setContainerSize();
        previousTracksData = tracksData;
      } else {
        (0,_interaction_areas_utils__WEBPACK_IMPORTED_MODULE_5__.removeInteractionAreasContainer)(player.videojs);
        previousTracksData = null;
      }
    });
  }
  init();
};

/***/ }),

/***/ "./plugins/interaction-areas/interaction-areas.utils.js":
/*!**************************************************************!*\
  !*** ./plugins/interaction-areas/interaction-areas.utils.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createInteractionAreaLayoutMessage: () => (/* binding */ createInteractionAreaLayoutMessage),
/* harmony export */   getInteractionAreaItem: () => (/* binding */ getInteractionAreaItem),
/* harmony export */   getZoomTransformation: () => (/* binding */ getZoomTransformation),
/* harmony export */   percentageToFixedValue: () => (/* binding */ percentageToFixedValue),
/* harmony export */   removeInteractionAreasContainer: () => (/* binding */ removeInteractionAreasContainer),
/* harmony export */   setInteractionAreasContainer: () => (/* binding */ setInteractionAreasContainer),
/* harmony export */   setInteractionAreasContainerSize: () => (/* binding */ setInteractionAreasContainerSize),
/* harmony export */   shouldShowAreaLayoutMessage: () => (/* binding */ shouldShowAreaLayoutMessage),
/* harmony export */   updateInteractionAreasItem: () => (/* binding */ updateInteractionAreasItem)
/* harmony export */ });
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_noop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/noop */ "../node_modules/lodash/noop.js");
/* harmony import */ var lodash_noop__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_noop__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/dom */ "./utils/dom.js");
/* harmony import */ var _interaction_areas_const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interaction-areas.const */ "./plugins/interaction-areas/interaction-areas.const.js");
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../colors */ "./plugins/colors/index.js");
/* harmony import */ var _components_themeButton_themedButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/themeButton/themedButton */ "./components/themeButton/themedButton.js");
/* harmony import */ var _components_themeButton_themedButton_const__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/themeButton/themedButton.const */ "./components/themeButton/themedButton.const.js");







const getInteractionAreaItemId = (item, index) => item.id || item.type || "id_".concat(index);
const getInteractionAreaItem = (_ref, item, index, durationTime, onClick) => {
  let {
    playerOptions,
    videojsOptions
  } = _ref;
  const defaultColor = (0,_colors__WEBPACK_IMPORTED_MODULE_4__.getDefaultPlayerColor)(videojsOptions);
  const accentColor = playerOptions && playerOptions.colors ? playerOptions.colors.accent : defaultColor.accent;

  // theme = 'pulsing' / 'shadowed'
  const theme = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(videojsOptions, 'interactionDisplay.theme.template', _interaction_areas_const__WEBPACK_IMPORTED_MODULE_3__.INTERACTION_AREAS_THEME.PULSING);
  return (0,_utils_dom__WEBPACK_IMPORTED_MODULE_2__.elementsCreator)({
    tag: 'div',
    attr: {
      class: "".concat(_interaction_areas_const__WEBPACK_IMPORTED_MODULE_3__.INTERACTION_AREAS_PREFIX, "-item theme-").concat(theme),
      'data-id': getInteractionAreaItemId(item, index)
    },
    style: {
      left: "".concat(item.left, "%"),
      top: "".concat(item.top, "%"),
      width: "".concat(item.width, "%"),
      height: "".concat(item.height, "%"),
      transitionDuration: "".concat(durationTime, "ms")
    },
    event: {
      name: 'click',
      callback: onClick
    },
    children: [{
      tag: 'div',
      attr: {
        class: "".concat(_interaction_areas_const__WEBPACK_IMPORTED_MODULE_3__.INTERACTION_AREAS_PREFIX, "-area-marker")
      },
      children: [{
        tag: 'div',
        attr: {
          class: "".concat(_interaction_areas_const__WEBPACK_IMPORTED_MODULE_3__.INTERACTION_AREAS_PREFIX, "-marker-shadow")
        },
        style: {
          [theme === _interaction_areas_const__WEBPACK_IMPORTED_MODULE_3__.INTERACTION_AREAS_THEME.SHADOWED ? 'backgroundColor' : 'borderColor']: accentColor
        }
      }, {
        tag: 'div',
        attr: {
          class: "".concat(_interaction_areas_const__WEBPACK_IMPORTED_MODULE_3__.INTERACTION_AREAS_PREFIX, "-marker-main")
        },
        style: {
          borderColor: accentColor
        }
      }]
    }]
  });
};
const percentageToFixedValue = (outOf, value) => outOf / (100 / +value);
const getZoomTransformation = (videoElement, interactionAreaItem) => {
  const {
    videoHeight,
    videoWidth
  } = videoElement;
  const itemX = percentageToFixedValue(videoWidth, interactionAreaItem.left);
  const itemY = percentageToFixedValue(videoHeight, interactionAreaItem.top);
  const itemWidth = percentageToFixedValue(videoWidth, interactionAreaItem.width);
  const itemHeight = percentageToFixedValue(videoHeight, interactionAreaItem.height);
  const videoAspectRatio = videoWidth / videoHeight;
  const itemAspectRatio = itemWidth / itemHeight;
  const width = Math.round(itemAspectRatio > 1 || videoAspectRatio > 1 ? itemHeight * itemAspectRatio : itemWidth);
  const height = Math.round(width / videoAspectRatio);
  const x = Math.round(itemX - (width - itemWidth) / 2);
  const y = Math.round(itemY - (height - itemHeight) / 2);
  return {
    width,
    height,
    x: Math.min(Math.max(x, 0), videoWidth - width),
    y: Math.min(Math.max(y, 0), videoHeight - height),
    crop: 'crop'
  };
};
const setInteractionAreasContainer = (videojs, newInteractionAreasContainer) => {
  const currentInteractionAreasContainer = getInteractionAreasContainer(videojs);
  if (currentInteractionAreasContainer) {
    currentInteractionAreasContainer.replaceWith(newInteractionAreasContainer);
  } else {
    // do not use element.append for ie11 support
    videojs.el().appendChild(newInteractionAreasContainer);
  }
};
const getInteractionAreaElementById = (interactionAreasContainer, item, index) => interactionAreasContainer.querySelector("[data-id=".concat(getInteractionAreaItemId(item, index), "]"));
const updateInteractionAreasItem = (videojs, configs, interactionAreasData, previousInteractionAreasData, durationTime, onClick) => {
  const interactionAreasContainer = getInteractionAreasContainer(videojs);
  interactionAreasData.forEach((item, index) => {
    const itemElement = getInteractionAreaElementById(interactionAreasContainer, item, index);
    const itemId = getInteractionAreaItemId(item);
    const isExistItem = previousInteractionAreasData.some(i => getInteractionAreaItemId(i) === itemId);

    // in case the element of the item is in the dom and exist in the previous data , it update the element position
    if (isExistItem && itemElement) {
      (0,_utils_dom__WEBPACK_IMPORTED_MODULE_2__.styleElement)(itemElement, {
        left: "".concat(item.left, "%"),
        top: "".concat(item.top, "%"),
        width: "".concat(item.width, "%"),
        height: "".concat(item.height, "%"),
        transitionDuration: "".concat(durationTime, "ms")
      });
      // if the element did not exist before , not in the dom and not in the previous data , it add a new element
    } else if (!isExistItem && !itemElement) {
      // do not use element.append for ie11 support
      interactionAreasContainer.appendChild(getInteractionAreaItem(configs, item, index, durationTime, event => {
        onClick({
          event,
          item,
          index
        });
      }));
    }
  });

  // checking the previous data for element that should be removed if not exist in the new data object.
  previousInteractionAreasData.forEach((item, index) => {
    const itemElement = getInteractionAreaElementById(interactionAreasContainer, item, index);
    const itemId = getInteractionAreaItemId(item);
    const shouldBeRemoved = !interactionAreasData.some(i => getInteractionAreaItemId(i) === itemId);
    if (itemElement && shouldBeRemoved) {
      // do not use element.remove for ie11 support
      itemElement.parentNode.removeChild(itemElement);
    }
  });
};
const shouldShowAreaLayoutMessage = interactionAreasConfig => {
  const isLayoutEnabled = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(interactionAreasConfig, 'layout.enable', true);
  return isLayoutEnabled && localStorage.getItem(_interaction_areas_const__WEBPACK_IMPORTED_MODULE_3__.INTERACTION_AREA_LAYOUT_LOCAL_STORAGE_NAME) !== 'true';
};
const onClickInteractionAreaLayoutClick = function (checked) {
  let onClick = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (lodash_noop__WEBPACK_IMPORTED_MODULE_1___default());
  localStorage.setItem(_interaction_areas_const__WEBPACK_IMPORTED_MODULE_3__.INTERACTION_AREA_LAYOUT_LOCAL_STORAGE_NAME, JSON.parse(checked));
  onClick();
};
const createInteractionAreaLayoutMessage = function (videojs, onClick) {
  let showItAgainCheckbox = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let checked = false;
  const id = "checkbox_".concat(Math.round(Math.random() * 10000));
  const tracksContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_2__.elementsCreator)({
    tag: 'div',
    attr: {
      class: "".concat(_interaction_areas_const__WEBPACK_IMPORTED_MODULE_3__.INTERACTION_AREAS_CONTAINER_CLASS_NAME, " ").concat(_interaction_areas_const__WEBPACK_IMPORTED_MODULE_3__.INTERACTION_AREAS_PREFIX, "-layout-message ").concat(showItAgainCheckbox ? '' : 'clickable')
    },
    onClick: !showItAgainCheckbox ? () => onClickInteractionAreaLayoutClick(checked, onClick) : null,
    children: [{
      tag: 'img',
      attr: {
        class: "".concat(_interaction_areas_const__WEBPACK_IMPORTED_MODULE_3__.INTERACTION_AREAS_PREFIX, "-layout-icon"),
        src: _interaction_areas_const__WEBPACK_IMPORTED_MODULE_3__.INTERACTION_AREA_HAND_ICON
      }
    }, {
      tag: 'h3',
      attr: {
        class: "".concat(_interaction_areas_const__WEBPACK_IMPORTED_MODULE_3__.INTERACTION_AREAS_PREFIX, "-layout-message-title")
      },
      children: 'Tap on dots to zoom for a product.'
    }, (0,_components_themeButton_themedButton__WEBPACK_IMPORTED_MODULE_5__.themedButton)({
      text: 'Got it',
      theme: _components_themeButton_themedButton_const__WEBPACK_IMPORTED_MODULE_6__.BUTTON_THEME.TRANSPARENT_WHITE,
      loadingDelay: showItAgainCheckbox ? 0 : _interaction_areas_const__WEBPACK_IMPORTED_MODULE_3__.CLOSE_INTERACTION_AREA_LAYOUT_DELAY,
      onClick: showItAgainCheckbox ? () => onClickInteractionAreaLayoutClick(checked, onClick) : null
    }), showItAgainCheckbox && {
      tag: 'div',
      attr: {
        class: "".concat(_interaction_areas_const__WEBPACK_IMPORTED_MODULE_3__.INTERACTION_AREAS_PREFIX, "-layout-message-do-not-show")
      },
      children: [{
        tag: 'input',
        attr: {
          type: 'checkbox',
          class: "".concat(_interaction_areas_const__WEBPACK_IMPORTED_MODULE_3__.INTERACTION_AREAS_PREFIX, "-layout-message-checkbox"),
          id
        },
        event: {
          name: 'input',
          callback: event => {
            checked = event.target.checked;
          }
        }
      }, {
        tag: 'label',
        attr: {
          class: "".concat(_interaction_areas_const__WEBPACK_IMPORTED_MODULE_3__.INTERACTION_AREAS_PREFIX, "-layout-message-checkbox-title"),
          for: id
        },
        children: 'Don׳t show it again'
      }]
    }].filter(i => i)
  });
  setInteractionAreasContainer(videojs, tracksContainer);
};
const getInteractionAreasContainer = videojs => videojs.el().querySelector(".".concat(_interaction_areas_const__WEBPACK_IMPORTED_MODULE_3__.INTERACTION_AREAS_CONTAINER_CLASS_NAME));
const removeInteractionAreasContainer = videojs => {
  const interactionAreasContainer = getInteractionAreasContainer(videojs);

  // do not use element.remove for ie11 support
  interactionAreasContainer && interactionAreasContainer.parentNode.removeChild(interactionAreasContainer);
};
const setInteractionAreasContainerSize = (videojs, videoElement) => {
  const interactionAreasContainer = getInteractionAreasContainer(videojs);
  if (!interactionAreasContainer) {
    return;
  }
  const {
    videoHeight,
    videoWidth
  } = videoElement;
  const videoAspectRatio = videoWidth / videoHeight;
  const width = videoAspectRatio * videoElement.clientHeight;
  interactionAreasContainer.style.width = "".concat(videoElement.clientWidth < width ? '100%' : width, "px");
  interactionAreasContainer.style.height = videoElement.clientWidth < width ? "".concat(videoElement.clientWidth / videoAspectRatio, "px") : '100%';
};

/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./plugins/interaction-areas/interaction-areas.scss?style-loader":
/*!******************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./plugins/interaction-areas/interaction-areas.scss?style-loader ***!
  \******************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.cld-video-player.vjs-user-active .interaction-areas-container {
  display: block;
}
.cld-video-player.interaction-areas .vjs-big-play-button {
  display: none !important;
}
.cld-video-player .interaction-areas-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
  z-index: 1;
}
.cld-video-player .interaction-areas-container:hover {
  display: block;
}
.cld-video-player .interaction-areas-container .go-back-button,
.cld-video-player .interaction-areas-container .vp-ia-item {
  position: absolute;
  cursor: pointer;
}
.cld-video-player .interaction-areas-container .go-back-button {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.cld-video-player .interaction-areas-container .vp-ia-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: top, left, width, height;
  transition-timing-function: linear;
}
.cld-video-player .interaction-areas-container .vp-ia-item.theme-shadowed .vp-ia-marker-shadow {
  opacity: 0.24;
}
.cld-video-player .interaction-areas-container .vp-ia-item.theme-pulsing .vp-ia-marker-shadow {
  -webkit-animation: pulsing-animation 1.3s ease-out;
  -webkit-animation-iteration-count: infinite;
  border: solid 2px;
  opacity: 0;
}
.cld-video-player .interaction-areas-container .vp-ia-item:hover .vp-ia-marker-main:before {
  content: "";
  width: 20px;
  height: 20px;
  border: solid 2px rgba(0, 0, 0, 0.25);
}
.cld-video-player .interaction-areas-container .vp-ia-item .vp-ia-area-marker {
  position: relative;
  width: 20px;
  height: 20px;
}
.cld-video-player .interaction-areas-container .vp-ia-item .vp-ia-area-marker .vp-ia-marker-main,
.cld-video-player .interaction-areas-container .vp-ia-item .vp-ia-area-marker .vp-ia-marker-main:before,
.cld-video-player .interaction-areas-container .vp-ia-item .vp-ia-area-marker .vp-ia-marker-shadow {
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
.cld-video-player .interaction-areas-container .vp-ia-item .vp-ia-area-marker .vp-ia-marker-main {
  background-color: white;
  border: solid 2px;
  height: 100%;
  width: 100%;
}
.cld-video-player .interaction-areas-container .vp-ia-item .vp-ia-area-marker .vp-ia-marker-shadow {
  width: 28px;
  height: 28px;
}
.cld-video-player .interaction-areas-container.vp-ia-layout-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
}
.cld-video-player .interaction-areas-container.vp-ia-layout-message.clickable {
  cursor: pointer;
}
.cld-video-player .interaction-areas-container.vp-ia-layout-message.clickable:hover .vp-theme-button {
  background-color: rgba(255, 255, 254, 0.28);
}
.cld-video-player .interaction-areas-container.vp-ia-layout-message .vp-ia-layout-icon {
  margin-bottom: 20px;
  height: 60px;
}
.cld-video-player .interaction-areas-container.vp-ia-layout-message .vp-ia-layout-message-title {
  font-size: 24px;
  line-height: 34px;
  text-align: center;
}
.cld-video-player .interaction-areas-container.vp-ia-layout-message .vp-theme-button {
  margin: 8px 0 18px 0;
}
.cld-video-player .interaction-areas-container.vp-ia-layout-message .vp-ia-layout-message-do-not-show {
  display: flex;
  align-items: center;
}
.cld-video-player .interaction-areas-container.vp-ia-layout-message .vp-ia-layout-message-do-not-show > * {
  cursor: pointer;
}
.cld-video-player .interaction-areas-container.vp-ia-layout-message .vp-ia-layout-message-do-not-show .vp-ia-layout-message-checkbox-title {
  margin: 0 0 0 5px;
}

@-webkit-keyframes pulsing-animation {
  0% {
    height: 10px;
    width: 10px;
    opacity: 0;
  }
  50% {
    height: 20px;
    width: 20px;
    opacity: 1;
  }
  100% {
    height: 40px;
    width: 40px;
    opacity: 0;
  }
}`, "",{"version":3,"sources":["webpack://./plugins/interaction-areas/interaction-areas.scss"],"names":[],"mappings":"AAUI;EACE,cAAA;AATN;AAeI;EACE,wBAAA;AAbN;AAiBE;EACE,kBAAA;EACA,WAAA;EACA,YAAA;EACA,QAAA;EACA,SAAA;EACA,gCAAA;EACA,aAAA;EACA,UAAA;AAfJ;AAiBI;EACE,cAAA;AAfN;AAkBI;;EAEE,kBAAA;EACA,eAAA;AAhBN;AAmBI;EACE,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;AAjBN;AAoBI;EACE,oBAAA;EACA,mBAAA;EACA,uBAAA;EACA,oCAAA;EACA,kCAAA;AAlBN;AAsBQ;EACE,aAAA;AApBV;AA2BQ;EACE,kDAAA;EACA,2CAAA;EACA,iBAAA;EACA,UAAA;AAzBV;AA8BQ;EACE,WAAA;EACA,WA3EqB;EA4ErB,YA5EqB;EA6ErB,qCAAA;AA5BV;AAgCM;EACE,kBAAA;EACA,WAnFuB;EAoFvB,YApFuB;AAsD/B;AAgCQ;;;EAGE,kBAAA;EACA,kBAAA;EACA,gCAAA;EACA,QAAA;EACA,SAAA;AA9BV;AAiCQ;EACE,uBAAA;EACA,iBAAA;EACA,YAAA;EACA,WAAA;AA/BV;AAkCQ;EACE,WAAA;EACA,YAAA;AAhCV;AAqCI;EACE,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,YAAA;EACA,UAAA;EACA,oCAAA;AAnCN;AAqCM;EACE,eAAA;AAnCR;AAqCQ;EACE,2CAAA;AAnCV;AAwCM;EACE,mBAAA;EACA,YA/H8B;AAyFtC;AAyCM;EACE,eAAA;EACA,iBAAA;EACA,kBAAA;AAvCR;AA0CM;EACE,oBAAA;AAxCR;AA2CM;EACE,aAAA;EACA,mBAAA;AAzCR;AA2CQ;EACE,eAAA;AAzCV;AA4CQ;EACE,iBAAA;AA1CV;;AAkDA;EACE;IAAO,YAAA;IAAoD,WAAA;IAAmD,UAAA;EA5C9G;EA6CA;IAAO,YAlKsB;IAkKiB,WAlKjB;IAkKuD,UAAA;EAxCpF;EAyCA;IAAO,YAAA;IAA2C,WAAA;IAA0C,UAAA;EApC5F;AACF","sourcesContent":["@use \"sass:math\";\n\n$interaction-area-marker-size: 20px;\n$interaction-area-marker-border-size: 2px;\n$interaction-area-marker-box-shadow-extra-size: 4px;\n$interaction-area-layout-icon-height: 60px;\n\n.cld-video-player{\n\n  &.vjs-user-active {\n    .interaction-areas-container {\n      display: block;\n    }\n  }\n\n  &.interaction-areas {\n\n    .vjs-big-play-button {\n      display: none !important;\n    }\n  }\n\n  .interaction-areas-container {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    display: none;\n    z-index: 1;\n\n    &:hover {\n      display: block;\n    }\n\n    .go-back-button,\n    .vp-ia-item {\n      position: absolute;\n      cursor: pointer;\n    }\n\n    .go-back-button {\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n    }\n\n    .vp-ia-item {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      transition: top, left, width, height;\n      transition-timing-function: linear;\n\n      &.theme-shadowed {\n\n        .vp-ia-marker-shadow{\n          opacity: 0.24;\n        }\n\n      }\n\n      &.theme-pulsing {\n\n        .vp-ia-marker-shadow {\n          -webkit-animation: pulsing-animation 1.3s ease-out;\n          -webkit-animation-iteration-count: infinite;\n          border: solid $interaction-area-marker-border-size;\n          opacity: 0;\n        }\n      }\n\n      &:hover {\n        .vp-ia-marker-main:before {\n          content: \"\";\n          width: $interaction-area-marker-size;\n          height: $interaction-area-marker-size;\n          border: solid $interaction-area-marker-border-size rgba(0,0,0,0.25);\n        }\n      }\n\n      .vp-ia-area-marker {\n        position: relative;\n        width: $interaction-area-marker-size;\n        height: $interaction-area-marker-size;\n\n        .vp-ia-marker-main,\n        .vp-ia-marker-main:before,\n        .vp-ia-marker-shadow {\n          position: absolute;\n          border-radius: 50%;\n          transform: translate(-50%, -50%);\n          top: 50%;\n          left: 50%;\n        }\n\n        .vp-ia-marker-main {\n          background-color: white;\n          border:solid $interaction-area-marker-border-size;\n          height: 100%;\n          width: 100%;\n        }\n\n        .vp-ia-marker-shadow {\n          width: 2*$interaction-area-marker-border-size + $interaction-area-marker-size + $interaction-area-marker-box-shadow-extra-size;\n          height:2*$interaction-area-marker-border-size + $interaction-area-marker-size + $interaction-area-marker-box-shadow-extra-size;\n        }\n      }\n    }\n\n    &.vp-ia-layout-message {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      height: 100%;\n      z-index: 2;\n      background-color: rgba(0, 0, 0, 0.5);\n\n      &.clickable {\n        cursor: pointer;\n\n        &:hover .vp-theme-button {\n          background-color: rgba(255, 255, 254, 0.28);\n        }\n\n      }\n\n      .vp-ia-layout-icon {\n        margin-bottom: 20px;\n        height: $interaction-area-layout-icon-height;\n      }\n\n      .vp-ia-layout-message-title {\n        font-size: 24px;\n        line-height: 34px;\n        text-align: center;\n      }\n\n      .vp-theme-button {\n        margin: 8px 0 18px 0;\n      }\n\n      .vp-ia-layout-message-do-not-show {\n        display: flex;\n        align-items: center;\n\n        > * {\n          cursor: pointer;\n        }\n\n        .vp-ia-layout-message-checkbox-title {\n          margin: 0 0 0 5px;\n        }\n\n      }\n    }\n  }\n}\n\n@-webkit-keyframes pulsing-animation {\n  0%   { height: math.div($interaction-area-marker-size, 2); width: math.div($interaction-area-marker-size, 2); opacity: 0}\n  50%  { height: $interaction-area-marker-size; width: $interaction-area-marker-size; opacity: 1}\n  100% { height: 2 * $interaction-area-marker-size; width: 2 * $interaction-area-marker-size; opacity: 0}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/lodash/debounce.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/debounce.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ./isObject */ "../node_modules/lodash/isObject.js"),
    now = __webpack_require__(/*! ./now */ "../node_modules/lodash/now.js"),
    toNumber = __webpack_require__(/*! ./toNumber */ "../node_modules/lodash/toNumber.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ "../node_modules/lodash/noop.js":
/*!**************************************!*\
  !*** ../node_modules/lodash/noop.js ***!
  \**************************************/
/***/ ((module) => {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ }),

/***/ "../node_modules/lodash/now.js":
/*!*************************************!*\
  !*** ../node_modules/lodash/now.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "../node_modules/lodash/_root.js");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ "../node_modules/lodash/throttle.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/throttle.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var debounce = __webpack_require__(/*! ./debounce */ "../node_modules/lodash/debounce.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../node_modules/lodash/isObject.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;


/***/ }),

/***/ "./plugins/interaction-areas/interaction-areas.scss?style-loader":
/*!***********************************************************************!*\
  !*** ./plugins/interaction-areas/interaction-areas.scss?style-loader ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_interaction_areas_scss_style_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./interaction-areas.scss?style-loader */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./plugins/interaction-areas/interaction-areas.scss?style-loader");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_interaction_areas_scss_style_loader__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_interaction_areas_scss_style_loader__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_interaction_areas_scss_style_loader__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_interaction_areas_scss_style_loader__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ })

}]);
//# sourceMappingURL=interaction-areas.js.map