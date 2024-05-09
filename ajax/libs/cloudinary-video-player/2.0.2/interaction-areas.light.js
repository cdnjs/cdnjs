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
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
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
/* harmony import */ var _interaction_areas_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./interaction-areas.scss */ "./plugins/interaction-areas/interaction-areas.scss");










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

/***/ "./plugins/interaction-areas/interaction-areas.scss":
/*!**********************************************************!*\
  !*** ./plugins/interaction-areas/interaction-areas.scss ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=interaction-areas.light.js.map