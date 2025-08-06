/*!
 * Cloudinary Video Player v3.1.2-edge.3
 * Built on 2025-08-06T14:15:40.534Z
 * https://github.com/cloudinary/cloudinary-video-player
 */
"use strict";
(self["cloudinaryVideoPlayerChunkLoading"] = self["cloudinaryVideoPlayerChunkLoading"] || []).push([["share"],{

/***/ "./plugins/share/components/download-button.js":
/*!*****************************************************!*\
  !*** ./plugins/share/components/download-button.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const ClickableComponent = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('ClickableComponent');
class ShareDownloadButton extends ClickableComponent {
  constructor(player) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(player, options);
  }
  handleClick(event) {
    super.handleClick(event);
    // Delegate the actual download to the plugin API if present
    if (this.player().share && typeof this.player().share.download === 'function') {
      this.player().share.download();
    }
  }
  createEl() {
    const button = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('button', {
      className: 'vjs-control vjs-share-download-button vjs-button',
      ariaLabel: 'Download video',
      title: 'Download video'
    });
    const iconSpan = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('span', {
      className: 'vjs-icon-file-download vjs-icon-placeholder'
    });
    button.appendChild(iconSpan);
    const spinnerSpan = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('span', {
      className: 'vjs-loading-spinner'
    });
    button.appendChild(spinnerSpan);
    return button;
  }

  /**
   * Toggles the "preparing download" visual state (spinner + title).
   * @param {boolean} isPreparing
   */
  setPreparing(isPreparing) {
    const el = this.el();
    if (isPreparing) {
      el.classList.add('vjs-waiting');
      el.setAttribute('title', 'Download is being prepared');
    } else {
      el.classList.remove('vjs-waiting');
      el.setAttribute('title', 'Download video');
    }
  }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('ShareDownloadButton', ShareDownloadButton);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShareDownloadButton);

/***/ }),

/***/ "./plugins/share/share.js":
/*!********************************!*\
  !*** ./plugins/share/share.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_download_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/download-button */ "./plugins/share/components/download-button.js");
/* harmony import */ var _share_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./share.scss */ "./plugins/share/share.scss");
/* harmony import */ var plugins_cloudinary_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! plugins/cloudinary/common */ "./plugins/cloudinary/common.js");
/* harmony import */ var lodash_omit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/omit */ "../node_modules/lodash/omit.js");
/* harmony import */ var lodash_omit__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_omit__WEBPACK_IMPORTED_MODULE_3__);




const SharePlugin = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let playerInstance = arguments.length > 1 ? arguments[1] : undefined;
  const player = playerInstance || this;
  player.addClass('vjs-share');
  const addDownloadButton = () => {
    const controlBar = player.getChild('ControlBar');
    if (!controlBar || controlBar.getChild('ShareDownloadButton')) {
      return;
    }
    const children = controlBar.children();
    const insertBeforeIndex = children.findIndex(c => c.name_ === 'FullscreenToggle');
    controlBar.addChild('ShareDownloadButton', {}, insertBeforeIndex !== -1 ? insertBeforeIndex : undefined);
  };
  const removeDownloadButton = () => {
    if (!player.controlBar) {
      return;
    }
    const btn = player.controlBar.getChild('ShareDownloadButton');
    if (btn) {
      player.controlBar.removeChild(btn);
    }
  };
  const getDownloadUrl = () => {
    const source = player.currentSource?.();
    if (!source) {
      return null;
    }

    // Strip format / codec related transformation arrays
    const STRIP_KEYS = ['format', 'video_codec', 'streaming_profile'];
    const stripKeysDeep = value => {
      if (Array.isArray(value)) {
        return value.map(stripKeysDeep);
      }
      if (value && typeof value === 'object') {
        const cleaned = lodash_omit__WEBPACK_IMPORTED_MODULE_3___default()(value, STRIP_KEYS);
        Object.keys(cleaned).forEach(k => {
          cleaned[k] = stripKeysDeep(cleaned[k]);
        });
        return cleaned;
      }
      return value;
    };
    const transformations = stripKeysDeep(player.cloudinary.transformation() || {});
    const baseOptions = {
      ...player.cloudinary.cloudinaryConfig(),
      ...transformations,
      resource_type: 'video',
      format: 'mp4',
      video_codec: 'h264',
      flags: `streaming_attachment:${player.cloudinary.currentPublicId()}`
    };

    // For ABR - download a limited-size video
    if (source.isAdaptive) {
      Object.assign(baseOptions, {
        crop: 'limit',
        width: 1920,
        height: 1920
      });
    }

    // For audio sources, set the format to mp3
    if (player.cloudinary.source()?.getType() === 'AudioSource') {
      Object.assign(baseOptions, {
        format: 'mp3',
        video_codec: undefined
      });
    }
    return (0,plugins_cloudinary_common__WEBPACK_IMPORTED_MODULE_2__.getCloudinaryUrl)(player.cloudinary.currentPublicId(), baseOptions);
  };
  const download = () => {
    const url = getDownloadUrl();
    if (!url) {
      console.warn('Share plugin: Unable to resolve download URL.');
      return;
    }
    const MAX_ATTEMPTS = 60; // 60 tries / 10s interval
    const INTERVAL_MS = 10000;
    const RETRY_STATUS_CODES = [423];
    const triggerDownload = () => {
      const a = document.createElement('a');
      a.href = url;
      a.download = '';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    const btn = player.controlBar?.getChild('ShareDownloadButton');
    const setPreparingState = isPreparing => {
      btn?.setPreparing?.(isPreparing);
    };
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    const fetchDownload = async function () {
      let attempt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      const response = await fetch(url, {
        method: 'HEAD'
      });
      if (RETRY_STATUS_CODES.includes(response.status) && attempt < MAX_ATTEMPTS) {
        if (attempt === 0) {
          setPreparingState(true);
        }
        await wait(INTERVAL_MS);
        return fetchDownload(attempt + 1);
      }
      setPreparingState(false);
      triggerDownload();
    };
    fetchDownload();
  };
  if (options.download) {
    addDownloadButton();
  }
  player.share = {
    download,
    addDownloadButton,
    removeDownloadButton
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SharePlugin);

/***/ }),

/***/ "./plugins/share/share.scss":
/*!**********************************!*\
  !*** ./plugins/share/share.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=share.js.map